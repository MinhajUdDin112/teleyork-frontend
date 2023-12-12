import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { useEffect } from "react";  
import { FilterMatchMode} from 'primereact/api'  
import { Dropdown } from "primereact/dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
const BASE_URL=process.env.REACT_APP_BASE_URL
const RejectedEnrollments = () => {  
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },  
        enrollment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },  
        createdAt:{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
        createdTo: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO}
   
    });  
    const [createDateToFilterValue,setCreatedDateToFilterValue]  =useState("")
    const [enrollmentIdFilterValue,setEnrollmentIdFilterValue]=useState("")  
    const [createDateFilterValue,setCreatedDateFilterValue]=useState("")  
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
    const [dateRange, setDateRange] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allEnrollments, setAllEnrollments] = useState([]);
    const [CsrId, setCsrId] = useState();
    const [zipCode, setZipCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDialogeForActivate, setOpenDialogeForActivate] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [isEnrolmentId, setIsEnrolmentId] = useState();
    const [expandedRows, setExpandedRows] = useState([]);
    
    const [isCreate, setIsCreate] = useState(false);
  const [isManage, setIsManage] = useState(false);

  const location = useLocation();
  const currentPath = location?.pathname
  
   


    // const rowExpansionTemplate = (data) => {
    //     return (
    //         <div>
    //             <DataTable value={[data]} stripedRows>
    //                 <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
    //                 <Column field="plan.name" header="Plan Name" />
    //                 <Column field="createdBy?.name" header="Created BY" />
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
    //                 <Column field="rejectedReason" header="Rejected Reason" />
    //                 <Column field="Enrolltype" header="Enroll Type" />
    //                 <Column field="Reviewernote" header="Reviewer Note" />
    //             </DataTable>
    //         </div>
    //     );
    // };
    
    const handleEnrollmentIdClick = (rowData) => {
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));      
    };

    const navigate = useNavigate();

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
     // Get role name  from login response
    const roleName= parseLoginRes?.role?.role;

   

    const actionBasedChecks = () => {

        const loginPerms = localStorage.getItem("permissions")
        const parsedLoginPerms = JSON.parse(loginPerms)
    
        const isCreate = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "create"
            )
          )
        );
        setIsCreate(isCreate)
    
        const isManage = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "manage"
            )
          )
        );
        setIsManage(isManage)
    
      };
    
      useEffect(() => {
        actionBasedChecks();
      }, []);
   

    const getAllEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${parseLoginRes?._id}`);
            if (res?.status === 200 || res?.status === 201) {
                console.log("data is",res?.data?.data)
                if(!(res?.data?.data)){
                    toast.error(res?.data?.msg)
                }   
               else  if(res?.data?.data){
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
                           res.data.data[i].createdTo=res.data.data[i].createdAt
                 
                     }    
                }
                             
                setAllEnrollments(res?.data?.data);
                setIsLoading(false);
                localStorage.removeItem("zipData");
            }
        } catch (error) {
           // toast.error("Error fetching All  Rejected Enrollment: " + error?.response);
            console.log("error is",error)
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
                <Button label="Edit" onClick={() => viewRow(rowData)} className=" p-button-success mr-2 ml-2  " text raised disabled={isButtonLoading}/>
                <Button label="Approve" onClick={() => approveRow(rowData)} className=" p-button-success mr-2 ml-2  " text raised  disabled={isButtonLoading}/>
            </div>
        );
    };

    const actionTemplateForCsr=(rowData)=>{
        return(
            <Button label="Edit" onClick={() =>  viewRow(rowData)} text raised />
        )
       
    }
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

    return (
        <div className="card bg-pink-50">
            <ToastContainer/>
            <div className="flex justify-content-between">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">List of Rejected Enrollments</h3>
            </div>
           
                                </div>
            {/* <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Date Range</p>
                        <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Search</p>
                        <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Customer F Name, L Name, Enrollment ID" style={{ width: "23rem" }} />
                    </div>
                    <div className="p-1">
                        <Button label="Search" className="mt-4 text-sm bg-green-200 border-none w-7rem" />
                    </div>
                </div>
            </div> */}
            {/* <div className="card p-3 mx-5 border-noround bg-green-200 "><p className="text-sm font-semibold">Search Result: 0</p></div> */}
            <div className="mx-5">
                <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">{/* <InputText className="w-15rem my-2 text-base h-2.5rem" placeholder="Keyword Search"></InputText> */}</div>
                {isButtonLoading ? <ProgressSpinner style={{ width: "50px", height: "50px", marginLeft: "40rem" }} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s" /> : null}
                <div className="">
                <DataTable value={ allEnrollments} filters={filters}
                            globalFilterFields={['enrollmentId','name']} header={header} emptyMessage="No customers found." stripedRows resizableColumns columnResizeMode="fit"  paginator rows={10} rowsPerPageOptions={[ 25, 50]}>
                            {/* <Column expander style={{ width: "3em" }} /> */}
                           
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
                        <Column field="createdBy?.name" header="Created BY" />
                        <Column field="reajectedReason" header="Rejected Reason" />
                        <Column field="status" header="Status" />
    
                            {roleName == "CSR" || roleName == "csr" || roleName == "Csr" ? (
                                 <Column header="Actions" body={actionTemplateForCsr}></Column>
                            )  : (
                                <Column header="Actions" body={actionTemplate}></Column>
                            )}
                         
                        </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default RejectedEnrollments;
