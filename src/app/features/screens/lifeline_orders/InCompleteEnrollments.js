import React, { useEffect, useState } from "react";  
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterMatchMode } from "primereact/api";
import AllEnrollmentSearchbar from "./AllEnrollmentSearchbar";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const InCompleteEnrollments = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },  
        enrollment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },  
        createdAt:{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
        createdTo: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO}
    
      });   
    const [createDateToFilterValue,setCreatedDateToFilterValue]=useState("")    
    const [enrollmentIdFilterValue,setEnrollmentIdFilterValue]=useState("")  
    const [createDateFilterValue,setCreatedDateFilterValue]=useState("")  
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [fromIncomplete, setFromIncomplete] = useState(null);

    const onGlobalFilterValueChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const onNameDateEnrollmentIdValueFilter = (e, field) => {
        const value = e.target.value;
        let _filters = { ...filters };
        if(field === "enrollment"){
        _filters['enrollment'].value = value;   
        setFilters(_filters);  
        setEnrollmentIdFilterValue(value); 
        }  
        else if(field === "createdTo"){ 
            setCreatedDateToFilterValue(e.value)  
            const updatedDate = new Date(e.value);
            updatedDate.setDate(updatedDate.getDate() + 1);
                  _filters["createdTo"].value =new Date(updatedDate).toISOString() 
            setFilters(_filters);
        }
   
        else{ 
            setCreatedDateFilterValue(e.value);  
            _filters["createdAt"].value =new Date(e.value).toISOString() 
            setFilters(_filters);
        }
    };

    const [allInCompletedEnrollments, setAllInCompletedEnrollments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();

    const [isCreate, setIsCreate] = useState(false);
    const [isManage, setIsManage] = useState(false);

    const location = useLocation();
    const currentPath = location?.pathname;
    const navigate = useNavigate();

    // const rowExpansionTemplate = (data) => {

    //     return (
    //         <div>

    //   <DataTable value={[data]} stripedRows >
    //                 <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
    //                 <Column field="createdBy?.name" header="Created BY" />
    //                 <Column field="plan.name" header="Plan Name" />
    //                 <Column field="plan.price" header="Plan Price" />
    //                 <Column field="Phonecost" header="Phone Cost" />
    //                 <Column field="Amountpaid" header="Amount Paid by Customer" />
    //                 <Column field="Postingdate" header="Posting Date" />
    //                 <Column field="EsnNumber" header="ESN Number" />
    //                 <Column field="Telephone" header="Telephone Number" />
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

   
    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const actionBasedChecks = () => {
        const loginPerms = localStorage.getItem("permissions");
        const parsedLoginPerms = JSON.parse(loginPerms);

        const isCreate = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "create")));
        setIsCreate(isCreate);

        const isManage = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "manage")));
        setIsManage(isManage);
    };

    useEffect(() => {
        actionBasedChecks();
        setFromIncomplete(false);
    }, []);

    const getAllInCompletedEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {
                for (let i = 0; i < res?.data?.data?.length; i++) {
                    res.data.data[i].enrollment = res.data.data[i].isSelfEnrollment ? "Self Enrollments" : "Enrollment";
                    res.data.data[i].name = `${res.data.data[i]?.firstName ? (res.data.data[i]?.firstName).toUpperCase() : ""} ${res.data.data[i]?.lastName ? (res.data.data[i]?.lastName).toUpperCase() : ""}`;
                    res.data.data[i].createdDate = new Date(res.data.data[i].createdAt)
                        .toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })
                        .replace(/\//g, "-");  
                        res.data.data[i].createdTo=res.data.data[i].createdAt
                 
                }
                setAllInCompletedEnrollments(res?.data?.data);
                setIsLoading(false);

                localStorage.removeItem("basicData");
                localStorage.removeItem("address");
                localStorage.removeItem("programmeId");
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
                // Step 1: Retrieve existing data from localStorage
                let storedData = JSON.parse(localStorage.getItem("fromIncomplete")) || {};

                if (storedData) {
                    storedData = true; // Your new
                    localStorage.setItem("fromIncomplete", JSON.stringify(storedData));
                } else {
                     storedData = true;
                    localStorage.setItem("fromIncomplete", JSON.stringify(storedData));
                }

                localStorage.setItem("basicData", JSON.stringify(response.data));
                localStorage.setItem("address", JSON.stringify(response.data));
                // localStorage.setItem("programmeId", JSON.stringify(response.data));

                navigate("/enrollment");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
        setisButtonLoading(false);
    };  
    const header=()=>{  
        return(
            <div className="flex flex-wrap justify-content-center mt-2">
         
            <Dropdown
                       className="mt-2 w-15rem ml-4"
                       options={[
                           { label: "Self Enrollment", value: "Self Enrollments" },
                           { label: "Enrollment", value: "Enrollment" },
                           { label: "All Enrollments", value: null },
                       ]}
                       value={enrollmentIdFilterValue}
                       onChange={(e)=>{
                           onNameDateEnrollmentIdValueFilter(e, "enrollment"); 
                       }}
                       placeholder="Enrollment Type"
                   />
                   <InputText
                       value={globalFilterValue}
                       onChange={
                           onGlobalFilterValueChange}
                       className="w-15rem ml-4 mt-2"
                       placeholder="Search By Name or Enrollment ID"
                   />     
                   <div className="w-25rem ml-4 mt-2" >
                   <Calendar
                    className="w-11rem" 
         value={createDateFilterValue}
         dateFormat="mm/dd/yy"  
         placeholder="Search By Created Date"
         onChange={(e) => {
           onNameDateEnrollmentIdValueFilter(e, "createdAt");
       }}  
   
         showIcon
       />     
       <label className="w-9rem p-2" style={{textAlign:"center",color:"grey"}}>To</label>  
       <Calendar
                 className="w-11rem"   
         value={createDateToFilterValue}
         dateFormat="mm/dd/yy"  
         placeholder="Search By Created Date"
         onChange={(e) => {
           onNameDateEnrollmentIdValueFilter(e, "createdTo");
       }}  
   
         showIcon
       />    
       </div>
       </div>
            )
       }
    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button label="Continue" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading || !isCreate} />
            </div>
        );
    };

    return (
        <div className="card bg-pink-50">
            <div className="card mx-5 p-0 border-noround">
                <div className="" style={{ padding: "15px" }}>
                    <DataTable value={allInCompletedEnrollments} stripedRows resizableColumns  paginator rows={10} filters={filters}
                            globalFilterFields={['enrollmentId',"name"]} header={header} emptyMessage="No customers found." rowsPerPageOptions={[25, 50]}>
                        {/* <Column expander style={{ width: "3em" }} /> */}
                        <Column header="Name" field="name"></Column>
                        <Column header="Address" field="address1"></Column>
                        <Column header="City" field="city"></Column>
                        <Column header="State" field="state"></Column>
                        <Column header="Zip" field="zip"></Column>
                        <Column field="contact" header="Telephone Number" />
                        <Column
                            field="DOB"
                            header="DOB"
                            body={(rowData) =>
                                new Date(rowData.DOB)
                                    .toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, "-")
                            }
                        />
                        <Column field="createdBy.name" header="Created BY" />
                        <Column field="status" header="Status" />
                        <Column header="Actions" body={actionTemplate}></Column>
                    </DataTable>

                    {isLoading ? <ProgressSpinner style={{ marginLeft: "550px" }} /> : null}
                </div>
            </div>
        </div>
    );
};

export default InCompleteEnrollments;
