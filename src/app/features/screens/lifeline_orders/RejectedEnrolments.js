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
import BASE_URL from "../../../../config";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import DialogForShowData from "./DialogForShowData";

const RejectedEnrollments = () => {
    const [dateRange, setDateRange] = useState(null);
    const [search, setSearch] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allEnrollments, setAllEnrollments] = useState([]);
    const [CsrId, setCsrId] = useState();
    const [zipCode, setZipCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDialogeForActivate, setOpenDialogeForActivate] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [link, setLink] = useState();
    const [isShow, setIsShow] = useState(false);
    const [allData, setAllData] = useState([]);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [isEnrolmentId, setIsEnrolmentId] = useState();

    const navigate = useNavigate();

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
     // Get role name  from login response
    const roleName= parseLoginRes?.role?.role;

   
   

    const getAllEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${parseLoginRes?._id}`);
            if (res?.status === 200 || res?.status === 201) {
                console.log("rejected enrollment is ", res?.data?.data);
                setAllEnrollments(res?.data?.data);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Error fetching All  Rejected Enrollment: " + error?.response?.data?.msg);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllEnrollments();
    }, []);

    const handleOpenDialog = (rowData) => {
        setisButtonLoading(true);
        setIsModalOpen(true);
        setIsEnrolmentId(rowData?._id);
        setCsrId(rowData?.csr);
        setisButtonLoading(false);
    };

    const viewRemainData = (rowData) => {
        setIsShow(true);
        setAllData(rowData);
};
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
    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button label="View" onClick={() => viewRow(rowData)} className="p-button-text p-button-warning p-mr-2" />
                <Button label="Approve" onClick={() => approveRow(rowData)} className="p-button-text p-button-success p-mr-2" />
            </div>
        );
    };

    const actionTemplateForCsr=(rowData)=>{
        return(
            <Button label="View" onClick={() =>  viewRow(rowData)} className="p-button-text p-button-warning p-mr-2" />
        )
       
    }
    
    const actionTemplateForPlus = (rowData) => {
        return (
            <div>
                <Button label="" icon="pi pi-plus" onClick={() => viewRemainData(rowData)} className="p-button-text p-button-warning p-mr-2" />
            </div>
        );
    };

    return (
        <div className="card bg-pink-50">
            <ToastContainer/>
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">List of Rejected Enrollments</h3>
            </div>
            
                    <Dialog  visible={isShow} style={{ width: "85vw" }} onHide={() => setIsShow(false)}>
                        <DialogForShowData allData={allData} />
                    </Dialog>
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
            <div className="card p-3 mx-5 border-noround bg-green-200 ">{/* <p className="text-sm font-semibold">Search Result: 0</p> */}</div>
            <div className="mx-5">
                <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">{/* <InputText className="w-15rem my-2 text-base h-2.5rem" placeholder="Keyword Search"></InputText> */}</div>
                <div className="">
                <DataTable value={allEnrollments} showGridlines resizableColumns columnResizeMode="fit">
                            <Column header="#" field="SNo"></Column>
                            <Column header="Enrollment ID" field="enrollmentId"></Column>
                            <Column header="Name" field={(item) => `${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}`}></Column>
                            <Column header="Address" field="address1"></Column>
                            <Column header="City" field="city"></Column>
                            <Column header="State" field="state"></Column>
                            <Column header="Zip" field="zip" />
                            <Column header="Actions" body={actionTemplateForPlus}></Column>
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
