import React  from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";  
import Axios from "axios";
import { useEffect,useState } from "react";
import PaymentStripeForm from "./stripe_payment_dialog/stripe_payment_form";
const stripePromise = loadStripe("pk_test_51OcirDLVLQnJs4K0bDuAGI0kOqwpv7EPz8QAHP1ck2233eZ1EtPjZHT1CWgPamZKCAlEZdhPSAQwtjBKQXgpm9zF00t20QE6EZ");
export default function PaymentStripModule({amount}) {  
  let [clientSecret,setClientSecret]=useState(null)  
   
  useEffect(()=>{  
    Axios.post("http://dev-api.teleyork.com/api/web/billing/paymentintent",{amount:amount}).then((response)=>{ 
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
           <PaymentStripeForm clientSecret={clientSecret} amount={amount}/>
        </Elements>:undefined      
}  
 </>
    );
}
