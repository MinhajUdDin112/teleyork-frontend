import React  from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";  
import Axios from "axios";
import { useEffect,useState } from "react";
import PaymentStripeForm from "./stripe_payment_dialog/stripe_payment_form";
const BASE_URL = process.env.REACT_APP_BASE_URL;    
let stripePromise;
export default function PaymentStripModule({paid,amount,object,handleNext}) { 
  let [clientSecret,setClientSecret]=useState(null)  

  useEffect(()=>{   
     
  stripePromise = loadStripe("pk_live_51MNO1uJFPhiWFo6UU8IwS2ib1j73Pn2KivFGxWnzHllASLrk5Ps5xVAkH1JcJhfzi4ydEsvbRUS8Ip5dHTbItFdF008Cy5nMc3");
    Axios.post(`${BASE_URL}/api/web/billing/paymentintent`,{amount:parseFloat(paid).toFixed(2)}).then((response)=>{ 
     
     setClientSecret(response.data.clientSecret)
}).catch(err=>{ 

})
  },[])
    
    return ( <>
        {clientSecret !== null  ?
        <Elements stripe={stripePromise} options={{
            clientSecret
        }}>
           <PaymentStripeForm clientSecret={clientSecret} paid={paid} amount={amount} handleNext={handleNext} object={object}/>
        </Elements>:undefined      
}  
 </>
    );
}
