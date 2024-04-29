import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import "./login.css"
import Axios from "axios";
import {Password} from "primereact/password"
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function LoginScreen({ setRefreshApp }) { 
    const [showPassowrd,setShowPassword]=useState(false)
    const [loading, setLoading] = useState(false);
    const [errormsg, setErrorMsg] = useState(null);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading((prev) => !prev);
            Axios.post(`${BASE_URL}/api/web/user/login`, formik.values)
                .then((response) => {
                    const allowdPerms = response?.data?.data?.permissions;
                    localStorage.setItem("userData", JSON.stringify(response?.data?.data));
                    localStorage.setItem("accessToken", JSON.stringify(response?.data?.data?.token));
                    localStorage.setItem("refreshToken", JSON.stringify(response?.data?.refreshToken));

                    localStorage.setItem("permissions", JSON.stringify(allowdPerms));
                    setRefreshApp((prev) => !prev);
                })
                .catch((err) => {
                    setErrorMsg(err.response?.data?.msg);
                    setLoading((prev) => !prev);
                });
        },
    });
    useEffect(() => {
        var currentURL;
        var modifiedURL;
        currentURL = window.location.href;
        // currentURL = "http://dev-ijwireless.teleyork.com/#/login";
        if (currentURL.includes("dev-")) {
            modifiedURL = currentURL.replace("http://dev-", "");
            modifiedURL = modifiedURL.replace("/#/login", "");
        } else {
            modifiedURL = currentURL.replace("http://", "");
            modifiedURL = modifiedURL.replace("/#/login", "");
        }
        const sendURl = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/serviceProvider/getSPdetailByDomain?subDomain=${modifiedURL}`);
            } catch (error) {}
        };
        sendURl();
    }, []);
    return (
        <>
            <div className="flex justify-center items-center" style={{ minHeight: "100vh" }}>
                <div className="card col-4 m-auto" style={{ height: "50vh" }}>
                    <div className="flex justify-content-center">
                        <p className="text-2xl font-bold mb-3 pt-3">LOGIN</p>
                    </div>
                    {errormsg ? (
                        <div className="flex justify-content-center mb-2">
                            <p style={{ color: "red" }} className="font-semibold text-xl">
                                Invalid Credentials
                            </p>
                        </div>
                    ) : null}
                    <div className="flex justify-content-center  w-full">
                        <form onSubmit={formik.handleSubmit}>
                            <InputText type="text" name="email" className="mt-2  block mb-2 w-20rem" placeholder="Enter email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            {formik.touched.email && formik.errors.email ? <p className="text-red-500 p-error ml-1 text-sm mt-0">{formik.errors.email}</p> : null}
                            <div className="mt-2 passworddiv" >
                            <Password  type="password"  feedback={false} tabIndex={1} name="password" className="  mb-2 " placeholder="Enter password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <i className={`${showPassowrd ? "pi-eye":"pi-eye-slash"} pi`} onClick={(e)=>{ 
                                       
                                          if(
                                            e.target.previousElementSibling.children[0].type === "text" ){
                                        e.target.previousElementSibling.children[0].type="password" 
                                          } 
                                           else{     
                                            e.target.previousElementSibling.children[0].type="text" 
                                           } 
                                           setShowPassword(prev=>!prev)  
                                }}/>
                             </div>
                            {formik.touched.password && formik.errors.password ? <p className="text-red-500 p-error ml-1 text-sm mt-0">{formik.errors.password}</p> : null}
                            <Button type="submit" className="w-20rem mt-2" label="Login" disabled={loading} icon={loading === true ? "pi pi-spin pi-spinner " : ""} />
                            <div>
                                <NavLink className="font-semibold mt-3 justify-content-center flex " to={{ pathname: "/sendotp", state: { email: formik.values.email } }}>
                                    Forgot Password?
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
