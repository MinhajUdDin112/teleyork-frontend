import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const ResumeApplication = () => {
    const location = useLocation();
    const responseData = location.state && location.state.responseData;
const navigate = useNavigate()
const [visible,setVisible]=useState(false)

const confirm1 = () => {
    confirmDialog({
        message: 'Your enrollment has been done',
        header: 'Congratulations',
        acceptLabel: 'Submit',
        rejectLabel:"Reject",
        className: 'hide-reject-button',
        accept:()=>{
            localStorage.removeItem("homeAddress")
            localStorage.removeItem("selectProgram")
            localStorage.removeItem("initialInformation")
            navigate('/selfenrollment')
        },
        reject:()=>{
            setVisible(false)
        }
    });
};


    const formik = useFormik({
        initialValues:{
            firstName:"",
            lastName: "",
            email:"",
            state:"",
            zip:"",
            SSN:""

        },
        onSubmit(){
            confirm1()
        }
    })
 const setValues = ()=>{
    formik.setFieldValue("firstName",responseData.data.firstName)
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
                            <p className="text-2xl font-bold">Self Enrollment Completed</p>
                            <p className="mt-0 text-xl">We have matching information on file</p>
                            {/* <p className="text-lg">Please verify your identity to resume application process.</p> */}
                        </div>
                        <div className="col-6">
                            <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-column">
                                <InputText id="firstName"  value={formik.values.firstName} disabled onChange={formik.handleChange} className="mb-3" placeholder="First Name" />
                                <InputText id="lastName" value={formik.values.lastName} disabled onChange={formik.handleChange} className="mb-3" placeholder="Last Name" />
                                <InputText id="email" value={formik.values.email} disabled onChange={formik.handleChange} className="mb-3" placeholder="Email" />
                                <InputText id="zip" value={formik.values.zip} disabled onChange={formik.handleChange} className="mb-3" placeholder="ZipCode" />
                                <InputText id="state" value={formik.values.state} disabled onChange={formik.handleChange} className="mb-3" placeholder="State" />
                                {/* <Calendar value={formik.values} disabled onChange={formik.handleChange} className="mb-3" id="icon" value={date} disabled onChange={(e) => setDate(e.value)} showIcon /> */}
                                <InputText id="SSN" value={formik.values.SSN} disabled onChange={formik.handleChange} className="mb-3" placeholder="Last 4 SSN or Tribal ID" />
                                <Button label="Submit" type="submit"  />
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDialog visible={visible} rejectClassName='hidden' />
        </>
    );
};

export default ResumeApplication;
