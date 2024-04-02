import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Agree = ({ handleNext, handleBack, enrollment_id, _id, csr }) => {
    const dispatch = useDispatch();

    const [checkAll, setCheckAll] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isBack, setIsBack] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const loginRes = JSON.parse(localStorage.getItem("userData"));
    const companyName = loginRes?.companyName;
    const validationSchema = Yup.object().shape({
        isTemporaryAddress: Yup.boolean().oneOf([true], "Please confirm the address is required"),
        checkbox: Yup.array()
            .of(Yup.boolean())
            .test("at-least-one-checked", "Please Select all CheckBox", (value) => value.some((val) => val === true)),
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
    const agreeRes = localStorage.getItem("prepaidagreeData");
    const parseagreeRes = JSON.parse(agreeRes);
    //get ZipData data from local storage  
    
    const zipdata = localStorage.getItem("prepaidzipData");
    const parseZipData = JSON.parse(zipdata);   
    useEffect(() => {
        if(parseagreeRes)
        {
            handleAll();
        }
     }, [isBack]) 
    const postdata = async () => {
        setIsLoading(true);
        const userId = _id;
        csr = csr;
        const dataToSend = { csr, userId };    
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/termsAndConditions`, dataToSend);
            if(response?.status===201 || response?.status===200){
               localStorage.setItem("prepaidagreeData",JSON.stringify(response?.data))
               setIsBack(isBack+1);
               handleNext();
               setIsLoading(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg)
            setIsLoading(false)
        }  
    };

    const handleAll = () => {
        const newCheckBoxes = formik.values.checkbox.map(() => !checkAll);
        formik.setFieldValue("checkbox", newCheckBoxes);
        setCheckAll(!checkAll);
    };
    useEffect(() => {
        if (parseagreeRes) {
            handleAll();
        }
    }, [isBack]);

    useEffect(() => {
        if (parseZipData) {
            /*
      //get checkEligiblity data from local storage 
     const checkEligiblity= localStorage.getItem("parsedcheckEligiblity");
     const parseCheckEligiblity = JSON.parse(checkEligiblity);
     
    if((parseCheckEligiblity?.data?.Message).includes("not")){
        toast.error(parseCheckEligiblity?.data?.Message)
    } else{
        toast.success(parseCheckEligiblity?.data?.Message)
    }        
      */
        }
    }, []);

    const handleCheckBox = (index) => {
        const newCheckBoxes = [...formik.values.checkbox];
        newCheckBoxes[index] = !newCheckBoxes[index];
        formik.setFieldValue("checkbox", newCheckBoxes);
    };

    const handleButton = () => {
        setButtonClicked(true);
    };

    const checkBoxLabels = [
        `I hereby consent to enroll with ${companyName}, Inc for the selected services under the following terms and conditions: `,
        `${companyName}, Inc agrees to provide the selected equipment and services to the customer at the rates discussed with the customer`,
        `The service provided is post-paid, and the customer agrees to pay the monthly bill before the end of each service month.`,
        `The customer agrees to switch their home phone or cell phone services to ${companyName}, Inc from their current service provider.`,
       `${companyName}, Inc will make reasonable efforts to ensure that the customer retains their existing phone number. In cases where number portability is not possible, the customer will be notified`
,
        `If the customer chooses not to utilize the selected services and equipment, without encountering any technical issues, the customer agrees to pay the specified monthly bill, including taxes.`,
        `The customer can choose any desired date for the monthly bill within the days provided by ${companyName}, Inc for the due date. In the event that the customer is unable to make the monthly payment on time, late fees, if applicable, will be applied to the bill.`,
        `By enrolling with ${companyName}, Inc., the customer consents to receive communications, including bills, notices, and updates, electronically.`,
        `${companyName}, Inc reserves the right to terminate the service in the event of non-payment or violation of the terms and conditions .`,
        `${companyName}, Inc will take reasonable measures to protect customer information and maintain data security.`,
        `${companyName}, Inc will provide customer support to the customer for any service-related queries or technical issues.`,
        `This agreement shall be governed by and construed in accordance with the laws of the applicable jurisdiction.`,
        <strong>I hereby certify that I have thoroughly read and agree to this disclosure.</strong>
      
    ];
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <ToastContainer />
                <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons">
                    <Button label="Back" type="button" onClick={handleBack} />
                    <Button label="Continue" type="submit"  
                        disabled={ buttonClicked || formik.errors.checkbox || formik.values.checkbox.some((isChecked) => !isChecked)}
                        icon={isLoading ? "pi pi-spin pi-spinner" : ""}
                       
                    />
                </div>
                <div>
                    <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
                </div>
                <br />
                <div>
                    <p className="font-normal my-3 text-xl ">Please carefully read and agree by initialing all the boxes for the following statements. By clicking the boxes below, you agree to e-sign the statements with your initials and acknowledge that the initialed statements are enforceable</p>
                    <p className="font-semibold" style={{ color: "red" }}>
                        Please carefully read and mark all the statements and accept the Terms and Conditions
                    </p>
                    <div className="field-checkbox ">
                        <Checkbox inputId="checkAll" onChange={handleAll} checked={checkAll} />
                        <label htmlFor="checkAll"> Select/Unselect All.</label>
                    </div>
                    <div className="p-3 ml-3">
                        {formik.errors.checkbox && formik.touched.checkbox && <div style={{ color: "red", marginBottom: "10px" }}>{formik.errors.checkbox}</div>}
                        {checkBoxLabels.map((label, index) => (
                            <div className="field-checkbox" key={index}>
                                <Checkbox inputId={`checkbox${index}`} onChange={() => handleCheckBox(index)} checked={formik.values.checkbox[index]} />
                                <label htmlFor={`checkbox${index}`}>{label}</label>
                            </div>
                        ))}
                    </div>
                    {/*<div>
                        <h3>Terms and Conditions</h3>
                        <div className="field-checkbox">
                            <Checkbox inputId="checkbox13" onChange={() => handleCheckBox(13)} checked={formik.values.checkbox[13]} />
                            <label>By signing the FCC application, I agree to accept the Terms & Conditions.</label>
                        </div>
                    </div>*/}
                    <div className="mt-5">
                        <p>Request the user for additional documents</p>
                        <div className="flex ">
                            <Button label={buttonClicked ? "Sent" : "Send an SMS"} className="p-button-success mr-2" type="button" disabled={buttonClicked} />
                            <Button label={buttonClicked ? "Sent" : "Send an Email"} className="p-button-success" type="button" disabled={buttonClicked} />
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
