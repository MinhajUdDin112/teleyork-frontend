import React, { useEffect, useState } from "react";
import PlanInfo from "../components/PrepaidPlanInfo";
import InvoiceTable from "../components/InvoiceTable"; 
/*
import InvoiceTypes from "../components/InvoiceTypes"; 
import DetailedTransactionModal from "../components/modals/DetailedTransactionModal";
import NsfModal from "../components/modals/NsfModal";
import AdHocModal from "../components/modals/AdHocModal";
import MismatchInvoiceModal from "../components/modals/MismatchInvoiceModal";
import EbillModal from "../components/modals/EbillModal"; 
import MismatchBillModal from "../components/modals/MismatchBillModal";
import AdjustBalanceModal from "../components/modals/AdjustBalanceModal";
import PayInvoiceModal from "../components/modals/PayInvoiceModal";
import DiscountCreditModal from "../components/modals/DiscountCreditModal";
import AdjustWalletModal from "../components/modals/AdjustWalletModal";
import AddWalletModal from "../components/modals/AddWalletModal";
import PaymentModal from "../components/modals/PaymentModal";
import PaymentDetailModal from "../components/modals/PaymentDetailModal"; 

import PrepaidEditabaleInvoices from "../components/PrePaidEditableInvoices";*/
import BillingNavbar from "../components/BillingNavbar";
import Axios from "axios"; 
import { Card } from "primereact/card"; 
import { useLocation } from 'react-router-dom';
import PrepaidEditabaleInvoices from "../components/PrePaidEditableInvoices";
const BASE_URL = process.env.REACT_APP_BASE_URL; 

