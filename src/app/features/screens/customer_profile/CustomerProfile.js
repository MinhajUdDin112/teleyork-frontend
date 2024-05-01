import React, { useDebugValue, useEffect, useState } from "react";
import BillingNavbar from "./modals/BillingNavbar";
import { Button } from "primereact/button";
import "./css/customer-profile.css";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
import DialogeForInfoEdit from "./dialogs/DialogeForInfoEdit";
import DisplayAllHighPriorityNotes from "./dialogs/display_priority_notes/PriorityNotes";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const CustomerProfile = ({ refreshEsn, setRefreshEsn, setRefreshBell, setActiveTab, activeTab, customerServicesIndex, refreshNotificationcomponent, handleHighlight }) => {
    const [cpData, setCpData] = useState([]);   
    const { state } = useLocation();
    const selectedId = state?.selectedId; 
    const navigate=useNavigate()  
    if(selectedId === undefined) 
    { 
       navigate("/")
    }
     const [mvno,setmvno]=useState("") 
    const [expand, setExpand] = useState(false);
    const [noteLength, setNoteLength] = useState(null);
    const [allNotesTypes, setAllNotesTypes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [addNewType, setAddNewType] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [isOneNote, setIsOneNote] = useState(false);
    const [refreshHighPriorityNotes, setRefreshHighPriorityNotes] = useState(false);
    const [isNoteId, setisNoteId] = useState();
    const [isEnrollmentId, setisEnrollmentId] = useState();
    const [isContact, setisContact] = useState();
    const [isShow, setIsShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [agents, setAgents] = useState([]);
    const [refreshNotes, setRefreshNotes] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState("");
    const location = useLocation();
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        if (customerServicesIndex !== undefined) {
            if (activeTab !== undefined) {
                setActiveTab();
                setTimeout(() => {
                    setActiveTab(customerServicesIndex);
                }, 200);
            } else {
                setActiveTab(customerServicesIndex);
            }
        } else {
            setActiveTab(customerServicesIndex);
        }
    }, [location, customerServicesIndex]);
   

    const [refreshwholecustomerdata, setRefreshWholeCustomerData] = useState(false);
    const [changeCustomerStatusDialog, setChangeCustomerStatus] = useState(false);
    const [showHighPriorityNotes, setShowHighPriorityNotes] = useState(false);
    const [highestPriorityNotes, setHighestPriorityNotes] = useState([]);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/notes/getnotebypriority?user=${parseLoginRes?._id}`)
            .then((res) => {
                setHighestPriorityNotes(res?.data);
                if (res?.data.length > 0) {
                    setShowHighPriorityNotes(true);
                } else {
                    setShowHighPriorityNotes(false);
                }
            })
            .catch((err) => {});
    }, [refreshHighPriorityNotes]);    
     
   useEffect(()=>{ 
   Axios.get(`${BASE_URL}/api/user/getServiceProvider?serviceProvider=${cpData?.serviceProvider}`).then((res)=>{ 
     
       setmvno(res?.data?.data?.name)
   }).catch(err=>{ 

   }) 
    
    },[cpData])  
    //state to refresh Note Type when new note type is added
    const [newNoteTypeAdded, setNewNoteTypeAdded] = useState(false);
    //To Display All Notes in Seperate Dialog
    const [displayAllNotesDialogVisibility, setDisplayAllNotesDialogVisibility] = useState(false);  
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    // Validation Schema
    const validationSchema = Yup.object().shape({
        noteType: Yup.string().required("Note Type is Required"),
        note: Yup.string().required("Please Write Note"),
        priority: Yup.string().required("Please Select Priority"),

        //AgentName: Yup.string().required("Agent Name is required"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            noteType: "",
            note: "",
            priority: "low",
            AgentName: "",
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
                const response = await Axios.post(`${BASE_URL}/api/web/notes/addnotifcationNote`, data);
                if (response?.status == "200" || response?.status == "201") {
                    toast.success("Successfully Added"); 
                    setRefreshHighPriorityNotes(prev=>!prev)
                    setisButtonLoading(false);
                    actions.resetForm();
                    getNotes();
                }
            } catch (error) {
                toast.error("Error is " + error?.response?.data?.msg);
                setisButtonLoading(false);
            }
            setRefreshBell((prev) => !prev);
        },
    });

    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${selectedId}`);
            if (res?.status == 200 || res?.status == 201) {
                setCpData(res?.data?.data || []);
            }
        } catch (error) {}
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
        } catch (error) {}
    };

    useEffect(() => {
        getCustomerProfileData();
        getNotes();
    }, [refreshNotificationcomponent, refreshEsn, refreshwholecustomerdata, handleHighlight]);

    useEffect(() => {
        getCustomerProfileData();
    }, [refresh]);
    useEffect(() => {
        getNotesType();
    }, [newNoteTypeAdded, refreshNotes]);

    const handleDialogeForAddType = () => {
        setAddNewType(true);
    };
    const options = [
        { label: "Priority", value: "" },
        { label: "Highest", value: "highest" },
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
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
            setIsShow(false);
        } else {
            setIsShow(true);
        }
    };
    const handleEdit = () => {
        localStorage.setItem("basicData", JSON.stringify(cpData));
        localStorage.setItem("address", JSON.stringify(cpData));
        setIsEdit(true);
    };

    let toCapitalCustomerStatus;
    const customerStatus = cpData?.status;
    if (customerStatus) {
        toCapitalCustomerStatus = customerStatus.toUpperCase();
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/user/all?company=${parseLoginRes.company}`);

                const users = response?.data?.data;
                const agentNames = users.map((user) => ({ label: user.name, value: user._id }));
                setAgents(agentNames);
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        };

        fetchUser();
    }, []);
    useEffect(() => {
        const fetchTrackingNumber = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/order/getTrackingNumber/?customerId=${selectedId}`);
                if (response?.status === 200 || response?.status === 201) {
                    setTrackingNumber(response?.data?.data);
                }
            } catch (error) {
            }
        };
        fetchTrackingNumber();
    }, [refreshEsn]);

    const activateDate = new Date(cpData?.activatedAt);
    const formattedDate = activateDate.toLocaleDateString();
    const rowClassName = (rowData) => {
        if (rowData.void) {
            return "custom-row";
        } else if (rowData._id === handleHighlight) {
            return "highlight-row";
        } else {
            return ""; // Default class when no condition matches
        }
    };

    return (
        <div className="card">
            <ToastContainer />
            <div className="p-0 customer-profile">
                <BillingNavbar setRefreshWholeCustomerData={setRefreshWholeCustomerData} refreshNotificationcomponent={refreshNotificationcomponent} setChangeCustomerStatus={setChangeCustomerStatus} changeCustomerStatusDialog={changeCustomerStatusDialog} setRefreshEsn={setRefreshEsn} />
                <Dialog draggable={false} visible={addNewType} header="Add New Note Type" style={{ width: "50vw" }} onHide={() => setAddNewType(false)}>
                    <DialogeForAddNewType setNewNoteTypeAdded={setNewNoteTypeAdded} setAddNewType={setAddNewType} setRefreshNotes={setRefreshNotes} />
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
                <Dialog draggable={false} visible={isEdit} header={"Update Personal Info"} style={{ width: "70vw" }} onHide={() => setIsEdit((prev) => !prev)}>
                    <DialogeForInfoEdit cpData={cpData} setRefresh={setRefresh} setIsEdit={setIsEdit} />
                </Dialog>
                <div className="pt-3">
                    <div className="grid">
                        <div className="col-12 lg:col-4 ">
                            <div className="p-3 ">
                                <div className="card h-full flex flex-column overflow-x">
                                    <div className="flex justify-content-between">
                                        <div className="text-900 font-medium text-lg p-3">Customer Information </div>
                                        <div className="flex">
                                            <div>
                                                <i className="pi pi-user-edit p-3" style={{ fontSize: "2rem", cursor: "pointer" }} onClick={handleEdit}></i>
                                            </div>
                                            <div>{isShow == true ? <i className="pi pi-eye-slash p-3" style={{ fontSize: "2rem", cursor: "pointer" }} onClick={handleView}></i> : <i className="pi pi-eye p-3" style={{ fontSize: "2rem", cursor: "pointer" }} onClick={handleView}></i>}</div>
                                        </div>
                                    </div>

                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div>
                                        <table className="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>First Name</td>
                                                    {isShow && isShow ? (
                                                        <td>{cpData?.firstName !== undefined ? cpData?.firstName.toUpperCase() : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>****</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Last Name</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.lastName !== undefined ? cpData?.lastName.toUpperCase() : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>****</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Address 1</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.address1 !== undefined ? cpData?.address1.toUpperCase() : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>*******</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Address 2</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.address2 !== undefined && cpData?.address2.trim() !== "" ? cpData?.address2.toUpperCase() : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>*****</h3>
                                                        </div>
                                                    )}
                                                </tr>

                                                <tr>
                                                    <td>City</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.city !== undefined ? cpData?.city : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>***</h3>
                                                        </div>
                                                    )}
                                                </tr>

                                                <tr>
                                                    <td>State</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.state !== undefined ? cpData?.state : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>****</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Zip</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.zip !== undefined ? cpData?.zip : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>*****</h3>
                                                        </div>
                                                    )}
                                                </tr>

                                                <tr>
                                                    <td>Password</td>

                                                    {isShow && isShow ? (
                                                        <td>NIL</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>***</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Contact</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.contact !== undefined ? cpData?.contact : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>*****</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Alternate Ph</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.alternateContact !== undefined ? cpData?.alternateContact : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>*****</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Email</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.email !== undefined ? cpData?.email : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>****</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Mailing Address</td>
                                                    {isShow && isShow ? (
                                                        <td>
                                                            {cpData?.PoBoxAddress && cpData?.PoBoxAddress.trim() !== "" ? (
                                                                // If PO Box Address is available and not empty, render it
                                                                <p>POBox : {cpData?.PoBoxAddress}</p>
                                                            ) : // If PO Box Address is empty, render the regular mailing address
                                                            cpData?.malingAddress1 !== undefined || (cpData?.malingAddress2 !== undefined && cpData?.malingAddress1 !== " " && cpData?.malingAddress2 !== " ") ? (
                                                                cpData?.malingAddress1 && cpData?.malingAddress2 ? (
                                                                    `${cpData?.malingAddress1}, ${cpData?.malingAddress2}`
                                                                ) : (
                                                                    cpData?.malingAddress1
                                                                )
                                                            ) : (
                                                                cpData?.address1
                                                            )}
                                                        </td>
                                                    ) : (
                                                        // <td>{cpData?.malingAddress1 !== undefined || (cpData?.malingAddress2 !== undefined && cpData?.malingAddress1 !== " " && cpData?.malingAddress2 !== " ") ? cpData?.malingAddress12 && cpData?.malingAddress : cpData?.address1}</td>
                                                        <div className="mt-3">
                                                            <h3>*****</h3>
                                                        </div>
                                                    )}
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
                                                    <td>PO Box Address</td>
                                                    {isShow ? (
                                                        <td>{cpData?.PoBoxAddress && cpData?.PoBoxAddress.trim() !== "" ? cpData?.PoBoxAddress : ""}</td>
                                                    ) : (
                                                        <td>
                                                            <div className="mt-3">
                                                                <h3>*****</h3>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr> */}

                                                {/* <tr>
                                                    <td>Tribal (Y/N)</td>
                                                    <td>
                                                        --
                                                    </td>
                                                </tr> */}
                                                <tr>
                                                    <td>Customer SSN</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.SSN !== undefined ? cpData?.SSN : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>****</h3>
                                                        </div>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Mother's Maiden Name</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.maidenMotherName !== undefined ? cpData?.maidenMotherName : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>****</h3>
                                                        </div>
                                                    )}
                                                </tr>

                                                <tr>
                                                    <td>Customer DOB</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.DOB ? new Date(cpData.DOB).toLocaleDateString() : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>*****</h3>
                                                        </div>
                                                    )}
                                                </tr>

                                                <tr>
                                                    <td>Tribal</td>

                                                    {isShow && isShow ? (
                                                        <td>{cpData?.isTerribleTerritory !== undefined ? (cpData?.isTerribleTerritory === true ? "Yes" : "No") : "NIL"}</td>
                                                    ) : (
                                                        <div className="mt-3">
                                                            <h3>***</h3>
                                                        </div>
                                                    )}
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
                                                    <td>{cpData?.esn !== undefined ? cpData?.esn : cpData?.esnId?.esn !== undefined ? cpData?.esnId?.esn : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>IMEI</td>
                                                    <td>{cpData?.IMEI !== undefined ? cpData?.IMEI : cpData?.esnId?.IMEI !== undefined ? cpData?.esnId?.IMEI : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>IMEI2</td>
                                                    <td>{cpData?.IMEI2 !== undefined ? cpData?.IMEI2 : cpData?.esnId?.IMEI2 !== undefined ? cpData?.esnId?.IMEI2 : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Inventory Type</td>
                                                    <td>{cpData?.esnId?.unitType ? cpData?.esnId?.unitType : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>MAKE</td>
                                                    <td>{cpData?.esnId?.make ? cpData?.esnId?.make : "NIL"}</td>
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
                            
                                                    <td>{cpData?.activatedAt !== undefined ? ChangeIsoDateToECT(cpData?.activatedAt) : "NIL"}</td>
                                                  {/*  <td>{cpData?.planEffectiveDate !== undefined ? convertDateToRequiredFormat(cpData?.planEffectiveDate) : "NIL"}</td>*/}
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
                                                    <td>{mvno}</td>
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
                                                    <td>Tracking Number</td>
                                                    <td>{trackingNumber ? trackingNumber : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Wallet Balance</td>
                                                    <td>NIL</td>
                                                </tr>
                                                <tr>
                                                    <td>Order by</td> 
                                                     {cpData?.AcptoPrepaid === undefined ?
                                                      <td>{cpData?.createdBy !== undefined ? (cpData?.createdBy?.name !== undefined ? cpData?.createdBy?.name : "NIL") : "NIL"}</td> 
                                                       : <td>System Imported</td> 
                                                     
                                                     }
                                                  
                                                    </tr>
                                                <tr>
                                                    <td>Account ID</td>
                                                    <td>{cpData?.accountId !== undefined ? cpData?.accountId : "NIL"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Enrollment ID</td>
                                                    <td>{cpData?.enrollmentId !== undefined ? cpData?.enrollmentId : "NIL"}</td>
                                                </tr>
                                                {cpData?.accountType == "ACP" ? (
                                                    <>
                                                        {" "}
                                                        <tr>
                                                            <td>NV Application ID</td>
                                                            <td>{cpData?.applicationId !== undefined ? cpData?.applicationId : "NIL"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>NLAD Subscriber ID</td>
                                                            <td>{cpData?.subscriberId !== undefined ? cpData?.subscriberId : "NIL"}</td>
                                                        </tr>
                                                    </>
                                                ) : (
                                                    ""
                                                )}

                                                <tr>
                                                    <td>PWG Customer ID</td>
                                                    <td>{cpData?.customerId !== undefined ? cpData?.customerId : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Role</td>
                                                    <td>{cpData?.source !== undefined ? cpData?.source : "NIL"}</td>
                                                </tr>
                                                <tr>  
                                                     { 
                                                      cpData?.AcptoPrepaid !== undefined  ?   cpData?.AcptoPrepaid ?  
                                                      <> 
                                                      <td>Converted To Prepaid On</td>  
                                             <td>{cpData?.convertToPrepaidDate ? ChangeIsoDateToECT(cpData?.convertToPrepaidDate) : "NIL"}</td> 
                                                </>
                                                        :<> 
                                                             <td>Order Create Date</td>  
                                                    <td>{cpData?.orderCreateDate ? ChangeIsoDateToECT(cpData?.orderCreateDate) : "NIL"}</td> 
                                                       </> :       
                                                       <> 
                                                    <td>Order Create Date</td>  
                                                    <td>{cpData?.labelCreatedAt ? ChangeIsoDateToECT(cpData?.labelCreatedAt) : "NIL"}</td>  
                                                     </>
                                                     }
                                                </tr>

                                                <tr>
                                                    <td>Activation Date</td>
                                                    <td>{cpData?.activatedAt !== undefined ? ChangeIsoDateToECT(cpData?.activatedAt) : "NIL"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Disconnection Date</td>
                                                    <td>NIL</td>
                                                </tr>
                                                <tr>
                                                    <td>Disconnection Reason</td>
                                                    <td>NIL</td>
                                                </tr>
                                                {cpData?.accountType == "ACP" ? (
                                                    <tr>
                                                        <td>Lifeline Program Participation</td>
                                                        <td>{cpData?.acpProgram !== undefined ? (cpData?.acpProgram?.name !== undefined ? cpData?.acpProgram.name : "NIL") : "NIL"}</td>
                                                    </tr>
                                                ) : (
                                                    ""
                                                )}
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
                                        <Column header="Created By" body={(rowData) => <div className={` ${rowData._id === handleHighlight ? "highlight-row" : ""}`}>{rowData.user.name}</div>} />
                                        <Column header="Note" body={(rowData) => <div className={` ${rowData._id === handleHighlight ? "highlight-row" : ""}`}>{rowData.note}</div>} />
                                        {/* <Column header="Note Type" field="noteType"></Column>
                                        <Column header="Priority" field="priority"></Column> */}
                                        <Column
                                            className="hover-blue"
                                            header="Creation Date"
                                            field="createdAt"
                                            body={(rowData) => {
                                                let createdAt = new Date(rowData.createdAt);
                                                return <p className={` ${rowData._id === handleHighlight ? "highlight-row" : ""}`}>{ChangeIsoDateToECT(rowData.createdAt)}</p>;
                                            }}
                                        ></Column>
                                        {/* <Column header="Assigned To" field="assignTo.name"></Column> */}
                                        <Column
                                            className="hover-blue"
                                            body={(rowData) => (
                                                <p className={`ibutton ${rowData._id === handleHighlight ? "highlight-row" : ""}`} style={{ position: "relative" }}>
                                                    i
                                                </p>
                                            )}
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
                                    <div className="mr-3 mb-3 mt-3">
                                        <p className="m-0">Assign To</p>

                                        <Dropdown
                                            value={formik.values.assignTo}
                                            optionLabel="label"
                                            optionValue="value"
                                            options={agents} // Use agents state here
                                            onChange={(e) => {
                                                formik.setFieldValue("assignTo", e.value); // Set the selected agent's ID
                                                //formik.setFieldValue("AgentName", e.label); // Set the selected agent's name
                                            }}
                                            placeholder="Select an option"
                                            className="field-width mt-2"
                                        />
                                        {/* {formik.errors.AgentName && formik.touched.AgentName && (
                                            <div className="mt-2" style={{ color: "red" }}>
                                                {formik.errors.AgentName}
                                            </div>
                                        )} */}
                                    </div>
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
            {/*<div>
                <CustomerInvoice />
            </div>   
             */}
            <Dialog style={{ width: "60vw" }} visible={showHighPriorityNotes} onHide={() => {     
                 
                 setShowHighPriorityNotes(prev=>!prev)
            }}>
                <DisplayAllHighPriorityNotes setRefreshHighPriorityNotes={setRefreshHighPriorityNotes} BASE_URL={BASE_URL} notes={highestPriorityNotes} />
            </Dialog>
        </div>
    );
};
export default CustomerProfile;

function ChangeIsoDateToECT(date) {
    // Given ISO formatted date/time
    const isoDate = date;

    // Convert ISO string to Date object
    const utcDate = new Date(isoDate);

    // Format the date according to Eastern Time Zone (EST/EDT)
    const estTimeString = utcDate.toLocaleString("en-US", {
        timeZone: "America/New_York",
    });
    return estTimeString;
}
