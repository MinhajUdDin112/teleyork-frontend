import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Add_Vendors = () => {
    const [allRoles, setAllRoles] = useState([]);
    const [allDepartment, setAllDepartment] = useState([]);
    const [allReporting, setAllReporting] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [checkDeprt, setCheckDeprt] = useState("");
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    // Validation Schema
    const validationSchema = Yup.object().shape({
        role: Yup.string().required("This field is required."),
        name: Yup.string().required("This field is required."),
        companyemail: Yup.string().email("Invalid email format").required("This field is required."),
        contactemail: Yup.string().email("Invalid email format").required("This field is required."),
        pointofcontact: Yup.string().required("This field is required."),
        mobile: Yup.string()
            .matches(/^\d{1,10}$/, "Maxumum 15 digits")
            .required("This field is required."),
        city: Yup.string().required("This field is required."),
        state: Yup.string().required("This field is required."),
        address1: Yup.string().required("This field is required."),
        zip: Yup.string().required("This field is required."),
        reportingTo: Yup.string().required("This field is required."),
        department: Yup.string().required("This field is required."),
        ntneinnumber: Yup.string().required("This field is required."),
        signdate: Yup.string().required("This field is required."),
        expirationdate: Yup.string().required("This field is required."),
        modeofwork: Yup.string().required("This field is required."),
        image: Yup.string().required("This field is required."),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            name: "",
            companyemail: "",
            contactemail: "",
            pointofcontact: "",
            mobile: "",
            city: "",
            ntneinnumber: "",
            state: "",
            address1: "",
            address2: "",
            zip: "",
            signdate: "",
            expirationdate: "",
            modeofwork: "",
            image: "",
        },
        onSubmit: async (values) => {
            // Prepare the data to send to the server
            const data = {
                company: parseLoginRes?.company,
                createdBy: parseLoginRes?._id,
                name: values.name,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                state: values.state,
                zip: values.zip,
                companyemail: values.companyemail,
                pointofcontact: values.pointofcontact,
                mobile: values.mobile,
                contactemail: values.contactemail,
                ntneinnumber: values.ntneinnumber,
                signdate: values.signdate,
                expirationdate: values.expirationdate,
                modeofwork: values.modeofwork,
            };

            // Send the data to the server using Axios POST request
            Axios.post(`${BASE_URL}/api/web/user`, data)
                .then((response) => {
                    toast.success("successfully Added. Please Check Your Email For Password");
                })
                .catch((error) => {
                    toast.error("Error:", error?.response?.data?.msg);
                });
            navigate("/manage-user");
        },
    });

    console.log(formik.values);

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    // useEffect(() => {
    //     const getDepartment = async () => {
    //         try {
    //             const res = await Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes?.company}`);
    //             setAllDepartment(res?.data?.data || []);
    //         } catch (error) {
    //             toast.error(`Error fetching department: ${error?.response?.data?.msg}`);
    //         }
    //     };
    //     getDepartment();
    // }, []);

    // useEffect(() => {
    //     if (formik.values.department) {
    //         const getRoles = async () => {
    //             try {
    //                 const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${parseLoginRes?.company}`);
    //                 setAllRoles(res?.data?.data || []);
    //             } catch (error) {
    //                 toast.error(`Error fetching roles : ${error?.response?.data?.msg}`);
    //             }
    //         };
    //         getRoles();
    //     }
    // }, [formik.values.department]);

    // useEffect(() => {
    //     if (formik.values.role) {
    //         const roleId = formik.values.role;
    //         const getReportingTo = async () => {
    //             try {
    //                 const res = await Axios.get(`${BASE_URL}/api/web/user/getReportingTo?roleId=${roleId}`);
    //                 setAllReporting(res?.data?.result || []);
    //             } catch (error) {
    //                 toast.error(`Error fetching users : ${error?.response?.data?.msg}`);
    //             }
    //         };
    //         getReportingTo();
    //     }
    // }, [formik.values.role]);

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
                            <InputText id="name" value={formik.values.name} onChange={formik.handleChange} keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("name")}
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
                            <InputText id="zip" value={formik.values.zip} onChange={formik.handleChange} keyfilter={/^\d{0,5}$/} minLength={5} maxLength={5} />
                            {getFormErrorMessage("zip")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Company's Official Email <span className="steric">*</span>
                            </label>
                            <InputText id="companyemail" value={formik.values.companyemail} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("companyemail")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Point of Contact <span className="steric">*</span>
                            </label>
                            <InputText id="pointofcontact" value={formik.values.pointofcontact} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("pointofcontact")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Point of Contact Phone Number <span className="steric">*</span>
                            </label>
                            <InputText id="mobile" value={formik.values.mobile} onChange={formik.handleChange} minLength={10} maxLength={10} keyfilter={/^[0-9]*$/} />
                            {getFormErrorMessage("mobile")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Point of Contact Email<span className="steric">*</span>
                            </label>
                            <InputText id="contactemail" value={formik.values.contactemail} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("contactemail")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                NTN/EIN Number<span className="steric">*</span>
                            </label>
                            <InputText id="ntneinnumber" value={formik.values.ntneinnumber} onChange={formik.handleChange} />
                            {getFormErrorMessage("ntneinnumber")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Contract Sign Date<span className="steric">*</span>
                            </label>
                            <Calendar id="signdate" value={formik.values.signdate} onChange={formik.handleChange} />
                            {getFormErrorMessage("signdate")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Contract Expiration Date<span className="steric">*</span>
                            </label>
                            <Calendar id="expirationdate" value={formik.values.expirationdate} onChange={formik.handleChange} />
                            {getFormErrorMessage("expirationdate")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Mode of Work<span className="steric">*</span>
                            </label>
                            <InputTextarea id="modeofwork" value={formik.values.modeofwork} onChange={formik.handleChange} rows={1} cols={30} />
                            {getFormErrorMessage("modeofwork")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Attachment Link <span className="steric">*</span>
                            </label>
                            <InputText id="image" value={formik.values.image} onChange={formik.handleChange} type="file" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button label="Update" iconPos="right" className="" />
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default Add_Vendors;
