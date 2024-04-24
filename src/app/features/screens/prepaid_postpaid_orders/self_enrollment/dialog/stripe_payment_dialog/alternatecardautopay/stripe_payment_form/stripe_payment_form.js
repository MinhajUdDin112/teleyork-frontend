import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast"; 
import Axios from "axios";
import "./style/stripe_payment_form.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
export default function PaymentStripeForm({ setalternatecardid, setAlternateCardDetailVisibility, clientSecret, paid }) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
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
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            submitbuttonref.current.style.opacity = "1";
            setDisableSubmit(false);
            toast.current.show({ severity: "error", summary: "Alternate Card Addition ", detail: "An error occurred while Adding Alternate Card " });
        } else {   
            Axios.post(`${BASE_URL}/api/web/billing/retrieve-payment-intent`,{ 
                "paymentIntentId":paymentIntent.id
            }).catch(err=>{ 
                
            })
            toast.current.show({ severity: "success", summary: "Payment Processed", detail: "Payment has been successfully processed" });
            setalternatecardid(paymentIntent.id);
            setAlternateCardDetailVisibility(false);
        }
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
