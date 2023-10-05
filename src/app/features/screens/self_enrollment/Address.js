import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import BASE_URL from "../../../../config";
import axios from "axios";
import { useSelector } from "react-redux";

const Address = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state;
console.log("helo",stateData)
    // const {verifyZip} =  useSelector((state) => state.selfEnrollment);
    const {id}=useParams()
    const formik = useFormik({
        initialValues: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            SSN: "",
            isTerribleTerritory: false,
            isBillAddress: false,
        },
        onSubmit: (values) => {
            const newData = {
                userId: id,
                ...values,
            }
            axios.post(`${BASE_URL}/api/enrollment/homeAddress`, newData)
            navigate(`/selfenrollment/eligibile/${id}`)
        },
    });
    const handleBack = () => {
        navigate("/selfenrollment/personalinfo");
    };
    useEffect(()=>{
        formik.setFieldValue("city",stateData?.city)
        formik.setFieldValue("state",stateData?.state)
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
                <form onSubmit={formik.handleSubmit}>

                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">Address</p>
                            <p className="mt-0 text-xl">We'll also need some information about your location.</p>
                            <p className="text-lg">The service address is the address where your ACP service will be located at. The billing address is where you'll recieve your bills.</p>
                        </div>
                            <div className="col-6">
                                
                                <div className="flex flex-column">
                                    <InputText className="mb-3" placeholder="Enter Address 1" name="address1" value={formik.values.address1} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Enter Address 2" name="address2" value={formik.values.address2} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Enter City" name="city" value={formik.values.city} onChange={formik.handleChange} disabled/>
                                    <InputText className="mb-3" placeholder="Enter State" name="state" value={formik.values.state} onChange={formik.handleChange} disabled />
                                    <InputText className="mb-3" placeholder="Enter SSN" name="SSN" value={formik.values.SSN} onChange={formik.handleChange} />

                                    <div className="mb-2 flex justify-content-center">
                                        <Checkbox inputId="isTerribleTerritory" name="isTerribleTerritory" checked={formik.values.isTerribleTerritory} onChange={formik.handleChange} />
                                        <label htmlFor="isTerribleTerritory" className="text-xl flex align-items-center ml-2">
                                            Is this tribal territory?
                                        </label>
                                    </div>
                                    <div className="mb-2 flex justify-content-center">
                                        <Checkbox inputId="binary" name="isBillAddress" checked={formik.values.billingaddress} onChange={formik.handleChange} />
                                        <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                            Is your billing address different?
                                        </label>
                                    </div>
                                    <Button label="Next" className="mb-3" type="submit" />
                                    <Button label="Back" onClick={handleBack} />
                                </div>
                            </div>
                    </div>
                    </form>

                </div>

            </div>
        </>
    );
};

export default Address;
