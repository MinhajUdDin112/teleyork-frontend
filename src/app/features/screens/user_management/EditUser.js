import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import Axios from 'axios';
import BASE_URL from '../../../../config';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const EditUser = () => {

    const [allRoles, setAllRoles] = useState([])
    const [allDepartment, setAllDepartment] = useState([]);
    const [allUser, setAllUser] = useState([]);

    const location = useLocation();
    const { rowData } = location.state || {};

    console.log('rowData', rowData)

    const navigate = useNavigate()

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)

    // Validation Schema
    const validationSchema = Yup.object().shape({
        role: Yup.string().required('This field is required.'),
        name: Yup.string().required('This field is required.'),
        email: Yup.string().email('Invalid email format').required('This field is required.'),
        mobile: Yup.string()
            .matches(/^\d{1,10}$/, 'Maxumum 15 digits')
            .required('This field is required.'),
        city: Yup.string().required('This field is required.'),
        state: Yup.string().required('This field is required.'),
        address: Yup.string().required('This field is required.'),
        zip: Yup.string().required('This field is required.'),
        reportingTo: Yup.string().required("This field is required."),
        department: Yup.string().required("This field is required."),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            role: '',
            name: '',
            email: '',
            mobile: '',
            city: '',
            state: '',
            address: '',
            zip: '',
            reportingTo: "",
            department: "",
        },
        onSubmit: async (values) => {

            // Prepare the data to send to the server
            const data = {
                compony: parseLoginRes?.compony,
                createdBy: parseLoginRes?.createdDate,
                roleId: formik.values.role,
                reportingTo: formik.values.reportingTo,
                department: formik.values.department,
                userId: parseLoginRes?._id,
                name: values.name,
                email: values.email,
                password: values.password,
                // RADId: 1,
                contact: values.mobile,
                city: values.city,
                address: values.address,
                zip: values.zip,
                state: values.state,
            };

            // Send the data to the server using Axios POST request
            Axios.patch(`${BASE_URL}/api/web/user/`, data)
                .then((response) => {
                    if (response?.status === 200) {
                        toast.warn("User Updated")
                        navigate('/manage-user')
                    }
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('Error:', error);
                });
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleUserDataMapping = () => {
        if (rowData) { // Check if formik and rowData exist
            Object.keys(rowData).forEach((key) => {
                console.log('rowData?.contact', rowData?.contact)
                if (formik.initialValues.hasOwnProperty(key)) {
                    formik.setFieldValue(key, rowData[key]);
                    formik.setFieldValue("role", rowData?.role?._id);
                    formik.setFieldValue("mobile", rowData?.contact);
                }
            });
        }
    }

    const getRoles = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${parseLoginRes?.compony}`);
            console.log(res.data)
            setAllRoles(res?.data?.data || []);     
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };
    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes?.compony}`);
                setAllDepartment(res?.data?.data || []);
            } catch (error) {
                
            }
        };
        getDepartment();
    }, []);

       
    useEffect(() => {
        if(formik.values.department){
            const departId= formik.values.department;
        const getRoles = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/web/user/getByDepartments?department=${departId}`);
           
              setAllUser(res?.data?.data || []);
            } catch (error) {
                
            }
        };
        getRoles();
    }
}, [formik.values.department])

    useEffect(() => {
        handleUserDataMapping()
        getRoles();
    }, []);

    return (
        <>
          <ToastContainer/>
          <div className="card">
    <h3 className="mt-1 ">Edit User</h3>
</div>
            <div className='card'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid p-formgrid grid mb-3">

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                Role
                            </label>
                            <Dropdown
                                id="role"
                                options={allRoles}
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                optionLabel='role'
                                optionValue='_id'
                                keyfilter={/^[A-Za-z\s]+$/}
                            />
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
                            <Dropdown id="reportingTo" 
                            options={allUser} 
                            value={formik.values.reportingTo} 
                            onChange={(e) => formik.setFieldValue("reportingTo", e.value)} 
                            optionLabel="name" 
                            optionValue="_id"  
                            showClear
                             filter 
                             filterBy="name" />
                            {getFormErrorMessage("reportingTo")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                Name
                            </label>
                            <InputText
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                keyfilter={/^[A-Za-z\s]+$/}
                            />
                            {getFormErrorMessage("name")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                Email
                            </label>
                            <InputText
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                type='email'
                                keyfilter={/^[a-zA-Z0-9_.@]*$/}
                            />
                            {getFormErrorMessage("email")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                Contact
                            </label>
                            <InputText
                                id="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                keyfilter={/^[\+\d]+$/}
                            />
                            {getFormErrorMessage("mobile")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                City
                            </label>
                            <InputText
                                id="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                keyfilter={/^[A-Za-z\s]+$/}
                            />
                            {getFormErrorMessage("city")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                State
                            </label>
                            <InputText
                                id="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                keyfilter={/^[A-Za-z\s]+$/}
                            />
                            {getFormErrorMessage("state")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                Address
                            </label>
                            <InputText
                                id="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                keyfilter={/^[a-zA-Z0-9_,.]*$/}
                            />
                            {getFormErrorMessage("address")}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                Zip
                            </label>
                            <InputText
                                id="zip"
                                value={formik.values.zip}
                                onChange={formik.handleChange}
                            // type='number'
                            />
                            {getFormErrorMessage("zip")}
                        </div>

                    </div>
                    <div className='mt-4'>
                        <Button label="Submit" iconPos="right" className="" type="submit" />
                        {/* <Button label="Cancel" iconPos="right" className="Btn__cancel" type="button" onClick={onHide} /> */}
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditUser