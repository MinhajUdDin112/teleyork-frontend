import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import "./style/stripe_payment_form.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";  
export default function PaymentStripeForm({ clientSecret,object,handleNext}) {
    const stripe = useStripe();
    const toast = useRef(null);  
    const elements = useElements();
    const handleSubmit = async (event) => {
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
            localStorage.setItem("paymentstatus","pending") 
            toast.current.show({ severity: "error", summary: "Payment Processing Error", detail: "An error occurred while processing the payment" });
        } else { 
          
             localStorage.setItem("paymentstatus","paid")  
           
             localStorage.setItem("stripeId",paymentIntent.id) 
           
             //setActiveIndex(3); 
             let paymentproceed=localStorage.getItem("paymentstatus")   
       
             if(paymentproceed === "paid"){  
                handleNext();
              
           
         }
            toast.current.show({ severity: "success", summary: "Payment Processed", detail: "Payment has been successfully processed" });
        }
    };
    return (
        <>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        hidePostalCode: true,
                    }}
                />
                <button className="submit-button">Submit</button>
            </form>
        </>
    );
}
