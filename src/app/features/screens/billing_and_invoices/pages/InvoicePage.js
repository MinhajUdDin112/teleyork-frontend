import React, { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoiceTable";

import AdHocModal from "../components/modals/AdHocModal";
import BillingNavbar from "../../customer_profile/modals/BillingNavbar";
import Axios from "axios";
import { Card } from "primereact/card";
import {  useLocation } from 'react-router-dom';

import ChangeCustomerStatus from "../../customer_profile/change_customer_status/change_customer_status";
import { Dialog } from "primereact/dialog";

import { Button } from "primereact/button";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const InvoicePage = () => {
   
    const [accountType, setAccountType] = useState("")
    const [invoices, setInvoices] = useState([])
    const [changeCustomerStatusDialog, setChangeCustomerStatus] = useState(false);
     const [adHocInvoiceModal, setAdHocInvoiceModal] = useState(false);
    
    const [currentPlan, setCurrentPlan] = useState([])
   
    const [userDetails, setUserDetails] = useState()
    const [cpData, setCpData] = useState([]);

    const location = useLocation();
    const selectedId = location?.state && location?.state?.selectedId;

    const handleAPISuccess = (responseData) => {
        // Update data in main page state
        window.location.reload();
      };
    const getUserDetail = async () => {

        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${selectedId}`)
            if (response?.status == "200" || response?.status == "201") {
                setCpData(response?.data?.data || []);
                setUserDetails(response?.data?.data)
                setAccountType(response?.data?.data?.accountType);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getInvoice = async () => {
        const resp = await Axios.get(`${BASE_URL}/api/web/invoices/getinvoicebycustomerid?customerid=${selectedId}`)
        if (resp?.status == "200" || resp?.status == "201") {
            setCurrentPlan(resp?.data?.data)
            setInvoices(resp?.data?.data)
            localStorage.setItem("invoiceData", JSON.stringify(resp?.data?.data));
           
        }
    }
    useEffect(() => {
      
        getUserDetail();
        getInvoice()
    }, [selectedId])

    return (
        <>

       
        <Card>
            <BillingNavbar setChangeCustomerStatus={setChangeCustomerStatus} changeCustomerStatusDialog={changeCustomerStatusDialog} />
            <Dialog draggable={false} visible={changeCustomerStatusDialog} header={`Change Customer Status`} style={{ width: "70vw" }} onHide={() => setChangeCustomerStatus((prev) => !prev)}>
                <ChangeCustomerStatus cpData={cpData} setChangeCustomerStatus={setChangeCustomerStatus} />
            </Dialog>
            <Dialog draggable={false} visible={adHocInvoiceModal} header={`Add Adhoc Invoice`} style={{ width: "50vw" }} onHide={() => setAdHocInvoiceModal((prev) => !prev)}>
            <AdHocModal cpData={cpData} onAPISuccess={handleAPISuccess} adHocInvoiceModal={adHocInvoiceModal} setAdHocInvoiceModal={setAdHocInvoiceModal} />
            </Dialog>
           
               
           
            <div className="mt-5 mb-5 ml-5">  
<Button label="AD HOC Invoice" text raised onClick={()=>{setAdHocInvoiceModal(true)}}/>
        </div>
            <div className=" p-0 m-3 card">
                {/* <PlanInfo  /> */}
                <div className="mx-4">
                    <p className="m-0 text-lg font-bold " style={{ color: "red" }}>
                        •Row in red color are unpaid invoices
                    </p>
                    <p className="text-lg mt-2 font-bold text-blue-400" >
                        •Row in blue color are paid invoices
                    </p>
                </div>
                <InvoiceTable onAPISuccess={handleAPISuccess} userDetails={userDetails} className="mb-3" invoiceData={invoices} />

            </div>
          
    

           

        </Card>
        </>
    );
};

export default InvoicePage;
