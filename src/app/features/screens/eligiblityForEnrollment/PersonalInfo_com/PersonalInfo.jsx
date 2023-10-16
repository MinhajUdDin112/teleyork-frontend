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
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import BASE_URL from "../../../../../config";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import classNames from "classnames";
const PersonalInfo = ({ handleNext, enrollment_id, _id, isBack }) => {

    

    const [eSim, seteSim] = useState(false);
    const [selectedOption, setSelectedOption] = useState("email");
    const [isSelfReceive, setIsSelfReceive] = useState(true);
    const [isHouseHold, setIsHouseHold] = useState(false);
    const [acp, setAcp] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("This is Required"),
        lastName: Yup.string().required("This is Required"),
        SSN: Yup.string().required("This is Required."),
        DOB: Yup.string().required("This is Required."),
        contact: Yup.string().required("This is Required."),
        email: Yup.string().email().required("This is Required."),
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
            ESim: "",
            bestWayToReach: "",
            isSelfReceive: "",
            BenifitFirstName: "",
            BenifitLastName: "",
            BenifitSSN: "",
            BenifitDOB: "",
            isACP: acp,
        },
        onSubmit: async(values, actions) => {
            const csr = "64e0b1b135a9428007da3526";
            const userId = _id;
            const dataToSend = { csr, userId, ...values };
            setIsLoading(true)
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`, dataToSend);
            if (response?.status === 200 ||response?.status === 201 ) {
              localStorage.setItem("basicData", JSON.stringify(response.data));
              toast.success("information saved Successfully")
              handleNext();
             
            }
          } catch (error) {
                    toast.error(error?.response?.data?.msg)
                    setIsLoading(false)

          }
       
           
        },
    });

    useEffect(() => {
        formik.setFieldValue("ESim", eSim);
    }, [eSim]);
    useEffect(() => {
        formik.setFieldValue("bestWayToReach", selectedOption);
    }, [selectedOption]);

    useEffect(() => {
        formik.setFieldValue("isSelfReceive", isSelfReceive);
    }, [isSelfReceive]);

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const handleESim = (e) => {
        seteSim(e.target.value);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleRadio = (value) => {
        setIsSelfReceive(value === "myself");
        if(value==='somebody'){
            setIsHouseHold(true);
        }
        else{
                setIsHouseHold(false);
        }
    };

    const dispatch = useDispatch();


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
    const disableSuggestion = () => null;


    // useEffect(() => {
    //    console.log("hell, you do it")
    // }, [isBack])

    return (
        <>
        <ToastContainer/>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-tems-center mb-2 sticky-buttons">
                    <h6 className="font-semibold">Enrollment id: {enrollment_id}</h6>
                    {isLoading?  <Button label="Continue" type="submit" disabled /> :  <Button label="Continue" type="submit" />}
                   
                </div>

                <p>To apply for a Affordable Connectivity program, fillout every section of this form, initial every agreement statement, and sign the last page</p>
                <p className="text-xl font-semibold">What is your full legal name?</p>
                <p>The name you use on offical documents like your Social Security Card or State ID, Not a Nick Name.</p>

                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            First Name <span className="steric">*</span>
                        </label>
                        <InputText id="firstName" value={formik.values.firstName} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("firstName") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} />
                        {getFormErrorMessage("firstName")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Middle Name</label>
                        <InputText id="middleName" value={formik.values.middleName} onChange={formik.handleChange} onBlur={formik.handleBlur} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={10} />
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Last Name <span className="steric">*</span>
                        </label>
                        <InputText id="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("lastName") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} />
                        {getFormErrorMessage("lastName")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">Suffix</label>
                        <Dropdown
                            id="suffix"
                            options={options}
                            value={formik.values.suffix}
                            onChange={(e) => {
                                formik.setFieldValue("suffix", e.value);
                                formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Select"
                        />
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            SSN <span className="steric">*</span> <small>(Last 4 Digits)</small>
                        </label>
                        <InputText id="SSN" value={formik.values.SSN} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("SSN") }, "input_text")} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                        {getFormErrorMessage("SSN")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            DOB <span className="steric">*</span> <small>(MM/DD/YYYY)</small>
                        </label>
                        <Calendar id="DOB" value={formik.values.DOB} onChange={formik.handleChange} onBlur={formik.handleBlur} showIcon className={classNames({ "p-invalid": isFormFieldValid("DOB") }, "input_text")} />
                        {getFormErrorMessage("DOB")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Driving License
                        </label>
                        <InputText id="drivingLicense" value={formik.values.drivingLicense} onChange={formik.handleChange} onBlur={formik.handleBlur}  keyfilter={/^[a-zA-Z0-9]*$/} />
                        
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Email <span className="steric">*</span>
                        </label>
                        <InputText id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("email") }, "input_text")} />
                        {getFormErrorMessage("email")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label" htmlFor="contact">
                            Contact Number <span className="steric">*</span>
                        </label>

                        <InputMask completeMethod={disableSuggestion} onChange={formik.handleChange} id="contact" value={formik.values.contact} mask="999-999-9999" placeholder="999-999-9999" className={classNames({ "p-invalid": isFormFieldValid("contact") }, "input_mask")} />
                        {getFormErrorMessage("contact")}
                    </div>
                </div>
            </form>
            <div className="col-6 mb-3 p-0">
                <p className="font-semibold">E-Sim</p>
                <div className="flex flex-wrap mt-2">
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton id="ESIm" value={false} checked={eSim === false} onChange={(e) => handleESim(e)}></RadioButton>
                        <label className="ml-2">NO</label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton id="ESIm" value={true} checked={eSim === true} onChange={(e) => handleESim(e)}></RadioButton>
                        <label className="ml-2">Yes</label>
                        <div />
                    </div>
                </div>
            </div>
            <div className="col-6 mb-3 p-0">
                <p className="font-semibold">What is the best way to reach you?</p>
                <div className="flex flex-wrap mt-4">
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="email" name="email" value="email" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "email"} />
                        <label htmlFor="email" className="ml-2">
                            Email
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="Phone" name="phone" value="phone" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "phone"} />
                        <label htmlFor="phone" className="ml-2">
                            Phone
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="message" name="message" value="message" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "message"} />
                        <label htmlFor="message" className="ml-2">
                            Text Message
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="mail" name="mail" value="mail" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "mail"} />
                        <label htmlFor="mail" className="ml-2">
                            Mail
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="any" name="any" value="any" onChange={(e) => setSelectedOption(e.value)} checked={selectedOption === "any"} />
                        <label htmlFor="any" className="ml-2">
                            Any
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

            {
                isHouseHold ? <div>
                    <div className="mt-4">
                    <p className="font-semibold">Information of benefit qualifying person</p>
                    <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            First Name <span className="steric">*</span>
                        </label>
                        <InputText id="BenifitFirstName" value={formik.values.BenifitFirstName} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("BenifitFirstName") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} />
                        {getFormErrorMessage("BenifitFirstName")}
                    </div>
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Last Name <span className="steric">*</span>
                        </label>
                        <InputText id="BenifitLastName" value={formik.values.BenifitLastName} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("BenifitLastName") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} minLength={3} maxLength={20} />
                        {getFormErrorMessage("BenifitLastName")}
                    </div>
                   
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            DOB <span className="steric">*</span> <small>(MM/DD/YYYY)</small>
                        </label>
                        <Calendar id="BenifitDOB" value={formik.values.BenifitDOB} onChange={formik.handleChange} onBlur={formik.handleBlur} showIcon className={classNames({ "p-invalid": isFormFieldValid(" BenifitDOB") }, "input_text")} />
                        {getFormErrorMessage(" BenifitDOB")}
                    </div>
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                            SSN <span className="steric">*</span> <small>(Last 4 Digits)</small>
                        </label>
                        <InputText id="BenifitSSN" value={formik.values.BenifitSSN} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("BenifitSSN") }, "input_text")} keyfilter={/^\d{0,4}$/} maxLength={4} minLength={4} />
                        {getFormErrorMessage("BenifitSSN")}
                    </div>

                   

                    </div>

                    </div>
                </div>
                :null
            }

            <div className="mt-4">
                <h3>Affordable Connectivity Program (ACP) Consent</h3>
                <div className="sp_small">
                    <Checkbox
                        id="isACP"
                        checked={acp}
                        onChange={(e) => {
                            handleACP(e);
                            formik.handleChange(e);
                        }}
                        className={classNames({ "p-invalid": isFormFieldValid("isACP") }, "input_mask")}
                    />
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
