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
            let additionalFeature = [];
            let discounts = [];
             let dueDate; 
             let oneTimeCharge; 
             let planName; 
             let applyLateFee; 
             let planCharges;  
             let planId;  
              
            let devicepricing = JSON.parse(localStorage.getItem("devicepricing"));
            let simpricing = JSON.parse(localStorage.getItem("simpricing"));
            if (object?.billId === simpricing?._id) {
                dueDate = simpricing?.dueDate;
                oneTimeCharge = simpricing?.oneTimeCharge;
                applyLateFee = simpricing?.applyLateFee;
                for (let i = 0; i < simpricing?.selectdiscount?.length; i++) {
                    let obj = {
                        name: simpricing.selectdiscount[i]?.discountname,
                        amount: simpricing.selectdiscount[i]?.amount,
                    };
                    discounts.push(obj);
                }   
                let plandata=JSON.parse(localStorage.getItem("planprices"))  
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
                 let plandata=JSON.parse(localStorage.getItem("planprices"))
                dueDate = devicepricing?.dueDate;
                applyLateFee = devicepricing?.applyLateFee;
                oneTimeCharge = devicepricing?.oneTimeCharge;
                for (let i = 0; i < devicepricing?.selectdiscount?.length; i++) {
                    let obj = {
                        name: devicepricing?.selectdiscount[i]?.discountname,
                        amount: devicepricing?.selectdiscount[i]?.amount,
                    };
                    discounts.push(obj);
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
            
            const dataToSend = {
                invoiceType: "Sign Up",
                customerId: userDetails?._id,
                planId: object.plan,
                totalAmount: amount, 
                additionalCharges: additionalFeature,
                discount: discounts,
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
