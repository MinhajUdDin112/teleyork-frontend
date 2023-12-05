import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BASE_URL=process.env.REACT_APP_BASE_URL
const CompletedEnrollments = () => {
  
   
   
    const [allCompletedEnrollments, setAllCompletedEnrollments] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value);
    };
 
    const navigate = useNavigate();

    const handleEnrollmentIdClick = (rowData) => {
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));      
    };
    
    // const rowExpansionTemplate = (data) => {
    //     return (
    //         <div>
              
    //   <DataTable value={[data]} stripedRows >
                   
    //                 <Column field="plan.name" header="Plan Name" />
    //                 <Column field="plan.price" header="Plan Price" />
    //                 <Column field="Phonecost" header="Phone Cost" />
    //                 <Column field="Amountpaid" header="Amount Paid by Customer" />
    //                 <Column field="Postingdate" header="Posting Date" />
    //                 <Column field="EsnNumber" header="ESN Number" />
                   
    //                 <Column field="Activationcall" header="Activation Call" />
    //                 <Column field="Activationcalldatetime" header="Activation Call Date Time" />
                   
    //                 <Column field="Handover" header="Handover Equipment" />
                   
    //                 <Column field="Enrolltype" header="Enroll Type" />
    //                 <Column field="Reviewernote" header="Reviewer Note" />
    //             </DataTable>
    //         </div>
    //     );
    // };
    
    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const getAllCompletedEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllCompletedEnrollments(res?.data?.data);    
                console.log("All enrollment data is",res.data.data)
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(`Error fetching competed enrollment is : + ${error?.response?.data?.msg}`);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllCompletedEnrollments();
    }, []);

    return (
       
        <div className="card bg-pink-50">
             <ToastContainer/>
            <div className="card mx-5 p-0 border-noround">
              
                <div className="flex flex-row justify-content-between" style={{ padding: "10px" }}>
                        <div className="mt-2"><h3> <strong>Complete Enrollments</strong></h3></div>
                        <div className="p-input-icon-left mb-3 ">
                                <i className="pi pi-search" />
                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search Here " />
                                </div>
                    </div>
                
                <div className="" style={{  padding: "15px" }}>
                <DataTable value={ allCompletedEnrollments} globalFilter={globalFilterValue} stripedRows resizableColumns    paginator rows={10} rowsPerPageOptions={[ 25, 50]}>
                            {/* <Column expander style={{ width: "3em" }} /> */}
                        {/* <Column header="#" field="SNo"></Column> */}
                        <Column header="Enrollment ID" field="enrollmentId"  body={(rowData) => (
                    <button style={{border:'none', backgroundColor:'white', cursor:'pointer'}} onClick={() => handleEnrollmentIdClick(rowData)}>
                        {rowData.enrollmentId}
                    </button>
                )}></Column>
                        <Column header="Name" field={(item) => `${item?.firstName ? (item?.firstName).toUpperCase() : ""} ${item?.lastName ? (item?.lastName).toUpperCase() : ""}`}></Column>
                        <Column header="Address" field="address1"></Column>
                        <Column header="City" field="city"></Column>
                        <Column header="State" field="state"></Column>
                        <Column header="Zip" field="zip"></Column>
                        <Column field="contact" header="Telephone Number" />
                        <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
                        <Column field="createdBy.name" header="Created BY"/>
                        <Column field="status" header="Status" />
                    </DataTable>
                    {isLoading ? <ProgressSpinner style={{ marginLeft: "550px" }} /> : null}
                </div>
            </div>
            <br />
        </div> 
    );
};

export default CompletedEnrollments;
