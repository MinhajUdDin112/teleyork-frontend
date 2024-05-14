import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import Axios from "axios";
import { Password } from "primereact/password";
import { Eyebutton, LoginPageCircle, LoginRightBottom, LoginRightTop, SplashScreen, SplashTeleyorkLogo, TeleyorkLogo } from "../../../../utility";
import { LoginLeftBottom } from "../../../../utility";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function LoginScreen({ setRefreshApp }) {
    const [showPassowrd, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errormsg, setErrorMsg] = useState(null);
    const [splashScreen, setSplashScreen] = useState(false);
    setTimeout(() => {
        setSplashScreen(true);
    }, 3000);
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
            {splashScreen ? (
                <div className="flex justify-center items-center" style={{ minHeight: "100vh", backgroundColor: "white" }}>
                    <LoginPageCircle />
                    <div className="LoginLeftBottomContainer">
                        <div className="LoginLeftBottom">
                            <LoginLeftBottom />
                        </div>
                        <div className="LoginRightTop">
                            <LoginRightTop />
                        </div>
                        <div className="LoginRightBottom">
                            <LoginRightBottom />
                        </div>
                    </div>

                    <div className="card1" style={{ height: "65vh", width: "400px", paddingLeft: "30px" }}>
                        <div className="flex flex-start" style={{ marginTop: "24px" }}>
                            <p className="p">WELCOME!</p>
                        </div>
                        <div className="teleyorklogo">
                            <TeleyorkLogo />
                        </div>
                        <div className="flex flex-start">
                            <p className="p1">Please Login to access your account</p>
                            <br />
                        </div>
                        {errormsg ? (
                            <div className="flex justify-content-center mb-2">
                                <p style={{ color: "red" }} className="font-semibold text-xl">
                                    Invalid Credentials
                                </p>
                            </div>
                        ) : null}
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <label className="labell">Email</label>
                                <br />
                                <InputText type="text" name="email" className="emailfield" placeholder="Enter Email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email ? (
                                    <p style={{ height: "10px" }} className="text-red-500 p-error ml-1 text-sm mt-0 ">
                                        {formik.errors.email}
                                    </p>
                                ) : null}
                                {!formik.errors.email ? (
                                    <>
                                        <br />
                                        <br />
                                    </>
                                ) : null}
                                <label className="labell">Password</label>
                                <div className="passworddiv" style={{ height: "40px", marginTop: "10px", width: "350px" }}>
                                    <Password type="password" style={{ height: "35px" }} feedback={false} tabIndex={1} name="password" className="" placeholder="Enter password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    <i
                                        className={`${showPassowrd ? "pi-eye" : "pi-eye-slash"} pi`}
                                        onClick={(e) => {
                                            if (e.target.previousElementSibling.children[0].type === "text") {
                                                e.target.previousElementSibling.children[0].type = "password";
                                            } else {
                                                e.target.previousElementSibling.children[0].type = "text";
                                            }
                                            setShowPassword((prev) => !prev);
                                        }}
                                    />
                                </div>

                                {formik.touched.password && formik.errors.password ? <p className="text-red-500 p-error ml-1 text-sm mt-0">{formik.errors.password}</p> : null}
                                <div style={{ marginTop: "5px" }}>
                                    <NavLink className="forgot" to={{ pathname: "/sendotp", state: { email: formik.values.email } }}>
                                        Forgot Password?
                                    </NavLink>
                                </div>
                                <Button type="submit" className="login" label="Login" disabled={loading} icon={loading === true ? "pi pi-spin pi-spinner " : ""} />
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="splashContainer">
                    <img className="splashimg" src="./splash.png" alt="splash" />
                    <div className="splashinnerdiv">
                        <SplashTeleyorkLogo />
                    </div>
                </div>
            )}
        </>
    );
}
