import Axios from "axios";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast"; 

import React, { useState,useRef, useEffect } from "react";
import { TransferException, statusOption ,connection} from "./dropdown_options/options";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ChangeCustomerStatus({ cpData,setChangeCustomerStatus }) {  
    const [isLoading, setIsLoading] = useState(false)
     //For Showing Toast Message
    const toast = useRef(null);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [exceptionError, setExceptionError] = useState(false);
    //ConnectionType State
    const [connectionType, setConnectionType] = useState("");
    const [transferExceptionTo, setTransferExceptionTo] = useState("");
    //StatusType State
    const [statusTo, setStatusTo] = useState("");
    //Option for TransferException
    const transferExceptionOption = TransferException
    //Option for Status
    const statusOptions =statusOption
    //Options For Connection Type
    const connectionTypeOption=connection

    const UpdateStatus = async()=> {
        if (statusTo === "labelPrinted") {
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend) 
                .then(() => { 
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                                 
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                                 
                });
        }
      else  if (statusTo === "preShipment") {
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then(() => { 
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                                 
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                                 
                });
        }
        else  if (statusTo === "inTransit") {
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then(() => {
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                                 
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                                 
                });
        }
        else  if (statusTo === "delivered") {
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then(() => {
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                                 
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                                 
                });
        }

        else  if (statusTo === "active" && connectionType=="Non Electronically") {
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            try {
                const response= await  Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                if(response?.status=="200" || response?.status=="201"){
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                }
            }  catch (error) {
                toast.current.show({ severity: "error", summary: "Customer Status", detail: error.response.data.msg || "Disconnection Failed" });
            }
        
        }
        else  if (statusTo === "evaluation" ) {
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            try {
                const response= await  Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                if(response?.status=="200" || response?.status=="201"){
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                }
            }  catch (error) {
                toast.current.show({ severity: "error", summary: "Customer Status", detail: error.response.data.msg || "Disconnection Failed" });
            }
        
        }

        else  if (statusTo === "active" && connectionType=="Electronically") {
            const dataToSend={
                enrollmentId:cpData?._id,
                userId:parseLoginRes?._id        
            }
            try {
                 setIsLoading(true)
                const response= await  Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend)
               
                if(response?.status===200 || response?.status===201){
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Activated" });
                }
                setIsLoading(false)
            }  catch (error) {
                setIsLoading(false)
    
                toast.current.show({ severity: "error", summary: "Customer Status", detail: error?.response?.data?.msg || error });
            }
            setIsLoading(false)
        
        }
       
     else   if (statusTo === "disconnect") {
            Axios.post(`${BASE_URL}/api/user/disconnectMdnByPwg`, { enrollmentId: cpData?._id })
                .then(() => { 
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Disconnected" });
                                 
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                                 
                });
                
        } else if (statusTo === "reconnect") {
            Axios.post(`${BASE_URL}/api/user/reConnectMdnByPwg`, { enrollmentId: cpData?._id, planId: cpData?.plan?.planId, zip: cpData?.zip, esn: cpData?.esn })
                .then(() => { 
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Reconnected" });
                  
                })
                .catch((err) => { 
                     
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Reconnection Failed" });
                  
                });
        } else if (statusTo === "transfer-in") {
            if (transferExceptionTo !== "") {
                Axios.post(`${BASE_URL}/api/user/transferUserNlad`, { enrollmentId: cpData?._id, repId: parseLoginRes?.repId, transferException: transferExceptionTo, userId: parseLoginRes?._id })
                    .then(() => { 
                        toast.current.show({ severity: "Success", summary: "Customer Status", detail: "Successfully Transfer-In" });
                  
                    })
                    .catch((err) => { 
                        toast.current.show({ severity: "error", summary: "Customer Status", detail: "Tranfer-In Failed" });
                  
                    });
            } else {
                setExceptionError(true);
            }
        }
      
         else if (statusTo === "suspend") { 

        } else if (statusTo === "restore") {
        } else {
            toast.current.show({ severity: "error", summary: "Customer Status", detail: "Please Select Status OR Type" });
        }
    }
   
  
    return (
        <div className="flex flex-wrap flex-row justify-content-around ">
           
            <div>
                <label className="block mt-4">Change Account Status To:</label>
                <Dropdown
                    value={statusTo}
                    onChange={(e) => {
                        setStatusTo(e.value);
                    }}
                    options={statusOptions}
                    className="field-width mt-3"
                    placeholder="Select Status"
                />
            </div>
            {statusTo === "transfer-in" ? (
                <div>
                    <label className="block mt-4">
                        Transfer Exception: <span className="steric">*</span>
                    </label>
                    <Dropdown
                        value={transferExceptionTo}
                        onChange={(e) => {
                            setTransferExceptionTo(e.value);
                            setExceptionError(false);
                        }}
                        options={transferExceptionOption}
                        placeholder="Transfer Exception"
                        className={classNames({ "p-invalid": exceptionError }, "input_text field-width mt-3")}
                    />
                    {exceptionError ? <p className="steric mt-2 ml-1">This Is Required</p> : undefined}
                </div>
            ) : undefined}

            <div>
                <label className="block mt-4">Connection Type:</label>
                <Dropdown
                    className="field-width mt-3"
                    value={connectionType}
                    onChange={(e) => {
                        setConnectionType(e.value);
                    }}
                    options={connectionTypeOption}
                    placeholder="Select Account Type"
                />
            </div>
            <div className="align-self-center mt-4">
                <Button onClick={UpdateStatus} label="Update Status " className="field-width mt-4"  disabled={isLoading} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} />
            </div>  
            <Toast ref={toast}/>
        </div>
    );
}
