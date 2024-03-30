import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import "./style/stripe_payment_form.css";
import Axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function PaymentStripeForm({setRefresh,setPaymentDialogVisibility, userDetails, invoiceId, paid, clientSecret }) {
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
        } else {
            toast.current.show({ severity: "success", summary: "Payment Processed", detail: "Payment has been successfully processed" });

            const dataToSend = {
                customerId: userDetails?._id,
                amountPaid: paid,
                invoiceStatus: "Paid",
                invoicePaymentMethod: "Credit Card",
            };

            try {
                const response = await Axios.put(`${BASE_URL}/api/web/invoices/updateInvoice?invoiceId=${invoiceId}`, dataToSend);

                if (response?.status == "200" || response?.status == "201") {
                    toast.current.show({ severity: "success", summary: "Invoice Updation", detail: "Invoice Updated Successfully" });
                    setRefresh(prev=>!prev)
                    setPaymentDialogVisibility(prev=>!prev)  
                    
                    // handleAPISuccess(true);
                }
            } catch (error) {
                toast.current.show({ severity: "error", summary: "Invoice Updation", detail: error?.response?.data?.msg });
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
