import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";

const ResumeApplication = () => {
    const location = useLocation();
    const responseData = location.state && location.state.responseData;
console.log("first",responseData.data)
    const formik = useFormik({
        initialValues:{
            firstName:"",
            middleName: "",
            lastName: "",
            email:"",
            state:"",
            zip:"",
            SSN:""

        }
    })
 const setValues = ()=>{
    formik.setFieldValue("firstName",responseData.data.firstName)
    formik.setFieldValue("middleName",responseData.data.middleName)
    formik.setFieldValue("lastName",responseData.data.lastName)
    formik.setFieldValue("email",responseData.data.email)
    formik.setFieldValue("state",responseData.data.state)
    formik.setFieldValue("zip",responseData.data.zip)
    formik.setFieldValue("SSN",responseData.data.SSN)
 }
 useEffect(()=>{
    setValues()
 },[])
   
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
                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">Resume Application</p>
                            <p className="mt-0 text-xl">We have matching information on file</p>
                            <p className="text-lg">Please verify your identity to resume application process.</p>
                        </div>
                        <div className="col-6">
                            <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-column">
                                <InputText id="firstName"  value={formik.values.firstName} disabled onChange={formik.handleChange} className="mb-3" placeholder="First Name" />
                                <InputText id="middleName" value={formik.values.middleName} disabled onChange={formik.handleChange} className="mb-3" placeholder="Middle Name" />
                                <InputText id="lastName" value={formik.values.lastName} disabled onChange={formik.handleChange} className="mb-3" placeholder="Last Name" />
                                <InputText id="email" value={formik.values.email} disabled onChange={formik.handleChange} className="mb-3" placeholder="Email" />
                                <InputText id="zip" value={formik.values.zip} disabled onChange={formik.handleChange} className="mb-3" placeholder="ZipCode" />
                                <InputText id="state" value={formik.values.state} disabled onChange={formik.handleChange} className="mb-3" placeholder="State" />
                                {/* <Calendar value={formik.values} disabled onChange={formik.handleChange} className="mb-3" id="icon" value={date} disabled onChange={(e) => setDate(e.value)} showIcon /> */}
                                <InputText id="SSN" value={formik.values.SSN} disabled onChange={formik.handleChange} className="mb-3" placeholder="Last 4 SSN or Tribal ID" />
                                <Button label="Submit" type="submit" />
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeApplication;
