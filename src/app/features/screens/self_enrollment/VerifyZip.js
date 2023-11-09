import React, { useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { verifyZipAction } from "../../../store/selfEnrollment/SelfEnrollmentAction";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyZip = () => {
    const { verifyZip, verifyZipLoading, verifyZipError } = useSelector((state) => state.selfEnrollment);
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
        onSubmit(values) {
            const newData = {
                ...values,
                serviceProvider: "645a85198cd1ff499c8b99cd",
                carrier: "6455532566d6fad6eac59e34",
            };
            dispatch(verifyZipAction(newData));
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mb-3">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        if (verifyZip) {
            navigate(`/selfenrollment/personalinfo/${verifyZip?.data?._id}`, { state: verifyZip?.data });
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
                                    <Button disabled={verifyZipLoading} label="Next" type="submit" icon={verifyZipLoading === true ? "pi pi-spin pi-spinner " : ""} />
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
