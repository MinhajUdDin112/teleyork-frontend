import React, { useState } from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const CardAuthPayment =({amount,handleNext,object})=>{
    const [formattedCardNumber, setFormattedCardNumber] = useState("");
    amount = parseFloat(amount).toFixed(2);
    const basicData = localStorage.getItem("basicData");
    const parsebasicData = JSON.parse(basicData);
    const userDetails = parsebasicData?.data
    const [isLoading, setIsLoading] = useState(false)
    const validationSchema = Yup.object().shape({
        cardNumber: Yup.string().required("Please Enter Card Number"),
        cardCode: Yup.string().required("Please Enter CVC"),
        expirationDate: Yup.string().required("Please select Exp Date"),
        totalAmount: Yup.string().required("Please Select Amount"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            totalAmount: "",
            cardNumber: "",
            cardCode: "",
            expirationDate: "",
            amount: amount, 
        },

        onSubmit: async (values, actions) => {
            setIsLoading(true) 
             let serviceprovider=JSON.parse(localStorage.getItem("userData")).company  
               let Modules=JSON.parse(localStorage.getItem("permissions"))   
               let moduleid;
                for(let i=0;i<Modules.length;i++){ 
                     if(Modules[i].module === "Postpaid Orders"){  
                         moduleid=Modules[i].moduleId
                     }
                } 
            const dataToSend = {
                amount: formik.values.totalAmount,
                cardNumber: formattedCardNumber.replace(/-/g, ""),
                cardCode: formik.values.cardCode,
                expirationDate: formik.values.expirationDate,
                invoiceNo: formik.values.accountId,
                customerId:userDetails?._id, 
                serviceProvider:serviceprovider, 
                modules:moduleid, 
                paymentGateway:"Authorize"
            };
            try {
    
                const response = await Axios.post(`${BASE_URL}/api/web/invoices/chargeCreditCard`, dataToSend);  
                if (response?.data?.messages?.resultCode == "Ok" || response?.data?.messages?.resultCode == "OK" || response?.data?.msg?.resultCode == "Ok") {
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
                        additionalCharges: object.additional,
                        discount: discounts,
                        totalAmount: amount,
                        amountPaid: formik.values.totalAmount,
                        billingPeriod: {
                            from: "onActivation",
                            to: "onActivation"
                        },
                        invoiceStatus: "Paid",
                        paymentMethod: "Credit Card",
                        chargingType: "Monthly",
                        printSetting: "Both",
                        selectProduct: object.billId,            
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
                        setIsLoading(false)
                    } 
                    setIsLoading(false)   
                }
                else {
                    toast.error(response?.data?.data?.message[0]?.text)
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false)
            }
            setIsLoading(false)
        },
    });

    const formatExpirationDate = (value) => {
        
        value = value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4) + "-" + value.slice(4);
        }
        return value;
    };

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1-") // Insert hyphens after every 4 digits
            .trim()
            .slice(0, 19); // Limit to 19 characters
    };

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setFormattedCardNumber(formattedValue);
        formik.setFieldValue("cardNumber", e.target.value.replace(/-/g, "")); // Remove hyphens before storing in formik state
    };
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return(
        <>
         <form onSubmit={formik.handleSubmit}>
                <ToastContainer />
                <div className="col-12  ">
                    <div className="p-3">
                        <div className=" h-full ">
                            <div>
                                <table className="cp_table w-full">
                                    <tbody>
                                        <tr className="text-lg">
                                            <td>
                                                Total Amount: <span className="steric">*</span>
                                            </td>
                                            <td>
                                                {" "}
                                                <InputText type="text" id="amount" value={formik.values.amount} onChange={formik.handleChange} disabled />
                                            </td>
                                        </tr>
                                        <tr className="text-lg">
                                            <td>
                                                Amount <span className="steric">*</span>
                                            </td>
                                            <td>
                                                {" "}
                                                <InputText type="text" id="totalAmount" value={formik.values.totalAmount} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("totalAmount") }, "input_text")} />
                                                {getFormErrorMessage("totalAmount")}
                                            </td>
                                        </tr>
                                      
                                     
                                                <tr>
                                                    <td className="text-lg">
                                                        Card Number <span className="steric">*</span>
                                                    </td>
                                                    <td>
                                                    <InputText
                                                    className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("cardNumber") }, "input_text")}
                                                    type="text"
                                                    id="cardNumber"
                                                    value={formattedCardNumber}
                                                    maxLength={19}
                                                    onChange={handleCardNumberChange}
                                                />
                                                        {getFormErrorMessage("cardNumber")}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-lg">
                                                        CVC <span className="steric">*</span>
                                                    </td>
                                                    <td>
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("cardCode") }, "input_text")} type="text" id="cardCode" value={formik.values.cardCode} maxLength={3} onChange={formik.handleChange} />
                                                        {getFormErrorMessage("cardCode")}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-lg">
                                                        Exp Date <span className="steric">*</span>
                                                    </td>
                                                    <InputText
                                                        className={classNames({ " ml-3": true, "p-invalid": isFormFieldValid("expirationDate") }, "input_text")}
                                                        type="text"
                                                        id="expirationDate"
                                                        maxLength={7}
                                                        placeholder="YYYY-MM"
                                                        value={formatExpirationDate(formik.values.expirationDate)}
                                                        onChange={(e) => {
                                                            const formattedValue = formatExpirationDate(e.target.value);
                                                            formik.setFieldValue("expirationDate", formattedValue);
                                                        }}
                                                    />

                                                </tr>
                                                <div className="mt-2">

                                                    <Button label="Submit" type="submit"  disabled={isLoading} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} />
                                                </div>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </>
    )
}
export default CardAuthPayment