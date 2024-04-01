import React, { useRef ,useState} from "react";
import { Toast } from "primereact/toast";
import "./style/stripe_payment_form.css";     
import Axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";  
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function PaymentStripeForm({paid, amount,clientSecret,object,handleNext}) {
    const submitbuttonref=useRef(null)
    const stripe = useStripe();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const toast = useRef(null);
    const elements = useElements();
    const handleSubmit = async (event) => {  
        const basicData = localStorage.getItem("basicData");
        const parsebasicData = JSON.parse(basicData);
        const userDetails = parsebasicData?.data
         submitbuttonref.current.style.opacity="0.5"
         
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
            localStorage.setItem("paymentstatus", "pending");  
            
         submitbuttonref.current.style.opacity="1"
            setDisableSubmit(false);
            toast.current.show({ severity: "error", summary: "Payment Processing Error", detail: "An error occurred while processing the payment" });
        } else {
            console.log("Payment Details Is",paymentIntent.id)
            const dataToSend = {
                invoiceType: "Sign Up",
                customerId: userDetails?._id,
                planId: object.plan,
                totalAmount: amount,
                amountPaid: paid,
                billingPeriod: {
                    from: "onActivation",
                    to: "onActivation"
                },
                invoiceStatus: "Paid",
                paymentMethod: "Credit Card",
                chargingType: "Monthly",
                printSetting: "Both",
                selectProduct: object.billId,          
                paymentId:paymentIntent.id, 
                paymentChannel:"Stripe",   
            }
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/postpaidpaymentDetails`, dataToSend)
                if (response?.status === 201 || response?.status === 200) {
                    localStorage.setItem("dataToSend", JSON.stringify(dataToSend));
                    localStorage.setItem("productData", JSON.stringify(response?.data?.data));
                    localStorage.setItem("paymentstatus","paid")  
                    handleNext();
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg)
              
            } 
             
                      /*  const loginRes = localStorage.getItem("userData");
                        const parseLoginRes = JSON.parse(loginRes);
                        const data = {
                            serviceProvider: parseLoginRes?.company,
                            userId: parseLoginRes?._id,
                            customerId: object?.customerid,
                            noteType: "Sign Up Plan Activation",
                            note: "Sign Up Plan  Activated Successfully",
                            priority: "highest",
                        };

                        Axios.post(`${BASE_URL}/api/web/notes/`, data)
                            .then(() => {
                                toast.current.show({ severity: "success", summary: "Sign Up Plan Note", detail: "Customer Plan Is Successfully Activated" });

                                setActiveIndex(3);
                            })
                            .catch((err) => {});    */
                    
            }
            toast.current.show({ severity: "success", summary: "Payment Processed", detail: "Payment has been successfully processed" });
        
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
                <button style={{color:"white"}} ref={submitbuttonref} disabled={disableSubmit} className="submit-button">
                    Submit
                </button>
            </form>
        </>
    );
}
