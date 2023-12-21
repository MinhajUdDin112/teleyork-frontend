import React, { useEffect, useState } from "react";
import BillingNavbar from "./modals/BillingNavbar";
import { Button } from "primereact/button";
import "./css/customer-profile.css"
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
const BASE_URL = process.env.REACT_APP_BASE_URL;
const CustomerProfile = () => {
    const [cpData, setCpData] = useState([]);
    const [noteLength, setNoteLength] = useState(null);
    const [allNotesTypes, setAllNotesTypes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [addNewType, setAddNewType] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [isOneNote, setIsOneNote] = useState(false);
    const [isNoteId, setisNoteId] = useState();
    const [isEnrollmentId, setisEnrollmentId] = useState();
    const [isContact, setisContact] = useState();
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
            priority: "",
        },
        onSubmit: async (values, actions) => {
            // Prepare the data to send to the server
            const data = {
                serviceProvider: parseLoginRes?.compony,
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
                
            }
        } catch (error) {}
    };

    const getNotesType = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/noteType/all?serviceProvider=${parseLoginRes?.compony}`);
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
        { label: "Priority ", value: "" },
        { label: "Highest", value: "highest" },
        { label: "High ", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low ", value: "low" },
        { label: "Lowest ", value: "lowest" },
    ];

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div className="card">
            <ToastContainer />
            <div className="card p-0">
                <BillingNavbar />
                <Dialog draggable={false} visible={addNewType} header="Add New Note Type" style={{ width: "50vw" }} onHide={() => setAddNewType(false)}>
                    <DialogeForAddNewType setNewNoteTypeAdded={setNewNoteTypeAdded} />
                </Dialog>

                <Dialog draggable={false} visible={isOneNote} header="View Customer Notes" style={{ width: "40vw" }} onHide={() => setIsOneNote(false)}>
                    <DialogeForOneNote enrollmentId={isEnrollmentId} noteId={isNoteId} contact={isContact} />
                </Dialog>
                <Dialog visible={displayAllNotesDialogVisibility} header={`Customer Notes (Customer ID - ${selectedId})`} style={{ width: "90vw" }} onHide={() => setDisplayAllNotesDialogVisibility((prev) => !prev)}>
                    <DisplayAllNotesDialog notes={allNotes} />
                </Dialog>
                <div className="pt-3">
                    <div className="grid">
                        <div className="col-12 lg:col-4 ">
                            <div className="p-3 ">
                                <div className="card h-full flex flex-column overflow-x">
                                    <div className="text-900 font-medium text-lg p-3">Customer Information</div>

                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div>
                                        <table className="cp_table w-full text-left">
                                            <tbody>
                                                
                                               
                                                <tr>
                                                    <td>Service Address</td>
                                                    <td>{cpData?.address1 + " " + cpData?.address2}</td>
                                                </tr>

                                                <tr>
                                                    <td>City</td>
                                                    <td>{cpData?.city}</td>
                                                </tr>

                                                <tr>
                                                    <td>State</td>
                                                    <td>{cpData?.state}</td>
                                                </tr>
                                                <tr>
                                                    <td>Zip</td>
                                                    <td>{cpData?.zip}</td>
                                                </tr>

                                                <tr>
                                                    <td>Password</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>Alternate Ph</td>
                                                    <td>{cpData?.contact}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{cpData?.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mailing Address</td>
                                                    {cpData?.mailingAddress1 || cpData?.mailingAddress2 ? <td>{cpData?.mailingAddress1 + " " + cpData?.mailingAddress2}</td> : <td>{cpData?.address1 + " " + cpData?.address2}</td>}
                                                </tr>
                                                <tr>
                                                    <td>Mailing City</td>
                                                    {cpData?.mailingCity ? <td>{cpData?.mailingCity}</td> : <td>{cpData?.city}</td>}
                                                </tr>
                                                <tr>
                                                    <td>Mailing State</td>
                                                    {cpData?.mailingState ? <td>{cpData?.mailingState}</td> : <td>{cpData?.state}</td>}
                                                </tr>
                                                <tr>
                                                    <td>Mailing Zip</td>
                                                    {cpData?.mailingZip ? <td>{cpData?.mailingZip}</td> : <td>{cpData?.zip}</td>}
                                                </tr>

                                                {/* <tr>
                                                    <td>Tribal (Y/N)</td>
                                                    <td>
                                                        --
                                                    </td>
                                                </tr> */}
                                                <tr>
                                                    <td>Customer SSN (PC253)</td>
                                                    <td>{cpData?.SSN}</td>
                                                </tr>

                                                <tr>
                                                    <td>Customer DOB (PC253)</td>
                                                    <td>{cpData?.DOB ? new Date(cpData.DOB).toLocaleDateString() : ""}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Tribal (Y/N)</td>
                                                    <td>{cpData?.isTerribleTerritory ? "Y":"N"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Company</td>
                                                    <td>
                                                        {" "}
                                                        <td>{parseLoginRes?.companyName}</td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Sales Channel</td>
                                                    <td>--</td>
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
                                    <div>
                                        <table className="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>MDN</td>
                                                    <td>{cpData?.phoneNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>SIM/ESN</td>
                                                    <td>{cpData?.esn}</td>
                                                </tr>
                                                <tr>
                                                    <td>IMEI</td>
                                                    <td>{cpData?.IMEI}</td>
                                                </tr>

                                                <tr>
                                                    <td>IMEI2</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>Device ID</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Inventory Type</td>
                                                    <td>--</td>
                                                </tr>

                                                <tr>
                                                    <td>eSIM</td>
                                                    <td>{cpData?.ESim === true ? "Yes" : "No"}</td>
                                                </tr>

                                                <tr>
                                                    <td>Ported MDN</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc. Type</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Teleyork Plan</td>
                                                    <td>{cpData?.plan?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Details</td>
                                                    <td>{cpData?.plan?.description}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Price</td>
                                                    <td>{cpData?.plan?.price}</td>
                                                </tr>
                                                <tr>
                                                    <td>Carrier</td>
                                                    <td>{cpData?.carrier?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Plan Activation Date</td>
                                                    <td>{cpData?.carrier?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>TMB Live Status</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>OCS Live Status</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>Talk Balance</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>SMS Balance</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>Data Balance</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>Last Usage</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>Plan ID</td>
                                                    <td>{cpData?.plan?.planId}</td>
                                                </tr> 
                                                <tr>
                                                    <td>Plan Expiration Date</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>SOC</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>IMEI In Use</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>ICCID</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>MVNO</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>PUK Code</td>
                                                    <td>--</td>
                                                </tr> 
                                                <tr>
                                                    <td>Sim Status</td>
                                                    <td>--</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 lg:col-4">
                            <div className="p-3 custom-height-400">
                                <div className="card flex flex-column overflow-x">
                                    <div className="text-900 font-medium text-lg p-3">Other Information</div>

                                    <hr className="m-0" />

                                    {/* Table */}
                                    <div>
                                        <table class="cp_table w-full text-left">
                                            <tbody>
                                                <tr>
                                                    <td>Wallet Balance</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Order by</td>
                                                    <td>{cpData?.createdBy?.name}</td>
                                                </tr>
                                              
                                                <tr>
                                                    <td>Enrollment ID</td>
                                                    <td>{cpData?.enrollmentId}</td>
                                                </tr>
                                                <tr>
                                                    <td>NV Application ID</td>
                                                    <td>{cpData?.applicationId}</td>
                                                </tr>
                                                <tr>
                                                    <td>NLAD Subscriber ID</td>
                                                    <td>{cpData?.subscriberId}</td>
                                                </tr>   
                                                 <tr>  
                                                 <td>PWG Customer ID</td>
                                                    <td>--</td>
                                                     </tr> 
                                               
                                                <tr>
                                                    <td>Source</td>
                                                    <td>
                                                      --
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Fulfillment Metdod</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Tablet Subsidy Qualification</td>
                                                    {cpData?.deviceEligibilty == true ? <td>Yes</td> : <td>No</td>}

                                                    <td>{cpData?.deviceEligibilty}</td>
                                                </tr>
                                             
                                                <tr>
                                                    <td>Enrollment Date</td>
                                                    <td>--</td>
                                                </tr>
                                               
                                                <tr>
                                                    <td>Disconnection Date</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Disconnection Reason</td>
                                                    <td>--</td>
                                                </tr>
                                                <tr>
                                                    <td>Lifeline Program Participation</td>
                                                    <td>{cpData?.acpProgram?.name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 card">
                    <div className="flex flex-wrap justify-content-between  flex-row w-full ">
                        <div className="customer-profilecustomernote mt-4 card"   >
                            <div>
                                <div>
                                    <h4>Customer Notes</h4>
                                </div>
                                <hr className="m-0" />
                                <div className="flex justify-content-between pt-3 pb-3">
                                    <Button label="View Archive Notes" size="small" />
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
                                        tableStyle={{minWidth:"550px"}}
                                        className="cursor-pointer"
                                        sortField={["createdAt"]}
                                        sortOrder={-1}
                                        onRowClick={(rowData) => {
                                            setisNoteId(rowData.data._id);
                                            setisEnrollmentId(cpData?.enrollmentId);
                                            setisContact(cpData?.contact);
                                            setIsOneNote((prev) => !prev);
                                        }}
                                    >
                                        <Column header="Created By" field="user.name"></Column>
                                        <Column header="Note" field="note"></Column>
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

                        <div className="cutomer-profileaddnote mt-4 card"  >
                            <div className="flex justify-content-between align-items-center  mb-3">
                                <h4 className="m-0">Add New Note (PC83)</h4>
                                <span></span>
                            </div>
                            <hr className="m-0 mb-2" />
                            <Button label="Add New Note type" icon="pi pi-plus" size="small" className="mt-2 mb-3" onClick={handleDialogeForAddType} />

                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <Dropdown
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

                                    <Button label="Do you want to create a ticket? (PC402)" icon="pi pi-plus" className="pl-0" link />

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
        </div>
    );
};

export default CustomerProfile;
