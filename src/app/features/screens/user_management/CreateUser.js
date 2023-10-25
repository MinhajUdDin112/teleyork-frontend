import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import card from "primereact";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
    const [allRoles, setAllRoles] = useState([]);
    const [allDepartment, setAllDepartment] = useState([]);
   

    const navigate = useNavigate();

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    console.log("parseLoginRes", parseLoginRes);

    // Validation Schema
    const validationSchema = Yup.object().shape({
        role: Yup.string().required("This field is required."),
        name: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email format").required("This field is required."),
        mobile: Yup.string()
            .matches(/^\d{1,10}$/, "Maxumum 15 digits")
            .required("This field is required."),
        // password: Yup.string()
        //     .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character and minimum 8 characters.")
        //     .required("This field is required."),
        city: Yup.string().required("This field is required."),
        state: Yup.string().required("This field is required."),
        address1: Yup.string().required("This field is required."),
        zip: Yup.string().required("This field is required."),
        reportingTo: Yup.string().required("This field is required."),
        department: Yup.string().required("This field is required."),
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
        },
        onSubmit: async (values) => {
            // Prepare the data to send to the server
            const data = {
                compony: parseLoginRes?.compony,
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
            };

            // Send the data to the server using Axios POST request
            Axios.post(`${BASE_URL}/api/web/user`, data)
                .then((response) => {
                    // Handle a successful response here
                    console.log("Response Data:", response.data);
                })
                .catch((error) => {
                    // Handle errors here
                    console.error("Error:", error);
                });
            navigate("/manage-user");
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };


    useEffect(() => {
        if(formik.values.department){
            const departId= formik.values.department;
        const getRoles = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/web/user/getByDepartments?department=${departId}`);
                setAllRoles(res?.data?.data || []);
            } catch (error) {
                console.error("Error fetching module data:", error);
            }
        };
        getRoles();
    }
   
    }, [formik.values.department])
       

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes?.compony}`);
                setAllDepartment(res?.data?.data || []);
            } catch (error) {
                console.error("Error fetching module data:", error);
            }
        };
        getDepartment();
    }, []);

    return (
        <>
            <div className="card">
                <h3 className="mt-1 ">Add User</h3>
            </div>
            <div className="card">
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid p-formgrid grid mb-3">
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Name <span className="steric">*</span></label>
                            <InputText id="name" value={formik.values.name} onChange={formik.handleChange} keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("name")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Role <span className="steric">*</span></label>
                            <Dropdown id="role" options={allRoles} value={formik.values.role} onChange={formik.handleChange} optionLabel="role" optionValue="_id" keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("role")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Department <span className="steric">*</span></label>
                            <Dropdown
                                id="department"
                                options={allDepartment}
                                value={formik.values.department}
                                onChange={(e) => formik.setFieldValue("department", e.value)}
                                optionLabel="department"
                                optionValue="_id"
                                filter
                                showClear
                                filterBy="department" // Set the property to be used for filtering
                            />
                            {getFormErrorMessage("department")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Reporting To <span className="steric">*</span></label>
                            <Dropdown id="reportingTo" options={allRoles} value={formik.values.reportingTo} onChange={(e) => formik.setFieldValue("reportingTo", e.value)} optionLabel="role" optionValue="_id"  showClear filter filterBy="role" />
                            {getFormErrorMessage("reportingTo")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Contact <span className="steric">*</span></label>
                            <InputText id="mobile" value={formik.values.mobile} onChange={formik.handleChange} type="number" />
                            {getFormErrorMessage("mobile")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Email <span className="steric">*</span></label>
                            <InputText id="email" value={formik.values.email} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("email")}
                        </div>

                        {/* <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Password</label>
                            <Password id="password" value={formik.values.password} onChange={(e) => formik.setFieldValue("password", e.target.value)} toggleMask feedback={false} />
                            {getFormErrorMessage("password")}
                        </div> */}

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Address1 <span className="steric">*</span></label>
                            <InputText id="address1" value={formik.values.address1} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("address1")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Address2</label>
                            <InputText id="address2" value={formik.values.address2} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">City <span className="steric">*</span></label>
                            <InputText id="city" value={formik.values.city} onChange={formik.handleChange} keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("city")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">State <span className="steric">*</span></label>
                            <InputText id="state" value={formik.values.state} onChange={formik.handleChange} keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("state")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Zip <span className="steric">*</span></label>
                            <InputText
                                id="zip"
                                value={formik.values.zip}
                                onChange={formik.handleChange}
                                // type='number'
                            />
                            {getFormErrorMessage("zip")}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button label="Submit" iconPos="right" className="" type="submit" />
                        {/* <Button label="Cancel" iconPos="right" className="Btn__cancel" type="button" onClick={onHide} /> */}
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateUser;
