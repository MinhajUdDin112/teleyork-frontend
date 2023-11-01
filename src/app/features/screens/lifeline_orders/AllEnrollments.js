import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import ReactPaginate from "react-paginate";
import { Column } from "primereact/column";
import BASE_URL from "../../../../config";
import AllEnrollmentSearchbar from "./AllEnrollmentSearchbar";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import DialogForReject from "./DialogForReject";
import DialogForActivateSim from "./DialogForActivateSim";

const AllEnrollments = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [isEnrolmentId, setIsEnrolmentId] = useState();
    const [CsrId, setCsrId] = useState();
    const [zipCode, setZipCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDialogeForActivate, setOpenDialogeForActivate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [link, setLink] = useState();
    const [allEnrollments, setAllEnrollments] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    const rowExpansionTemplate = (data) => {
        return (
            <div>
              
      <DataTable value={[data]} stripedRows >
                    <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
                    <Column field="plan.name" header="Plan Name" />
                    <Column field="plan.price" header="Plan Price" />
                    <Column field="Phonecost" header="Phone Cost" />
                    <Column field="Amountpaid" header="Amount Paid by Customer" />
                    <Column field="Postingdate" header="Posting Date" />
                    <Column field="EsnNumber" header="ESN Number" />
                    <Column field="Telephone" header="Telephone Number" />
                    <Column field="Activationcall" header="Activation Call" />
                    <Column field="Activationcalldatetime" header="Activation Call Date Time" />
                    <Column field="status" header="Status" />
                    <Column field="Handover" header="Handover Equipment" />
                    <Column field="Rejectedreason" header="Rejected Reason" />
                    <Column field="Enrolltype" header="Enroll Type" />
                    <Column field="Reviewernote" header="Reviewer Note" />
                </DataTable>
            </div>
        );
    };

    const navigate = useNavigate();

    // Get role name  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
     const roleName = parseLoginRes?.role?.role;
    // const roleName = "provision manager"


    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);

        const filteredResults = allEnrollments.filter((enrollment) => {
            if (enrollment.firstName !== undefined) {
                let tomatch = enrollment.firstName + " " + enrollment.lastName;

                if (enrollment.firstName.length === 0) {
                    return tomatch.toLowerCase().includes(searchTerm.toLowerCase()) || enrollment.enrollmentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
                } else if (enrollment.firstName.length > 0) {
                    return tomatch.toLowerCase().includes(searchTerm.toLowerCase()) || enrollment.enrollmentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
                }
            } else {
                return enrollment.enrollmentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
            }
        });
        setSearchResults(filteredResults);
    };
    
    const itemsPerPage = 10;
    const pageCount = Math.ceil(allEnrollments.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;

    // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const visibleItems = allEnrollments.slice(offset, offset + itemsPerPage);

    const getAllEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${parseLoginRes?._id}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllEnrollments(res?.data?.data);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(`Error fetching All Enrollment:+ ${error?.response?.data?.msg}`);
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
                toast.success("approved");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
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
            const msgerror=error?.response?.data?.msg;
            if(msgerror){
                toast.error(error?.response?.data?.msg)
            }    
           else  if(body){
                toast.error("Error is " + errorMessage);
            }
          

            setisButtonLoading(false);
        }
    };

    const runNV = async (rowData) => {
        setisButtonLoading(true);
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/verifyEligibility?enrollmentId=${rowData?._id}`);
            if (response?.status == 200 || response?.status == 201) {
                toast.warning(response?.data?.data?.status);
                setLink(response?.data?.data?._links?.certification);
                console.log("link is", link);
                setisButtonLoading(false);
            }
        } catch (error) {
            const status = error?.response?.status;
            console.log("status is ", status);
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
            console.log("error is", body);
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

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button label="View" onClick={() => viewRow(rowData)} className="p-button-text p-button-warning p-mr-2" />
                <Button label="Approve" onClick={() => approveRow(rowData)} className="p-button-text p-button-success p-mr-2" />
                <Button label="Reject" onClick={() => handleOpenDialog(rowData)} className="p-button-text p-button-danger" />
            </div>
        );
    };

    const actionTemplateForPR = (rowData) => {
        return (
            <div>
                <Button label="View" onClick={() => viewRow(rowData)} className="p-button-text p-button-warning p-mr-2" disabled={isButtonLoading} />
                <Button label="Approve" onClick={() => approveRow(rowData)} className="p-button-text p-button-success p-mr-2" disabled={isButtonLoading} />
                <Button label="Reject" onClick={() => handleOpenDialog(rowData)} className="p-button-text p-button-danger" disabled={isButtonLoading} />
                <Button label="Run NLAD" onClick={() => runNLAD(rowData)} className="p-button-text p-button-warning" disabled={isButtonLoading} />
                <Button label="Run NV" onClick={() => runNV(rowData)} className="p-button-text p-button-warning" disabled={isButtonLoading} />
                <Button label="Enroll User" onClick={() => enrollUser(rowData)} className="p-button-text p-button-warning" disabled={isButtonLoading} />
                <Button label="Activate Sim" onClick={() => handleDialogeForActivate(rowData)} className="p-button-text p-button-warning" disabled={isButtonLoading} />
                <Button label="Update User With NLAD" onClick={() => updateUser(rowData)} className="p-button-text p-button-warning" disabled={isButtonLoading} />
            </div>
        );
    };

    return (
        <>
            <ToastContainer autoClose={10000} />

            <div className="card bg-pink-50">
                <form>
                    <Dialog visible={isModalOpen} style={{ width: "50vw" }} onHide={() => setIsModalOpen(false)}>
                        <DialogForReject enrollmentId={isEnrolmentId} CSRid={CsrId} />
                    </Dialog>

                    <Dialog header={"Activate Sim"} visible={openDialogeForActivate} style={{ width: "70vw" }} onHide={() => setOpenDialogeForActivate(false)}>
                        <DialogForActivateSim enrollmentId={isEnrolmentId} zipCode={zipCode} />
                    </Dialog>
                </form>

                <div className="card mx-5 p-0 border-noround">
                    <div className="flex " style={{ padding: "25px" }}>
                        <div className=" mb-3" style={{ position: "absolute", right: "120px" }}>
                            <AllEnrollmentSearchbar onSearch={handleSearch} />
                        </div>
                    </div>
                    <div className="" style={{ marginTop: "30px", padding: "15px" }}>
                        {isButtonLoading ? <ProgressSpinner style={{ width: "50px", height: "50px", marginLeft: "40rem" }} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s" /> : null}

                        <DataTable value={searchTerm === "" ? visibleItems : searchResults} stripedRows resizableColumns  expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
                            <Column expander style={{ width: "3em" }} />
                            {/* <Column header="SNo" style={{ width: "3em" }} body={(rowData, rowIndex) => (rowIndex + 1).toString()} /> */}

                            <Column header="Enrollment ID" field="enrollmentId"></Column>
                            <Column header="Name" field={(item) => `${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}`}></Column>
                            <Column header="Address" field="address1"></Column>
                            <Column header="City" field="city"></Column>
                            <Column header="State" field="state"></Column>
                            <Column header="Zip" field="zip" />

                            {roleName == "CSR" || roleName == "csr" || roleName == "Csr" ? (
                                ""
                            ) : roleName == "PROVISION MANAGER" || roleName == "Provision Manager" || roleName == "provision manager" ? (
                                <Column header="Actions" body={actionTemplateForPR}></Column>
                            ) : (
                                <Column header="Actions" body={actionTemplate}></Column>
                            )}
                        </DataTable>
                        <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                        {isLoading ? <ProgressSpinner style={{ marginLeft: "550px" }} /> : null}
                    </div>
                </div>
                <br />
            </div>
        </>
    );
};
export default AllEnrollments;
