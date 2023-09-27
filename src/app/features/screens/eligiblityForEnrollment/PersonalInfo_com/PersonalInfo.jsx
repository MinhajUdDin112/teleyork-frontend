import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RadioButton } from "primereact/radiobutton";
import { addCustomerInfoAction } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import { useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from "classnames";

const PersonalInfo = ({ handleNext,enrollment_id,_id }) => {



    const [selectedOption, setSelectedOption] = useState('email');
    const [isSelfReceive, setIsSelfReceive] = useState(true);
    const [acp, setAcp] = useState(false);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("This is Required"),
        lastName: Yup.string().required("This is Required"),
        SSN: Yup.string().required("This is Required."),
        DOB: Yup.string().required("This is Required."),
        contact: Yup.string().required("This is Required."),
        drivingLicense: Yup.string().required("This is Required."),
        email: Yup.string().email().required("This is Required."),
        isSelfReceive: Yup.string().required("This is required."),
        isACP: Yup.string().required("This is required."),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            SSN: "",
            DOB: "",
            contact: "",
            drivingLicense: "",
            email: "",
            bestWayToReach: selectedOption,
            isSelfReceive: isSelfReceive,
            isACP: acp,
        },
        onSubmit: (values, actions) => {

            const csr = "64e0b1b135a9428007da3526";
            const userId = _id;
            const dataToSend = { csr, userId, ...values };
     console.log("data to send of personal info",dataToSend)
            dispatch(addCustomerInfoAction(dataToSend));
            actions.resetForm();
            handleNext();
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleRadio = (value) => {
        setIsSelfReceive(value === "myself");
    };

    const dispatch = useDispatch();

    const apiResponse = useSelector((state) => {
        return state.lifelineOrdersReducer;
    });
    const statusCode = apiResponse?.addCustomerInfo?.status;
    const errormessage = apiResponse?.addCustomerInfoError;

    //   useEffect(() => {
    //     const nextScreen =  () => {
    //         if ( statusCode == "201") {
    //        console.log("Save Successfully");
    //        handleNext();
    //      } else {
    //       setErrorMesssage(errormessage)

    //      }
    //  };
    //  nextScreen();

    //   }, [statusCode])

    const handleACP = (e) => {
        if (formik.values.isACP == true) {
            formik.values.isACP = false;
            setAcp(false);
        } else {
            formik.values.isACP = true;
            setAcp(true);
        }
    };
    const options = [
        { label: "Select", value: "" },
        { label: "JR.", value: "JR." },
        { label: "SR.", value: "SR." },
        { label: "II", value: "II" },
        { label: "III", value: "III" },
        { label: "IV", value: "IV" },
        { label: "V", value: "V" },
    ];

    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment id: {enrollment_id}</h6>
                    <Button  label="Continue" type="submit"  />
                </div>

                <p>To apply for a Affordable Connectivity program, fillout every section of this form, initial every agreement statement, and sign the last page</p>
                <p className="text-xl font-semibold">What is your full legal name?</p>
                <p>The name you use on offical documents like your Social Security Card or State ID, Not a Nick Name.</p>

                <div className="p-fluid formgrid grid">

                    <div className="field col-12 md:col-3">
                        <label className="field_label">First Name <span className="steric">*</span></label>
                        <InputText id="firstName" value={formik.values.firstName} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("firstName") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={10} />
                        {getFormErrorMessage("firstName")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Middle Name</label>
                        <InputText id="middleName" value={formik.values.middleName} onChange={formik.handleChange} onBlur={formik.handleBlur} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={10} />
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Last Name <span className="steric">*</span></label>
                        <InputText id="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("lastName") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={10} />
                        {getFormErrorMessage("lastName")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Suffix</label>
                        <Dropdown id="suffix" options={options} value={formik.values.suffix} onChange={(e) => {
                            formik.setFieldValue("suffix", e.value)
                            formik.handleChange(e)
                        }} onBlur={formik.handleBlur} placeholder="Select" />
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">SSN <span className="steric">*</span> <small>(Last 4 Digits)</small></label>
                        <InputText id="SSN" value={formik.values.SSN} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("SSN") }, "input_text")} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                        {getFormErrorMessage("SSN")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">DOB <span className="steric">*</span> <small>(MM/DD/YYYY)</small></label>
                        <Calendar id="DOB" value={formik.values.DOB} onChange={formik.handleChange} onBlur={formik.handleBlur} showIcon className={classNames({ "p-invalid": isFormFieldValid("DOB") }, "input_text")} />
                        {getFormErrorMessage("DOB")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Driving License <span className="steric">*</span></label>
                        <InputText id="drivingLicense" value={formik.values.drivingLicense} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("drivingLicense") }, "input_text")} keyfilter={/^[a-zA-Z0-9]*$/} />
                        {getFormErrorMessage("drivingLicense")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Email <span className="steric">*</span></label>
                        <InputText id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("email") }, "input_text")} keyfilter={/^[a-zA-Z0-9]*$/} />
                        {getFormErrorMessage("email")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Contact Number <span className="steric">*</span></label>
                        <InputMask id="contact" value={formik.values.contact} onChange={formik.handleChange} mask="+999-999-9999" placeholder="+999 999-9999" className={classNames({ "p-invalid": isFormFieldValid("contact") }, "input_mask")} />
                        {getFormErrorMessage("contact")}
                       
                    </div>
                </div>

            </form>

            <div className="col-6 mb-3 p-0">
                <p className="font-semibold">What is the best way to reach you?</p>
                <div className="flex flex-wrap">
                    <div className="flex align-items-center mr-3">
                        <Checkbox
                            inputId="email"
                            value="email"
                            checked={selectedOption === 'email'}
                            onChange={handleOptionChange}
                        />
                        <label className="mx-2">
                            Email
                        </label>
                    </div>
                    <div className="flex align-items-center mr-3">
                        <Checkbox
                            inputId="phone"
                            value="phone"
                            checked={selectedOption === 'phone'}
                            onChange={handleOptionChange}
                        />
                        <label className="mx-2">
                            Phone
                        </label>
                    </div>
                    <div className="flex align-items-center mr-3">
                        <Checkbox
                            inputId="text"
                            value="text"
                            checked={selectedOption === 'text'}
                            onChange={handleOptionChange}
                        />
                        <label className="mx-2">
                            Text Message
                        </label>
                    </div>
                    <div className="flex align-items-center mr-3">
                        <Checkbox
                            inputId="mail"
                            value="mail"
                            checked={selectedOption === 'mail'}
                            onChange={handleOptionChange}
                        />
                        <label className="mx-2">
                            Mail
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p className="font-semibold">Who received government assistance? (SNAP, Medicaid, etc)</p>
                <div className="flex">
                    <div className="flex align-items-center">
                        <RadioButton inputId="myself" value="myself" name="myself" onChange={() => handleRadio("myself")} checked={isSelfReceive} />
                        <label className="ml-2">Myself</label>
                    </div>
                    <div className="flex align-items-center ml-2">
                        <RadioButton inputId="somebody" value="somebody" name="somebody" onChange={() => handleRadio("somebody")} checked={!isSelfReceive} />
                        <label className="ml-2">Somebody else in household</label>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3>Affordable Connectivity Program (ACP) Consent</h3>
                <div className="sp_small">
                    <Checkbox id="isACP" checked={acp} onChange={(e) => {
                        handleACP(e)
                        formik.handleChange(e)
                    }} className={classNames({ "p-invalid": isFormFieldValid("isACP") }, "input_mask")} />
                    <label className="p-checkbox-label mx-2">
                        By continuing with your application, you affirm and understand that the Affordable Connectivity Program is an FCC benefit program that reduces your monthly broadband invoice. The program will be in effect for an indefinite amount of time. At the conclusion of the program, you
                        will be given 30 days' notice and may elect to keep your plan at an undiscounted rate. As a participant, you may transfer your ACP benefit to another provider. The Affordable Connectivity Program is limited to one monthly service discount and one device discount per
                        household.
                    </label>
                    {getFormErrorMessage("isACP")}
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
