import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import Axios from 'axios';
import BASE_URL from '../../../../config';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const CreateUser = () => {

    const [allRoles, setAllRoles] = useState([])

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)
    console.log('parseLoginRes', parseLoginRes)

    // Validation Schema
    const validationSchema = Yup.object().shape({
        role: Yup.string().required('This field is required.'),
        name: Yup.string().required('This field is required.'),
        email: Yup.string().email('Invalid email format').required('This field is required.'),
        mobile: Yup.string()
            .matches(/^\d{1,10}$/, 'Maxumum 15 digits')
            .required('This field is required.'),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character'
            )
            .required('This field is required.'),
        city: Yup.string().required('This field is required.'),
        state: Yup.string().required('This field is required.'),
        address: Yup.string().required('This field is required.'),
        zip: Yup.string().required('This field is required.'),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            role: '',
            name: '',
            email: '',
            mobile: '',
            password: '',
            city: '',
            state: '',
            address: '',
            zip: '',
        },
        onSubmit: async (values) => {

            // Prepare the data to send to the server
            const data = {
                compony: parseLoginRes?.compony,
                createdBy: parseLoginRes?._id,
                roleId: formik.values.role,
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
            Axios.post(`${BASE_URL}/api/web/user`, data)
                .then((response) => {
                    // Handle a successful response here
                    console.log('Response Data:', response.data);
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

    useEffect(() => {
        const getRoles = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=645a85198cd1ff499c8b99cd`);
                setAllRoles(res?.data?.data || []);
            } catch (error) {
                console.error("Error fetching module data:", error);
            }
        };
        getRoles();
    }, []);

    return (
        <>
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
                            <label className="Label__Text">Password</label>
                            <Password
                                id="password"
                                value={formik.values.password}
                                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                                toggleMask
                                feedback={false}
                            />
                            {getFormErrorMessage('password')}
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className='Label__Text'>
                                Contact
                            </label>
                            <InputText
                                id="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                type='number'
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

export default CreateUser