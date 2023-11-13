import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import ReactPaginate from "react-paginate";
import { Column } from "primereact/column";
import BASE_URL from "../../../../config";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import DialogForReject from "./DialogForReject";
import DialogForActivateSim from "./DialogForActivateSim";
import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";
import DialogeForRemarks from "./DialogeForRemarks";
import { Calendar } from "primereact/calendar";

const AllEnrollments = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [isEnrolmentId, setIsEnrolmentId] = useState();
    const [CsrId, setCsrId] = useState();
    const [zipCode, setZipCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDialogeForActivate, setOpenDialogeForActivate] = useState(false);
    const [OpenDialogeForRemarks, setOpenDialogeForRemarks] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [link, setLink] = useState();
    const [allEnrollments, setAllEnrollments] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [dates, setDates] = useState(null);
    const [filteredDates, setFilteredDates] = useState(null);

    // const rowExpansionTemplate = (data) => {
    //     return (
    //         <div>
    //             <DataTable value={[data]} stripedRows>
    //                 <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
    //                 <Column field="createdBy?.name" header="Created BY" />
    //                 <Column field="plan.name" header="Plan Name" />
    //                 <Column field="plan.price" header="Plan Price" />
    //                 <Column field="Phonecost" header="Phone Cost" />
    //                 <Column field="Amountpaid" header="Amount Paid by Customer" />
    //                 <Column field="Postingdate" header="Posting Date" />
    //                 <Column field="EsnNumber" header="ESN Number" />
    //                 <Column field="contact" header="Telephone Number" />
    //                 <Column field="Activationcall" header="Activation Call" />
    //                 <Column field="Activationcalldatetime" header="Activation Call Date Time" />
    //                 <Column field="status" header="Status" />
    //                 <Column field="Handover" header="Handover Equipment" />
    //                 <Column field="Enrolltype" header="Enroll Type" />
    //                 <Column field="Reviewernote" header="Reviewer Note" />
    //             </DataTable>
    //         </div>
    //     );
    // };

    const navigate = useNavigate();

    // Get role name  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const roleName = parseLoginRes?.role?.role;

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };
    const onDateFilterChange = (e) => {
        setDates(e.value);
        filterByDate(e.value);
    };

    const filterByDate = (selectedDates) => {
        const filteredData = allEnrollments.filter((rowData) => {
            const enrollmentDate = rowData.DOB ? new Date(rowData.DOB.split("T")[0]) : null;
    
            if (selectedDates && selectedDates.length === 2 && enrollmentDate) {
                const startDate = new Date(selectedDates[0]);
                const endDate = new Date(selectedDates[1]);
                return enrollmentDate >= startDate && enrollmentDate <= endDate;
            }
    
            return true;
        });
    
        setFilteredDates(filteredData);
    };

    const getAllEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${parseLoginRes?._id}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllEnrollments(res?.data?.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error is", error?.response?.data?.msg);
            toast.error(`Error fetching All Enrollment: ${error?.response?.data?.msg}`);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllEnrollments();
    }, []);

    const viewRow = async (rowData) => {
        setisButtonLoading(true);
        const _id = rowData._id;
        setSelectedEnrollmentId(_id);
        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${_id}`);
            if (response?.status === 201 || response?.status === 200) {
                localStorage.setItem("basicData", JSON.stringify(response.data));
                localStorage.setItem("address", JSON.stringify(response.data));
                localStorage.setItem("programmeId", JSON.stringify(response.data));
                navigate("/enrollment");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
        setisButtonLoading(false);
    };

    const approveRow = async (rowData) => {
        setisButtonLoading(true);
        const approvedBy = parseLoginRes?._id;
        const enrolmentId = rowData?._id;
        const approved = true;
        const dataToSend = { approvedBy, enrolmentId, approved };
        try {
            const response = await Axios.patch(`${BASE_URL}/api/user/approval`, dataToSend);
            if (response?.status === 201 || response?.status === 200) {
                toast.success("Approved");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
        getAllEnrollments();
    };

    const runNLAD = async (rowData) => {
        setisButtonLoading(true);
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/verifyEnroll?enrollmentId=${rowData?._id}`);
            if (response?.status === "200" || response?.status === "200") {
                toast.success("Successfully Verify");
                setisButtonLoading(false);
            }
        } catch (error) {
            const body = error?.response?.data?.data?.body;
            const errorMessage = Array.isArray(body) ? body.toString() : body && typeof body === "object" ? JSON.stringify(body) : body;
            const msgerror = error?.response?.data?.msg;
            if (body) {
                toast.error(errorMessage);
            } else if (msgerror) {
                toast.error(error?.response?.data?.msg);
            }
            setisButtonLoading(false);
        }
    };

    const runNV = async (rowData) => {
        setisButtonLoading(true);
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/verifyEligibility?enrollmentId=${rowData?._id}`);
            if (response?.status == 200 || response?.status == 201) {
                console.log("link is", response?.data?.data);
                setLink(response?.data?.data?._links?.resolution?.href);
                toast.warning(response?.data?.data?.status);
                setisButtonLoading(false);
            }
        } catch (error) {
            const status = error?.response?.status;

            if (status === 500) {
                toast.error(error?.response?.data?.data?.message);
            } else {
                const body = error?.response?.data?.data?.body;
                const errorMessage = Array.isArray(body) ? body.toString() : body && typeof body === "object" ? JSON.stringify(body) : body;
                toast.error("Error is " + errorMessage);
            }

            setisButtonLoading(false);
        }
    };
    const enrollUser = async (rowData) => {
        setisButtonLoading(true);
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/enrollVerifiedUser?enrollmentId=${rowData?._id}`);
            if (response?.status == "200" || response?.status == "201") {
                toast.success("Successfully Verify");
                setisButtonLoading(false);
            }
        } catch (error) {
            const body = error?.response?.data?.data?.body;

            const errorMessage = Array.isArray(body) ? body.toString() : body && typeof body === "object" ? JSON.stringify(body) : body;
            toast.error("Error is " + errorMessage);
            setisButtonLoading(false);
        }
    };
    const updateUser = async (rowData) => {
        setisButtonLoading(true);
        try {
            const response = await Axios.put(`${BASE_URL}/api/user/updateVerifiedUser?enrollmentId=${rowData?._id}`);
            if (response?.status == "200" || response?.status == "201") {
                toast.success("Successfully Verify");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data);
            setisButtonLoading(false);
        }
    };

    const HnadleAllApprove = async () => {
        setisButtonLoading(true);
        const enrollmentIds = allEnrollments.map((enrollment) => enrollment._id);

        const dataToSend = {
            approvedBy: parseLoginRes?._id,
            enrolmentIds: enrollmentIds,
            approved: true,
        };
        try {
            const response = await Axios.patch(`${BASE_URL}/api/user/batchApproval`, dataToSend);
            if (response?.status == "200" || response?.status == "201") {
                toast.success("Approved");
                setisButtonLoading(false);
                getAllEnrollments();
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button label="Edit" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading} />
                <Button label="Approve" onClick={() => approveRow(rowData)} className=" p-button-success mr-2 ml-2  " text raised disabled={isButtonLoading} />
                <Button label="Reject" onClick={() => handleOpenDialog(rowData)} className=" p-button-danger mr-2 ml-2" text raised disabled={isButtonLoading} />
            </div>
        );
    };
    const actionTemplateForTL = (rowData) => {
        return (
            <div>
                <Button label="Add Remarks" onClick={() => handleOpenDialogForRemarks(rowData)} className=" p-button-sucess mr-2 ml-2" text raised disabled={isButtonLoading} />
                <Button label="Edit" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading} />
                <Button label="Approve" onClick={() => approveRow(rowData)} className=" p-button-success mr-2 ml-2  " text raised disabled={isButtonLoading} />
                <Button label="Reject" onClick={() => handleOpenDialog(rowData)} className=" p-button-danger mr-2 ml-2" text raised disabled={isButtonLoading} />
            </div>
        );
    };

    const actionTemplateForPR = (rowData) => {
        return (
            <div>
                <Button label="Edit" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading} />
                <Button label="Reject" onClick={() => handleOpenDialog(rowData)} className=" p-button-danger mr-2 ml-2" text raised disabled={isButtonLoading} />
                <Button label="Run NLAD" onClick={() => runNLAD(rowData)} className=" mr-2 ml-2" text raised disabled={isButtonLoading} />
                <Button label="Run NV" onClick={() => runNV(rowData)} className=" mr-2 ml-2" text raised disabled={isButtonLoading} />
                {link ? (
                    <Button
                        label="Go To Link"
                        onClick={() => {
                            window.open(link, "_blank");
                        }}
                        className=" mr-2 ml-2"
                        text
                        raised
                        disabled={isButtonLoading}
                    />
                ) : (
                    ""
                )}
                <Button label="Enroll User" onClick={() => enrollUser(rowData)} className=" mr-2 ml-2" text raised disabled={isButtonLoading} />
                <Button label="Activate Sim" onClick={() => handleDialogeForActivate(rowData)} className=" mr-2 ml-2" text raised disabled={isButtonLoading} />
                <Button label="Update User With NLAD" onClick={() => updateUser(rowData)} className=" mr-2 ml-2" text raised disabled={isButtonLoading} />
            </div>
        );
    };
    const handleOpenDialog = (rowData) => {
        setisButtonLoading(true);
        setIsModalOpen(true);
        setIsEnrolmentId(rowData?._id);
        setCsrId(rowData?.csr);
        setisButtonLoading(false);
    };

    const handleDialogeForActivate = (rowData) => {
        setOpenDialogeForActivate(true);
        setIsEnrolmentId(rowData?._id);
        setZipCode(rowData?.zip);
    };
    const handleOpenDialogForRemarks = (rowData) => {
        setOpenDialogeForRemarks(true);
    };

    return (
        <>
            <ToastContainer />

            <div className="card bg-pink-50">
                <form>
                    <Dialog visible={isModalOpen} style={{ width: "50vw" }} onHide={() => setIsModalOpen(false)}>
                        <DialogForReject enrollmentId={isEnrolmentId} CSRid={CsrId} getAllEnrollments={getAllEnrollments} />
                    </Dialog>

                    <Dialog header={"Activate Sim"} visible={openDialogeForActivate} style={{ width: "70vw" }} onHide={() => setOpenDialogeForActivate(false)}>
                        <DialogForActivateSim enrollmentId={isEnrolmentId} zipCode={zipCode} />
                    </Dialog>
                    <Dialog header={"Add Remarks"} visible={OpenDialogeForRemarks} style={{ width: "40vw" }} onHide={() => setOpenDialogeForRemarks(false)}>
                        <DialogeForRemarks />
                    </Dialog>
                </form>

                <div className="card mx-5 p-0 border-noround">
                    <div className="flex " style={{ padding: "10px" }}>
                        <div className="mt-2 ml-2">
                            <h3> <strong>All Enrollments</strong>   </h3>   
                        </div>

                        <div className=" ml-auto flex">
                            <div className="mr-5">
                                {/* <Calendar
                    placeholder="Search By Date"
                    value={dates}
                    onChange={onDateFilterChange}
                    selectionMode="range"
                    showIcon
                    readOnlyInput
                    style={{ width: "23rem" }}
                /> */}
                            </div>
                            <div className="  flex flex-column">
                                <div className="p-input-icon-left mb-3">
                                <i className="pi pi-search" />
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search Here " />
                                </div>
                               {roleName == "CSR" || roleName == "csr" || roleName == "Csr" ? (
                                ""
                            ) :<Button label="Approve All Enrollments" icon={PrimeIcons.CHECK} onClick={() => HnadleAllApprove()} className=" p-button-success mr-2 ml-2  " text raised disabled={isButtonLoading} />}
                                
                            </div>

                          
                        </div>
                    </div>
                    <div>
                        {isButtonLoading ? <ProgressSpinner style={{ width: "50px", height: "50px", marginLeft: "40rem" }} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s" /> : null}

                        <DataTable value={filteredDates || allEnrollments} stripedRows resizableColumns expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} paginator rows={10} rowsPerPageOptions={[25, 50]} globalFilter={globalFilterValue}>
                            {/* <Column expander style={{ width: "3em" }} /> */}
                            {/* <Column header="SNo" style={{ width: "3em" }} body={(rowData, rowIndex) => (rowIndex + 1).toString()} /> */}

                            <Column header="Enrollment ID" field="enrollmentId"></Column>
                            <Column header="Name" field={(item) => `${item?.firstName ? (item?.firstName).toUpperCase() : ""} ${item?.lastName ? (item?.lastName).toUpperCase() : ""}`}></Column>
                            <Column header="Address" field="address1"></Column>
                            <Column header="City" field="city"></Column>
                            <Column header="State" field="state"></Column>
                            <Column header="Zip" field="zip" />
                            <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
                            <Column field="contact" header="Contact" />
                            <Column field="createdBy?.name" header="Created BY" />
                            <Column field="status" header="Status" />

                            {roleName == "CSR" || roleName == "csr" || roleName == "Csr" ? (
                                ""
                            ) : roleName.includes("provision") || roleName.includes("Provision") || roleName.includes("PROVISION") ? (
                                <Column header="Actions" body={actionTemplateForPR}></Column>
                            ) : roleName.includes("QA") || roleName.includes("qa") || roleName.includes("Qa") ? (
                                <Column header="Actions" body={actionTemplateForTL}></Column>
                            ) : (
                                <Column header="Actions" body={actionTemplate}></Column>
                            )}
                        </DataTable>

                        {isLoading ? <ProgressSpinner style={{ marginLeft: "550px" }} /> : null}
                    </div>
                </div>
                <br />
            </div>
        </>
    );
};
export default AllEnrollments;
