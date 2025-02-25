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
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
const PrepaidSelfVerifyZip = () => {
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
                serviceProvider: parseLoginRes?.company,  
                accountType:"Prepaid",
                carrier:"6455532566d6fad6eac59e34",
            };
            setIsButtonLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/enrollment/PWGverifyZip`, newData);
                   if (response?.status === 200 || response?.status === 201) {    
                    localStorage.removeItem("prepaidbasicData");
                    localStorage.removeItem("prepaidaddress");
                    localStorage.removeItem("prepaidzipData");
                    localStorage.removeItem("prepaidagreeData");
                    localStorage.removeItem("prepaidprogrammeId");
                    localStorage.removeItem("paymentmethod");
                    localStorage.removeItem("paymentdetails");
                    localStorage.removeItem("comingfromincomplete");
                    localStorage.removeItem("comingforedit");
                    localStorage.removeItem("paymentmethod");
                    localStorage.removeItem("paymentdetails");
                    localStorage.removeItem("inventoryType");
                    //Payment Status
                    localStorage.removeItem("paymentstatus");
                    localStorage.removeItem("stripeId");
                    //Device local
                    localStorage.removeItem("deviceadditional");
                    localStorage.removeItem("deviceadditionaltotal");
                    localStorage.removeItem("deviceadditionalfeaturearray");
                    localStorage.removeItem("totaldevicediscount");
                    localStorage.removeItem("devicediscountobjectarray");
                    localStorage.removeItem("deviceplan");
                    localStorage.removeItem("devicepricing");
                    //SIM Local
                    localStorage.removeItem("simadditional");
                    localStorage.removeItem("simadditionaltotal");
                    localStorage.removeItem("simadditionalfeaturearray");
                    localStorage.removeItem("totalsimdiscount");
                    localStorage.removeItem("simdiscountobjectarray");
                    localStorage.removeItem("simplan");
                    localStorage.removeItem("simpricing");
                    localStorage.removeItem("devicediscount");
                    localStorage.removeItem("simPaymentMethod");
                    localStorage.removeItem("deviceadditionalfeaturearraytotal");
                    localStorage.removeItem("simadditionalfeaturearraytotal");
                    localStorage.removeItem("devicediscountobjectarraytotal");
                    localStorage.removeItem("simdiscountobjectarraytotal");
                    localStorage.removeItem("simdiscount");
                    localStorage.removeItem("planprices");
                    localStorage.removeItem("devicePaymentMethod");
                    localStorage.removeItem("datasendforinvoice"); 
                    localStorage.removeItem('inventoryselect') 
                    localStorage.removeItem("planselect")
                    localStorage.removeItem("invoiceData");
                    localStorage.setItem("zip", JSON.stringify(response.data));
                    localStorage.removeItem("initialInformation");
                    localStorage.removeItem("homeAddress");
                    localStorage.removeItem("selectProgram");    
                    localStorage.removeItem("initialInformation")    
                    localStorage.removeItem("selfinventoryselect")    
                     
        localStorage.removeItem("termsandcondition")
                    localStorage.removeItem("selfplanselect")   
                    
        localStorage.removeItem("paymentallinfoself")
                    navigate("/prepaid-selfpersonalinfo");
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
            navigate("/prepaid-selfpersonalinfo");
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
                          {/*  <div className="col-6">
                                <p className="text-2xl font-bold">ACP Enrollment</p>
                                <p className="mt-0 text-xl">What is ACP?</p>
                                <p className="text-lg">The Affordable Connectivity Program (ACP), administered by the FCC, is a recently established federal initiative dedicated to providing internet access to low-income individuals and families.</p>
                            </div>     */}
                            <div className="col-12">
                                <p className="text-2xl font-bold">Let's see if you are eligible for Prepaid Program   </p>
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

export default PrepaidSelfVerifyZip;
