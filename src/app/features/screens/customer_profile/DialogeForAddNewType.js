import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import classNames from "classnames";
const BASE_URL=process.env.REACT_APP_BASE_URL


export const DialogeForAddNewType = () => {

    const [isButtonLoading, setisButtonLoading] = useState(false)

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    console.log(parseLoginRes)

    // Validation Schema
    const validationSchema = Yup.object().shape({
        noteType: Yup.string().required("This is Required"),
        note: Yup.string().required("This is Required"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            noteType: '',
            note:'',
            active:'',
        },
        onSubmit: async (values) => {
            // Prepare the data to send to the server
            const data = {
                serviceProvider:parseLoginRes?.compony,
                ...values,
            };
            console.log("data is ",data)
            setisButtonLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/noteType/`, data);
                if (response?.status == "200" || response?.status == "201") {
                    toast.success("Successfully Added");
                    setisButtonLoading(false);
                }
            } catch (error) {       
                toast.error("Error is " + error?.response?.data?.msg);
                setisButtonLoading(false);
            }
        },
    });

    const options = [
        { label: "Active", value: "true" },
        { label: "Inactive ", value: "false" },
       
    ];

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

  return (
   <>
   <form onSubmit={formik.handleSubmit}>

<ToastContainer/>
<div className="flex justify-content-between align-items-center">
                    <div className="">
                        <label className="field_label">
                            Note Type <span className="steric">*</span>
                        </label>
                        <InputText id="noteType" value={formik.values.noteType} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("noteType") }, "input_text")} />
                        {getFormErrorMessage("noteType")}
                    </div>
                    <div className="">
                        <label className="field_label">
                           Note <span className="steric">*</span>
                        </label>
                        <textarea id="note" value={formik.values.note} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("note") }, "input_text")} rows={3} cols={30} />
                        {getFormErrorMessage("note")}
                    </div>
                    <div >
                    <label className="field_label">
                           Status
                        </label>
                    <Dropdown className="w-15rem"  id="active" options={options} value={formik.values.active} onChange={formik.handleChange} />
                    </div>
                   
 
           
          
            </div>
            <div className="text-right mt-5">
                <Button label="Submit" type="submit" icon={isButtonLoading === true ? "pi pi-spin pi-spinner " : ""} className=" ml-2" text raised disabled={isButtonLoading} />
            </div>
            </form>
   </>
  )
}
