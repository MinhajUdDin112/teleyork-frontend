import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../../config";
import axios from "axios";

const PersonalInfo = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const formik = useFormik({
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
        onSubmit: (values) => {
            const newData = {
                userId: id,
                ...values,
            };
            const res = axios.post(`${BASE_URL}/api/enrollment/initialInformation`, newData);
            navigate(`/selfenrollment/address/${id}`)
        },
    });
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Changed height to minHeight
                }}
            >
                <div className="col-7">
                    {/* <div className="col-12">
                        <p className="text-4xl font-semibold">IJ Wireless</p>
                    </div> */}
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
                                    <InputText className="mb-3" placeholder="Middle Name" name="middleName" value={formik.values.middleName} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Last Name" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Select a suffix if needed" name="suffix" value={formik.values.suffix} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" name="SSN" value={formik.values.SSN} onChange={formik.handleChange} />
                                    <Calendar className="mb-3" id="DOB" value={new Date(formik.values.DOB)} onChange={formik.handleChange} showIcon />
                                    <InputText className="mb-3" placeholder="Contact Phone" name="contact" value={formik.values.contact} onChange={formik.handleChange} />
                                    <div className="mb-3 flex justify-content-center">
                                        <Checkbox inputId="binary" name="isDifferentPerson" checked={formik.values.isDifferentPerson} onChange={formik.handleChange} />
                                        <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                            Is the Benefit Qualifying Person different?
                                        </label>
                                    </div>
                                    <div>
                                        {formik.values.isDifferentPerson && (
                                            <div className="flex flex-column">
                                                <InputText className="mb-3" placeholder="First Name" name="BenifitFirstName" value={formik.values.BenifitFirstName} onChange={formik.handleChange} />
                                                <InputText className="mb-3" placeholder="Middle Name" name="BenifitMiddleName" value={formik.values.BenifitMiddleName} onChange={formik.handleChange} />
                                                <InputText className="mb-3" placeholder="Last Name" name="BenifitLastName" value={formik.values.BenifitLastName} onChange={formik.handleChange} />
                                                <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" name="BenifitSSN" value={formik.values.BenifitSSN} onChange={formik.handleChange} />
                                                <Calendar className="mb-3" placeholder="Date of Birth" name="BenifitDOB" value={new Date(formik.values.BenifitDOB)} onChange={formik.handleChange} />
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
