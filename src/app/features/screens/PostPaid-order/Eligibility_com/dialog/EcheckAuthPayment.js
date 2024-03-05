import React, { useState } from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const EcheckAuthPayment = ({amount,handleNext,object}) => {

    const basicData = localStorage.getItem("basicData");
    const parsebasicData = JSON.parse(basicData);
    const userDetails = parsebasicData?.data

    const [isLoading, setIsLoading] = useState(false)
    const validationSchema = Yup.object().shape({
       
        totalAmount: Yup.string().required("Please Select Amount"),
        routingNumber: Yup.string().required("This is required"),
        AccountNumber: Yup.string().required("This is required"),

    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            totalAmount: "",
            amount: amount,
            routingNumber: "",
            AccountNumber: "",
            NameOnAccount: "",
            refId: "",
            accountId: userDetails?.accountId,
        },

        onSubmit: async (values, actions) => {

            setIsLoading(true)
            const dataToSend = {
                amount: formik.values.totalAmount,
                nameOnAccount: formik.values.NameOnAccount,
                routingNumber: formik.values.routingNumber,
                accountNumber: formik.values.AccountNumber,
                accountType: formik.values.accountType,
                accountId: formik.values.accountId,
                customerId:userDetails?._id
            };
            try {
                const response = await Axios.post(`${BASE_URL}/api/web/invoices/echeckpayment`, dataToSend);
                if (response?.data?.messages?.resultCode == "Ok" || response?.data?.messages?.resultCode == "OK" || response?.data?.msg?.resultCode == "Ok") {
                    toast.success("Successfully Paid")
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
                        paymentMethod: "E-Check",
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
                    console.log("error is ", response?.data?.transactionResponse)
                    toast.error(response?.data?.transactionResponse?.errors?.error[0].errorText)
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false)
            }
            setIsLoading(false)

        },
    });

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
export default EcheckAuthPayment;