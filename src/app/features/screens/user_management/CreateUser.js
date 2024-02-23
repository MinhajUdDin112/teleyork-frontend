import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import card from "primereact";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "primereact/card";
const BASE_URL=process.env.REACT_APP_BASE_URL
const CreateUser = () => {
    const [allRoles, setAllRoles] = useState([]);
    const [allDepartment, setAllDepartment] = useState([]);
    const [allReporting, setAllReporting] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [checkDeprt, setCheckDeprt] = useState("");

    const navigate = useNavigate();

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    // Validation Schema
    const validationSchema = Yup.object().shape({
        role: Yup.string().required("This field is required."),
        name: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email format").required("This field is required."),
        mobile: Yup.string()
            .matches(/^\d{1,10}$/, "Maxumum 15 digits")
            .required("This field is required."),
        city: Yup.string().required("This field is required."),
        state: Yup.string().required("This field is required."),
        address1: Yup.string().required("This field is required."),
        zip: Yup.string().required("This field is required."),
        reportingTo: Yup.string().required("This field is required."),
        department: Yup.string().required("This field is required."),
        // repId: Yup.string().required("This field is required."),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            role: "",
            name: "",
            email: "",
            mobile: "",
            //password: "",
            city: "",
            state: "",
            address1: "",
            address2: "",
            zip: "",
            reportingTo: "",
            department: "",
            repId: "",
        },
        onSubmit: async (values) => {
            // Prepare the data to send to the server
            const data = {
                company: parseLoginRes?.company,
                createdBy: parseLoginRes?._id,
                roleId: formik.values.role,
                reportingTo: formik.values.reportingTo,
                department: formik.values.department,
                name: values.name,
                email: values.email,
                //password: values.password,
                contact: values.mobile,
                city: values.city,
                address1: values.address1,
                address2: values.address2,
                zip: values.zip,
                state: values.state,
                repId: values.repId,
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
   

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes?.company}`);
                setAllDepartment(res?.data?.data || []);
            } catch (error) {
                toast.error(`Error fetching department: ${error?.response?.data?.msg}`);
            }
        };
        getDepartment();
    }, []);

    useEffect(() => {
        if (formik.values.department) {
            const getRoles = async () => {
                try {
                    const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${parseLoginRes?.company}`);
                    setAllRoles(res?.data?.data || []);
                } catch (error) {
                    toast.error(`Error fetching roles : ${error?.response?.data?.msg}`);
                }
            };
            getRoles();
        }
    }, [formik.values.department]);

    useEffect(() => {
        if (formik.values.role) {
            const roleId = formik.values.role;
            const getReportingTo = async () => {
                try {
                    const res = await Axios.get(`${BASE_URL}/api/web/user/getReportingTo?roleId=${roleId}`);
                    setAllReporting(res?.data?.result || []);
                } catch (error) {
                    toast.error(`Error fetching users : ${error?.response?.data?.msg}`);
                }
            };
            getReportingTo();
        }
    }, [formik.values.role]);

    useEffect(() => {
        const getStates = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/zipCode/getAllStates`);
                setAllState(res?.data?.data || []);
            } catch (error) {
                toast.error(`Error fetching States : ${error?.response?.data?.msg}`);
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
                    toast.error(`Error fetching States : ${error?.response?.data?.msg}`);
                }
            };
            getCities();
        }
    }, [formik.values.state]);

   

    return (
        <Card>
            <ToastContainer />
            <div>
                <h3 className="mt-1 font-bold ">Add User</h3>
            </div>
            <div >
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid p-formgrid grid mb-3">
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Name <span className="steric">*</span>
                            </label>
                            <InputText id="name" value={formik.values.name} onChange={formik.handleChange} keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("name")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Department <span className="steric">*</span>
                            </label>
                            <Dropdown
    id="department"
    options={allDepartment}
    value={formik.values.department}
    onChange={(e) => {
        const selectedDepartment = allDepartment.find(dep => dep._id === e.value);
        formik.setFieldValue("department", e.value);
        setCheckDeprt(selectedDepartment?.department || ''); // Use optional chaining to handle potential null or undefined
    }}
    optionValue="_id"
    optionLabel="department"
    filter
    showClear
    filterBy="department"
/>


                            {getFormErrorMessage("department")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Role <span className="steric">*</span>
                            </label>
                            <Dropdown id="role" options={allRoles} value={formik.values.role} onChange={formik.handleChange} optionLabel="role" optionValue="_id" showClear filter filterBy="role" />
                            {getFormErrorMessage("role")}
                        </div>
                        {checkDeprt == "Provision Manager" || checkDeprt == "PROVISION MANAGER" ? (
                            <div className="p-field col-12 md:col-3">
                                <label className="Label__Text">
                                    Rep Id <span className="steric">*</span>
                                </label>
                                <InputText id="repId" value={formik.values.repId} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                                {getFormErrorMessage("repId")}
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Reporting To <span className="steric">*</span>
                            </label>
                            <Dropdown id="reportingTo" options={allReporting} value={formik.values.reportingTo} onChange={(e) => formik.setFieldValue("reportingTo", e.value)} optionLabel="name" optionValue="_id" showClear filter filterBy="name" />
                            {getFormErrorMessage("reportingTo")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Contact <span className="steric">*</span>
                            </label>
                            <InputText id="mobile" value={formik.values.mobile} onChange={formik.handleChange} minLength={10} maxLength={10} keyfilter={/^[0-9]*$/} />
                            {getFormErrorMessage("mobile")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Email <span className="steric">*</span>
                            </label>
                            <InputText id="email" value={formik.values.email} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("email")}
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
                                Select State<span className="steric">*</span>
                            </label>
                            <Dropdown id="state" options={allState} value={formik.values.state} onChange={(e) => formik.setFieldValue("state", e.value)} optionLabel="state" optionValue="state" showClear filter filterBy="state" />
                            {getFormErrorMessage("state")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Select City<span className="steric">*</span>
                            </label>
                            <Dropdown id="city" options={allCity} value={formik.values.city} onChange={(e) => formik.setFieldValue("city", e.value)} optionLabel="city" optionValue="_id" showClear filter filterBy="city" />
                            {getFormErrorMessage("city")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">
                                Zip <span className="steric">*</span>
                            </label>
                            <InputText id="zip" value={formik.values.zip} onChange={formik.handleChange} keyfilter={/^\d{0,5}$/} minLength={5} maxLength={5} />
                            {getFormErrorMessage("zip")}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button label="Submit" iconPos="right" className="" type="submit" />
                        {/* <Button label="Cancel" iconPos="right" className="Btn__cancel" type="button" onClick={onHide} /> */}
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default CreateUser;
