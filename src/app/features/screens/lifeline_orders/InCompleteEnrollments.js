import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import BASE_URL from "../../../../config";
import ReactPaginate from "react-paginate";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllEnrollmentSearchbar from "./AllEnrollmentSearchbar";
import { ProgressSpinner } from "primereact/progressspinner";
const InCompleteEnrollments = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allInCompletedEnrollments, setAllInCompletedEnrollments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); 
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [expandedRows, setExpandedRows] = useState([]);

    const navigate = useNavigate()

    const rowExpansionTemplate = (data) => {
        return (
            <div>
              
      <DataTable value={[data]} stripedRows >
                    <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
                    <Column field="createdBy?.name" header="Created BY" />
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
                  
                    <Column field="Enrolltype" header="Enroll Type" />
                    <Column field="Reviewernote" header="Reviewer Note" />
                </DataTable>
            </div>
        );
    };
   
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm); // Update search term state
        // Implement your search logic here
     
            const filteredResults = allInCompletedEnrollments.filter((enrollment) => {
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
   

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const getAllInCompletedEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllInCompletedEnrollments(res?.data?.data);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(`Error fetching module data: ${error?.response?.data?.msg}`);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAllInCompletedEnrollments();
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
    const actionTemplate = (rowData) => {
        return (
            <div>
                 <Button label="Continue" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading} />
                
            </div>
        );
    };

    

    return (
        <div className="card bg-pink-50">
            <div className="card mx-5 p-0 border-noround">
                <div className="flex " style={{ padding: "25px" }}>
                <div className="flex " style={{ padding: "10px" }}>
                        <div className="mt-2"><h3> <strong>Incomplete Enrollments</strong></h3></div>
                        <div className=" mb-3" style={{ position: "absolute", right: "120px" }}>
                            <AllEnrollmentSearchbar onSearch={handleSearch} />
                        </div>
                    </div>
                </div>
                <div className="" style={{  padding: "15px" }}>
                <DataTable value={allInCompletedEnrollments} stripedRows resizableColumns  expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate} paginator rows={10} rowsPerPageOptions={[ 25, 50]}>
                            <Column expander style={{ width: "3em" }} />
                            <Column header="Enrollment ID" field="enrollmentId"></Column>
                            <Column header="Name" field={(item) => `${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}`}></Column>
                            <Column header="Address" field="address1"></Column>
                            <Column header="City" field="city"></Column>
                            <Column header="State" field="state"></Column>
                            <Column header="Zip" field="zip" />
                             <Column header="Actions" body={actionTemplate}></Column>
                        </DataTable>
                   
                    {isLoading ? <ProgressSpinner style={{ marginLeft: "550px" }} /> : null}
                </div>
            </div>
        </div>
    );
};

export default InCompleteEnrollments;
