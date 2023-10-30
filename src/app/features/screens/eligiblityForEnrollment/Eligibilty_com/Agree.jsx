


import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BASE_URL from "../../../../../config";
import Axios from "axios";
const Agree = ({ handleNext, handleBack, enrollment_id, _id, csr }) => {
    const dispatch = useDispatch();

    const [checkAll, setCheckAll] = useState(false);
    const [tempAdd, setTempAdd] = useState(true);
    const [permaAdd, setPermaAdd] = useState(false);
    const [ACPtransfer, setACPtransfer] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isBack, setIsBack] = useState(0)

    const loginRes = JSON.parse(localStorage.getItem("userData"));
    const companyName = loginRes?.companyName;

    const validationSchema = Yup.object().shape({
        isTemporaryAddress: Yup.boolean().oneOf([true], "Please confirm the address is required"),
        checkbox: Yup.array().of(Yup.boolean()).test(
            "at-least-one-checked",
            "Please Select all CheckBox",
            (value) => value.some((val) => val === true)
        ),
    });
    

    const initialValues = {
        checkAll: "",
        checkbox: new Array(14).fill(false),
        isTemporaryAddress: "",
    };

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialValues,
        onSubmit: async (values, actions) => {
           postdata();
        },
    });

    const agreeRes = localStorage.getItem("agreeData");
    const parseagreeRes = JSON.parse(agreeRes);

    const postdata= async()=>{
        const userId = _id;
        csr = csr;
        const dataToSend = { csr, userId };
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/termsAndConditions`, dataToSend);
            if(response?.status===201 || response?.status===200){
               localStorage.setItem("agreeData",JSON.stringify(response?.data))
               setIsBack(isBack+1);
               handleNext();
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    const handleAll = () => {
        const newCheckBoxes = formik.values.checkbox.map(() => !checkAll);
        formik.setFieldValue("checkbox", newCheckBoxes);
        setCheckAll(!checkAll);
    };
    useEffect(() => {
        if(parseagreeRes)
        {
            handleAll();
        }
     }, [isBack]) 

    const handleCheckBox = (index) => {
        const newCheckBoxes = [...formik.values.checkbox];
        newCheckBoxes[index] = !newCheckBoxes[index];
        formik.setFieldValue("checkbox", newCheckBoxes);
    };

    const handleAddress = (e) => {
        if (e.value === "temp") {
            setACPtransfer(false);
            setTempAdd(true);
            setPermaAdd(false);
        } else if (e.value === "permanent") {
            setACPtransfer(true);
            setTempAdd(false);
            setPermaAdd(true);
        }
        formik.values.isTemporaryAddress = e.value === "temp";
    };

    if (ACPtransfer) {
        toast.warn("please Select Yes In ACP Benefit Transfer");
    }

    const handleButton = () => {
        setButtonClicked(true);
    };

    const checkBoxLabels = [
        "I (or my dependent or other person in my household) currently get benefits from the government program(s) listed on this form or my annual household income is 200% or less than the Federal Poverty Guidelines.",
        "I agree that if I move, I will give my internet company my new address within 30 days.",
        `I give ${companyName} permission to enroll me for the first time and, if necessary, transfer my existing records rather than classifying me as a new subscriber.`,
        "I (or my dependent or other person in my household) currently get benefits from the government program(s) listed on this form or my annual household income is 200% or less than the Federal Poverty Guidelines.",
        "I agree that if I move, I will give my internet company my new address within 30 days.",
        `I give ${companyName} permission to enroll me for the first time and, if necessary, transfer my existing records rather than classifying me as a new subscriber.`,
        "I (or my dependent or other person in my household) currently get benefits from the government program(s) listed on this form or my annual household income is 200% or less than the Federal Poverty Guidelines.",
        "I agree that if I move, I will give my internet company my new address within 30 days.",
        `I give ${companyName} permission to enroll me for the first time and, if necessary, transfer my existing records rather than classifying me as a new subscriber.`,
        "I (or my dependent or other person in my household) currently get benefits from the government program(s) listed on this form or my annual household income is 200% or less than the Federal Poverty Guidelines.",
        "I agree that if I move, I will give my internet company my new address within 30 days.",
        `I give ${companyName} permission to enroll me for the first time and, if necessary, transfer my existing records rather than classifying me as a new subscriber.`,
    ];

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <ToastContainer />
                <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons">
                    <Button label="Back" type="button" onClick={handleBack} />
                    <Button label="Continue" type="submit"  disabled={ACPtransfer} />
                </div>
                <div>
                    <h6>Enrollment ID: {enrollment_id}</h6>
                </div>
                <br />

                <div>
                    <p className="font-normal my-3 text-xl line-height-1">
                        PLEASE CAREFULLY READ AND AGREE BY INITIALING ALL THE BOXES FOR THE FOLLOWING STATEMENTS. BY CLICKING THE BOXES BELOW, YOU AGREE TO E-SIGN STATEMENTS BELOW WITH YOUR INITIALS AND THAT THE STATEMENTS INITIALED ARE ENFORCEABLE.
                    </p>
                    <p className="font-semibold" style={{ color: "red" }}>
                        Please read and check all Penalty Of Perjury and accept Terms and Conditions.
                    </p>
                    <div className="field-checkbox ">
                        <Checkbox inputId="checkAll" onChange={handleAll} checked={checkAll} />
                        <label htmlFor="checkAll"> Select/Unselect All.</label>
                    </div>
                    <div className="p-3 ml-3">
                    {formik.errors.checkbox && formik.touched.checkbox && (
        <div style={{ color: "red" , marginBottom:'10px' }}>{formik.errors.checkbox}</div>
    )}
    {checkBoxLabels.map((label, index) => (
        <div className="field-checkbox" key={index}>
          
            <Checkbox
                inputId={`checkbox${index}`}
                onChange={() => handleCheckBox(index)}
                checked={formik.values.checkbox[index]}
            />
            <label htmlFor={`checkbox${index}`}>{label}</label>
        </div>
    ))}
    
</div>
                    <div>
                        <h3>Terms and Conditions</h3>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox13"
                                onChange={() => handleCheckBox(13)}
                                checked={formik.values.checkbox[13]}
                            />
                            <label>By my signing the FCC application, I agree to accept {companyName} Terms & Conditions.</label>
                        </div>
                    </div>
                    <div>
                        <h3>ACP Benefit Transfer</h3>
                        <p>Do you consent to enrollment or transfer into the{companyName} Affordable Connectivity Program, and do you understand you are not allowed multiple ACP program benefits with the same or different providers? Please answer Yes or No.</p>
                        <p>Please confirm which of these statements is true for this application by answering yes or no after the following two questions.</p>
                        <div className="field-radiobutton m-4">
                            <div className="flex">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="permaAdd" value="permanent" name="permanent" checked={permaAdd} onChange={handleAddress}></Checkbox>
                                    <label className="ml-2">NO</label>
                                </div>
                                <div className="flex align-items-center ml-2">
                                    <Checkbox inputId="tempAdd" value="temp" name="temp" checked={tempAdd} onChange={handleAddress}></Checkbox>
                                    <label className="ml-2">Yes</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p>Request User For additional Documents</p>
                        <div className="flex ">
                            <Button label={buttonClicked ? "Sent" : "Send an Sms"}  className="p-button-success mr-2" type="button" disabled={buttonClicked} />
                            <Button label={buttonClicked ? "Sent" : "Send an Email"}  className="p-button-success" type="button" disabled={buttonClicked} />
                            {/* {buttonClicked ? (
                                <div className=" ml-2">
                                    <Button label="ReSend" type="button" className="p-button-success" />
                                </div>
                            ) : null} */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Agree;

