import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const AdHocModal = ({ adHocInvoiceModal, setAdHocInvoiceModal }) => {   
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [city, setCity] = useState("");
    const [isButtonLoading, setisButtonLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        invoiceAmount: Yup.string().required("Please Select Invoice Amount"),  
        invoiceType: Yup.string().required("Please select Invoice Type"), 
        amount: Yup.string().required("Please select Amount"),
        isTax: Yup.string().required("Please select isTax"), 
        taxAmount: Yup.string().required("Please Enter Tax Amount"), 
        taxBreakup: Yup.string().required("Please Enter Tax Breakup"), 
    });
    
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: { 
            invoiceAmount:"",    
            invoiceType: "",  
            isTax: "",
            invoiceAmount:"",    
            taxAmount: "",  
            taxBreakup: "",
        },
        onSubmit: async (values,actions) => {
          setisButtonLoading(true);
            const dataToSend = {  ...values };
        
            // try {
            //     const response = await Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend);
            //     if (response?.status === 201 || response?.status === 200) {
            //         toast.success("Successfully Run");
            //         setisButtonLoading(false);
            //         actions.resetForm();
            //     }
            // } catch (error) {
            //   toast.error(error?.response?.data?.msg);
            //   setisButtonLoading(false);
            // }
        },
    });
    

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
};
    const cities = [
        { name: "ace-cash-express", code: "NY" },
        { name: "ACE-PAYMENT", code: "RM" },
        { name: "Ad-hoc-Invoice (Other)", code: "LDN" },
        { name: "Agent add minutes", code: "RM" },
        { name: "Agent add minutes cash", code: "LDN" },
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">    
                <Button label="Close" onClick={() => setAdHocInvoiceModal(false)} />
                <Button label="Submit"  onClick={() => setAdHocInvoiceModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Add New Invoice" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={adHocInvoiceModal} footer={renderFooter()} style={{ width: "50vw" }}>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID:</p>
                        <p className="col-8 m-0 p-1"><h5>119350</h5></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Telephone Number:</p>
                        <p className="col-8 m-0 p-1"><h5>0313-55***52</h5></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Customer Name:</p>
                        <p className="col-8 m-0 p-1"><h5>Hammad Ullah</h5></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Address:</p>
                        <p className="col-8 m-0 p-1"><h6>Islamabad Pakistan</h6></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Type:</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" id="invoiceType" value={formik.values.invoiceType} options={cities} onChange={formik.handleChange} optionLabel="name" optionValue="" className="h-3rem w-7 align-items-center " filter filterBy="name" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <InputText placeholder="Enter Amount" value={formik.values.amount}  onChange={formik.handleChange} className="h-3rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex mt-2 mb-2">
                        <p className="col-4 font-semibold m-0 p-1">Do You want to include tax?:</p>
                        <p className="col-8 m-0 p-1">
                            <div>
      
                            
                   
                   

                   <RadioButton inputId="isTax" name="pizza" value="yes" onChange={(e) => setCity(e.value)} checked={city === "yes"} />
                                <label htmlFor="isTax" className="mr-2 px-2">
                                    Yes
                                </label>
                                <RadioButton inputId="ingredient2" name="pizza" value="no" onChange={(e) => setCity(e.value)} checked={city === "no"} />
                                <label htmlFor="isTax" className="mr-2 px-2">
                                    No
                                </label>
                            </div>
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Tax Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <InputText id="taxAmount" placeholder="Enter Tax Amount" value={formik.values.taxAmount} onChange={formik.handleChange} className="h-3rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Tax Breakup($):</p>
                        <p className="col-8 m-0 p-1">
                            <InputText id="taxBreakup" placeholder="Enter Tax Breakup" value={formik.values.taxBreakup} onChange={formik.handleChange} className="h-3rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <InputText id="invoiceAmount" placeholder="Enter Invoice Amount" value={formik.values.invoiceAmount} onChange={formik.handleChange} className="h-3rem w-7 border-round-xs" />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AdHocModal;
