import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import Axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { FilterMatchMode} from 'primereact/api'
const BASE_URL=process.env.REACT_APP_BASE_URL
const CompletedEnrollments = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.EQUALS },  
        enrollmentId: { value: null, matchMode: FilterMatchMode.STARTS_WITH },  
        name:{ value: null, matchMode: FilterMatchMode.STARTS_WITH }, 
        createdDate:{ value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });    
    const [nameFilterValue,setNameFilterValue]=useState("")  
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
        _filters['enrollmentId'].value = value;   
        setFilters(_filters);  
        setEnrollmentIdFilterValue(value); 
        } 
        
        else if(field === "name"){ 
         _filters['name'].value=value  
         setFilters(_filters);  
         setNameFilterValue(value); 
        } 
        else{ 
            _filters['createdDate'].value=value  
            setFilters(_filters);  
            setCreatedDateFilterValue(value);   
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
    const getAllCompletedEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {   
                for(let i=0;i<res.data.data.length;i++){ 
                    res.data.data[i].enrollment=res.data.data[i].isSelfEnrollment?"Self Enrollments":"Enrollment"
                       res.data.data[i].name=`${res.data.data[i]?.firstName ? (res.data.data[i]?.firstName).toUpperCase() : ""} ${res.data.data[i]?.lastName ? (res.data.data[i]?.lastName).toUpperCase() : ""}`
                       res.data.data[i].createdDate=new Date(res.data.data[i].createdAt)
                       .toLocaleDateString("en-US", {
                           month: "2-digit",
                           day: "2-digit",
                           year: "numeric",
                       })
                       .replace(/\//g, "-")
                 
                   }  
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
       
          
        <Dropdown className="mt-2 w-15rem ml-4" options={[{label:'Self Enrollment',value:"Self Enrollments"},{label:"Enrollment",value:"Enrollment"},{label:"All Enrollments",value:null}]} value={globalFilterValue} onChange={onGlobalFilterValueChange} placeholder="Enrollment Type" />
        <InputText value={nameFilterValue} onChange={(e)=>{ 
            onNameDateEnrollmentIdValueFilter(e,"name") 
        } 
        } className="w-15rem ml-4 mt-2" placeholder="Search By Name" /> 
         <InputText value={enrollmentIdFilterValue} onChange={(e)=>{ 
            onNameDateEnrollmentIdValueFilter(e,"enrollment") 
        } 
        } className="w-15rem ml-4 mt-2" placeholder="Search By Enrollment ID" /> 
         <InputText value={createDateFilterValue} onChange={(e)=>{ 
            onNameDateEnrollmentIdValueFilter(e,"createdAt") 
        } 
        } className="w-15rem ml-4 mt-2" placeholder="Search By Created Date" />
          
    </div>)
       }
    return (
       
        <div className="card bg-pink-50">
             <ToastContainer/>
            <div className="card mx-5 p-0 border-noround">
              
             
                
                <div className="" style={{  padding: "15px" }}>
                <DataTable value={ allCompletedEnrollments} filters={filters}
                            globalFilterFields={['enrollment']} header={header} emptyMessage="No customers found."
                            stripedRows resizableColumns    paginator rows={10} rowsPerPageOptions={[ 25, 50]}>
                            {/* <Column expander style={{ width: "3em" }} /> */}
                        {/* <Column header="#" field="SNo"></Column> */}
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
                        <Column field="createdBy.name" header="Created BY"/>
                        <Column
                                field="level"
                                header="Status"
                                body={(rowData) => {
                                    if (Array.isArray(rowData.level) && rowData.level.length > 0) {
                                        const statusArray = rowData.level.map((level) => {
                                            switch (level) {
                                                case 1:
                                                    return "CSR";
                                                case 2:
                                                    return "Team Lead";
                                                case 3:
                                                    return "QA Agent";
                                                case 4:
                                                    return "QA Manager";
                                                case 5:
                                                    return "Provision Manager";
                                                case 6:
                                                    return "Retention";
                                                case 7:
                                                    return "Dispatch Manager";
                                                default:
                                                    return "";
                                            }
                                        });

                                        return statusArray.join(", "); // Join multiple statuses into a string
                                    } else {
                                        return ""; // Handle the case when "level" is not an array or is empty
                                    }
                                }}
                            />
                    </DataTable>
                    {isLoading ? <ProgressSpinner style={{ marginLeft: "550px" }} /> : null}
                </div>
            </div>
            <br />
        </div> 
    );
};

export default CompletedEnrollments;
