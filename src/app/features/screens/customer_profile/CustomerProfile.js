import React, { useDebugValue, useEffect, useState } from "react";
import BillingNavbar from "./modals/BillingNavbar";
import { Button } from "primereact/button";
import "./css/customer-profile.css";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { DialogeForAddNewType } from "./dialogs/DialogeForAddNewType";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayAllNotesDialog from "./dialogs/display_all_notes";
import classNames from "classnames";
import { ProgressSpinner } from "primereact/progressspinner";
import DialogeForOneNote from "./dialogs/DialogeForOneNote";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ChangeCustomerStatus from "./change_customer_status/change_customer_status";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const CustomerProfile = () => {
    const [cpData, setCpData] = useState([]);
    const [expand, setExpand] = useState(false);
    const [noteLength, setNoteLength] = useState(null);
    const [allNotesTypes, setAllNotesTypes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [addNewType, setAddNewType] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [isOneNote, setIsOneNote] = useState(false);
    const [isNoteId, setisNoteId] = useState();
    const [isEnrollmentId, setisEnrollmentId] = useState();
    const [isContact, setisContact] = useState();
    const [isShow, setIsShow] = useState(false);
    const [changeCustomerStatusDialog, setChangeCustomerStatus] = useState(false);
    //state to refresh Note Type when new note type is added
    const [newNoteTypeAdded, setNewNoteTypeAdded] = useState(false);
    //To Display All Notes in Seperate Dialog
    const [displayAllNotesDialogVisibility, setDisplayAllNotesDialogVisibility] = useState(false);
    const { state } = useLocation();
    const selectedId = state?.selectedId;
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    // Validation Schema
    const validationSchema = Yup.object().shape({
        noteType: Yup.string().required("Note Type is Required"),
        note: Yup.string().required("Please Write Note"),
        priority: Yup.string().required("Please Select Priority"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            noteType: "",
            note: "",
            priority: "low",
        },
        onSubmit: async (values, actions) => {
            // Prepare the data to send to the server
            const data = {
                serviceProvider: parseLoginRes?.company,
                userId: parseLoginRes?._id,
                customerId: selectedId,
                ...values,
            };

            setisButtonLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/web/notes/`, data);
                if (response?.status == "200" || response?.status == "201") {
                    toast.success("Successfully Added");
                    setisButtonLoading(false);
                    actions.resetForm();
                    getNotes();
                }
            } catch (error) {
                toast.error("Error is " + error?.response?.data?.msg);
                setisButtonLoading(false);
            }
        },
    });
    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${selectedId}`);
            if (res?.status == 200 || res?.status == 201) {
                setCpData(res?.data?.data || []);
              
               ;
            }
        } catch (error) { }
    };

    const getNotesType = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/noteType/all?serviceProvider=${parseLoginRes?.company}`);
            setAllNotesTypes(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const getNotes = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/notes/getbyCustomer?customerId=${selectedId}`);
            setAllNotes(res?.data?.data || []);
        } catch (error) {
            // toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getCustomerProfileData();
        getNotes();
    }, []);

    useEffect(() => {
        getNotesType();
    }, [newNoteTypeAdded]);
    const handleDialogeForAddType = () => {
        setAddNewType(true);
    };
    const options = [
        { label: "Priority",value: ""},
        { label: "Highest", value: "highest"},
        { label: "High", value: "high"},
        { label: "Medium", value: "medium"},
        { label: "Low", value: "low"},
        { label: "Lowest", value: "lowest" },
    ];
    function convertDateToRequiredFormat(inputDate) {
        // Create a new Date object from the input string
        var originalDate = new Date(inputDate);
        // Extract the components of the date
        var year = originalDate.getFullYear();
        var month = ("0" + (originalDate.getMonth() + 1)).slice(-2);
        var day = ("0" + originalDate.getDate()).slice(-2);
        var hours = ("0" + originalDate.getHours()).slice(-2);
        var minutes = ("0" + originalDate.getMinutes()).slice(-2);
        var seconds = ("0" + originalDate.getSeconds()).slice(-2);

        // Create a new date string in the desired format
        var newDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return newDateString;
    }
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    //For Showing SOCS Which is Comma Seperated array
    function showsocs(socarray) {
        if (socarray !== undefined) {
           
            var commaSeparatedString = "";
            for (let i = 0; i < socarray.length; i++) {
                if (i === 0) {
                    commaSeparatedString += ` ${socarray[i]}`;
                } else {
                    commaSeparatedString += `, ${socarray[i]}`;
                }
            }
            return commaSeparatedString;
        } else {
            return "NIL";
        }
    }

    const handleView = () => {
        if (isShow == true) {
            setIsShow(false)
        }
        else {
            setIsShow(true)
        }
    }
    const downloadLabel = () => {
        const path = cpData?.label;
       
        const trimmedPath = path.replace(/^uploads\//, "");
        const fileUrl = `${BASE_URL}/${trimmedPath}`;
    
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("target", "_blank"); // Open in new tab
        link.setAttribute("download", ""); // Indicate that the file should be downloaded
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    let toCapitalCustomerStatus;
    const customerStatus = cpData?.status;
    if(customerStatus){
        toCapitalCustomerStatus = customerStatus.toUpperCase()
    }
    return (
        <div className="card">
            <ToastContainer />
            <div className="p-0 customer-profile">
                <BillingNavbar setChangeCustomerStatus={setChangeCustomerStatus} changeCustomerStatusDialog={changeCustomerStatusDialog}/>
                <Dialog draggable={false} visible={addNewType} header="Add New Note Type" style={{ width: "50vw" }} onHide={() => setAddNewType(false)}>
                    <DialogeForAddNewType setNewNoteTypeAdded={setNewNoteTypeAdded} />
                </Dialog>

                <Dialog draggable={false} visible={isOneNote} header="View Customer Notes" style={{ width: "40vw" }} onHide={() => setIsOneNote(false)}>
                    <DialogeForOneNote enrollmentId={isEnrollmentId} noteId={isNoteId} contact={isContact} />
                </Dialog>
                <Dialog visible={displayAllNotesDialogVisibility} header={`Customer Notes (Customer ID - ${selectedId})`} style={{ width: "90vw" }} onHide={() => setDisplayAllNotesDialogVisibility((prev) => !prev)}>
                    <DisplayAllNotesDialog notes={allNotes} />
                </Dialog>
                <Dialog draggable={false} visible={changeCustomerStatusDialog} header={`Change Customer Status (Current Status: ${toCapitalCustomerStatus})`} style={{ width: "70vw" }} onHide={() => setChangeCustomerStatus((prev) => !prev)}>
                    <ChangeCustomerStatus cpData={cpData} setChangeCustomerStatus={setChangeCustomerStatus} />
                </Dialog>

                <div className="pt-3">
                    {
                        cpData?.label ? <> <div className="ml-5">
                        <Button label="Download Label" onClick={downloadLabel}/>
                    </div></>:""
                    }
               
                    <div className="grid">
                        <div className="col-12 lg:col-4 ">
                            <div className="p-3 ">
                                <div className="card h-full flex flex-column overflow-x">
                                    <div className="flex justify-content-between">
                                        
                                        <div className="text-900 font-medium text-lg p-3">Customer Information </div>
                                        <div>
{
    isShow ==true ?  <i className="pi pi-eye-slash p-3" style={{ fontSize: '2rem' }} onClick={handleView}></i>
    :   <i className="pi pi-eye p-3" style={{ fontSize: '2rem' }} onClick={handleView}></i> 
}
                                       

                                        </div>
                                    </div>


                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div>
                                        <table className="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td >First Name</td>
                                                    {isShow && isShow ? <td>{cpData?.firstName !== undefined ? cpData?.firstName.toUpperCase() : "NIL"}</td> : <div className="mt-3"><h3>****</h3></div>}

                                                </tr>
                                                <tr>
                                                    <td>Last Name</td>

                                                    {isShow && isShow ? <td>{cpData?.lastName !== undefined ? cpData?.lastName.toUpperCase() : "NIL"}</td> : <div className="mt-3"><h3>****</h3></div>}
                                                </tr>
                                                <tr>
                                                    <td>Address 1</td>

                                                    {isShow && isShow ? <td>{cpData?.address1 !== undefined ? cpData?.address1.toUpperCase() : "NIL"}</td> : <div className="mt-3"><h3>*******</h3></div>}
                                                </tr>
                                                <tr>
                                                    <td>Address 2</td>

                                                    {isShow && isShow ? <td>{cpData?.address2 !== undefined && cpData?.address2.trim() !== "" ? cpData?.address2.toUpperCase() : "NIL"}</td> : <div className="mt-3"><h3>*****</h3></div>}
                                                </tr>

                                                <tr>
                                                    <td>City</td>

                                                    {isShow && isShow ? <td>{cpData?.city !== undefined ? cpData?.city : "NIL"}</td> : <div className="mt-3"><h3>***</h3></div>}
                                                </tr>

                                                <tr>
                                                    <td>State</td>

                                                    {isShow && isShow ? <td>{cpData?.state !== undefined ? cpData?.state : "NIL"}</td> : <div className="mt-3"><h3>****</h3></div>}
                                                </tr>
                                                <tr>
                                                    <td>Zip</td>

                                                    {isShow && isShow ? <td>{cpData?.zip !== undefined ? cpData?.zip : "NIL"}</td> : <div className="mt-3"><h3>*****</h3></div>}
                                                </tr>

                                                <tr>
                                                    <td>Password</td>

                                                    {isShow && isShow ? <td>NIL</td> : <div className="mt-3"><h3>***</h3></div>}
                                                </tr>

                                                <tr>
                                                    <td>Alternate Ph</td>

                                                    {isShow && isShow ? <td>{cpData?.contact !== undefined ? cpData?.contact : "NIL"}</td> : <div className="mt-3"><h3>*****</h3></div>}
                                                </tr>
                                                <tr>
                                                    <td>Email</td>

                                                    {isShow && isShow ? <td>{cpData?.email !== undefined ? cpData?.email : "NIL"}</td> : <div className="mt-3"><h3>****</h3></div>}
                                                </tr>
                                                <tr>
                                                    <td>Mailing Address</td>
                                                    {isShow && isShow ? <td>{cpData?.malingAddress1 !== undefined || cpData?.malingAddress2 !== undefined && cpData?.malingAddress1 !== " " && cpData?.malingAddress2 !== " " ? cpData?.malingAddress12 && cpData?.malingAddress : cpData?.address1}</td> : <div className="mt-3"><h3>*****</h3></div>}


                                                </tr>
                                                <tr>
                                                    <td>Mailing City</td>
                                                    {isShow ? (
                                                        <td>{cpData?.mailingCity && cpData?.mailingCity.trim() !== "" ? cpData?.mailingCity : cpData?.city}</td>
                                                    ) : (
                                                        <td>
                                                            <div className="mt-3">
                                                                <h3>****</h3>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>

                                                <tr>
                                                    <td>Mailing State</td>
                                                    {isShow ? (
                                                        <td>{cpData?.mailingState && cpData?.mailingState.trim() !== "" ? cpData?.mailingState : cpData?.state}</td>
                                                    ) : (
                                                        <td>
                                                            <div className="mt-3">
                                                                <h3>****</h3>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Mailing Zip</td>
                                                    {isShow ? (
                                                        <td>{cpData?.mailingZip && cpData?.mailingZip.trim() !== "" ? cpData?.mailingZip : cpData?.zip}</td>
                                                    ) : (
                                                        <td>
                                                            <div className="mt-3">
                                                                <h3>*****</h3>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>

                                                {/* <tr>
                                                    <td>Tribal (Y/N)</td>
                                                    <td>
                                                        --
                                                    </td>
                                                </tr> */}
                                                <tr>
                                                    <td>Customer SSN</td>


                                                    {isShow && isShow ? <td>{cpData?.SSN !== undefined ? cpData?.SSN : "NIL"}</td> : <div className="mt-3"><h3>****</h3></div>}
                                                </tr>
                                                <tr>
                                                    <td>Mother's Maiden Name</td>


                                                    {isShow && isShow ? <td>{cpData?.maidenMotherName !== undefined ? cpData?.maidenMotherName : "NIL"}</td> : <div className="mt-3"><h3>****</h3></div>}
                                                </tr>

                                                <tr>
                                                    <td>Customer DOB</td>


                                                    {isShow && isShow ? <td>{cpData?.DOB ? new Date(cpData.DOB).toLocaleDateString() : "NIL"}</td> : <div className="mt-3"><h3>*****</h3></div>}
                                                </tr>

                                                <tr>
                                                    <td>Tribal</td>


                                                    {isShow && isShow ? <td>{cpData?.isTerribleTerritory !== undefined ? (cpData?.isTerribleTerritory === true ? "Yes" : "No") : "NIL"}</td> : <div className="mt-3"><h3>***</h3></div>}
                                                </tr>
                                                <tr>
                                                    <td>Company</td>
                                                    <td>{parseLoginRes?.companyName}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sales Channel</td>
                                                    <td>{cpData?.salesChannel !== undefined ? cpData.salesChannel : "NIL"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4">
                            <div className="p-3 h-full">
                                <div className="card flex flex-column overflow-x">
                                    <div className="text-900 font-medium text-lg p-3">Line Information</div>

                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div className={classNames({ customstyle: !expand })}>
                                        <table className="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>MDN</td>
                                                    <td>{cpData?.phoneNumber !== undefined ? cpData?.phoneNumber : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>SIM/ESN</td>
                                                    <td>{cpData?.esn !== undefined ? cpData?.esn : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>IMEI</td>
                                                    <td>{cpData?.IMEI !== undefined ? cpData?.IMEI : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>IMEI2</td>
                                                    <td>NIL</td>
                                                </tr>

                                                <tr>
                                                    <td>Inventory Type</td>
                                                    <td>{cpData?.esnId?.unitType ? cpData?.esnId?.unitType : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>MAKE</td>
                                                    <td>{cpData?.esnId?.Make ? cpData?.esnId?.Make : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>MODEL</td>
                                                    <td>{cpData?.esnId?.Model ? cpData?.esnId?.Model : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>eSIM</td>
                                                    <td>{cpData?.ESim !== undefined ? (cpData?.ESim === true ? "Yes" : "No") : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Ported MDN</td>
                                                    <td>{cpData?.portedMDN !== undefined ? (cpData?.portedMDN === false ? "No" : "Yes") : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc. Type</td>
                                                    <td>{cpData?.accountType}</td>
                                                </tr>
                                                <tr>
                                                    <td>Teleyork Plan</td>
                                                    <td>{cpData?.plan !== undefined ? (cpData?.plan?.name !== undefined ? cpData.plan?.name : "NIL") : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Details</td>
                                                    <td>{cpData?.plan !== undefined ? (cpData?.plan?.description !== undefined ? cpData?.plan?.description : "NIL") : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Price</td>
                                                    <td>{cpData?.plan !== undefined ? (cpData?.plan?.price !== undefined ? cpData?.plan?.price : "NIL") : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Carrier</td>
                                                    <td>{cpData?.carrier !== undefined ? (cpData?.carrier?.name !== undefined ? cpData?.carrier?.name : "NIL") : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Activation Date</td>
                                                    <td>{cpData?.planEffectiveDate !== undefined ? convertDateToRequiredFormat(cpData?.planEffectiveDate) : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>TMB Live Status</td>
                                                    <td>{cpData?.serviceStatus !== undefined ? cpData?.serviceStatus : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>OCS Live Status</td>
                                                    <td>{cpData?.serviceStatus !== undefined ? cpData?.serviceStatus : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Talk Balance</td>
                                                    <td>{cpData?.talkBalance !== undefined ? cpData?.talkBalance : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>SMS Balance</td>
                                                    <td>{cpData?.textBalance !== undefined ? cpData?.textBalance : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Data Balance</td>
                                                    <td>{cpData?.dataBalance !== undefined ? cpData?.dataBalance : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Usage</td>
                                                    <td>NIL</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan ID</td>
                                                    <td>{cpData?.plan?.planId !== undefined ? (cpData?.plan?.planId !== undefined ? cpData?.plan?.planId : "NIL") : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Expiration Date</td>
                                                    <td>{cpData?.planExpirationDate !== undefined ? convertDateToRequiredFormat(cpData?.planExpirationDate) : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>SOC</td>
                                                    <td>{showsocs(cpData?.socs)}</td>
                                                </tr>
                                                <tr>
                                                    <td>IMEI In Use</td>
                                                    <td>NIL</td>
                                                </tr>
                                                <tr>
                                                    <td>PUK1</td>
                                                    <td>{cpData?.PUK1 != undefined ? cpData?.PUK1 : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>PUK2</td>
                                                    <td>{cpData?.PUK2 != undefined ? cpData?.PUK2 : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>MVNO</td>
                                                    <td>NIL</td>
                                                </tr>
                                                <tr>
                                                    <td>Sim Status</td>
                                                    <td>{cpData?.simStatus !== undefined ? cpData?.simStatus : "NIL"}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <Button
                                            label={`${!expand ? "See More" : "See Less"}`}
                                            onClick={() => {
                                                setExpand((prev) => !prev);
                                            }}
                                            className={classNames({ "seemore-button": !expand }, "w-full")}
                                            icon={`${!expand ? "pi pi-plus" : "pi pi-minus"}`}
                                            iconPos="right"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4">
                            <div className="p-3 ">
                                <div className="card h-full flex flex-column overflow-x">
                                    <div className="text-900 font-medium text-lg p-3">Other Information</div>

                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div>
                                        <table class="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>Wallet Balance</td>
                                                    <td>NIL</td>
                                                </tr>
                                                <tr>
                                                    <td>Order by</td>
                                                    <td>{cpData?.createdBy !== undefined ? (cpData?.createdBy?.name !== undefined ? cpData?.createdBy?.name : "NIL") : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Account ID</td>
                                                    <td>{cpData?.accountId !== undefined ? cpData?.accountId : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Enrollment ID</td>
                                                    <td>{cpData?.enrollmentId !== undefined ? cpData?.enrollmentId : "NIL"}</td>
                                                </tr>
                                                {
                                                    cpData?.accountType == "ACP" ? <> <tr>
                                                        <td>NV Application ID</td>
                                                        <td>{cpData?.applicationId !== undefined ? cpData?.applicationId : "NIL"}</td>
                                                    </tr>
                                                        <tr>
                                                            <td>NLAD Subscriber ID</td>
                                                            <td>{cpData?.subscriberId !== undefined ? cpData?.subscriberId : "NIL"}</td>
                                                        </tr></> : ""
                                                }

                                                <tr>
                                                    <td>PWG Customer ID</td>
                                                    <td>{cpData?.customerId !== undefined ? cpData?.customerId : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Source</td>
                                                    <td>{cpData?.source !== undefined ? cpData?.source : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fulfillment Method</td>
                                                    <td>NIL</td>
                                                </tr>
                                               

                                                <tr>
                                                    <td>Enrollment Date</td>
                                                    <td>{cpData?.nladEnrollmentDate !== undefined ? cpData?.nladEnrollmentDate : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Disconnection Date</td>
                                                    <td>NIL</td>
                                                </tr>
                                                <tr>
                                                    <td>Disconnection Reason</td>
                                                    <td>NIL</td>
                                                </tr>
                                                {
                                                    cpData?.accountType == "ACP" ? (<tr>
                                                        <td>Lifeline Program Participation</td>
                                                        <td>{cpData?.acpProgram !== undefined ? (cpData?.acpProgram?.name !== undefined ? cpData?.acpProgram.name : "NIL") : "NIL"}</td>
                                                    </tr>) : ""
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 ">
                    <div className="flex flex-wrap justify-content-between  flex-row w-full ">
                        <div className="customer-profilecustomernote mt-4 card">
                            <div>
                                <div>
                                    <h4>Customer Notes</h4>
                                </div>
                                <hr className="m-0" />
                                <div className="flex justify-content-between pt-3 pb-3">
                                    {/* <Button label="View Archive Notes" size="small" /> */}
                                    <Button
                                        label="Display Notes"
                                        size="small"
                                        onClick={() => {
                                            setDisplayAllNotesDialogVisibility((prev) => !prev);
                                        }}
                                    />
                                </div>
                                <hr className="m-0" />
                                <div className="h-20rem" style={{ height: "200px", overflowY: "auto" }}>
                                    <DataTable
                                        value={allNotes}
                                        tableStyle={{ minWidth: "550px" }}
                                        className="cursor-pointer notesrow"
                                        sortField={["createdAt"]}
                                        sortOrder={-1}
                                        rowClassName={rowClassName}
                                        onRowClick={(rowData) => {
                                            if (rowData.data.void === true) {
                                            } else {
                                                setisNoteId(rowData.data._id);
                                                setisEnrollmentId(cpData?.enrollmentId);
                                                setisContact(cpData?.contact);
                                                setIsOneNote((prev) => !prev);
                                            }
                                        }}
                                    >
                                        <Column header="Created By" field="user.name"></Column>
                                        <Column header="Note" field="note"></Column>
                                        <Column header="Note Type" field="noteType"></Column>
                                        <Column header="Priority" field="priority"></Column>
                                        <Column
                                            header="Creation Date"
                                            field="createdAt"
                                            body={(rowData) => {
                                                let createdAt = new Date(rowData.createdAt);
                                                return (
                                                    <p>{`${(createdAt.getMonth() + 1).toString().padStart(2, "0")}-${createdAt.getDate().toString().padStart(2, "0")}-${createdAt.getFullYear()} ${createdAt.getHours().toString().padStart(2, "0")}:${createdAt
                                                        .getMinutes()
                                                        .toString()
                                                        .padStart(2, "0")}:${createdAt.getSeconds().toString().padStart(2, "0")}`}</p>
                                                );
                                            }}
                                        ></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </div>

                        <div className="cutomer-profileaddnote mt-4 card">
                            <div className="flex justify-content-between align-items-center  mb-3">
                                <h4 className="m-0">Add New Note</h4>
                                <span></span>
                            </div>
                            <hr className="m-0 mb-2" />
                            <Button label="Add New Note type" icon="pi pi-plus" size="small" className="mt-2 mb-3" onClick={handleDialogeForAddType} />

                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <Dropdown
                                    placeholder="Select Note Type"
                                        id="noteType"
                                        options={allNotesTypes}
                                        value={formik.values.noteType}
                                        onChange={(e) => formik.setFieldValue("noteType", e.value)}
                                        optionLabel="noteType"
                                        optionValue="noteType"
                                        filter
                                        showClear
                                        filterBy="noteType" // Set the property to be used for filtering
                                        className={classNames({ "p-invalid": isFormFieldValid("noteType") }, "input_text w-full mb-3")}
                                    />
                                    {getFormErrorMessage("noteType")}

                                    <div className="mb-4">
                                        <InputTextarea
                                            id="note"
                                            value={formik.values.note}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                setNoteLength(e.target.value.length);
                                            }}
                                            className={classNames({ "p-invalid": isFormFieldValid("note") }, "input_text w-full ")}
                                            rows={5}
                                            cols={64}
                                            onBlur={formik.handleBlur}
                                        />
                                        {getFormErrorMessage("note")}
                                        <div></div>
                                        <div className="flex justify-content-between">
                                            <span className="counter_span mt-2">{noteLength}</span>
                                            <div>
                                                <Dropdown id="priority" options={options} value={formik.values.priority} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("noteType") }, "input_text w-15rem mt-2")} />
                                                {getFormErrorMessage("priority")}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Button label="Do you want to create a ticket? " icon="pi pi-plus" className="pl-0" link /> */}
                                    <hr className="m-0 mb-2" />
                                    <div className="text-right">
                                        <Button label="Add Note" type="submit" icon={isButtonLoading ? <ProgressSpinner strokeWidth="6" style={{ width: "1.5rem", height: "1.5rem", color: "white" }} /> : null} disabled={isButtonLoading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            { 
             /*<div>
                <CustomerInvoice />
            </div>   
             */}
        </div>
    );
};
export default CustomerProfile;
const rowClassName = (rowData) => {
    if (rowData.void) {
        return "custom-row";
    } else {
        return;
    }
};
