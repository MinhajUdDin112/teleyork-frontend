import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import "./style/stripe_payment_form.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "axios";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import PaymentStripModuleAlternateCard from "../../Alternate card Dialogs/stripe_payment";
//import AlternateCardPaymentStripModule from "../../AlternateCardAutoPay/stripe_payment_dialog/stripe_payment";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function PaymentStripeForm({ plan, clientSecret, paid, object, setActiveIndex, setPaymentDialogVisibility }) {
    const submitbuttonref = useRef(null);
    const [cardNumber, setCardNumber] = useState("");
    const [cvcNumber, setCvcNumber] = useState("");
    const [cardMonth, setCardMonth] = "";
    const [cardYear, setCardYear] = useState("");
    const [autoPayDate, setAutoPayDate] = useState("");
    const [alternateCardToken, setAlternateCardToken] = useState("");
    const [alternateCardDetailVisibility, setAlternateCardDetailVisibility] = useState(false);
    const [autoPay, setAutoPay] = useState(true);
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
            localStorage.setItem("paymentstatus", "pending");

            toast.current.show({ severity: "error", summary: "Payment Processing Error", detail: "An error occurred while processing the payment" });

            setTimeout(() => {
                setPaymentDialogVisibility(false);
            }, 1000);
        } else {
            if (alternateCardToken === "") {
                stripe
                    .createToken(elements.getElement(CardElement))
                    .then(function (result) {
                        const token = result?.token?.id;
                        let customerData = JSON.parse(localStorage.getItem("prepaidbasicData"))?.data;
                        const datatosendincreateAccount = {
                            name: `${customerData?.firstName} ${customerData?.lastName}`,
                            email: `${customerData?.email}`,
                            phone: `+1${customerData?.contact}`,
                            description: "New customer account",
                        };
                        Axios.post(`${BASE_URL}/api/bannerRouter/create_account`, datatosendincreateAccount)
                            .then((customercreation) => {
                                let customerId = customercreation?.data?.data?.id;
                                localStorage.setItem("paymentstatus", "paid");

                                localStorage.setItem("stripeId", paymentIntent.id);

                                //setActiveIndex(3);
                                let paymentproceed = localStorage.getItem("paymentstatus");

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
                                    if (object?.billId === simpricing?._id) {
                                        dueDate = simpricing?.dueDate;
                                        oneTimeCharge = simpricing?.oneTimeCharge;
                                        applyLateFee = simpricing?.applyLateFee;
                                        let simselecteddiscounts = JSON.parse(localStorage.getItem("simdiscountobjectarray"));

                                        for (let i = 0; i < simpricing?.selectdiscount?.length; i++) {
                                            for (let k = 0; k < simselecteddiscounts.length; k++) {
                                                if (simselecteddiscounts[k] === simpricing?.selectdiscount[i]?._id) {
                                                    let obj = {
                                                        name: simpricing?.selectdiscount[i]?.discountname,
                                                        amount: simpricing?.selectdiscount[i]?.amount,
                                                    };
                                                    discounts.push(obj);
                                                }
                                            }
                                        }
                                        let plandata = JSON.parse(localStorage.getItem("planprices"));
                                        for (let i = 0; i < plandata?.length; i++) {
                                            if (object.plan === plandata[i]?._id) {
                                                planName = plandata[i]?.name;
                                                planCharges = plandata[i]?.price;

                                                planId = plandata[i]?._id;
                                            }
                                        }

                                        let simadditional = JSON.parse(localStorage.getItem("simadditionalfeaturearray"));
                                        for (let k = 0; k < simadditional?.length; k++) {
                                            for (let i = 0; i < simpricing?.additionalFeature?.length; i++) {
                                                if (simpricing?.additionalFeature[i]?._id === simadditional[k]) {
                                                    let obj = {
                                                        name: simpricing?.additionalFeature[i]?.featureName,
                                                        amount: simpricing?.additionalFeature[i]?.featureAmount,
                                                    };
                                                    additionalFeature.push(obj);
                                                }
                                            }
                                        }
                                    } else {
                                        let plandata = JSON.parse(localStorage.getItem("planprices"));
                                        dueDate = devicepricing?.dueDate;
                                        applyLateFee = devicepricing?.applyLateFee;
                                        oneTimeCharge = devicepricing?.oneTimeCharge;
                                        let deviceselecteddiscounts = JSON.parse(localStorage.getItem("devicediscountobjectarray"));

                                        for (let i = 0; i < devicepricing?.selectdiscount?.length; i++) {
                                            for (let k = 0; k < deviceselecteddiscounts.length; k++) {
                                                if (deviceselecteddiscounts[k] === devicepricing?.selectdiscount[i]?._id) {
                                                    let obj = {
                                                        name: devicepricing?.selectdiscount[i]?.discountname,
                                                        amount: devicepricing?.selectdiscount[i]?.amount,
                                                    };
                                                    discounts.push(obj);
                                                }
                                            }
                                        }
                                        for (let i = 0; i < plandata?.length; i++) {
                                            if (object.plan === plandata[i]?._id) {
                                                planName = plandata[i]?.name;
                                                planCharges = plandata[i]?.price;

                                                planId = plandata[i]?._id;
                                            }
                                        }
                                        let deviceadditional = JSON.parse(localStorage.getItem("deviceadditionalfeaturearray"));
                                        for (let k = 0; k < deviceadditional?.length; k++) {
                                            for (let i = 0; i < devicepricing?.additionalFeature?.length; i++) {
                                                if (deviceadditional[k] === devicepricing?.additionalFeature[i]?._id) {
                                                    let obj = {
                                                        name: devicepricing?.additionalFeature[i]?.featureName,
                                                        amount: devicepricing?.additionalFeature[i]?.featureAmount,
                                                    };
                                                    additionalFeature.push(obj);
                                                }
                                            }
                                        }
                                    }
                                    let plan = object?.plan;
                                    // let dateincasepart
                                    //object.totalAmount === paid ? dueDate:"Partial"
                                    let dataToSend = {
                                        paymentId: paymentIntent.id,
                                        isAutopay: autoPay,
                                        customerId: object.customerid,
                                        invoiceType: "Sign Up",
                                        totalAmount: object.totalamount,
                                        additionalCharges: additionalFeature,
                                        discount: discounts,
                                        amountPaid: paid,
                                        selectProduct: object?.billId,
                                        invoiceDueDate: dueDate,
                                        lateFee: applyLateFee,
                                        invoiceOneTimeCharges: oneTimeCharge,
                                        invoiceStatus: object.totalamount <=  paid  ? "Paid" : "Partial",
                                        planId: plan,
                                        planName: planName,
                                        planCharges: planCharges,
                                        chargingType: "monthly",
                                        invoicePaymentMethod: "Credit/Debit Card",
                                        printSetting: "Both",
                                        isInvoice: true,

                                        billingPeriod: {
                                            from: "onActivation",
                                            to: "onActivation",
                                        },
                                    };
                                    if (autoPay) {
                                        dataToSend.paymentMethodId = token;
                                        dataToSend.stripeCustomerId = customerId;
                                    }
                                    localStorage.setItem("datasendforinvoice", JSON.stringify(dataToSend));
                                    Axios.post(`${BASE_URL}/api/web/invoices/prepaidgenerateInvoice`, dataToSend)
                                        .then((response) => {
                                            localStorage.setItem("paymentallinfo", JSON.stringify(response.data));
                                            const loginRes = localStorage.getItem("userData");
                                            const parseLoginRes = JSON.parse(loginRes);
                                            const data = {
                                                serviceProvider: parseLoginRes?.company,
                                                userId: parseLoginRes?._id,
                                                customerId: object?.customerid,
                                                noteType: "Sign Up Plan Activation",
                                                note: "Sign Up Plan  Activated Successfully",
                                                priority: "medium",
                                            };

                                            Axios.post(`${BASE_URL}/api/web/notes/addnotifcationNote`, data)
                                                .then(() => {
                                                    toast.current.show({ severity: "success", summary: "Sign Up Plan Note", detail: "Customer Plan Is Successfully Activated" });

                                                    setActiveIndex(3);
                                                })
                                                .catch((err) => {});
                                        })
                                        .catch((err) => {});
                                }
                                toast.current.show({ severity: "success", summary: "Payment Processed", detail: "Payment has been successfully processed" });
                            })
                            .catch((err) => {});
                    })
                    .catch((err) => {});
            } else {
                let customerData = JSON.parse(localStorage.getItem("prepaidbasicData"))?.data;
                const datatosendincreateAccount = {
                    name: `${customerData?.firstName} ${customerData?.lastName}`,
                    email: `${customerData?.email}`,
                    phone: `+1${customerData?.contact}`,
                    description: "New customer account",
                };
                Axios.post(`${BASE_URL}/api/bannerRouter/create_account`, datatosendincreateAccount)
                    .then((customercreation) => {
                        let customerId = customercreation?.data?.data?.id;
                        localStorage.setItem("paymentstatus", "paid");

                        localStorage.setItem("stripeId", paymentIntent.id);

                        //setActiveIndex(3);
                        let paymentproceed = localStorage.getItem("paymentstatus");

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
                            if (object?.billId === simpricing?._id) {
                                dueDate = simpricing?.dueDate;
                                oneTimeCharge = simpricing?.oneTimeCharge;
                                applyLateFee = simpricing?.applyLateFee;
                                let simselecteddiscounts = JSON.parse(localStorage.getItem("simdiscountobjectarray"));

                                for (let i = 0; i < simpricing?.selectdiscount?.length; i++) {
                                    for (let k = 0; k < simselecteddiscounts.length; k++) {
                                        if (simselecteddiscounts[k] === simpricing?.selectdiscount[i]?._id) {
                                            let obj = {
                                                name: simpricing?.selectdiscount[i]?.discountname,
                                                amount: simpricing?.selectdiscount[i]?.amount,
                                            };
                                            discounts.push(obj);
                                        }
                                    }
                                }
                                let plandata = JSON.parse(localStorage.getItem("planprices"));
                                for (let i = 0; i < plandata?.length; i++) {
                                    if (object.plan === plandata[i]?._id) {
                                        planName = plandata[i]?.name;
                                        planCharges = plandata[i]?.price;

                                        planId = plandata[i]?._id;
                                    }
                                }

                                let simadditional = JSON.parse(localStorage.getItem("simadditionalfeaturearray"));
                                for (let k = 0; k < simadditional?.length; k++) {
                                    for (let i = 0; i < simpricing?.additionalFeature?.length; i++) {
                                        if (simpricing?.additionalFeature[i]?._id === simadditional[k]) {
                                            let obj = {
                                                name: simpricing?.additionalFeature[i]?.featureName,
                                                amount: simpricing?.additionalFeature[i]?.featureAmount,
                                            };
                                            additionalFeature.push(obj);
                                        }
                                    }
                                }
                            } else {
                                let plandata = JSON.parse(localStorage.getItem("planprices"));
                                dueDate = devicepricing?.dueDate;
                                applyLateFee = devicepricing?.applyLateFee;
                                oneTimeCharge = devicepricing?.oneTimeCharge;
                                let deviceselecteddiscounts = JSON.parse(localStorage.getItem("devicediscountobjectarray"));

                                for (let i = 0; i < devicepricing?.selectdiscount?.length; i++) {
                                    for (let k = 0; k < deviceselecteddiscounts.length; k++) {
                                        if (deviceselecteddiscounts[k] === devicepricing?.selectdiscount[i]?._id) {
                                            let obj = {
                                                name: devicepricing?.selectdiscount[i]?.discountname,
                                                amount: devicepricing?.selectdiscount[i]?.amount,
                                            };
                                            discounts.push(obj);
                                        }
                                    }
                                }
                                for (let i = 0; i < plandata?.length; i++) {
                                    if (object.plan === plandata[i]?._id) {
                                        planName = plandata[i]?.name;
                                        planCharges = plandata[i]?.price;

                                        planId = plandata[i]?._id;
                                    }
                                }
                                let deviceadditional = JSON.parse(localStorage.getItem("deviceadditionalfeaturearray"));
                                for (let k = 0; k < deviceadditional?.length; k++) {
                                    for (let i = 0; i < devicepricing?.additionalFeature?.length; i++) {
                                        if (deviceadditional[k] === devicepricing?.additionalFeature[i]?._id) {
                                            let obj = {
                                                name: devicepricing?.additionalFeature[i]?.featureName,
                                                amount: devicepricing?.additionalFeature[i]?.featureAmount,
                                            };
                                            additionalFeature.push(obj);
                                        }
                                    }
                                }
                            }
                            let plan = object?.plan;
                            // let dateincasepart
                            //object.totalAmount === paid ? dueDate:"Partial"
                            let dataToSend = {
                                paymentId: paymentIntent.id,
                                isAutopay: autoPay,

                                customerId: object.customerid,
                                invoiceType: "Sign Up",
                                totalAmount: object.totalamount,
                                additionalCharges: additionalFeature,
                                discount: discounts,
                                amountPaid: paid,
                                selectProduct: object?.billId,
                                invoiceDueDate: dueDate,
                                lateFee: applyLateFee,
                                invoiceOneTimeCharges: oneTimeCharge,
                                invoiceStatus: object.totalamount === paid ? "Paid" : "Partial",
                                planId: plan,
                                planName: planName,
                                planCharges: planCharges,
                                chargingType: "monthly",
                                invoicePaymentMethod: "Credit/Debit Card",
                                printSetting: "Both",
                                isInvoice: true,

                                billingPeriod: {
                                    from: "onActivation",
                                    to: "onActivation",
                                },
                            };
                            if (autoPay) {
                                dataToSend.paymentMethodId = alternateCardToken;
                                dataToSend.stripeCustomerId = customerId;
                            }
                            localStorage.setItem("datasendforinvoice", JSON.stringify(dataToSend));
                            Axios.post(`${BASE_URL}/api/web/invoices/prepaidgenerateInvoice`, dataToSend)
                                .then((response) => {
                                    localStorage.setItem("paymentallinfo", JSON.stringify(response.data));
                                    const loginRes = localStorage.getItem("userData");
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
                                        .catch((err) => {});
                                })
                                .catch((err) => {});
                        }
                        toast.current.show({ severity: "success", summary: "Payment Processed", detail: "Payment has been successfully processed" });
                    })
                    .catch((err) => {});
            }
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
            <div className="flex w-full flex-wrap flex-row mb-4 p-2 justify-content-center ">
                <div>
                    <div className=" p-2 flex flex-wrap flex-row justify-content-center justify-center">
                        <InputSwitch
                            style={{ backgroundColor: "#0475B4", borderRadius: "100px" }}
                            checked={autoPay}
                            onChange={(e) => {
                                setAutoPay((prev) => !prev);
                            }}
                        />
                        <p className="ml-2"> Auto Pay</p>
                    </div>
                </div>
                {autoPay ? (
                    <Button
                        style={{ backgroundColor: "#7270D1", height: "34px", fontWeight: "300", fontFamily: "Inter", fontSize: "14px" }}
                        label="Auto Pay Card Details"
                        onClick={() => {
                            setAlternateCardDetailVisibility(true);
                        }}
                        className="ml-4"
                    />
                ) : undefined}
            </div>

            <form onSubmit={handleSubmit}>
                <CardElement options={cardElementOptions} />
                <div className="flex flex-wrap flex-row justify-content-center w-full">
                    <button className="paymentsub" ref={submitbuttonref} disabled={disableSubmit}>
                        Submit
                    </button>
                </div>
            </form>
            <Dialog
                header="Alternate Card Details"
                visible={alternateCardDetailVisibility}
                style={{ width: "50vw" }}
                onHide={() => {
                    setAlternateCardDetailVisibility(false);
                }}
            >
                {/*  <AlternateCardPaymentStripModule setAutoPayDate={setAutoPayDate} cardNumber={cardNumber} cardYear={cardYear} cardMonth={cardMonth} cvcNumber={cvcNumber} setCardNumber={setCardNumber} setCvcNumber={setCvcNumber} setCardYear={setCardYear} setCardMonth={setCardMonth} setAlternateCardDetailVisibility={setAlternateCardDetailVisibility} />  */}
                <PaymentStripModuleAlternateCard setAlternateCardToken={setAlternateCardToken} setAlternateCardDetailVisibility={setAlternateCardDetailVisibility} />
            </Dialog>
        </>
    );
}
