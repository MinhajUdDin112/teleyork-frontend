import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import moment from "moment/moment";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { tr } from "date-fns/locale";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DialogeForAuthPayment = ({ userDetails, invoiceData, setdialogeForAuthPayment, onAPISuccess }) => {


    const [authRes, setAuthRes] = useState();


    const remainingaAmount = invoiceData[0]?.dueAmount

    const validationSchema = Yup.object().shape({
        cardNumber: Yup.string().required("Please Enter Card Number"),
        cardCode: Yup.string().required("Please Enter CVC"),
        expirationDate: Yup.string().required("Please select Exp Date"),
        totalAmount: Yup.string().required("Please Select Amount"),
        NameOnAccount: Yup.string().required("This is required"),
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
            amount: remainingaAmount,
            invoiceStatus: "", // Initialize invoiceStatus field
            routingNumber: "",
            AccountNumber: "",
            NameOnAccount: "",
            refId: "",
            paymentMethod: "",
        },

        onSubmit: async (values, actions) => {


        },
    });
    const options = [

        { label: "Credit/Debit Card", value: "card" },
        { label: "E-Check", value: "echeck" },


    ];
    const cardApi = async()=>{
        const dataToSend = {
            totalAmount: formik.values.totalAmount,
            cardNumber: formik.values.cardNumber,
            cardCode: formik.values.cardCode,
            expirationDate: formik.values.expirationDate,
        };
        try {

            const response = await Axios.post(`${BASE_URL}/api/web/invoices/chargeCreditCard`, dataToSend);
            if (response?.data?.messages?.resultCode == "Ok" || response?.data?.messages?.resultCode == "OK") {
                setAuthRes(response?.data?.transactionResponse)
                // setdialogeForAuthPayment(false);
                toast.success("Successfully Paid")

                const dataToSend = {
                    totalAmount: userDetails?.totalAmount,
                    amountPaid: formik.values.totalAmount,
                    invoiceStatus: "Paid",
                    invoicePaymentMethod: "Credit Card",
                    transId: response?.data?.transactionResponse?.transId,
                    networkTransId: response?.data?.transactionResponse?.networkTransId

                }

                try {
                    const response = await Axios.put(`${BASE_URL}/api/web/invoices/updateInvoice?invoiceId=${invoiceData[0]?._id}`, dataToSend);

                    if (response?.status == "200" || response?.status == "201") {
                        toast.success("Invoice Update Successfully")
onAPISuccess(true);
                    }

                } catch (error) {
                    toast.error("Update Invoice error is" + error?.response?.data?.msg)
                }
            }
            else {
                toast.error(response?.data?.transactionResponse?.errors?.error[0].errorText)
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
    }
    }
const echeckApi=async()=>{
    const dataToSend = {
        totalAmount: formik.values.totalAmount,
        NameOnAccount: formik.values.NameOnAccount,
        routingNumber: formik.values.routingNumber,
        AccountNumber: formik.values.AccountNumber,
        refId: userDetails?.enrollmentId
    };
    try {

        const response = await Axios.post(`${BASE_URL}/api/web/invoices/echeckpayment`, dataToSend);
        if (response?.data?.messages?.resultCode == "Ok" || response?.data?.messages?.resultCode == "OK") {
            setAuthRes(response?.data?.transactionResponse)
            // setdialogeForAuthPayment(false);
            toast.success("Successfully Paid")

            const dataToSend = {
                totalAmount: userDetails?.totalAmount,
                amountPaid: formik.values.totalAmount,
                invoiceStatus: "Paid",
                invoicePaymentMethod: "E-Check",
                transId: response?.data?.transactionResponse?.transId,


            }

            try {
                const response = await Axios.put(`${BASE_URL}/api/web/invoices/updateInvoice?invoiceId=${invoiceData[0]?._id}`, dataToSend);

                if (response?.status == "200" || response?.status == "201") {
                    toast.success("Invoice Update Successfully")
                    onAPISuccess(true);
                }

            } catch (error) {
                toast.error("Update Invoice error is" + error?.response?.data?.msg)
            }
        }
        else {
            toast.error(response?.data?.transactionResponse?.errors?.error[0].errorText)
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);

    }
}


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
                                                Totall Amount: <span className="steric">*</span>
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
                                                    <td>
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("cardCode") }, "input_text")} type="text" id="expirationDate" value={formik.values.expirationDate} onChange={formik.handleChange} />
                                                        {getFormErrorMessage("expirationDate")}
                                                    </td>
                                                </tr>
                                                <div className="mt-2">

<Button label="Submit" type="button" onClick={cardApi} />
</div>

                                            </> : formik.values.paymentMethod == "echeck" ? <>
                                                <tr>
                                                    <td className="text-lg">
                                                        Account Number <span className="steric">*</span>
                                                    </td>
                                                    <td>
                                                        <InputText className={classNames({ " mr-3": true, "p-invalid": isFormFieldValid("AccountNumber") }, "input_text")} type="text" id="AccountNumber"  value={formik.values.AccountNumber} maxLength={16} onChange={formik.handleChange} />
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
                                                        {getFormErrorMessage("NameOnAccount")}
                                                    </td>
                                                </tr>
                                                <div className="mt-2">

<Button label="Submit" type="button" onClick={echeckApi} />
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