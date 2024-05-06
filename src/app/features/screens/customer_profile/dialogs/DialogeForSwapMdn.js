import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import classNames from "classnames";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DialogeForSwapMdn = ({ cpData,setRefersh, setIsSwapMdn }) => {

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        newzip: Yup.string().required("This is Required"),

    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            newzip: "",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                newzip: formik.values.newzip,
                enrollmentId: cpData?._id
            };
            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/swapMDN`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("MDN Swap Successfully"); 
                    setRefersh(true)
                 setTimeout(() => {
                setIsSwapMdn(false); 
            }, 2000); 
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
              
            }
            setIsLoading(false);
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex' style={{ alignItems: 'end' }}>
                    <div className='mt-4'>
                        <label className="field_label mb-1">
                            Enter ZipCode <span className="steric">*</span>
                        </label>
                        <InputText
                            id="newzip"
                            value={formik.values.newzip}
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": isFormFieldValid("firstName") }, "input_text")}
                            minLength={5}
                            maxLength={5}
                        />
                        {getFormErrorMessage("newzip")}
                    </div>
                    <div className='mt-4 ml-4'>
                        <Button label='Swap' type='Submit' icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={isLoading} />
                    </div>

                </div>
            </form>

        </>
    )
}

export default DialogeForSwapMdn