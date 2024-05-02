import React  from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";    
import { useRef } from "react"; 

import Axios from "axios";
import { Button } from "primereact/button";
import { useEffect,useState } from "react";
import PaymentStripeForm from "./stripe_payment_dialog/stripe_payment_form";
import { InputText } from "primereact/inputtext";
const BASE_URL = process.env.REACT_APP_BASE_URL;      
let stripePromise;
export default function PaymentStripModule({setRefresh,setPaymentDialogVisibility,userDetails,invoiceId,dueAmount}) {   
  let buttonref=useRef()  
  const [buttonDisabled,setDisabled]=useState(false)
  let [clientSecret,setClientSecret]=useState(null)  
  let [amountToPaid,setAmountToPaid]=useState("")
  useEffect(()=>{   
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
               

  },[])
    
    return ( <>
        {clientSecret !== null  ?
        <Elements stripe={stripePromise} options={{
            clientSecret
        }}>
           <PaymentStripeForm  setRefresh={setRefresh} dueAmount={dueAmount} setPaymentDialogVisibility={setPaymentDialogVisibility} clientSecret={clientSecret} userDetails={userDetails} invoiceId={invoiceId} paid={amountToPaid}/>
        </Elements>:<div>   
             <div className="flex flex-wrap flex-row justify-content-left"> 
              <div >
             <label className="block font-semibold block">Amount To Be Paid </label>    
              <InputText className="block mt-2" value={amountToPaid} onChange={(e)=>{ 
                setAmountToPaid(e.target.value)
              }} />       
              </div> 
              <div className="ml-2">
             <label className="block font-semibold">Total Amount To Paid </label>    
              <InputText className="block mt-2" disabled value={dueAmount} />       
              </div>
                 </div>
              <Button ref={buttonref} disabled={buttonDisabled ? true:false} className="block mt-2" onClick={()=>{    
                  setDisabled(true)
                Axios.post(`${BASE_URL}/api/web/billing/paymentintent`,{amount:parseFloat(amountToPaid).toFixed(2)}).then((response)=>{ 
                 
                 setClientSecret(response.data.clientSecret)
            }).catch(err=>{  
              setDisabled(false)
            })
              }}>Submit</Button>  
              
        </div>    
}  
 </>
    );
}
