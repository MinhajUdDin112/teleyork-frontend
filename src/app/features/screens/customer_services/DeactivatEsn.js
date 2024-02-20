import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { classNames } from "primereact/utils";
const BASE_URL=process.env.REACT_APP_BASE_URL
const DeactivatEsn = () => {

    
    const validationSchema = Yup.object().shape({
        remarks: Yup.string().required("This is Required"),
        ESNSIM: Yup.string().required("This is Required"),
    });
    const formik = useFormik({
     validationSchema : validationSchema,
     initialValues:{
        remarks:"",
        ESNSIM:"",
     },
     onSubmit: async (values, actions) => {
         
        const dataToSend = { ...values };
      
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`, dataToSend);
            if (response?.status === 200 || response?.status === 201) {
                toast.success("Deactivate Successfully");
            }
        } catch (error) {

            toast.error("APi is required");
           
        }
    },

})

const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
};

    return (
        <>
        <ToastContainer/>
       
            <div>
                <div className="card flex justify-content-between">
                    <h3>Deactivate ESN</h3>
                    <Button label="De-Enroll ESN/SIM Report" className="p-button-danger" />
                </div>
                <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid formgrid grid ml-5">
                <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Remarks:<span className="steric">*</span>
                        </label>
                        <InputText id="remarks" value={formik.values.remarks} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("remarks") }, "input_text")}  />
                        {getFormErrorMessage("remarks")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Enter ESN/SIM:<span className="steric">*</span>
                        </label>
                        <InputText id="ESNSIM" value={formik.values.ESNSIM} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("ESNSIM") }, "input_text")}  />
                        {getFormErrorMessage("ESNSIM")}
                    </div>
                </div>
                <Button label="De-Activate" className="p-button-primart ml-6" type="submit"/>
                </form>
            </div>
          
        </>
    );
};

export default DeactivatEsn;
