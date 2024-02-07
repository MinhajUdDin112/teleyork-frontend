import React  from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";  
import Axios from "axios";
import { useEffect,useState } from "react";
import PaymentStripeForm from "./stripe_payment_dialog/stripe_payment_form"; 
const BASE_URL = process.env.REACT_APP_BASE_URL;
const stripePromise = loadStripe("pk_test_51OcirDLVLQnJs4K0bDuAGI0kOqwpv7EPz8QAHP1ck2233eZ1EtPjZHT1CWgPamZKCAlEZdhPSAQwtjBKQXgpm9zF00t20QE6EZ");
export default function PaymentStripModule({amount,object,setActiveIndex,setPaymentDialogVisibility}) { 
  console.log("object is ",object)  
  let [clientSecret,setClientSecret]=useState(null)  
   
  useEffect(()=>{  
    Axios.post(`${BASE_URL}/api/web/billing/paymentintent`,{amount:amount}).then((response)=>{ 
          console.log(response.data.clientSecret)
         setClientSecret(response.data.clientSecret)
   }).catch(err=>{ 
   
   })
  },[])
    
    return ( <>
        {clientSecret !== null  ?
        <Elements stripe={stripePromise} options={{
            clientSecret
        }}>
           <PaymentStripeForm setPaymentDialogVisibility={setPaymentDialogVisibility} clientSecret={clientSecret} amount={amount} setActiveIndex={setActiveIndex} object={object}/>
        </Elements>:undefined      
}  
 </>
    );
}
