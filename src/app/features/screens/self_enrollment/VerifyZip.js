import React, { useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const VerifyZip = () => {

    const [companyData, setcompanyData] = useState()

    useEffect( () => {
      
        var currentURL;
        var modifiedURL;
          currentURL = window.location.href;
        // currentURL = "http://dev-ijwireless.teleyork.com/#/login";
        if (currentURL.includes("dev-")) {
            modifiedURL = currentURL.replace("http://dev-", "");
            modifiedURL = modifiedURL.replace("/#/", "");
            if(modifiedURL.includes("login")){
                modifiedURL = modifiedURL.replace("login", "");
               
            }   else{
                modifiedURL = modifiedURL.replace("selfenrollment", "");
               
            }      
          
            
           
        } else {
            modifiedURL = currentURL.replace("http://", "");
            modifiedURL = modifiedURL.replace("/#/", "");
            modifiedURL = modifiedURL.replace("login", "");
            modifiedURL = modifiedURL.replace("selfenrollment", "");
          
          
        }
        const sendURl = async ()=>{
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/serviceProvider/getSPdetailByDomain?subDomain=${modifiedURL}`);
                    setcompanyData(response?.data)
                    localStorage.setItem("companyName", JSON.stringify(response?.data?.data?.name));
            } catch (error) {
                console.log("error is", error?.response?.data?.msg);
            }
        }
        sendURl();
       
    }, []);

    const { verifyZip, verifyZipLoading, verifyZipError } = useSelector((state) => state.selfEnrollment);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        zipCode: Yup.string()
            .required("ZIP Code is required")
            .matches(/^\d{5}$/, "ZIP Code must be a 5-digit number"),
        email: Yup.string().required("Email is required").email("Invalid email address"),
    });
    const formik = useFormik({
        validationSchema,
        initialValues: {
            email: "",
            zipCode: "",
        },
        onSubmit: async (values) => {
            const newData = {
                ...values,
                serviceProvider: companyData?.data?._id,
                carrier: companyData?.data?.carrier,
            };
            setIsButtonLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/enrollment/verifyZip`, newData);
                if (response?.status === 200 || response?.status === 201) {
                    localStorage.setItem("zip", JSON.stringify(response.data));
                    localStorage.removeItem("initialInformation");
                    localStorage.removeItem("homeAddress");
                    localStorage.removeItem("selectProgram");
                    navigate("/personalinfo");
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsButtonLoading(false);
            }
            setIsButtonLoading(false);
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mb-3">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        if (verifyZip) {
            navigate("/personalinfo");
        }
        if (verifyZipError) {
            toast.error(verifyZipError || "An error occurred");
        }
    }, [verifyZip, verifyZipError]);

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
                                <p className="text-2xl font-bold">ACP Enrollment</p>
                                <p className="mt-0 text-xl">What is ACP?</p>
                                <p className="text-lg">The Affordable Connectivity Program (ACP), administered by the FCC, is a recently established federal initiative dedicated to providing internet access to low-income individuals and families.</p>
                            </div>
                            <div className="col-6">
                                <p className="text-2xl font-bold">Let's see if you are eligible for this benefit</p>
                                <div className="flex flex-column">
                                    <InputText className="mb-3" placeholder="ZIP Code" name="zipCode" value={formik.values.zipCode} onChange={formik.handleChange} onBlur={formik.handleBlur} keyfilter={/^\d{0,5}$/} minLength={5} maxLength={5} disabled={verifyZipLoading} />
                                    {getFormErrorMessage("zipCode")}
                                    <InputText className="mb-3" placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={verifyZipLoading} />
                                    {getFormErrorMessage("email")}
                                    <Button disabled={isButtonLoading} label="Next" type="submit" icon={isButtonLoading === true ? "pi pi-spin pi-spinner " : ""} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default VerifyZip;
