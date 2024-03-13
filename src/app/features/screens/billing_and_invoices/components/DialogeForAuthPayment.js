import React, { useState } from "react";
import { Button } from "primereact/button";
import {  useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { useContext } from "react";
import { onAPISuccess } from "../pages/InvoicePage";
const BASE_URL = process.env.REACT_APP_BASE_URL;


const DialogeForAuthPayment = ({ userDetails, invoiceId, dueAmount }) => {
    
    const {handleAPISuccess} =  useContext(onAPISuccess);
     
    dueAmount = parseFloat(dueAmount).toFixed(2);
   
    const [isLoading, setIsLoading] = useState(false)
    const [authRes, setAuthRes] = useState();
    const [formattedCardNumber, setFormattedCardNumber] = useState("");



    const validationSchema = Yup.object().shape({
        cardNumber: Yup.string().required("Please Enter Card Number"),
        cardCode: Yup.string().required("Please Enter CVC"),
        expirationDate: Yup.string().required("Please select Exp Date"),
        totalAmount: Yup.string().required("Please Select Amount"),
        routingNumber: Yup.string().required("This is required"),
        AccountNumber: Yup.string().required("This is required"),
        paymentMethod: Yup.string().required("Please Select Paymet Method")



    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            totalAmount: "",
            cardNumber: "",
            cardCode: "",
            expirationDate: "",
            amount: dueAmount,
            invoiceStatus: "", 
            routingNumber: "",
            AccountNumber: "",
            NameOnAccount: "",
            refId: "",
            paymentMethod: "",
            accountId: userDetails?.accountId,
            accountType:"",
        },

        onSubmit: async (values, actions) => {


        },
    });
    const options = [

        { label: "Credit/Debit Card", value: "card" },
        { label: "E-Check", value: "echeck" },
    ];
    const cardApi = async () => {
        setIsLoading(true)
        const dataToSend = {
            amount: formik.values.totalAmount,
            cardNumber: formattedCardNumber.replace(/-/g, ""),
            cardCode: formik.values.cardCode,
            expirationDate: formik.values.expirationDate,
            invoiceNo: formik.values.accountId,
            invoiceId:invoiceId

        };
        try {

            const response = await Axios.post(`${BASE_URL}/api/web/invoices/chargeCreditCard`, dataToSend);
            if (response?.data?.messages?.resultCode == "Ok" || response?.data?.messages?.resultCode == "OK" || response?.data?.msg?.resultCode == "Ok") {
                setAuthRes(response?.data?.transactionResponse)
                // setdialogeForAuthPayment(false);
                toast.success("Successfully Paid")
                setIsLoading(false)
                const dataToSend = {
                    customerId:userDetails?._id,
                    amountPaid: formik.values.totalAmount,
                    invoiceStatus: "Paid",
                    invoicePaymentMethod: "Credit Card",
                }

                try {
                    const response = await Axios.put(`${BASE_URL}/api/web/invoices/updateInvoice?invoiceId=${invoiceId}`, dataToSend);

                    if (response?.status == "200" || response?.status == "201") {
                        toast.success("Invoice Update Successfully")
                        handleAPISuccess(true);
                    }

                } catch (error) {
                    toast.error("Update Invoice error is" + error?.response?.data?.msg)
                }
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
    }
    const echeckApi = async () => {
        setIsLoading(true)
        const dataToSend = {
          amount: formik.values.totalAmount,
            nameOnAccount: formik.values.NameOnAccount,
            routingNumber: formik.values.routingNumber,
            accountNumber: formik.values.AccountNumber,
           accountType:formik.values.accountType,
           invoiceNo: formik.values.accountId,
           invoiceId:invoiceId
        };
        try {

            const response = await Axios.post(`${BASE_URL}/api/web/invoices/echeckpayment`, dataToSend);
            if (response?.data?.messages?.resultCode == "Ok" || response?.data?.messages?.resultCode == "OK" || response?.data?.msg?.resultCode == "Ok" ) {
                setAuthRes(response?.data?.transactionResponse)
                // setdialogeForAuthPayment(false);
                toast.success("Successfully Paid")
                setIsLoading(false)
                const dataToSend = {
                   
                    amountPaid: formik.values.totalAmount,
                    invoiceStatus: "Paid",
                    invoicePaymentMethod: "E-Check",
                }

                try {
                    const response = await Axios.put(`${BASE_URL}/api/web/invoices/updateInvoice?invoiceId=${invoiceId}`, dataToSend);

                    if (response?.status == "200" || response?.status == "201") {
                        toast.success("Invoice Update Successfully")
                        handleAPISuccess(true);
                    }

                } catch (error) {
                    toast.error("Update Invoice error is" + error?.response?.data?.msg)
                }
            }
            else {
                console.log("error is ",response?.data?.transactionResponse)
                toast.error(response?.data?.transactionResponse?.errors?.error[0].errorText)
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    const formatExpirationDate = (value) => {
        // Remove non-numeric characters
        value = value.replace(/\D/g, '');
        // Insert "/" after the second character
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
    return (
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
                                            <td className="w-21rem ">Customer Id</td>
                                            <td> {userDetails?.accountId}</td>
                                        </tr>

                                        <tr className="text-lg">
                                            <td>Customer Name</td>
                                            <td>{userDetails?.firstName} {userDetails?.lastName}</td>
                                        </tr>

                                        <tr className="text-lg">
                                            <td>Phone Number</td>
                                            <td>{userDetails?.contact}</td>
                                        </tr>
                                        <tr className="text-lg">
                                            <td>
                                                Due Amount: <span className="steric">*</span>
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
                                        <tr className="text-lg">
                                            <td>
                                                Payment Method <span className="steric">*</span>
                                            </td>
                                            <td>
                                                {" "}
                                                <Dropdown
                                                    className="w-16rem"
                                                    id="paymentMethod"
                                                    options={options}
                                                    value={formik.values.paymentMethod}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("paymentMethod", e.value)
                                                        formik.handleChange(e);
                                                    }}
                                                    placeholder="Select Method"
                                                />
                                            </td>
                                        </tr>
                                        {
                                            formik.values.paymentMethod == "card" ? <>
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

                                                    <Button label="Submit" type="button" onClick={cardApi} disabled={isLoading} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} />
                                                </div>

                                            </> : formik.values.paymentMethod == "echeck" ? <>
                                                <tr>
                                                    <td className="text-lg">
                                                        Account Number <span className="steric">*</span>
                                                    </td>
                                                    <td>
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("AccountNumber") }, "input_text")} type="text" id="AccountNumber" value={formik.values.AccountNumber} maxLength={16} onChange={formik.handleChange} />
                                                        {getFormErrorMessage("AccountNumber")}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-lg">
                                                        Routing Number <span className="steric">*</span>
                                                    </td>
                                                    <td>
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("routingNumber") }, "input_text")} type="text" id="routingNumber" maxLength={9} value={formik.values.routingNumber} onChange={formik.handleChange} />
                                                        {getFormErrorMessage("routingNumber")}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-lg">
                                                        Name On Account <span className="steric">*</span>
                                                    </td>
                                                    <td>
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("NameOnAccount") }, "input_text")} type="text" id="NameOnAccount" value={formik.values.NameOnAccount} onChange={formik.handleChange} />

                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-lg">
                                                     Account Type <span className="steric">*</span>
                                                    </td>
                                                    <td>
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("accountType") }, "input_text")} type="text" id="accountType" value={formik.values.accountType} onChange={formik.handleChange} />

                                                    </td>
                                                </tr>
                                                <div className="mt-2">

                                                    <Button label="Submit" type="button" onClick={echeckApi} disabled={isLoading} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} />
                                                </div>
                                            </> : ""
                                        }


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
export default DialogeForAuthPayment