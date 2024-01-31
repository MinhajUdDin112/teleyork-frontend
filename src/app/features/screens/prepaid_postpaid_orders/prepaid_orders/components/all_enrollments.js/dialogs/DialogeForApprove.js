import React, { useEffect, useState } from "react";
import { Button } from "primereact/button"; 
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressSpinner } from "primereact/progressspinner";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const DialogeForApprove = ({enrollmentIds}) => {
const [isButtonLoading, setisButtonLoading] = useState(false)



    // Get role name  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const handleApproveSelected = async () => {
        setisButtonLoading(true);
           
            console.log("selected row is",enrollmentIds)
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
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setisButtonLoading(false);
            }
            setisButtonLoading(false);
      
    };
  return (
    <div>DialogeForApprove</div>
  )
}

export default DialogeForApprove