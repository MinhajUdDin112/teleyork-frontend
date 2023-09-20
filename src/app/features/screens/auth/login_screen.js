import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/auth/AuthAction";

export default function LoginScreen() {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.login);
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
            console.log(formik.values);
        },
    });

    return (
        <>
            <div className="flex justify-center items-center" style={{ minHeight: "100vh" }}>
                <div className="card col-4 m-auto" style={{ height: "50vh" }}>
                    <div className="flex justify-content-center">
                        <p className="text-xl font-semibold mb-3 pt-3">Login</p>
                    </div>
                    {error ? (
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
                            <Button type="submit" className="w-20rem mt-3" label="Login" />
                            <div>
                                <NavLink className="font-semibold mt-3 justify-content-center flex " to={{ pathname: "/sendotp", state: { email: formik.values.email } }}>
                                    Forget Password?
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
