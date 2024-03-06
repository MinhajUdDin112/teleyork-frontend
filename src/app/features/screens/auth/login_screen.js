import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/auth/AuthAction";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function LoginScreen({ setRefreshApp }) {
    const dispatch = useDispatch();
    //const loginData = useSelector((state) => state.authentication.loginData);
    const error = useSelector((state) => state.login);
    console.log("error is ", error);
    const errormsg = error?.loginError;
    let logindata = error?.loginData;
    const loading = error?.loginLoading;
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: (values) => {
            dispatch(loginAction(values));
        },
    });

    //get url
    useEffect(() => {  
        
    setRefreshApp((prev) => !prev);
    }, [error]);
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
                        <p className="text-xl font-semibold mb-3 pt-3">Login</p>
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
                            <InputText type="text" name="email" className="p-inputtext-sm block mb-4 w-20rem" placeholder="Enter email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            {formik.touched.email && formik.errors.email ? <p className="text-red-500 text-sm mt-0">{formik.errors.email}</p> : null}
                            <InputText type="password" name="password" className="p-inputtext-sm block mb-2 w-20rem" placeholder="Enter password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            {formik.touched.password && formik.errors.password ? <p className="text-red-500 text-sm mt-0">{formik.errors.password}</p> : null}
                            <Button type="submit" className="w-20rem mt-3" label="Login" disabled={loading} icon={loading === true ? "pi pi-spin pi-spinner " : ""} />
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
