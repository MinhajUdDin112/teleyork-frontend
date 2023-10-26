import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import ReactPaginate from "react-paginate";
import { Column } from "primereact/column";
import BASE_URL from "../../../../config";
import AllEnrollmentSearchbar from "./AllEnrollmentSearchbar";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

import { useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import DialogForReject from "./DialogForReject";

const AllEnrollments = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [isEnrolmentId, setIsEnrolmentId] = useState()
    const [CsrId, setCsrId] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    


    const handleOpenDialog = (rowData) => {
        setIsModalOpen(true);
        setIsEnrolmentId (rowData?._id)
        setCsrId(rowData?.csr)
    
    };

    const navigate= useNavigate()

     // Get user data from ls
     const loginRes = localStorage.getItem("userData");
     const parseLoginRes = JSON.parse(loginRes);
     //const roleName= parseLoginRes?.role?.role;
    const roleName= "tl";
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm); // Update search term state
        // Implement your search logic here
        const filteredResults = allEnrollments.filter((enrollment) => {
            if (enrollment.firstName !== undefined) {
                let tomatch = enrollment.firstName + " " + enrollment.lastName;
                console.log(tomatch)
                if (enrollment.firstName.length === 0) {
                    return tomatch.toLowerCase().includes(searchTerm.toLowerCase()) || enrollment.enrollmentId.toString().includes(searchTerm);
                } else if (enrollment.firstName.length > 0) {
                    return tomatch.toLowerCase().includes(searchTerm.toLowerCase()) || enrollment.enrollmentId.toString().includes(searchTerm);
                }
            } else {
                return enrollment.enrollmentId.toString().includes(searchTerm);
            }
        });
        setSearchResults(filteredResults);
    };
    const [allEnrollments, setAllEnrollments] = useState([]);
    const itemsPerPage = 10;
    const pageCount = Math.ceil(allEnrollments.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const visibleItems = allEnrollments.slice(offset, offset + itemsPerPage);
    
    
  console.log("visible item is",visibleItems)
    const getAllEnrollments = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${parseLoginRes?._id}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllEnrollments(res?.data?.data);
                localStorage.removeItem("basicData");
                localStorage.removeItem("address");
                localStorage.removeItem("zipData")
            }
        } catch (error) {
            console.error("Error fetching module data:", error?.response);
        }
    }; 

    useEffect(() => {
        getAllEnrollments();
    }, []);

    const viewRow = async (rowData) => {
        const _id = rowData._id;
        setSelectedEnrollmentId(_id);
        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${_id}`);
            if (response?.status === 201 || response?.status === 200) {
                localStorage.setItem("basicData", JSON.stringify(response.data));
                localStorage.setItem("address", JSON.stringify(response.data));
                localStorage.setItem("programmeId",JSON.stringify(response?.data))
                localStorage.setItem("planResponse", JSON.stringify(response.data));
                navigate("/enrollment");
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
      
    };

    const approveRow = async (rowData) => {
        const approvedBy = parseLoginRes?._id;
        const enrolmentId = rowData?._id;
        const approved = true;

        const dataToSend = { approvedBy, enrolmentId, approved };
        try {
            const response = await Axios.patch(`${BASE_URL}/api/user/approval`, dataToSend);
            if (response?.status === 201 || response?.status === 200) {
                toast.success("approved");
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
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
   
    

    return (
        <div className="card bg-pink-50">
            <ToastContainer />
            <form >
                <Dialog visible={isModalOpen} style={{ width: '50vw' }} onHide={() => setIsModalOpen(false)}>
                         <DialogForReject enrollmentId={isEnrolmentId} CSRid={CsrId}/>
                         
                </Dialog>

                
            </form>

            <div className="card mx-5 p-0 border-noround">
                <div className="flex " style={{ padding: "25px" }}>
                    <div className=" mb-3" style={{ position: "absolute", right: "120px" }}>
                        <AllEnrollmentSearchbar onSearch={handleSearch} />
                    </div>
                </div>
                <div className="" style={{ marginTop: "30px", padding: "15px" }}>
                    <DataTable value={searchTerm === "" ? visibleItems : searchResults} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="SNo"></Column>
                        <Column header="Option" field="Option"></Column>
                        <Column header="Enrollment ID" field="enrollmentId"></Column>
                        <Column header="Name" field={(item) => `${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}`}></Column>
                        <Column header="Address" field="address1"></Column>
                        <Column header="City" field="city"></Column>
                        <Column header="State" field="state"></Column>
                        <Column header="Zip" field="zip"></Column>
                        <Column header="DOB" field={(item) => (item?.DOB ? item?.DOB.split("T")[0] : "")}></Column>
                        <Column header="Plan Name" field="plan?.name"></Column>
                        <Column header="Plan Price" field="plan?.price"></Column>
                        <Column header="Phone Cost" field="Phonecost"></Column>
                        <Column header="Amount Paid by Customer" field="Amountpaid"></Column>
                        <Column header="Posting Date" field="Postingdate"></Column>
                        <Column header="ESN Number" field="EsnNumber"></Column>
                        <Column header="Telephone Number" field="Telephone"></Column>
                        <Column header="Activation Call" field="Activationcall"></Column>
                        <Column header="Activation Call Date Time" field="Activationcalldatetime"></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Handover Equipment" field="Handover"></Column>
                        <Column header="Rejected Reason" field="Rejectedreason"></Column>
                        <Column header="Enroll Type" field="Enrolltype"></Column>
                        <Column header="Reviewer Note" field="Reviewernote"></Column>
                        {roleName === "CSR" || roleName === "csr" ? "" : <Column header="Actions" body={actionTemplate}></Column>}
                    </DataTable>
                    <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                </div>
            </div>
            <br />
        </div>
    );
};
export default AllEnrollments;
