import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column"; 
import { DateTime } from "luxon";
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
        createdFilter:{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
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
            const parsedDate = DateTime.fromJSDate(new Date(e.value));
            let easternDateTime = parsedDate.setZone("America/New_York", { keepLocalTime: true });
            easternDateTime = easternDateTime.set({
                hour: 23,
                minute: 59,
                second: 0,
            });

            const formattedEasternTime = easternDateTime.toFormat("d LLL yyyy, h:mm a");
            const etDateObject = DateTime.fromFormat(formattedEasternTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" });
            const value2=etDateObject.toSeconds()
            setCreatedDateToFilterValue(e.value)
            _filters["createdTo"].value = value2
            setFilters(_filters);
        }
        else{ 
            const parsedDate = DateTime.fromJSDate(new Date(e.value));
            const easternDateTime = parsedDate.setZone("America/New_York", { keepLocalTime: true });
            const formattedEasternTime = easternDateTime.toFormat("d LLL yyyy, h:mm a");
            const etDateObject = DateTime.fromFormat(formattedEasternTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" });
            const value=etDateObject.toSeconds()

            setCreatedDateFilterValue(e.value);
            _filters["createdFilter"].value = value
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
            const res = await Axios.get(`${BASE_URL}/api/user/prePostCompletedEnrollmentsList?userId=${parseLoginRes?._id}&accountType=Postpaid`);
            if (res?.status === 200 || res?.status === 201) {   
                const updatedData = res?.data?.data.map((item) => ({
                    ...item,
                    enrollment: item.isSelfEnrollment ? "Self Enrollments" : "Enrollment",
                    name: `${item?.firstName ? item?.firstName.toUpperCase() : ""} ${item?.lastName ? item?.lastName.toUpperCase() : ""}`,
                    createdDate: new Date(item.createdAt)
                        .toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })
                        .replace(/\//g, "-"), 
                        createdFilter:DateTime.fromFormat(item.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() ,
                        createdTo: DateTime.fromFormat(item.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds(),
                  
                }));
    
                setAllCompletedEnrollments(updatedData);
    
                setIsLoading(false);
            }
        } catch (error) {
            toast.error( error?.response?.data?.msg);
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
