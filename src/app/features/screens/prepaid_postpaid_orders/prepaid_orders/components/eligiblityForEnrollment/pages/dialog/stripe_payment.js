import React  from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";  
import Axios from "axios";
import { useEffect,useState } from "react";
import PaymentStripeForm from "./stripe_payment_dialog/stripe_payment_form"; 
const BASE_URL = process.env.REACT_APP_BASE_URL;
let stripePromise;
export default function PaymentStripModule({paid,plan,amount,object,setActiveIndex,setPaymentDialogVisibility}) { 
  
  let [clientSecret,setClientSecret]=useState(null)  
   
  useEffect(()=>{  
  stripePromise  = loadStripe(process.env.REACT_APP_BASE_URL); 
    Axios.post(`${BASE_URL}/api/web/billing/paymentintent`,{amount:paid}).then((response)=>{ 
        
         setClientSecret(response.data.clientSecret)
   }).catch(err=>{ 
   
   })
  },[])
    
    return ( <>
        {clientSecret !== null  ?
        <Elements stripe={stripePromise} options={{
            clientSecret
        }}>
           <PaymentStripeForm plan={plan} setPaymentDialogVisibility={setPaymentDialogVisibility} clientSecret={clientSecret} amount={amount} paid={paid} setActiveIndex={setActiveIndex} object={object}/>
        </Elements>:undefined      
}  
 </>
    );
}
