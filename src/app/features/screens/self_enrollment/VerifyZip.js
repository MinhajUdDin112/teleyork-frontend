import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { verifyZipAction } from "../../../store/selfEnrollment/SelfEnrollmentAction";

const VerifyZip = () => {
    const { verifyZip, verifyZipLoading, verifyZipError } = useSelector((state) => state.selfEnrollment);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
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

    useEffect(()=>{
        if(verifyZip){
            navigate(`/personalinfo/${verifyZip?.data?._id}`);
        }
    },[verifyZip])

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
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card flex p-8">
                            <div className="col-6">
                                <p className="text-2xl font-bold">ACP Enrollment</p>
                                <p className="mt-0 text-xl">What is the ACP Benefit?</p>
                                <p className="text-lg">The FCC's Affordable Connectivity Program (ACP) is a new federal government program committed to bringing connectivity to low-income Americans.</p>
                            </div>

                            <div className="col-6">
                                <p className="text-2xl font-bold">Let's see if you are eligible for this benefit</p>
                                <div className="flex flex-column">
                                    <InputText className="mb-3" placeholder="ZIP Code" name="zipCode" value={formik.values.zipCode} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                                    <Button disabled={verifyZipLoading} label="Next" type="submit" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyZip;
