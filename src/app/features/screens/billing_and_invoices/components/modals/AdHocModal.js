import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { Calendar } from "primereact/calendar";
import classNames from "classnames";

const AdHocModal = ({ setRefresh,cpData, adHocInvoiceModal, setAdHocInvoiceModal,onAPISuccess }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [city, setCity] = useState("");
    const [isButtonLoading, setisButtonLoading] = useState(false)
    const [addNewType, setAddNewType] = useState(false)
    const [allType, setAllType] = useState()

    const validationSchema = Yup.object().shape({
        // invoiceAmount: Yup.string().required("Please Select Invoice Amount"),
        invoiceType: Yup.string().required("Please select Invoice Type"),
        amount: Yup.string().required("Please select Amount"),
       // isTax: Yup.string().required("Please select isTax"),
        // taxAmount: Yup.string().required("Please Enter Tax Amount"),
        // taxBreakup: Yup.string().required("Please Enter Tax Breakup"),
        dueDate:Yup.string().required("Please Enter Due Date"),
    });

    const formik = useFormik({
        validationSchema: validationSchema, 
        initialValues: {
            invoiceAmount: "",
            invoiceType: "",
            isTax: "",
            amount: "",
         
            typeName: "",
            dueDate:""
        },
        onSubmit: async (values, actions) => {
            setisButtonLoading(true);
          
            const dataToSend = {
                enrollmentId:cpData?.enrollmentId,
                accountId:cpData?.accountId,
                invoiceOneTimeCharges:formik.values.amount,
                totalAmount:formik.values.amount,
                invoicetype:formik.values.invoiceType,
                invoiceDueDate:formik.values.dueDate,
                amountPaid:"0",
                invoicePaymentMethod:"Skip"
             };

            try {
                const response = await Axios.post(`${BASE_URL}/api/web/invoices/adHocInvoiceGeneration`, dataToSend);
                if (response?.status === 201 || response?.status === 200) {
                    toast.success("Successfully Created");
                    setisButtonLoading(false);
                    actions.resetForm();     
                    setAdHocInvoiceModal(false)
                    setRefresh(prev=>!prev)  
                    // onAPISuccess(true)
                }
            } catch (error) {
              toast.error(error?.response?.data?.error);
              setisButtonLoading(false);
            }
           
        },
    });
   
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const company = parseLoginRes?.company;

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

   
    const getType = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/invoiceType/all?serviceProvider=${company}`);
            setAllType(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    const addType = async () => {
        const dataToSend = {
            typeName: formik.values.typeName,
            serviceProvider: company
        }
        try {
            const response = await Axios.post(`${BASE_URL}/api/web/invoiceType/add`, dataToSend)
         
            if (response?.status == "201" || response?.status == "200") {
                toast.success("Type add Successfully")
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
        setAddNewType(false)

    }
    useEffect(() => {
        getType();
    }, [addNewType])

    return (
        <>
        <form onSubmit={formik.handleSubmit}>
        <div>
            <ToastContainer />
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID:</p>
                        <p className="col-8 m-0 p-1">{cpData?.accountId}</p>
                    </div>
                    <div className="flex mt-2">
                        <p className="col-4 font-semibold m-0 p-1">Telephone Number:</p>
                        <p className="col-8 m-0 p-1">{cpData?.contact}</p>
                    </div>
                    <div className="flex  mt-2">
                        <p className="col-4 font-semibold m-0 p-1">Customer Name:</p>
                        <p className="col-8 m-0 p-1">{cpData?.firstName} {cpData?.lastName}</p>
                    </div>
                    <div className="flex  mt-2">
                        <p className="col-4 font-semibold m-0 p-1">Address:</p>
                        <p className="col-8 m-0 p-1">{cpData?.address1} {cpData?.address2}</p>
                    </div>
                    <div className="flex  mt-2">
                        <p className="col-4 font-semibold m-0 p-1">Select Type OR <span onClick={() => setAddNewType(true)} style={{ color: "blue", cursor: "pointer" }}>
                            Add Type
                        </span>{" "}</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Invoice Type" id="invoiceType" value={formik.values.invoiceType} options={allType}   onChange={formik.handleChange} filter filterBy="typeName" optionLabel="typeName" optionValue="typeName"  className={classNames({ "p-invalid": isFormFieldValid("invoiceType") }, "h-3rem w-21rem align-items-center mr-3")} />
                            {getFormErrorMessage("invoiceType")}
                        </p>
                        
                    </div>
                    {addNewType ? (

                        <div className="flex">

                            <p className="col-4 font-semibold m-0 p-1">Name:</p>
                            <div className="flex">

                                <InputText id="typeName" placeholder="Type Name" value={formik.values.typeName} onChange={formik.handleChange} className="h-3rem ml-1 border-round-xs w-21rem" />
                                <i className="pi pi-check ml-2 " style={{ color: "green", fontSize: "24px", cursor: "pointer" }} onClick={addType}></i>
                            </div>

                        </div>

                    ) : (
                        " "
                    )}
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <InputText placeholder="Enter Amount" id="amount" value={formik.values.amount} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("amount") }, "h-3rem w-21rem border-round-xs mr-3")} />
                            {getFormErrorMessage("amount")}
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Due Date:</p>
                        <p className="col-8 m-0 p-1">
                        <Calendar id="dueDate" value={formik.values.dueDate} onChange={formik.handleChange} showIcon style={{ width: "21rem" }}  className={classNames({ "p-invalid": isFormFieldValid("dueDate") }, " mr-3")} />
                            {getFormErrorMessage("dueDate")}
                        </p>
                    </div>
                   
                 
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <InputText id="invoiceAmount" disabled placeholder="Enter Invoice Amount" value={formik.values.amount} onChange={formik.handleChange}  className= "h-3rem w-21rem border-round-xs mr-3"/>
                           
                        </p>
                    </div>
                </div>
                <div className="flex justify-content-between m-3" >
                <Button label="Close" onClick={() => setAdHocInvoiceModal(false)} />
                <Button label="Submit" type="submit" /> 
                </div>
           
           
        </div>
        </form>
        </>
    );
};

export default AdHocModal;
