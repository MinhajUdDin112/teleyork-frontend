import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../../config";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";

const PersonalInfo = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const location = useLocation()
    const stateData = location.state;


    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("This field is required"),
        middleName: Yup.string().required("This field is required"),
        lastName: Yup.string().required("This field is required"),
        SSN: Yup.string().required("This field is required"),
        suffix: Yup.string().required("This field is required"),
        contact: Yup.string().required("This field is required"),
        DOB: Yup.date()
            .nullable()
            .required("DOB is required")
            .max(new Date(), "DOB cannot be in the future"),
        BenifitFirstName: Yup.string().when("isDifferentPerson", {
            is: true,
            then: ()=> Yup.string().required("This field is required"),
            otherwise:()=> Yup.string().notRequired()
        }),
        BenifitMiddleName: Yup.string().when("isDifferentPerson", {
            is: true,
            then:()=> Yup.string().required("This field is required"),
            otherwise:()=> Yup.string().notRequired()
        }),
        BenifitLastName: Yup.string().when("isDifferentPerson", {
            is: true,
            then:()=> Yup.string().required("This field is required"),
            otherwise:()=> Yup.string().notRequired()
        }),
        BenifitSSN: Yup.string().when("isDifferentPerson", {
            is: true,
            then:()=> Yup.string().required("This field is required"),
            otherwise:()=> Yup.string().notRequired()
        }),
        BenifitDOB: Yup.date().when("isDifferentPerson", {
            is: true,
            then:()=> Yup.date()
                .nullable()
                .required("This field is required")
                .max(new Date(), "DOB cannot be in the future"),
                otherwise:()=> Yup.string().notRequired()
        }),
    });
    

    const formik = useFormik({
        validationSchema,
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            SSN: "",
            suffix: "",
            contact: "",
            DOB: "",
            isDifferentPerson: false,
            BenifitFirstName: "",
            BenifitMiddleName: "",
            BenifitLastName: "",
            BenifitSSN: "",
            BenifitDOB: "",
        },
        onSubmit: async (values) => {
            const newData = {
                userId: id,
                ...values,
            };
        
            try {
                const res = await axios.post(`${BASE_URL}/api/enrollment/initialInformation`, newData);
                
                // Check if the POST request was successful
                if (res.status === 201) {
                    // Save the response data in local storage
                    localStorage.setItem('initialInformation', JSON.stringify(res.data));
                    console.log("initialInformation",res.data)
                    
                    // Navigate to the next page
                    navigate(`/selfenrollment/address/${id}`, { state: stateData });
                } else {
                    return toast.warn("Something went wrong");
                }
            } catch (error) {
                return toast.warn("Something went wrong");
            }
        }
        
    });

    

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mb-3">{formik.errors[name]}</small>;
    }
   
    useEffect(()=>{
        const initialInformation  = JSON.parse(localStorage.getItem('initialInformation'))
        if(initialInformation){
            formik.setFieldValue('firstName',initialInformation?.data?.firstName)
            formik.setFieldValue('middleName',initialInformation?.data?.middleName)
            formik.setFieldValue('lastName',initialInformation?.data?.lastName)
            formik.setFieldValue('SSN',initialInformation?.data?.SSN)
            formik.setFieldValue('suffix',initialInformation?.data?.suffix)
            formik.setFieldValue('contact',initialInformation?.data?.contact)
            formik.setFieldValue('DOB',initialInformation?.data?.DOB)
            formik.setFieldValue('isDifferentPerson',initialInformation?.data?.isDifferentPerson)
            formik.setFieldValue('BenifitFirstName',initialInformation?.data?.BenifitFirstName)
            formik.setFieldValue('BenifitMiddleName',initialInformation?.data?.BenifitMiddleName)
            formik.setFieldValue('BenifitLastName',initialInformation?.data?.BenifitLastName)
            formik.setFieldValue('BenifitSSN',initialInformation?.data?.BenifitSSN)
            // formik.setFieldValue('BenifitDOB',initialInformation?.data?.BenifitDOB)
        }
    },[])
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", 
                }}
            >
                <div className="col-7">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card flex p-8">
                            <div className="col-6">
                                <p className="text-2xl font-bold">Personal Information</p>
                                <p className="mt-0 text-xl">We'll need some information about yourself to proced</p>
                                <p className="text-lg">Enter the information as it appears on your government issued ID. If you have a middle name, please enter it. If you do not have a middle name, please leave the field blank.</p>
                            </div>
                            <div className="col-6">
                                <div className="flex flex-column">
                                    <InputText className="mb-3" placeholder="First Name" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
                                    {getFormErrorMessage("firstName")}
                                    <InputText className="mb-3" placeholder="Middle Name" name="middleName" value={formik.values.middleName} onChange={formik.handleChange} />
                                    {getFormErrorMessage("middleName")}
                                    <InputText className="mb-3" placeholder="Last Name" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} />
                                    {getFormErrorMessage("lastName")}
                                    <InputText className="mb-3" placeholder="Suffix" name="suffix" value={formik.values.suffix} onChange={formik.handleChange} />
                                    {getFormErrorMessage("suffix")}
                                    <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" name="SSN" value={formik.values.SSN} onChange={formik.handleChange} />
                                    {getFormErrorMessage("SSN")}
                                    <Calendar className="mb-3" name="DOB" placeholder="Enter DOB" value={formik.values.DOB} onChange={formik.handleChange} showIcon />
                                    {getFormErrorMessage("DOB")}
                                    <InputMask className="mb-3" name="contact" value={formik.values.contact} mask="999-999-9999" placeholder="+999-999-9999"  onChange={formik.handleChange} />
                                    {getFormErrorMessage("contact")}
                                    <div className="mb-3 flex justify-content-center">
                                        <Checkbox inputId="binary"  id="isDifferentPerson" name="isDifferentPerson" checked={formik.values.isDifferentPerson} onChange={formik.handleChange} />
                                        <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                            Is the Benefit Qualifying Person different?
                                        </label>
                                    </div>
                                    <div>
                                        {formik.values.isDifferentPerson && (
                                            <div className="flex flex-column">
                                                <InputText className="mb-3" placeholder="First Name" name="BenifitFirstName" value={formik.values.BenifitFirstName} onChange={formik.handleChange} />
                                                {getFormErrorMessage("BenifitFirstName")}
                                                <InputText className="mb-3" placeholder="Middle Name" name="BenifitMiddleName" value={formik.values.BenifitMiddleName} onChange={formik.handleChange} />
                                                {getFormErrorMessage("BenifitMiddleName")}
                                                <InputText className="mb-3" placeholder="Last Name" name="BenifitLastName" value={formik.values.BenifitLastName} onChange={formik.handleChange} />
                                                {getFormErrorMessage("BenifitLastName")}
                                                <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" name="BenifitSSN" value={formik.values.BenifitSSN} onChange={formik.handleChange} />
                                                {getFormErrorMessage("BenifitSSN")}
                                                
                                            <Calendar className="mb-3" placeholder="Date of Birth" name="BenifitDOB" value={formik.values.BenifitDOB} onChange={formik.handleChange} />
                                            {getFormErrorMessage("BenifitDOB")}
                                            </div>
                                        )}
                                    </div>
                                    <Button label="Next" type="submit" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
