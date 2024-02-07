import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import "./style/stripe_payment_form.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function PaymentStripeForm({ clientSecret, object, setActiveIndex, setPaymentDialogVisibility }) {
    const stripe = useStripe();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const toast = useRef(null);
    const elements = useElements();
    const handleSubmit = async (event) => {
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
            setDisableSubmit(false);
            toast.current.show({ severity: "error", summary: "Payment Processing Error", detail: "An error occurred while processing the payment" });
        } else {
            console.log(paymentIntent.id);
            localStorage.setItem("paymentstatus", "paid");

            localStorage.setItem("stripeId", paymentIntent.id);
            console.log("inside payment submit");
            //setActiveIndex(3);
            let paymentproceed = localStorage.getItem("paymentstatus");
            console.log("customer id is", object.customerid);
            if (paymentproceed === "paid") {
                let additionalFeature = [];
                let discounts = [];

                let devicepricing = JSON.parse(localStorage.getItem("devicepricing"));
                let simpricing = JSON.parse(localStorage.getItem("simpricing"));
                let dueDate = "";
                let applyLateFee = "";
                let oneTimeCharge = "";
                let planName = "";
                let planId = "";
                let planCharges = "";
                if (object.plan === simpricing._id) {
                    dueDate = simpricing.dueDate;
                    oneTimeCharge = simpricing.oneTimeCharge;
                    applyLateFee = simpricing.applyLateFee;
                    for (let i = 0; i < simpricing.selectdiscount.length; i++) {
                        let obj = {
                            name: simpricing.selectdiscount[i].discountname,
                            amount: simpricing.selectdiscount[i].amount,
                        };
                        discounts.push(obj);
                    }
                    for (let i = 0; i < simpricing.monthlyCharge.length; i++) {
                        if (object.billId === simpricing.monthlyCharge[i]._id) {
                            planName = simpricing.monthlyCharge[i].name;
                            planCharges = simpricing.monthlyCharge[i].price;
                            planId = simpricing.monthlyCharge[i]._id;
                        }
                    }
                    let simadditional = JSON.parse(localStorage.getItem("simadditionalfeaturearray"));
                    for (let k = 0; k < simadditional.length; k++) {
                        for (let i = 0; i < simpricing.additionalFeature.length; i++) {
                            if (simpricing.additionalFeature[i].featureName._id === simpricing.additionalFeature[i]._id) {
                                let obj = {
                                    name: simpricing.additionalFeature[i].featureName,
                                    amount: simpricing.additionalFeature[i].featureAmount,
                                };
                                additionalFeature.push(obj);
                            }
                        }
                    }
                } else {
                    dueDate = devicepricing.dueDate;
                    applyLateFee = devicepricing.applyLateFee;
                    oneTimeCharge = devicepricing.oneTimeCharge;
                    for (let i = 0; i < devicepricing.selectdiscount.length; i++) {
                        let obj = {
                            name: devicepricing.selectdiscount[i].discountname,
                            amount: devicepricing.selectdiscount[i].amount,
                        };
                        discounts.push(obj);
                    }
                    for (let i = 0; i < devicepricing.monthlyCharge.length; i++) {
                        if (object.plan === devicepricing.monthlyCharge[i]._id) {
                            planName = devicepricing.monthlyCharge[i].name;
                            planCharges = devicepricing.monthlyCharge[i].price;

                            planId = devicepricing.monthlyCharge[i]._id;
                        }
                    }
                    let deviceadditional = JSON.parse(localStorage.getItem("deviceadditionalfeaturearray"));
                    for (let k = 0; k < deviceadditional.length; k++) {
                        for (let i = 0; i < devicepricing.additionalFeature.length; i++) {
                            if (deviceadditional[k] === devicepricing.additionalFeature[i]._id) {
                                let obj = {
                                    name: devicepricing.additionalFeature[i].featureName,
                                    amount: devicepricing.additionalFeature[i].featureAmount,
                                };
                                additionalFeature.push(obj);
                            }
                        }
                    }
                }
                let plan = [];
                plan.push(object.plan);
                let dataToSend = {
                    stripeId: paymentIntent.id,
                    customerId: object.customerid,
                    invoiceType: "Sign Up",
                    totalAmount: object.totalamount,
                    additionalCharges: additionalFeature,
                    discount: discounts,
                    amountPaid: object.totalamount,
                    invoiceDueDate: dueDate,
                    lateFee: applyLateFee,
                    invoiceOneTimeCharges: oneTimeCharge,
                    invoiceStatus: "Paid",
                    planId: planId,
                    planName: planName,
                    planCharges: planCharges,
                    chargingType: "monthly",
                    invoicePaymentMethod: "Credit/Debit Card",
                    printSetting: "Both",
                    billingPeriod: {
                        from: "onActivation",
                        to: "onActivation",
                    },
                };
                console.log("Data To Send Is", dataToSend);
                Axios.post(`${BASE_URL}/api/web/invoices/generateInvoice`, dataToSend)
                    .then((response) => {
                        localStorage.setItem("paymentallinfo", JSON.stringify(response.data));
                        const loginRes = localStorage.getItem("userData");
                        const parseLoginRes = JSON.parse(loginRes);
                        const data = {
                            serviceProvider: parseLoginRes?.compony,
                            userId: parseLoginRes?._id,
                            customerId: object.customerid,
                            noteType: "Sign Up Plan Activation",
                            note: "Sign Up Plan  Activated Successfully",
                            priority: "highest",
                        };

                        Axios.post(`${BASE_URL}/api/web/notes/`, data)
                            .then(() => {
                                toast.current.show({ severity: "success", summary: "Sign Up Plan Note", detail: "Customer Plan Is Successfully Activated" });

                                setActiveIndex(3);
                            })
                            .catch((err) => {});
                    })
                    .catch((err) => {});
            }
            toast.current.show({ severity: "success", summary: "Payment Processed", detail: "Payment has been successfully processed" });
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
                <button disabled={disableSubmit} className="submit-button">
                    Submit
                </button>
            </form>
        </>
    );
}
