import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PersonalInfo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const stateData = location.state;
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("This field is required"),

        lastName: Yup.string().required("This field is required"),
        SSN: Yup.string().required("This field is required"),

        contact: Yup.string().required("This field is required"),
        DOB: Yup.date().nullable().required("DOB is required").max(new Date(), "DOB cannot be in the future"),
        BenifitFirstName: Yup.string().when("isDifferentPerson", {
            is: true,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),

        BenifitLastName: Yup.string().when("isDifferentPerson", {
            is: true,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        BenifitSSN: Yup.string().when("isDifferentPerson", {
            is: true,
            then: () => Yup.string().required("This field is required"),
            otherwise: () => Yup.string().notRequired(),
        }),
        BenifitDOB: Yup.date().when("isDifferentPerson", {
            is: true,
            then: () => Yup.date().nullable().required("This field is required").max(new Date(), "DOB cannot be in the future"),
            otherwise: () => Yup.string().notRequired(),
        }),
    });

    const formik = useFormik({
        validationSchema,
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            SSN: "",
            suffix: "",
            contact: "",
            DOB: "",
            isDifferentPerson: false,
            BenifitFirstName: "",
            BenifitMiddleName: "",
            BenifitLastName: "",
            BenifitSSN: "",
            BenifitDOB: "",
        },
        onSubmit: async (values) => {
            const newData = {
                userId: id,
                ...values,
            };
            setIsLoading(true);
            if (formik.values.SSN === formik.values.BenifitSSN || (formik.values.firstName === formik.values.BenifitFirstName && formik.values.lastName === formik.values.BenifitLastName)) {
                toast.error("Information of the applicant and benefit qualifying person cannot be same");
                setIsLoading(false);
            } else {
                try {
                    const res = await axios.post(`${BASE_URL}/api/enrollment/initialInformation`, newData);
                    if (res.status === 201 || res.status === 200) {
                        // Save the response data in local storage
                        localStorage.setItem("initialInformation", JSON.stringify(res.data));
                        // Navigate to the next page
                        navigate(`/selfenrollment/address/${id}`, { state: stateData });
                        setIsLoading(false);
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.msg);
                    setIsLoading(false);
                }
            }
        },
    });

    const options = [
        { label: "Suffix", value: "" },
        { label: "JR.", value: "JR." },
        { label: "SR.", value: "SR." },
        { label: "II", value: "II" },
        { label: "III", value: "III" },
        { label: "IV", value: "IV" },
        { label: "V", value: "V" },
    ];

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error mb-3">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        const initialInformation = JSON.parse(localStorage.getItem("initialInformation"));
        if (initialInformation) {
            formik.setFieldValue("firstName", initialInformation?.data?.firstName);
            formik.setFieldValue("middleName", initialInformation?.data?.middleName);
            formik.setFieldValue("lastName", initialInformation?.data?.lastName);
            formik.setFieldValue("SSN", initialInformation?.data?.SSN);
            formik.setFieldValue("suffix", initialInformation?.data?.suffix);
            formik.setFieldValue("contact", initialInformation?.data?.contact);
            formik.setFieldValue("DOB", new Date(initialInformation?.data?.DOB));
            formik.setFieldValue("isDifferentPerson", initialInformation?.data?.isDifferentPerson);
            formik.setFieldValue("BenifitFirstName", initialInformation?.data?.BenifitFirstName);
            formik.setFieldValue("BenifitMiddleName", initialInformation?.data?.BenifitMiddleName);
            formik.setFieldValue("BenifitLastName", initialInformation?.data?.BenifitLastName);
            formik.setFieldValue("BenifitSSN", initialInformation?.data?.BenifitSSN);
            formik.setFieldValue("BenifitDOB", new Date(initialInformation?.data?.BenifitDOB));
        }
    }, []);
    const handlePaste = (event) => {
        event.preventDefault();
        toast.warning("Pasting is not allowed in this field.");
       
      };
    return (
        <>
            <ToastContainer />
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
                                <p className="text-2xl font-bold">Personal Information</p>
                                <p className="mt-0 text-xl">
                                    To proceed, we require some personal information from you. Please provide the details exactly as they appear on your government-issued ID.<br></br> If you have a middle name, kindly include it. If you do not have a middle name, you may leave that field blank.
                                    <br></br>The Benefit Qualifying Person (BQP) is an individual, such as a parent or guardian, through whom another person qualifies for the program benefits. The BQP is typically the person responsible for meeting the eligibility criteria of the program
                                </p>
                            </div>
                            <div className="col-6">
                                <div className="flex flex-column">
                                    <InputText className="mb-3" placeholder="First Name" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} style={{ textTransform: "uppercase" }} />
                                    {getFormErrorMessage("firstName")}
                                    <InputText className="mb-3" placeholder="Middle Name" name="middleName" value={formik.values.middleName} onChange={formik.handleChange} style={{ textTransform: "uppercase" }} />

                                    <InputText className="mb-3" placeholder="Last Name" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} style={{ textTransform: "uppercase" }} />
                                    {getFormErrorMessage("lastName")}

                                    <Dropdown
                                        className="mb-3"
                                        id="suffix"
                                        value={formik.values.suffix}
                                        onChange={(e) => {
                                            formik.setFieldValue("suffix", e.value);
                                            formik.handleChange(e);
                                        }}
                                        options={options}
                                        placeholder="Suffix"
                                    />

                                    <InputText type="password" className="mb-3" placeholder="SSN(Last 4 Digit) " name="SSN" value={formik.values.SSN} onChange={formik.handleChange} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                                    {getFormErrorMessage("SSN")}
                                    <Calendar onPaste={handlePaste} className="mb-3" name="DOB" placeholder="mm/dd/yyyy" value={formik.values.DOB} onChange={formik.handleChange} showIcon />
                                    {getFormErrorMessage("DOB")}
                                    <InputText className="mb-2" placeholder="Contact Phone" onChange={formik.handleChange} id="contact" value={formik.values.contact} onBlur={formik.handleBlur} minLength={10} maxLength={10} keyfilter={/^[0-9]*$/} pattern="^(?!1|0|800|888|877|866|855|844|833).*$" />
                                    {getFormErrorMessage("contact")}

                                    <div className="mb-3 flex justify-content-center">
                                        <Checkbox inputId="binary" id="isDifferentPerson" name="isDifferentPerson" checked={formik.values.isDifferentPerson} onChange={formik.handleChange} />
                                        <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                            Is the Benefit Qualifying Person different?
                                        </label>
                                    </div>
                                    <div>
                                        {formik.values.isDifferentPerson && (
                                            <div className="flex flex-column">
                                                <InputText className="mb-3" placeholder="First Name" name="BenifitFirstName" value={formik.values.BenifitFirstName} onChange={formik.handleChange} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} style={{ textTransform: "uppercase" }} />
                                                {getFormErrorMessage("BenifitFirstName")}
                                                <InputText className="mb-3" placeholder="Middle Name" name="BenifitMiddleName" value={formik.values.BenifitMiddleName} onChange={formik.handleChange} style={{ textTransform: "uppercase" }} />
                                                <InputText className="mb-3" placeholder="Last Name" name="BenifitLastName" value={formik.values.BenifitLastName} onChange={formik.handleChange} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} style={{ textTransform: "uppercase" }} />
                                                {getFormErrorMessage("BenifitLastName")}
                                                <InputText type="password" className="mb-3" placeholder="SSN(Last 4 Digit)" name="BenifitSSN" value={formik.values.BenifitSSN} onChange={formik.handleChange} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                                                {getFormErrorMessage("BenifitSSN")}

                                                <Calendar  onPaste={handlePaste} className="mb-3" placeholder="mm/dd/yyyy" name="BenifitDOB" value={formik.values.BenifitDOB} onChange={formik.handleChange} showIcon />
                                                {getFormErrorMessage("BenifitDOB")}
                                            </div>
                                        )}
                                    </div>
                                    <Button label="Next" type="submit" icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={isLoading} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
