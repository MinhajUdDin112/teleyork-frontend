import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
const BASE_URL=process.env.REACT_APP_BASE_URL
const DialogeForTransferUser = ({ enrollmentId,setDialogeForTransfer }) => {
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [allPrograme, setAllPrograme] = useState([]);

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const userid= parseLoginRes?._id
    const repId = parseLoginRes?.repId;
   

    // Validation Schema
    const validationSchema = Yup.object().shape({
        
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            transferException: "",
        },
        onSubmit: async (values) => {
            // Prepare the data to send to the server
            const data = {
                repId: parseLoginRes?.repId,
                enrollmentId: enrollmentId,
                userId:userid,
                ...values,
            };
            setisButtonLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/transferUserNlad`, data);
                if (response?.status == "200" || response?.status == "201") {
                    toast.success("Successfully Transferred");
                    setisButtonLoading(false);
                }
            } catch (error) {
                const body = error?.response?.data?.data?.body;

                const errorMessage = Array.isArray(body) ? body.toString() : body && typeof body === "object" ? JSON.stringify(body) : body;
                toast.error("Error is " + errorMessage);
                setisButtonLoading(false);
            }
            setDialogeForTransfer(false)
        },
    });

    const options = [
        { label: "Select", value: "" },
        { label: "Improper Transfer-(TE1)", value: "TE1" },
        { label: "Operations Ceased-(TE2)", value: "TE2." },
        { label: "Rule Violation-(TE3)", value: "TE3" },
        { label: "Moved Outside Service Area-(TE4)", value: "TE4" },
    ];

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <>
        
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid formgrid grid">
                <div className="field  mr-5">
                    <label className="field_label">
                        Transfer Exception <span className="steric">*</span>
                    </label>
                    <Dropdown className="w-15rem" id="transferException" options={options} value={formik.values.transferException} onChange={formik.handleChange} />

                    
                </div>

                <div className="field ">
                    <label className="field_label">Rep Id</label>
                    <InputText value={repId} readOnly />
                </div>
            </div>
            <div className="text-right">
                <Button label="Transfer User" type="submit" icon={isButtonLoading === true ? "pi pi-spin pi-spinner " : ""} className=" ml-2" text raised disabled={isButtonLoading} />
            </div>
            </form>
        </>
    );
};

export default DialogeForTransferUser;
