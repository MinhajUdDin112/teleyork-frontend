import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import "./style/stripe_payment_form.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"; 
import Axios from "axios"; 
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function PaymentStripeForm({ clientSecret,object,setActiveIndex}) {
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
            console.log(paymentIntent.id)
             localStorage.setItem("paymentstatus","paid")  

             localStorage.setItem("stripeId",paymentIntent.id) 
             console.log("inside payment submit");
             //setActiveIndex(3); 
             let paymentproceed=localStorage.getItem("paymentstatus")   
             console.log("customer id is",object.customerid)
             if(paymentproceed === "paid"){  
                 let plan=[] 
                 plan.push(object.plan)
             let dataToSend = { 
                customerid:object.customerid, 
                plan:plan, 
                totalAmount:object.totalamount,  
                discount:object.discount, 
                additionalFeature:object.additional,
                 billId:object.billId,  
                 stripeId:localStorage.getItem("stripeId"), 
                 status:localStorage.getItem("paymentstatus"), 
                 billingPeriod:"onActivation"
             }; 
             console.log("Data To Send Is",dataToSend)  
             
             Axios.post(`${BASE_URL}/api/web/invoices/invoices`,dataToSend).then((response)=>{ 
               localStorage.setItem("paymentallinfo",JSON.stringify(response.data)) 
               setActiveIndex(3)
             }).catch(err=>{ 
                 
             })
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
