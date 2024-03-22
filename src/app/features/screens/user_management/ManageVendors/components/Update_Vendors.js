import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Add_Vendors = () => {
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [userId, setUserId] = useState([]);
    const navigate = useNavigate();
    const statusValues = [
        { name: " Active", value: "Active" },
        { name: "InActive", value: "InActive" },
    ];
    // Validation Schema
    const validationSchema = Yup.object().shape({
        companyName: Yup.string(),
        address1: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zipCode: Yup.string(),
        companyEmail: Yup.string().email("Invalid email format"),
        pointOfContact: Yup.string(),
        pointOfContactPhoneNo: Yup.string(),
        pointOfContactEmail: Yup.string().email("Invalid email format"),
        NTN_EIN_Number: Yup.string(),
        contractSignDate: Yup.string(),
        contractExpirationDate: Yup.string(),
        modeOfWork: Yup.string(),
        attachmentLink: Yup.string(),
    });
    useEffect(() => {
        const editUserData = JSON.parse(localStorage.getItem("editUserData"));
        // Parse the JSON string back to object
        if (editUserData) {
            setUserId(editUserData._id);
            formik.setFieldValue("companyName", editUserData.companyName);
            formik.setFieldValue("address1", editUserData.address1);
            formik.setFieldValue("address2", editUserData.address2);
            formik.setFieldValue("city", editUserData.city);
            formik.setFieldValue("state", editUserData.state);
            formik.setFieldValue("zipCode", editUserData.zipCode);
            formik.setFieldValue("companyEmail", editUserData.companyEmail);
            formik.setFieldValue("pointOfContact", editUserData.pointOfContact);
            formik.setFieldValue("pointOfContactPhoneNo", editUserData.pointOfContactPhoneNo);
            formik.setFieldValue("pointOfContactEmail", editUserData.pointOfContactEmail);
            formik.setFieldValue("NTN_EIN_Number", editUserData.NTN_EIN_Number);
            formik.setFieldValue("contractSignDate", editUserData.contractSignDate ? DateFormat(editUserData.contractSignDate) : "");
            formik.setFieldValue("contractExpirationDate", editUserData.contractExpirationDate ? DateFormat(editUserData.contractExpirationDate) : "");
            formik.setFieldValue("modeOfWork", editUserData.modeOfWork);
        }
    }, []);

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
            attachmentLink: "",
        },

        onSubmit: async (values) => {
            try {
                const res = await Axios.put(`${BASE_URL}/api/web/manageVendors/update/${userId}`, values);
                const data = res.data;
                console.log("Response from server:", data);
                toast.success(res.data.msg);
                setTimeout(() => {
                    navigate("/manage-vendors");
                }, 2000);
                // navigate("/manage-vendors");
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        },
    });
    const DateFormat = (dateString) => {
        const date = new Date(dateString);
        return date;
    };
    console.log(formik.values);

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    // useEffect(() => {
    //     const getStates = async () => {
    //         try {
    //             const res = await Axios.get(`${BASE_URL}/api/zipCode/getAllStates`);
    //             setAllState(res?.data?.data || []);
    //         } catch (error) {
    //             toast.error(`${error?.response?.data?.msg}`);
    //         }
    //     };
    //     getStates();
    // }, []);

    // useEffect(() => {
    //     if (formik.values.state) {
    //         const selectedState = formik.values.state;
    //         const getCities = async () => {
    //             try {
    //                 const res = await Axios.get(`${BASE_URL}/api/zipCode/getcitiesByState?state=${selectedState}`);
    //                 setAllCity(res?.data?.data || []);
    //             } catch (error) {
    //                 toast.error(`${error?.response?.data?.msg}`);
    //             }
    //         };
    //         getCities();
    //     }
    // }, [formik.values.state]);

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
                            <label className="Label__Text">Company Name</label>
                            <InputText id="companyName" value={formik.values.companyName} onChange={formik.handleChange} keyfilter={/^[A-Za-z\s]+$/} />
                            {getFormErrorMessage("companyName")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Address1</label>
                            <InputText id="address1" value={formik.values.address1} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("address1")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Address2</label>
                            <InputText id="address2" value={formik.values.address2} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">City</label>
                            <InputText id="city" value={formik.values.city} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("city")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">State/Province</label>
                            <InputText id="state" value={formik.values.state} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("state")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Zip Code</label>
                            <InputText id="zipCode" value={formik.values.zipCode} onChange={formik.handleChange} keyfilter={/^\d{0,5}$/} minLength={5} maxLength={5} />
                            {getFormErrorMessage("zipCode")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Company's Official Email</label>
                            <InputText id="companyEmail" value={formik.values.companyEmail} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("companyEmail")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Point of Contact</label>
                            <InputText id="pointOfContact" value={formik.values.pointOfContact} onChange={formik.handleChange} keyfilter={/^[a-zA-Z0-9_,.]*$/} />
                            {getFormErrorMessage("pointOfContact")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Point of Contact Phone Number</label>
                            <InputText id="pointOfContactPhoneNo" value={formik.values.pointOfContactPhoneNo} onChange={formik.handleChange} minLength={10} maxLength={10} keyfilter={/^[0-9]*$/} />
                            {getFormErrorMessage("pointOfContactPhoneNo")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Point of Contact Email</label>
                            <InputText id="pointOfContactEmail" value={formik.values.pointOfContactEmail} onChange={formik.handleChange} type="email" keyfilter={/^[a-zA-Z0-9_.@]*$/} />
                            {getFormErrorMessage("pointOfContactEmail")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">NTN/EIN Number</label>
                            <InputText id="NTN_EIN_Number" value={formik.values.NTN_EIN_Number} onChange={formik.handleChange} />
                            {getFormErrorMessage("NTN_EIN_Number")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Contract Sign Date</label>
                            <Calendar id="contractSignDate" value={formik.values.contractSignDate} onChange={formik.handleChange} />
                            {getFormErrorMessage("contractSignDate")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Contract Expiration Date</label>
                            <Calendar id="contractExpirationDate" value={formik.values.contractExpirationDate} onChange={formik.handleChange} />
                            {getFormErrorMessage("contractExpirationDate")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Mode of Work</label>
                            <InputTextarea id="modeOfWork" value={formik.values.modeOfWork} onChange={formik.handleChange} rows={1} cols={30} />
                            {getFormErrorMessage("modeOfWork")}
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Status</label>
                            <Dropdown id="status" value={formik.values.status} onChange={formik.handleChange} options={statusValues} optionLabel="name" showClear placeholder="Select Status" className="w-full md:w-14rem" />
                            {getFormErrorMessage("status")}
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button label="Update" iconPos="right" className="" type="submit" />
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default Add_Vendors;
