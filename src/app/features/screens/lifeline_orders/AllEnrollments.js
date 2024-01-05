import React, { useEffect, useState } from "react";
import { Button } from "primereact/button"; 
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
import DialogeForTransferUser from "./DialogeForTransferUser";
import DialogeForRemarksForIJ from "./DialogeForRemarksForIJ";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import DialogeForApprove from "./DialogeForApprove";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AllEnrollments = () => {  
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [isEnrolmentId, setIsEnrolmentId] = useState();
    const [CsrId, setCsrId] = useState();
    const [zipCode, setZipCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDialogeForActivate, setOpenDialogeForActivate] = useState(false);
    const [OpenDialogeForRemarks, setOpenDialogeForRemarks] = useState(false);
    const [OpenDialogeForRemarksForIJ, setOpenDialogeForRemarksForIJ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [link, setLink] = useState();
    const [allEnrollments, setAllEnrollments] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);  
    const [createDateToFilterValue,setCreatedDateToFilterValue]=useState("")
    const [checkType, setCheckType] = useState()  
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
         enrollment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO}, 
        createdTo: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO}
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [enrollmentIdFilterValue, setEnrollmentIdFilterValue] = useState("");
    const [createDateFilterValue, setCreatedDateFilterValue] = useState("");
    const [dates, setDates] = useState(null);
    const [filteredDates, setFilteredDates] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [dialogeForTransfer, setDialogeForTransfer] = useState(false);
    const [dialogeForApprove, setDialogeForApprove] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [checkRemarks, setCheckRemarks] = useState();
    const [selectedIdsForApprove, setSelectedIdsForApprove] = useState()

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

    const handleEnrollmentIdClick = (rowData) => {
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));
    };

    // Get role name  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const roleName = parseLoginRes?.role?.role;
    const toCapital = roleName.toUpperCase();
   

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
        if (field === "enrollment") {
            _filters["enrollment"].value = value;
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

        else {                
           
            setCreatedDateFilterValue(e.value);  
            _filters["createdAt"].value =new Date(e.value).toISOString() 
            setFilters(_filters);   
        }    
     
    };


    const getAllEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${parseLoginRes?._id}`);
            if (res?.status === 200 || res?.status === 201) {
                if(!(res?.data?.data)){
                    toast.success(" No enrollments have been received from the previous department yet")
                } 
               
                else if(res?.data?.data){
                 
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
                    console.log("all enroll is",res?.data?.data)
                   
                setIsLoading(false);
              
               
                }  
               setAllEnrollments(res?.data?.data);
                setIsLoading(false);
             
            }
         catch (error) {    
           
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
        const type=rowData?.enrollment;
     
        if(type.includes("Self")){
            setSelectedEnrollmentId(_id);
            try {
                const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${_id}`);
                if (response?.status === 201 || response?.status === 200) {
                    localStorage.removeItem("zip");
                    localStorage.setItem("initialInformation", JSON.stringify(response.data));
                    localStorage.setItem("homeAddress", JSON.stringify(response.data));
                    localStorage.setItem("selectProgram", JSON.stringify(response.data));
                    navigate("/personalinfo");
                    setisButtonLoading(false);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setisButtonLoading(false);
            }

        }
        else{
            setSelectedEnrollmentId(_id);
            try {
                const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${_id}`);
                if (response?.status === 201 || response?.status === 200) {
                    localStorage.removeItem("zipData"); // Use removeItem instead of clearItem
                    localStorage.setItem("basicData", JSON.stringify(response.data));
                    localStorage.setItem("address", JSON.stringify(response.data));
                    localStorage.setItem("programmeId", JSON.stringify(response.data));
                    let storedData = JSON.parse(localStorage.getItem("fromIncomplete")) || {};
                    if (storedData) {
                        storedData = false; 
                        localStorage.setItem("fromIncomplete", JSON.stringify(storedData));
                    } else {
                         storedData = false;
                        localStorage.setItem("fromIncomplete", JSON.stringify(storedData));
                    }
                    navigate("/enrollment");
                    setisButtonLoading(false);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setisButtonLoading(false);
            }
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

    const approveRowByTl =async(rowData)=>{
        setisButtonLoading(true);
        const approvedBy = parseLoginRes?._id;
        const enrolmentId = rowData?._id;
        const approved = true;
        const dataToSend = { approvedBy, enrolmentId, approved };
       
         setCheckRemarks(rowData?.QualityRemarks)
        
        if(rowData?.QualityRemarks ){
           if (rowData && rowData.QualityRemarks && rowData.QualityRemarks.includes("declined")) {
                   toast.error("Declined sales can only rejected")
                   setisButtonLoading(false);              
            }
            else{
              
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
            }
            }
           
        else{
          
            toast.error("Please Add Remarks First");
                 setisButtonLoading(false)
        }
    }

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
                const link1 = response?.data?.data?._links?.certification?.href;
                const link2 = response?.data?.data?._links?.resolution?.href;
                if (link1) {
                    setLink(link1);
                } else {
                    setLink(link2);
                }
                const respMsg = response?.data?.data?.status;

                if (respMsg.includes("complete") || respMsg.includes("COMPLETE") || respMsg.includes("Complete")) {
                    toast.success(response?.data?.data?.status);
                } else {
                    toast.warning(response?.data?.data?.status);
                }

                setSelectedRow(rowData);
            }
        } catch (error) {
            const status = error?.response?.status;

            if (status === 500 || status === 400) {
                toast.error(error?.response?.data?.data?.message);
            } else {
                const error1 = error?.response?.data?.data?.body;
                const error2 = error?.response?.data?.data?.errors[0]?.description;

                const errorMessage1 = Array.isArray(error1) ? error1.toString() : error1 && typeof error1 === "object" ? JSON.stringify(error1) : error1;
                const errorMessage2 = Array.isArray(error2) ? error2.toString() : error2 && typeof error2 === "object" ? JSON.stringify(error2) : error2;
                if (errorMessage1) {
                    toast.error("Error is " + errorMessage1);
                } else {
                    toast.error("Error is " + errorMessage2);
                }
            }
        } finally {
            setisButtonLoading(false);
        }
    };
    
    const enrollUser = async (rowData) => {
       
        setisButtonLoading(true);
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/enrollVerifiedUser?userId=${parseLoginRes?._id}&enrollmentId=${rowData?._id}`);
          
            if (response?.status == "200" || response?.status == "201") {
                toast.success("Successfully Enrolled");
                console.log("in side")
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
            toast.error(`error is ${error?.response?.data?.data?.body[0]}`);

            setisButtonLoading(false);
        }
    };

    const HnadleAllApprove = async () => {
        setisButtonLoading(true);
        if (allEnrollments) {
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
            setisButtonLoading(false);
        } else {
            toast.error("No Enrollment Found");
            setisButtonLoading(false);
        }
    };

    const handleApproveSelected = async () => {
        setisButtonLoading(true);
        if (allEnrollments) {
            const enrollmentIds = selectedRows.map((enrollment) => enrollment._id);
           
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
            setisButtonLoading(false);
        } else {
            toast.error("No Enrollment Found");
            setisButtonLoading(false);
        }
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button label="Edit" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading} className="pt-1 pb-1"  />
                <Button label="Approve" onClick={() => approveRow(rowData)} className=" p-button-success mr-2 ml-2 pt-1 pb-1 " text raised disabled={isButtonLoading} />
                <Button label="Reject" onClick={() => handleOpenDialog(rowData)} className=" p-button-danger mr-2 ml-2 pt-1 pb-1"  text raised disabled={isButtonLoading} />
            </div>
        );
    };
    const actionTemplateForTL = (rowData) => {
        return (
            <div>
                {parseLoginRes?.companyName.includes("IJ") || parseLoginRes?.companyName.includes("ij") ? (
                    <Button label="Add Remarks" onClick={() => handleOpenDialogForRemarksForIJ(rowData)} className=" p-button-sucess mr-2 ml-2 pt-1 pb-1" text raised disabled={isButtonLoading} />
                ) : (
                    <Button label="Add Remarks"  onClick={() => handleOpenDialogForRemarks(rowData)} className="pt-1 pb-1 p-button-sucess mr-2 ml-2" text raised disabled={isButtonLoading} />
                )}

                <Button label="Edit" onClick={() => viewRow(rowData)} className="pt-1 pb-1"  text raised disabled={isButtonLoading} />
                <Button label="Approve"   onClick={() =>{  
                    if(!rowData.QualityRemarks){
                        toast.error("Please Add Remarks")
                    }
                  else  if(rowData.QualityRemarks === "satisfactory" || rowData.QualityRemarks === "good" || rowData.QualityRemarks === "average" ){
                        approveRowByTl(rowData) 
                         } 
                         else{      
                            if(rowData.QualityRemarks !== undefined){
                            toast.error("Only enrollment with call quality marked as good, average or satisfactory will be Approved") 
                            } 
                            else{ 
                                toast.error("Please Add Remarks") 
                            
                            }
                         }
                 
                 
                 }} className=" p-button-success mr-2 ml-2  pt-1 pb-1 " text raised disabled={isButtonLoading} />
                <Button label="Reject"  onClick={() => {
                    if(!rowData?.QualityRemarks){
                        toast.error("Please Add Remarks")
                    }
                   else   if(rowData.QualityRemarks === "declined"){
                    handleOpenDialog(rowData);  
                     } 
                     else{    
                        if(rowData.QualityRemarks !== undefined){
                            toast.error("Only enrollment with call quality marked as declined will be rejected")  

                        } 
                            else{ 
                                toast.error("Please Add Remarks") 
                            
                            }
                       
                     }
                    
                     }} className=" p-button-danger pt-1 pb-1 mr-2 ml-2" text raised disabled={isButtonLoading} />
            </div>
        );
    };

    const actionTemplateForPR = (rowData) => { 
        return (
            <div>
                <Button label="Edit" onClick={() => viewRow(rowData)} text raised className="pt-1 pb-1" disabled={isButtonLoading} />
                <Button label="Reject" onClick={() => handleOpenDialog(rowData)} className=" p-button-danger pt-1 pb-1 mr-2 ml-2" text raised disabled={isButtonLoading} />
                {/* <Button label="Run NLAD" onClick={() => runNLAD(rowData)} className=" mr-2 ml-2" text raised disabled={isButtonLoading} /> */}
                <Button label="Run NV" onClick={() => runNV(rowData)} className=" mr-2 ml-2 pt-1 pb-1" text raised disabled={isButtonLoading} />
                {selectedRow === rowData && link ? (
                    <Button
                        label="Go To Link"
                        onClick={() => {
                            window.open(link, "_blank");
                        }}
                        className=" mr-2 ml-2 pt-1 pb-1 p-button-warning"
                        text
                        raised
                        disabled={isButtonLoading}
                    />
                ) : null}
                <Button label="Enroll User" onClick={() => enrollUser(rowData)} className=" mr-2 ml-2 pt-1 pb-1" text raised disabled={isButtonLoading} />
                <Button label="Activate Sim" onClick={() => handleDialogeForActivate(rowData)} className=" mr-2 ml-2 pt-1 pb-1" text raised disabled={isButtonLoading} />
                {/* <Button label="Update User With NLAD" onClick={() => updateUser(rowData)} className=" mr-2 ml-2" text raised disabled={isButtonLoading} /> */}
                <Button label="Transfer User" onClick={() => transferUser(rowData)} className=" mr-2 ml-2 pt-1 pb-1" text  raised disabled={isButtonLoading} />
            </div>
        );
    };
    const handleOpenDialog = (rowData) => {

                setisButtonLoading(true);
        setIsModalOpen(true);
        setIsEnrolmentId(rowData?._id);
        setCsrId(rowData?.csr);
        setCheckType(rowData?.enrollment)
        setisButtonLoading(false);             
         
       

       
    };

    const handleDialogeForActivate = (rowData) => {
        setOpenDialogeForActivate(true);
        setIsEnrolmentId(rowData?._id);
        setZipCode(rowData?.zip);
    };
    const handleOpenDialogForRemarks = (rowData) => {
        setOpenDialogeForRemarks(true);
        setIsEnrolmentId(rowData?._id);
    };

    const handleOpenDialogForRemarksForIJ = (rowData) => {
        setOpenDialogeForRemarksForIJ(true);
        setIsEnrolmentId(rowData?._id);
    };

    // const handleApproveSelectedForQa=()=>{
    //     const enrollmentIds = selectedRows.map((enrollment) => enrollment._id);
    //     console.log("ids is",enrollmentIds)
    //     setSelectedIdsForApprove(enrollmentIds)
    //     setDialogeForApprove(true);
        
    // }
    // const HnadleAllApproveForQa=()=>{

    // }

    const header = () => {
        return (
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
                        onNameDateEnrollmentIdValueFilter(e,"enrollment"); 
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
      placeholder="Start Date"
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
      placeholder="End Date"
      onChange={(e) => {
        onNameDateEnrollmentIdValueFilter(e, "createdTo");
    }}  

      showIcon
    />    
    </div>
            </div>
        );
    };
    const transferUser = async (rowData) => {
        setDialogeForTransfer(true);
        setIsEnrolmentId(rowData?._id);
    };
    return (
        <>
            <ToastContainer className="custom-toast-container" />
            <div className="card ">
                <form>
                    <Dialog visible={isModalOpen} style={{ width: "50vw" }} draggable={false} onHide={() => setIsModalOpen(false)}>
                        <DialogForReject   setIsModalOpen={setIsModalOpen} checkType={checkType} enrollmentId={isEnrolmentId} CSRid={CsrId} getAllEnrollments={getAllEnrollments} />
                    </Dialog>
                    <Dialog header={"Activate Sim"} visible={openDialogeForActivate} style={{ width: "70vw" }} onHide={() => setOpenDialogeForActivate(false)}>
                        <DialogForActivateSim enrollmentId={isEnrolmentId} setOpenDialogeForActivate={setOpenDialogeForActivate} zipCode={zipCode} />
                    </Dialog>
                    <Dialog header={"Add Remarks"} visible={OpenDialogeForRemarks} style={{ width: "70vw" }} onHide={() => setOpenDialogeForRemarks(false)}>
                        <DialogeForRemarks  getAllEnrollments={ getAllEnrollments} enrollmentId={isEnrolmentId} />
                    </Dialog>
                    <Dialog header={"Add Remarks"} visible={OpenDialogeForRemarksForIJ} style={{ width: "70vw" }} onHide={() => setOpenDialogeForRemarksForIJ(false)}>
                        <DialogeForRemarksForIJ  getAllEnrollments={ getAllEnrollments} enrollmentId={isEnrolmentId} setOpenDialogeForRemarksForIJ={setOpenDialogeForRemarksForIJ} />
                    </Dialog>
                    <Dialog header={"Transfer User"} visible={dialogeForTransfer} style={{ width: "30vw" }} onHide={() => setDialogeForTransfer(false)}>
                        <DialogeForTransferUser enrollmentId={isEnrolmentId} />
                    </Dialog>
                    {/* <Dialog header={"Add Remarks"} visible={dialogeForApprove} style={{ width: "30vw" }} onHide={() => setDialogeForApprove(false)}>
                        <DialogeForApprove enrollmentIds={selectedIdsForApprove} />
                    </Dialog> */}
                </form>

                <div className="card mx-5 p-0 ">
                    <div className="flex font-bold pt-2">
                        <div className="mt-2 ml-2 pt-2 pl-1">
                            <h3>
                             <strong> All Enrollments</strong>
                            </h3>
                        </div>

                        <div className=" ml-auto flex">
                            <div className="mr-5">
                               
                            </div>
                            <div className="  flex pr-4 ">
                                {roleName == "CSR" || roleName == "csr" || roleName == "Csr" ? "" 
                                : 
                                //  roleName == "QA" || roleName == "qa" || roleName == "Qa" ? 
                                //   <Button label="Approve All Enrollments" icon={PrimeIcons.CHECK} onClick={() => HnadleAllApproveForQa()} className=" p-button-success  ml-3  " text raised disabled={isButtonLoading} />
                                // :
                                <Button label="Approve All Enrollments" icon={PrimeIcons.CHECK} onClick={() => HnadleAllApprove()} className=" p-button-success  ml-3 card " text  disabled={isButtonLoading} />
                                }

                                {roleName == "CSR" || roleName == "csr" || roleName == "Csr" ? ""
                                //  :
                                //   roleName == "QA" || roleName == "qa" || roleName == "Qa" ?
                                //   <Button label="Approve Selected" icon={PrimeIcons.CHECK} onClick={handleApproveSelectedForQa} className="p-button-success ml-3" text raised disabled={isButtonLoading || selectedRows.length === 0} /> 
                                : 
                                <Button label="Approve Selected" icon={PrimeIcons.CHECK} onClick={handleApproveSelected} className="p-button-success ml-3 card" text  disabled={isButtonLoading || selectedRows.length === 0} /> 
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        {isButtonLoading ? <ProgressSpinner  className="flex flex-wrap justify-content-center flex-row mt-4" />: null}

                        <DataTable
                            value={filteredDates || allEnrollments}
                            selection={selectedRows}
                            onSelectionChange={(e) => setSelectedRows(e.value)}
                            size="small"
                            stripedRows
                            resizableColumns
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[25, 50]}
                            filters={filters}
                            globalFilterFields={["name","enrollmentId"]}
                            header={header}
                            emptyMessage="No customers found."
                        >
                            {/* <Column expander style={{ width: "3em" }} /> */}
                            {/* <Column header="SNo" style={{ width: "3em" }} body={(rowData, rowIndex) => (rowIndex + 1).toString()} /> */}
                            <Column selectionMode="multiple" style={{ width: "3em" }} />
                            <Column
                                header="Enrollment ID"
                                field="enrollmentId"
                                body={(rowData) => (
                                    <button style={{ border: "none", backgroundColor: "white", cursor: "pointer" }} onClick={() => handleEnrollmentIdClick(rowData)}>
                                        {rowData.enrollmentId}
                                    </button>
                                )}
                            ></Column>
                            <Column header="Enrollment Type" field="enrollment"></Column>

                            <Column header="Name" field="name"></Column>
                            <Column header="Address" field="address1"></Column>
                            <Column header="City" field="city"></Column>
                            <Column header="State" field="state"></Column>
                            <Column header="Zip" field="zip" />
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
                            <Column field="contact" header="Contact" />
                            <Column field="createdBy.name" header="Created By" />
                            <Column field="createdDate" header="Created At" />
                            {
                            toCapital.includes("QA MANAGER") ? <Column field="assignToQa.name" header="Initial Assignee"/>:""
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

                            {roleName == "CSR" || roleName == "csr" || roleName == "Csr" ||roleName == "Team Lead" ||roleName == "TEAM LEAD" ? (
                                ""
                            ) : roleName.includes("provision") || roleName.includes("Provision") || roleName.includes("PROVISION") || roleName.includes("retention") || roleName.includes("RETENTION") || roleName.includes("Retention") ? (
                                <Column header="Actions" body={actionTemplateForPR}></Column>
                            ) : roleName.includes("QA") || roleName.includes("qa") || roleName.includes("Qa") ? (
                                <Column header="Actions" body={actionTemplateForTL}></Column>
                            ) : (
                                <Column header="Actions" body={actionTemplate}></Column>
                            )}
                        </DataTable>
                        {isLoading ? <ProgressSpinner  className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}
              
                    
                     </div>
                </div>
                <br />
            </div>
        </>
    );
};
export default AllEnrollments;
 