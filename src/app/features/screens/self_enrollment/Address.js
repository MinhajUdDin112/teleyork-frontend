import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import BASE_URL from "../../../../config";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

const Address = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state;

    const {id}=useParams()
    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("This field is required"),
       
        SSN: Yup.string().required("This field is required"),
    })
    const formik = useFormik({
        validationSchema,
        initialValues: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            SSN: "",
            isTerribleTerritory: false,
            isBillAddress: false,
        },
        onSubmit: async (values) => {
            const newData = {
                userId: id,
                ...values,
            };
            setIsLoading(true);
                   try {
                const response = await axios.post(`${BASE_URL}/api/enrollment/homeAddress`, newData)
                
                // Check if the POST request was successful
                if (response.status === 201) {
                    // Save the response data in local storage
                    localStorage.setItem('homeAddress', JSON.stringify(response.data));
                    // Navigate to the next page
                    navigate(`/selfenrollment/eligibile/${id}`)
                    setIsLoading(false);
                } 
            } catch (error) {
                 toast.error(error?.response?.data?.msg);
                 setIsLoading(false);
            }
        }
        
    });
    useEffect(()=>{
        const homeAddress  = JSON.parse(localStorage.getItem('homeAddress'))
        if(homeAddress){
            formik.setFieldValue('address1',homeAddress?.data?.address1)
            formik.setFieldValue('address2',homeAddress?.data?.address2)
            formik.setFieldValue('SSN',homeAddress?.data?.SSN)
            formik.setFieldValue('isTerribleTerritory',homeAddress?.data?.isTerribleTerritory)
            formik.setFieldValue('isBillAddress',homeAddress?.data?.isBillAddress)
           
        }
    },[])
    const handleBack = () => {
        navigate(-1);
    };
    useEffect(()=>{
        formik.setFieldValue("city",stateData?.city)
        formik.setFieldValue("state",stateData?.state)
    },[])

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mb-3">{formik.errors[name]}</small>;
    }

    return (
        <>
        <ToastContainer/>
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
                                    {getFormErrorMessage("address1")}
                                    <InputText className="mb-3" placeholder="Enter Address 2" name="address2" value={formik.values.address2} onChange={formik.handleChange} />
                                   
                                    <InputText className="mb-3" placeholder="Enter City" name="city" value={formik.values.city} onChange={formik.handleChange} disabled/>
                                    <InputText className="mb-3" placeholder="Enter State" name="state" value={formik.values.state} onChange={formik.handleChange} disabled />
                                    <InputText className="mb-3" placeholder="SSN(Last 4 Digit) " name="SSN" value={formik.values.SSN} onChange={formik.handleChange} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                                    {getFormErrorMessage("SSN")}

                                    <div className="mb-2 flex justify-content-center">
                                        <Checkbox inputId="isTerribleTerritory" name="isTerribleTerritory" checked={formik.values.isTerribleTerritory} onChange={formik.handleChange} />
                                        <label htmlFor="isTerribleTerritory" className="text-xl flex align-items-center ml-2">
                                            Is this tribal territory?
                                        </label>
                                    </div>
                                    <div className="mb-2 flex justify-content-center">
                                        <Checkbox inputId="binary" name="isBillAddress" checked={formik.values.isBillAddress} onChange={formik.handleChange} />
                                        <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                            Is your billing address different?
                                        </label>
                                    </div>
                                    <Button label="Next" className="mb-3" type="submit" icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={isLoading} />
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
