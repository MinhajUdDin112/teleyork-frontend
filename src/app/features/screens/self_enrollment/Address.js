import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Address = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isBillAddress, setIsBillAddress] = useState(false);
    const navigate = useNavigate();
   

    let storedData = JSON.parse(localStorage.getItem("zip"))
    const id=storedData?.data?._id
    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("This field is required"),

        mallingAddress1: Yup.string().when("isBillAddress", {
            is: true,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        mallingCity: Yup.string().when("isBillAddress", {
            is: true,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        mallingState: Yup.string().when("isBillAddress", {
            is: true,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        mallingZip: Yup.string().when("isBillAddress", {
            is: true,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
    });
    const formik = useFormik({
        validationSchema,
        initialValues: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            isTerribleTerritory: false,
            isBillAddress: false,
            mallingAddress1: "",
            mallingAddress2: "",
            mallingZip: "",
            mallingCity: "",
            mallingState: "",
        },
        onSubmit: async (values) => {
            const newData = {
                userId: id,
                ...values,
            };
            if (formik.values.address1 == formik.values.mallingAddress1) {
                toast.error("Cannot proceed with identical information in both service and billing address fields");
            } else {
                setIsLoading(true);
                try {
                    const response = await axios.post(`${BASE_URL}/api/enrollment/homeAddress`, newData);

                    // Check if the POST request was successful
                    if (response.status === 201) {
                        // Save the response data in local storage
                        localStorage.setItem("homeAddress", JSON.stringify(response.data));
                        // Navigate to the next page
                        navigate(`/selfeligibile`);
                        setIsLoading(false);
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.msg);
                    setIsLoading(false);
                }
            }
        },
    });
    const zip = JSON.parse(localStorage.getItem("zip"));
    useEffect(() => {
        formik.setFieldValue("zip", zip?.data?.zip);
        formik.setFieldValue("city", zip?.data?.city);
        formik.setFieldValue("state",zip?.data?.state);
    }, []);

    useEffect(() => {
        const homeAddress = JSON.parse(localStorage.getItem("homeAddress"));
        if (homeAddress) {
            formik.setFieldValue("address1", homeAddress?.data?.address1);
            formik.setFieldValue("address2", homeAddress?.data?.address2);
            formik.setFieldValue("zip", zip?.data?.zip);
            formik.setFieldValue("isTerribleTerritory", homeAddress?.data?.isTerribleTerritory);
            // formik.setFieldValue('isBillAddress',homeAddress?.data?.isBillAddress)
            formik.setFieldValue("mallingAddress1", homeAddress?.data?.mailingAddress1);
            formik.setFieldValue("mallingAddress2", homeAddress?.data?.mailingAddress1);
            formik.setFieldValue("mallingZip", homeAddress?.data?.mailingZip);
            formik.setFieldValue("mallingCity", homeAddress?.data?.mailingCity);
            formik.setFieldValue("mallingState", homeAddress?.data?.mailingState);
            if (homeAddress?.data?.mailingAddress1) {
                setIsBillAddress(true);
            }
        }
    }, []);
    const handleBack = () => {
        navigate("/personalinfo");
    };
   
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mb-3">{formik.errors[name]}</small>;
    };
    const handleBilling = () => {
        if (isBillAddress === false) {
            setIsBillAddress(true);
        } else {
            setIsBillAddress(false);
        }
    };

    return (
        <>
            <ToastContainer />
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
                                <p className="mt-0 text-xl">We'll also require some information about your location.</p>
                                <p className="text-lg">
                                    The service address is the location where your ACP service will be provided to you.
                                    <br></br>The billing address is where you will receive your bills.
                                </p>
                            </div>
                            <div className="col-6">
                                <div className="flex flex-column">
                                    <InputText className="mb-3" placeholder="Enter Address 1" name="address1" value={formik.values.address1} onChange={formik.handleChange} style={{ textTransform: "uppercase" }} />
                                    {getFormErrorMessage("address1")}
                                    <InputText className="mb-3" placeholder="Enter Address 2" name="address2" value={formik.values.address2} onChange={formik.handleChange} style={{ textTransform: "uppercase" }} />

                                    <InputText className="mb-3" placeholder="Enter City" name="city" value={formik.values.city} onChange={formik.handleChange} disabled />
                                    <InputText className="mb-3" placeholder="Enter State" name="state" value={formik.values.state} onChange={formik.handleChange} disabled />
                                    <InputText className="mb-3" name="zip" value={formik.values.zip} onChange={formik.handleChange} disabled />

                                    <div className="mb-2 flex justify-content-center">
                                        <Checkbox inputId="isTerribleTerritory" name="isTerribleTerritory" checked={formik.values.isTerribleTerritory} onChange={formik.handleChange} />
                                        <label htmlFor="isTerribleTerritory" className="text-xl flex align-items-center ml-2">
                                            Is this tribal territory?
                                        </label>
                                    </div>
                                    <div className="mb-2 flex justify-content-center">
                                        <Checkbox inputId="binary" name="isBillAddress" checked={isBillAddress} onChange={handleBilling} />
                                        <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                            Is your billing address different?
                                        </label>
                                    </div>
                                    {isBillAddress ? (
                                        <div className="flex flex-column">
                                            <InputText className="mb-3" placeholder="Enter Address 1" name="mallingAddress1" value={formik.values.mallingAddress1} onChange={formik.handleChange} style={{ textTransform: "uppercase" }} />
                                            {getFormErrorMessage("mallingAddress1")}
                                            <InputText className="mb-3" placeholder="Enter Address 2" name="mallingAddress2" value={formik.values.mallingAddress2} onChange={formik.handleChange} style={{ textTransform: "uppercase" }} />

                                            <InputText className="mb-3" placeholder="Enter City" name="mallingCity" value={formik.values.mallingCity} onChange={formik.handleChange} />
                                            {getFormErrorMessage("mallingCity")}
                                            <InputText className="mb-3" placeholder="Enter State" name="mallingState" value={formik.values.mallingState} onChange={formik.handleChange} />
                                            {getFormErrorMessage("mallingState")}
                                            <InputText className="mb-3" placeholder="Enter Zip" name="mallingZip" value={formik.values.mallingZip} onChange={formik.handleChange} keyfilter={/^\d{0,5}$/} minLength={5} maxLength={5} />
                                            {getFormErrorMessage("mallingZip")}
                                        </div>
                                    ) : null}
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