const InvoicePage = () => { 
    //const [detailedTransactionModal, setDetailedTransactionModal] = useState(false);
   // const [nsfModal, setNsfModal] = useState(false);  
    const [accountType,setAccountType]=useState("")   
    const [invoices,setInvoices]=useState([])
   // const [adHocInvoiceModal, setAdHocInvoiceModal] = useState(false);
   // const [misMatchInvoiceModal, setMisMatchInvoiceModal] = useState(false);
    //const [ebillModal, setEbillModal] = useState(false);
    //const [misMatchBillModal, setMisMatchBillModal] = useState(false);
   // const [adjustBalanceModal, setAdjustBalanceModal] = useState(false);
   // const [payInvoiceModal, setPayInvoiceModal] = useState(false);
  //  const [discountCreditModal, setDiscountCreditModal] = useState(false);
   // const [adjustWalletModal, setAdjustWalletModal] = useState(false); 
   /*setDetailedTransactionModal={setDetailedTransactionModal} */
   // const [addWalletModal, setAddWalletModal] = useState(false);
   // const [paymentModal, setPaymentModal] = useState(false); 
    const [currentPlan,setCurrentPlan]=useState([])   
    //const [paymentDetailModal, setPaymentDetailModal] = useState(false);
     const [userDetails,setUserDetails]=useState()

     const location = useLocation();
     const selectedId = location?.state && location?.state?.selectedId;

    useEffect(async ()=>{   
    let userid="" 
     console.log("called and user id is",selectedId)
 Axios.get( 
        `${BASE_URL}/api/user/userDetails?userId=${selectedId}`
      ).then(res=>{ 
        userid=res?.data?.data?._id  
        setUserDetails(res?.data?.data)
      setAccountType(res?.data?.data?.accountType);      
       
        Axios.get(`${BASE_URL}/api/web/invoices/getinvoicebycustomerid?customerid=${selectedId}`).then(responseinvoice=>{ 
          
             setCurrentPlan(responseinvoice?.data?.data?.invoice)  
              setInvoices(responseinvoice?.data?.data?.invoice)
              localStorage.setItem("invoiceData", JSON.stringify(responseinvoice?.data?.data?.invoice));

            
           }).catch(err=>{ 
           console.log("err",err)
           })
      }).catch(err=>{ 

      })
 
 },[selectedId])
    return (
        <Card>   
                 <BillingNavbar />   
                 <div className=" p-0 m-3 card">  
                 <PlanInfo currentPlan={currentPlan} />    
                 <div className="mx-4">
                    <p className="m-0 text-xs font-bold " style={{color:"red"}}>
                        •Row in red color are unpaid invoices
                    </p>
                    <p className="text-xs font-bold text-blue-400" >
                        •Row in blue color are paid invoices
                    </p>
                </div>   
                <InvoiceTable userDetails={userDetails} className="mb-3" invoiceData={invoices} />
                
                  </div>
            {/*
    

            <div className=" p-0 m-3 card">
               
                <div className=" border-round p-3  mx-4 mt-0">
                    <p className="font-bold text-xl ">Invoices</p>
                </div>
                
                <InvoiceTypes    
                accountType={accountType} 
                setNsfModal={setNsfModal}
                setAdHocInvoiceModal={setAdHocInvoiceModal}
                setMisMatchInvoiceModal={setMisMatchInvoiceModal}
                setEbillModal={setEbillModal}
                setMisMatchBillModal={setMisMatchBillModal}
                setAdjustBalanceModal={setAdjustBalanceModal}
                setPayInvoiceModal={setPayInvoiceModal}
                setDiscountCreditModal={setDiscountCreditModal}
                setAdjustWalletModal={setAdjustWalletModal}
                setAddWalletModal={setAddWalletModal}
            />  
                <Prepaid setPaymentModal={setPaymentModal} />
                <PrepaidEditabaleInvoices  setPaymentModal={setPaymentModal} />
               <div>
                    <DetailedTransactionModal detailedTransactionModal={detailedTransactionModal} setDetailedTransactionModal={setDetailedTransactionModal} />
                    <NsfModal nsfModal={nsfModal} setNsfModal={setNsfModal} />
                    <AdHocModal adHocInvoiceModal={adHocInvoiceModal} setAdHocInvoiceModal={setAdHocInvoiceModal} />
                    <MismatchInvoiceModal misMatchInvoiceModal={misMatchInvoiceModal} setMisMatchInvoiceModal={setMisMatchInvoiceModal} />
                    <EbillModal ebillModal={ebillModal} setEbillModal={setEbillModal} />
                    <MismatchBillModal misMatchBillModal={misMatchBillModal} setMisMatchBillModal={setMisMatchBillModal} />
                    <AdjustBalanceModal adjustBalanceModal={adjustBalanceModal} setAdjustBalanceModal={setAdjustBalanceModal} />
                    <AdjustWalletModal adjustWalletModal={adjustWalletModal} setAdjustWalletModal={setAdjustWalletModal} />
                    <PayInvoiceModal payInvoiceModal={payInvoiceModal} setPayInvoiceModal={setPayInvoiceModal} />
                    <DiscountCreditModal discountCreditModal={discountCreditModal} setDiscountCreditModal={setDiscountCreditModal} />
                    <AddWalletModal addWalletModal={addWalletModal} setAddWalletModal={setAddWalletModal} />
                    <PaymentModal paymentModal={paymentModal} setPaymentModal={setPaymentModal} setPaymentDetailModal={setPaymentDetailModal} />
                    <PaymentDetailModal paymentDetailModal={paymentDetailModal} setPaymentDetailModal={setPaymentDetailModal} />
                </div> 
                <div className="mx-4">
                    <p className="m-0 text-xs font-bold" style={{ color: "red" }}>
                        •Row in red color are unpaid invoices
                    </p>
                    <p className="text-xs font-bold" style={{ color: "blue" }}>
                        •Row in blue color are paid invoices
                    </p>
                </div>
                <br />
                <InvoiceTable userDetails={userDetails} className="mb-3" invoiceData={invoices} setDetailedTransactionModal={setDetailedTransactionModal} />
                
            </div>   
    */}  
       
        </Card>
    );
};

export default InvoicePage;
