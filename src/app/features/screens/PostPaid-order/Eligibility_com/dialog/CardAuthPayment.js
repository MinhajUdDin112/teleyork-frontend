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
            const dataToSend = {
                amount: formik.values.totalAmount,
                cardNumber: formik.values.cardNumber,
                cardCode: formik.values.cardCode,
                expirationDate: formik.values.expirationDate,
                invoiceNo: formik.values.accountId,
                customerId:userDetails?._id
            };
            try {
    
                const response = await Axios.post(`${BASE_URL}/api/web/invoices/chargeCreditCard`, dataToSend);
                if (response?.data?.messages?.resultCode == "Ok" || response?.data?.messages?.resultCode == "OK" || response?.data?.msg?.resultCode == "Ok") {

                    const dataToSend = {
                        invoiceType: "Sign Up",
                        customerId: userDetails?._id,
                        planId: object.plan,
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
                    console.log("error is ",response?.data?.data)
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
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("cardNumber") }, "input_text")} type="text" id="cardNumber" value={formik.values.cardNumber} maxLength={16} onChange={formik.handleChange} />
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