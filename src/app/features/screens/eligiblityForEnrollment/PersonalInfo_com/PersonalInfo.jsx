import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RadioButton } from "primereact/radiobutton";
import { addCustomerInfoAction } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import { useDispatch } from "react-redux";
import { Dropdown } from "primereact/dropdown";
const PersonalInfo = ({ handleNext, id, enrollmentId }) => {
    const dispatch = useDispatch();

    const apiResponse = useSelector((state) => {
        return state.lifelineOrdersReducer;
    });
    const statusCode = apiResponse?.addCustomerInfo?.status;
    const errormessage = apiResponse?.addCustomerInfoError;

    //console.log("api response", apiResponse);

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

    const [errorMesssage, setErrorMesssage] = useState();
    const [emailChecked, setEmailChecked] = useState(false);
    const [phoneChecked, setPhoneChecked] = useState(false);
    const [textChecked, setTextChecked] = useState(false);
    const [mailChecked, setMailChecked] = useState(false);
    const [myself, setMyself] = useState(true);
    const [somebody, setSomebody] = useState(false);
    const [acp, setAcp] = useState(false);
    const [accept, setaccept] = useState(false);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("First Name is Required")
            .matches(/^[A-Za-z]+$/),
        lastName: Yup.string().required("Last Name is Required"),
        SSN: Yup.string().required("SSN is Required."),
        DOB: Yup.string().required("DOB is Required."),
        contact: Yup.string().required("Contact is Required."),
        drivingLicense: Yup.string().required("DrivingLicense is Required."),
        email: Yup.string().required("Email is Required.").email('Invalid email format. Please enter a valid email address.'),
        bestWayToReach: Yup.string().required("BestWayToReach is required."),
        isSelfReceive: Yup.string().required("SelfReceive is required."),
        // accept: Yup.string().required("Accept Term and condition"),
        isACP: Yup.string().required("ACP is required."),
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
            bestWayToReach: "",
            isSelfReceive: true,
            // accept: false,
            isACP: true,
        },
        onSubmit: (values, actions) => {
            actions.resetForm();

            const csr = "64e0b1b135a9428007da3526";
            //const userId = "650344e84beea688bd85c752";
            const userId = id;
            const dataToSend = { csr, userId, ...values };
            dispatch(addCustomerInfoAction(dataToSend));
        },
    });

    const handleBWTReach = (e) => {
        if (e.value === "email") {
            if (e.value == formik.values.bestWayToReach) {
                setEmailChecked(false);
            } else {
                setEmailChecked(true);
            }
            setPhoneChecked(false);
            setTextChecked(false);
            setMailChecked(false);
            formik.values.bestWayToReach = e.value;
        } else if (e.value === "phone") {
            if (e.value == formik.values.bestWayToReach) {
                setPhoneChecked(false);
            } else {
                setPhoneChecked(true);
            }
            setEmailChecked(false);
            setTextChecked(false);
            setMailChecked(false);
            formik.values.bestWayToReach = e.value;
        } else if (e.value === "text") {
            if (e.value == formik.values.bestWayToReach) {
                setTextChecked(false);
            } else {
                setTextChecked(true);
            }
            setEmailChecked(false);
            setMailChecked(false);
            setPhoneChecked(false);
            formik.values.bestWayToReach = e.value;
        } else if (e.value === "mail") {
            if (e.value == formik.values.bestWayToReach) {
                setMailChecked(false);
            } else {
                setMailChecked(true);
            }
            setEmailChecked(false);
            setTextChecked(false);
            setPhoneChecked(false);
            formik.values.bestWayToReach = e.value;
        }
    };

    const handleRadio = (e) => {
        if (e.value == "myself") {
            setMyself(true);
            formik.values.isSelfReceive = true;
            setSomebody(false);
        } else {
            setMyself(false);
            formik.values.isSelfReceive = false;
            setSomebody(true);
        }
    };
    const handleaccept = (e) => {
        if (formik.values.accept == true) {
            formik.values.accept = false;
            setaccept(false);
        } else {
            formik.values.accept = true;
            setaccept(true);
        }
    };
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
                {errormessage && <p style={{ color: "red" }}>{errormessage}</p>}
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment id: {enrollmentId}</h6>
                    <Button label="Continue" type="submit" />
                </div>
                <p>To apply for a Affordable Connectivity program, fillout every section of this form, initial every agreement statement, and sign the last page</p>
                <p className="text-xl font-semibold">What is your full legal name?</p>
                <p>The name you use on offical documents like your Social Security Card or State ID, Not a Nick Name.</p>
                <div className="flex flex-wrap mb-3 ">
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            First Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.firstName} name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^[a-zA-Z\s]*$/} />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.firstName}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">Middle Name</p>
                        <InputText type="text" value={formik.values.middleName} name="middleName" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^[a-zA-Z\s]*$/} />
                        {formik.touched.middleName && formik.errors.middleName ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.middleName}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Last Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.lastName} name="lastName" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^[a-zA-Z\s]*$/} />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.lastName}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">Suffix </p>
                        <Dropdown className="w-21rem" id="suffix" name="suffix" options={options} value={formik.values.suffix} onChange={(e) => formik.setFieldValue("suffix", e.value)} onBlur={formik.handleBlur} placeholder="Select " />
                        {formik.touched.suffix && formik.errors.suffix && <small className="p-error">{formik.errors.suffix}</small>}
                    </div>

                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            SSN (Last 4 Digit)<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.SSN} name="SSN" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^\d{0,4}$/} />
                        {formik.touched.SSN && formik.errors.SSN ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.SSN}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            DOB (MM/DD/YYYY)<span style={{ color: "red" }}>*</span>
                        </p>
                        <Calendar id="icon" value={formik.values.DOB} name="DOB" onChange={formik.handleChange} onBlur={formik.handleBlur} showIcon className="w-21rem" />
                        {formik.touched.DOB && formik.errors.DOB ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.DOB}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Driving License <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.drivingLicense} name="drivingLicense" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.drivingLicense && formik.errors.drivingLicense ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.drivingLicense}
                            </p>
                        ) : null}
                    </div>

                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Email <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.email}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Contact Number <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.contact} name="contact" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem"  />
                        {formik.touched.contact && formik.errors.contact ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.contact}
                            </p>
                        ) : null}
                    </div>
                </div>
            </form>
            <div className="col-6 mb-3 p-0">
                <p className="font-semibold">What is the best way to reach you?</p>
                <div className="flex flex-wrap">
                    <div className="flex align-items-center mr-3">
                        <Checkbox inputId="email" value="email" name="email" checked={emailChecked} onChange={(e) => handleBWTReach(e)}></Checkbox>
                        <label htmlFor="email" className="p-checkbox-label mx-2">
                            Email
                        </label>
                    </div>
                    <div className="flex align-items-center mr-3">
                        <Checkbox inputId="phone" value="phone" name="phone" checked={phoneChecked} onChange={(e) => handleBWTReach(e)}></Checkbox>
                        <label htmlFor="phone" className="p-checkbox-label mx-2">
                            Phone
                        </label>
                    </div>
                    <div className="flex align-items-center mr-3">
                        <Checkbox inputId="text" value="text" name="text" checked={textChecked} onChange={(e) => handleBWTReach(e)}></Checkbox>
                        <label htmlFor="text" className="p-checkbox-label mx-2">
                            Text Message
                        </label>
                    </div>
                    <div className="flex align-items-center mr-3">
                        <Checkbox inputId="mail" value="mail" name="mail" checked={mailChecked} onChange={(e) => handleBWTReach(e)}></Checkbox>
                        <label htmlFor="mail" className="p-checkbox-label mx-2">
                            Mail
                        </label>
                    </div>
                </div>
            </div>
            {/* <div className=" mb-3">
                <Checkbox inputId="accept" checked={accept} onChange={(e) => handleaccept(e)}></Checkbox>
                <label className="ml-2">By checking this box and your signature below, you are agreeing to the terms and conditions.</label>
            </div> */}
            <div className="mt-4">
                <p className="font-semibold">Who recieved government assistance? (SNAP, Medicaid, etc)</p>
                <div className="flex">
                    <div className="flex align-items-center">
                        <RadioButton inputId="myself" value="myself" name="myself" onChange={(e) => handleRadio(e)} checked={myself} />
                        <label htmlFor="myself" className="ml-2">
                            Myself
                        </label>
                    </div>
                    <div className="flex align-items-center ml-2">
                        <RadioButton inputId="somebody" value="somebody" name="somebody" onChange={(e) => handleRadio(e)} checked={somebody} />
                        <label htmlFor="somebody" className="ml-2">
                            Somebody else in household
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3>Affordable Connectivity Program (ACP) Consent</h3>
                <div className="flex">
                    <Checkbox inputId="isACP" checked={acp} onChange={(e) => handleACP(e)}></Checkbox>
                    <label htmlFor="isACP" className="p-checkbox-label mx-2">
                        By continuing with your application, you affirm and understand that the Affordable Connectivity Program is an FCC benefit program that reduces your monthly broadband invoice. The program will be in effect for an indefinite amount of time. At the conclusion of the program, you
                        will be given 30 days' notice and may elect to keep your plan at an undiscounted rate. As a participant, you may transfer your ACP benefit to another provider. The Affordable Connectivity Program is limited to one monthly service discount and one device discount per
                        household.
                    </label>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
