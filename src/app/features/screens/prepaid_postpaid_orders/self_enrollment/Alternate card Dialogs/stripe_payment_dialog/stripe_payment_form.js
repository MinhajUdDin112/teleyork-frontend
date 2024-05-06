import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import "./style/stripe_payment_form.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "axios";
//import AlternateCardPaymentStripModule from "../../AlternateCardAutoPay/stripe_payment_dialog/stripe_payment";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function PaymentStripeFormAlternateCard({setAlternateCardToken,setAlternateCardDetailVisibility }) {
    const submitbuttonref = useRef(null); 
    const stripe = useStripe();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const toast = useRef(null);
    const elements = useElements();
    const handleSubmit = async (event) => { 
        submitbuttonref.current.style.opacity = "0.5";
        setDisableSubmit(true);
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }      
       
        stripe.createToken(elements.getElement(CardElement)).then(function(result) {
            // Handle result.error or result.token      
           setAlternateCardToken(result.token.id)  
            setAlternateCardDetailVisibility(false)
          }).catch(err=>{ 
            submitbuttonref.current.style.opacity = "1";
            setDisableSubmit(false);
          })

      
    };
    const cardElementOptions = {
        hidePostalCode: true,
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };
    return (
        <>
            <Toast ref={toast} />
            

            <form onSubmit={handleSubmit}>
                <CardElement options={cardElementOptions} />
                <button style={{ color: "white" }} ref={submitbuttonref} disabled={disableSubmit} className="submit-button">
                    Submit
                </button>
            </form>
          
        </>
    );
}
