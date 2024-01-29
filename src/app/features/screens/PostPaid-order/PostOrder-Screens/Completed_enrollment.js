import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column"; 
 import { Calendar } from "primereact/calendar";
import Axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { FilterMatchMode} from 'primereact/api'
const BASE_URL=process.env.REACT_APP_BASE_URL
const Completed_Enrollments = () => {   
      // State For Select Row
      const [selectedEnrollments, setSelectedEnrollments] = useState(null);
      const [rowClick, setRowClick] = useState(true);  
    const [createDateToFilterValue,setCreatedDateToFilterValue]=useState("")
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },  
        enrollment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },  
        createdAt:{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
        createdTo: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO}
    });    
    const [enrollmentIdFilterValue,setEnrollmentIdFilterValue]=useState("")  
    const [createDateFilterValue,setCreatedDateFilterValue]=useState("")  
    const [allCompletedEnrollments, setAllCompletedEnrollments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const onGlobalFilterValueChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;
         
        setFilters(_filters);  
        setGlobalFilterValue(value); 
      
    }; 
     const onNameDateEnrollmentIdValueFilter=(e,field)=>{ 
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
        
     } 
   
 
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
    // Get role name  from login response
    const roleName = parseLoginRes?.role?.role;
    const toCapital = roleName ? roleName.toUpperCase() : "DEFAULT_VALUE";


    const getAllCompletedEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${parseLoginRes?._id}&accountType=Postpaid`);
            if (res?.status === 200 || res?.status === 201) {   
                for(let i=0;i<res?.data?.data?.length;i++){ 
                    res.data.data[i].enrollment=res.data.data[i].isSelfEnrollment?"Self Enrollments":"Enrollment"
                       res.data.data[i].name=`${res.data.data[i]?.firstName ? (res.data.data[i]?.firstName).toUpperCase() : ""} ${res.data.data[i]?.lastName ? (res.data.data[i]?.lastName).toUpperCase() : ""}`
                       res.data.data[i].createdDate=new Date(res.data.data[i].createdAt)
                       .toLocaleDateString("en-US", {
                           month: "2-digit",
                           day: "2-digit",
                           year: "numeric",
                       })
                       .replace(/\//g, "-")
                       res.data.data[i].createdTo=res.data.data[i].createdAt
                   }  
                   res.data.data.sort((a, b) => {
                    const dateComparison = new Date(b.activatedAt) - new Date(a.activatedAt);

                    if (dateComparison !== 0) {
                        return dateComparison;
                    }

                    // If dates are equal, compare by time
                    return new Date(b.activatedAt).getTime() - new Date(a.activatedAt).getTime();
                });

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
                <div className="w-45rem ml-4 mt-2" >
                <Calendar
                 className="w-21rem" 
      value={createDateFilterValue}
      dateFormat="mm/dd/yy"  
      placeholder="Search By Created Date"
      onChange={(e) => {
        onNameDateEnrollmentIdValueFilter(e, "createdAt");
    }}  

      showIcon
    />     
    <label className="p-2" style={{fontSize:"19px",textAlign:"center",color:"grey"}}>To</label>  
    <Calendar
              className="w-21rem"   
      value={createDateToFilterValue}
      dateFormat="mm/dd/yy"  
      placeholder="Search By Created Date"
      onChange={(e) => {
        onNameDateEnrollmentIdValueFilter(e, "createdTo");
    }}  

      showIcon
    />    
    </div>
    </div>)
       }
    return (
       
        <div className="card ">
             <ToastContainer/>
            <div className="card  p-0 ">
            <div className="flex justify-content-between ">
                <div className="">
                    <h3 className="font-bold   pl-2 mt-4"><strong>Completed Enrollments</strong></h3>
                </div>
            </div>
             
                
                <div className="" >
                <DataTable   selectionMode={rowClick ? null : 'checkbox'} selection={selectedEnrollments} onSelectionChange={(e) => setSelectedEnrollments(e.value)} value={ allCompletedEnrollments} filters={filters}
                            globalFilterFields={['enrollmentId',"name"]} header={header} emptyMessage="No customers found."
                            stripedRows resizableColumns size="small"   paginator rows={10} rowsPerPageOptions={[ 25, 50]}>
                            {/* <Column expander style={{ width: "3em" }} /> */}
                        {/* <Column header="#" field="SNo"></Column> */} 
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
               
                        <Column header="Enrollment ID" field="enrollmentId"  body={(rowData) => (
                    <button style={{border:'none', backgroundColor:'white', cursor:'pointer'}} onClick={() => handleEnrollmentIdClick(rowData)}>
                        {rowData.enrollmentId}
                    </button>
                )}></Column>
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
                        <Column field="createdBy.name" header="Created By"/>
                        {
                            toCapital.includes("PROVISION") ?
                            <Column field="activatedBy.name" header="Activated By" />
                            :""
                        }
                       {
    toCapital.includes("PROVISION") ?
    <Column field="activatedAt" header="Activated At" 
        body={(rowData) => {
            if (rowData?.activatedAt) {
                return new Date(rowData.activatedAt)
                    .toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                    })
                    .replace(/\//g, "-");
            }
            return null; // Handle the case when activatedAt is not available
        }}
    />
    : ""
}
<Column
    field="Phase"
    header="Phase"
    body={(rowData) => (
        <span>
            {rowData.assignedToUser.map((user) => (
                <span key={user?.department?.department}>
                    {user?.department?.department}
                </span>
            ))}
        </span>
    )}
/>
                    </DataTable>
                    {isLoading ? <ProgressSpinner  className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}
                </div>
            </div>
            <br />
        </div> 
    );
};

export default Completed_Enrollments;
