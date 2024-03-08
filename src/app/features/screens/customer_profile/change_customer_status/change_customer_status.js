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
    const [disconnectReason, setdisconnectReason] = useState("");
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
        setIsLoading(true)
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then(() => { 
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false)
                                 
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                    setIsLoading(false)    
                });
                setIsLoading(false)
        }
        else  if (statusTo === "inTransit") {
            setIsLoading(true)
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then(() => {
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false)  
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                    setIsLoading(false)
                });
                setIsLoading(false)
        }
        else  if (statusTo === "delivered") {
            setIsLoading(true)
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                .then(() => {
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false)       
                })
                .catch((err) => { 
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Disconnection Failed" });
                    setIsLoading(false)       
                });
                setIsLoading(false)
        }

        else  if (statusTo === "active" && connectionType=="Internally") {
            setIsLoading(true)
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            try {
                const response= await  Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                if(response?.status=="200" || response?.status=="201"){
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false)
                }
            }  catch (error) {
                toast.current.show({ severity: "error", summary: "Customer Status", detail: error.response.data.msg || "Disconnection Failed" });
                setIsLoading(false)
            }
            setIsLoading(false)
        }
        else  if (statusTo === "evaluation" ) {
            setIsLoading(true)
            const dataToSend={
                customerId:cpData?._id,
                status:statusTo,
            }
            try {
                const response= await  Axios.post(`${BASE_URL}/api/user/statusnonelectronically`, dataToSend)
                if(response?.status=="200" || response?.status=="201"){
                    setChangeCustomerStatus(false)
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Changed" });
                    setIsLoading(false)
                }
            }  catch (error) {
                toast.current.show({ severity: "error", summary: "Customer Status", detail: error.response.data.msg || "Disconnection Failed" });
                setIsLoading(false)
            }
        
        }

        else if (statusTo === "active" && connectionType === "Externally") {
            setIsLoading(true)
            const dataToSend = {
                enrollmentId: cpData?._id,
                userId: parseLoginRes?._id
            };
        
            try {
               
                const response = await Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend);
                setIsLoading(false)
        
                if (response?.status === 200 || response?.status === 201) {
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Activated" });
                    setIsLoading(false)
                }
            } catch (error) {
                const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                setIsLoading(false)
            }
        
            setIsLoading(false);
        }
        
        else if (statusTo === "reconnect") {
            setIsLoading(true)
            Axios.post(`${BASE_URL}/api/user/reConnectMdnByPwg`, { enrollmentId: cpData?._id, planId: cpData?.plan?.planId, zip: cpData?.zip, esn: cpData?.esn })
                .then(() => { 
                    toast.current.show({ severity: "success", summary: "Customer Status", detail: "Successfully Reconnected" });
                    setIsLoading(false)
                  
                })
                .catch((err) => { 
                     
                    toast.current.show({ severity: "error", summary: "Customer Status", detail: "Reconnection Failed" });
                    setIsLoading(false)
                });
                setIsLoading(false)
        } else if (statusTo === "disconnect" && connectionType === "Externally" ) {
            setIsLoading(true)
            if (disconnectReason !== "") {
                Axios.post(`${BASE_URL}/api/user/disconnectMdnByPwg`, { enrollmentId: cpData?._id,  disconnectReason: disconnectReason })
                    .then(() => { 
                        toast.current.show({ severity: "Success", summary: "Customer Status", detail: "Successfully Disconnected" });
                        setIsLoading(false)
                  
                    })
                    .catch((error) => { 
                        const errorMessage = error.response?.data?.msg || "Disconnection Failed";
                        toast.current.show({ severity: "error", summary: "Customer Status", detail: errorMessage });
                        setIsLoading(false)
                    });
            } else {
                setExceptionError(true);
            }
        }
      
        else {
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
            {statusTo === "disconnect" ? (
                <> 
               
                 <div>
                    
                <label className="block mt-4">
                    Disconnect Reason: <span className="steric">*</span>
                </label>
                <Dropdown
               
                    value={disconnectReason}
                    onChange={(e) => {
                        setdisconnectReason(e.value);
                        setExceptionError(false);
                    }}
                    options={transferExceptionOption}
                    placeholder="Select Reason"
                    className={classNames({ "p-invalid": exceptionError }, "input_text field-width mt-3")}
                />
                {exceptionError ? <p className="steric mt-2 ml-1">This Is Required</p> : undefined}
            </div></>
              
            ) : undefined}
{
    statusTo === "disconnect" || statusTo==="active" || statusTo==="suspend" || statusTo==="reconnect" ?    <div>
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
</div> :""
}
         
            <div className="align-self-center mt-4">
                <Button onClick={UpdateStatus } label="Update Status " className="field-width mt-4"  disabled={isLoading} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""}  />
            </div>  
            <Toast ref={toast}/>
        </div>
    );
}
