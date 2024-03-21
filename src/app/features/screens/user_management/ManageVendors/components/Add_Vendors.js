import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Add_Vendors = () => {
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const navigate = useNavigate();
    // const [status, setStatus] = useState(null);
    const [file, setFile] = useState(null);
    const statusValues = [
        { name: " Active", value: "Active" },
        { name: "InActive", value: "InActive" },
    ];

    // Validation Schema
    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("This field is required."),
        address1: Yup.string().required("This field is required."),
        city: Yup.string().required("This field is required."),
        state: Yup.string().required("This field is required."),
        zipCode: Yup.string().required("This field is required."),
        companyEmail: Yup.string().email("Invalid email format").required("This field is required."),
        pointOfContact: Yup.string().required("This field is required."),
        pointOfContactPhoneNo: Yup.string().required("This field is required."),
        pointOfContactEmail: Yup.string().email("Invalid email format").required("This field is required."),
        NTN_EIN_Number: Yup.number().required("This field is required."),
        contractSignDate: Yup.string().required("This field is required."),
        contractExpirationDate: Yup.string().required("This field is required."),
        modeOfWork: Yup.string().required("This field is required."),
        // attachmentLink: Yup.mixed().required("File is required"),,
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            companyName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
            companyEmail: "",
            pointOfContact: "",
            pointOfContactPhoneNo: "",
            pointOfContactEmail: "",
            NTN_EIN_Number: "",
            contractSignDate: "",
            contractExpirationDate: "",
            modeOfWork: "",
            status: "",
        },

        onSubmit: async (values) => {
            console.log(values);
            let formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }
            // Append file to FormData if it exists
            if (file) {
                formData.append("file", file);
            }
            try {
                const res = await Axios.post(`${BASE_URL}/api/web/manageVendors/add`, formData);
                const data = res.data;
                const message = res?.data?.msg;
                console.log("message", message);
                console.log("Response from server:", data);
                toast.success(message);
                navigate("/manage-vendors");
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        },
    });

    console.log(formik.values);

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        const getStates = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/zipCode/getAllStates`);
                setAllState(res?.data?.data || []);
            } catch (error) {
                toast.error(`${error?.response?.data?.msg}`);
            }
        };
        getStates();
    }, []);

    useEffect(() => {
        if (formik.values.state) {
            const selectedState = formik.values.state;
            const getCities = async () => {
                try {
                    const res = await Axios.get(`${BASE_URL}/api/zipCode/getcitiesByState?state=${selectedState}`);
                    setAllCity(res?.data?.data || []);
                } catch (error) {
                    toast.error(`${error?.response?.data?.msg}`);
                }
            };
            getCities();
        }
    }, [formik.values.state]);

    return (
        <Card>
            <ToastContainer />
            {/* <div>
                <h3 className="mt-1 font-bold ">Add User</h3>
            </div> */}
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid p-formgrid grid mb-3">
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Company Name <span className="steric">*</span>
                            </label>
                            <InputText id="companyName" value={formik.values.companyName} onChange={formik.handleChange} keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("companyName")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Address1 <span className="steric">*</span>
                            </label>
                            <InputText id="address1" value={formik.values.address1} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("address1")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Address2</label>
                            <InputText id="address2" value={formik.values.address2} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                City <span className="steric">*</span>
                            </label>
                            <InputText id="city" value={formik.values.city} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("city")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                State/Province<span className="steric">*</span>
                            </label>
                            <Dropdown id="state" options={allState} value={formik.values.state} onChange={(e) => formik.setFieldValue("state", e.value)} optionLabel="state" optionValue="state" showClear filter filterBy="state" />
                            {getFormErrorMessage("state")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Zip Code <span className="steric">*</span>
                            </label>
                            <InputText id="zipCode" value={formik.values.zipCode} onChange={formik.handleChange} keyfilter={/^\d{0,5}$/} minLength={5} maxLength={5} />
                            {getFormErrorMessage("zipCode")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Company's Official Email <span className="steric">*</span>
                            </label>
                            <InputText id="companyEmail" value={formik.values.companyEmail} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("companyEmail")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Point of Contact <span className="steric">*</span>
                            </label>
                            <InputText id="pointOfContact" value={formik.values.pointOfContact} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("pointOfContact")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Point of Contact Phone Number <span className="steric">*</span>
                            </label>
                            <InputText id="pointOfContactPhoneNo" value={formik.values.pointOfContactPhoneNo} onChange={formik.handleChange} minLength={10} maxLength={10} keyfilter={/^[0-9]*$/} />
                            {getFormErrorMessage("pointOfContactPhoneNo")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Point of Contact Email<span className="steric">*</span>
                            </label>
                            <InputText id="pointOfContactEmail" value={formik.values.pointOfContactEmail} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("pointOfContactEmail")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                NTN/EIN Number<span className="steric">*</span>
                            </label>
                            <InputText id="NTN_EIN_Number" value={formik.values.NTN_EIN_Number} onChange={formik.handleChange} />
                            {getFormErrorMessage("NTN_EIN_Number")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Contract Sign Date<span className="steric">*</span>
                            </label>
                            <Calendar id="contractSignDate" value={formik.values.contractSignDate} onChange={formik.handleChange} />
                            {getFormErrorMessage("contractSignDate")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Contract Expiration Date<span className="steric">*</span>
                            </label>
                            <Calendar id="contractExpirationDate" value={formik.values.contractExpirationDate} onChange={formik.handleChange} />
                            {getFormErrorMessage("contractExpirationDate")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Mode of Work<span className="steric">*</span>
                            </label>
                            <InputTextarea id="modeOfWork" value={formik.values.modeOfWork} onChange={formik.handleChange} rows={1} cols={30} />
                            {getFormErrorMessage("modeOfWork")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Status</label>
                            <Dropdown id="status" value={formik.values.status} onChange={formik.handleChange} options={statusValues} optionLabel="name" showClear placeholder="Select Status" className="w-full md:w-14rem" />
                            {getFormErrorMessage("status")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Attachment Link</label>
                            <InputText
                                id="file"
                                onChange={(event) => {
                                    const selectedFile = event.target.files[0];
                                    setFile(selectedFile);
                                }}
                                type="file"
                            />
                            {getFormErrorMessage("attachmentLink")}
                        </div>
                    </div>
                    <div>
                        <Button label="Submit" iconPos="right" className="" type="submit" />
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default Add_Vendors;
