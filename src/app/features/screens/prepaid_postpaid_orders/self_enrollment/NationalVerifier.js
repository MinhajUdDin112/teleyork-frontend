import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PrepaidSelfNationalVerifier = () => { 
    const [checkAll, setCheckAll] = useState(false); 
    const [buttonClicked, setButtonClicked] = useState(false);
    const [checked, setChecked] = useState(false);   
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let storedData = JSON.parse(localStorage.getItem("zip"))
    const id=storedData?.data?._id  
    const cmpnyResString = localStorage.getItem("companyName");
    const cmpnyRes = cmpnyResString ? JSON.parse(cmpnyResString) : null;
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
             handleNext()
        },
    });  
    const handleCheckBox = (index) => {
        const newCheckBoxes = [...formik.values.checkbox]; 
       
        newCheckBoxes[index] = !newCheckBoxes[index];  
        let setcheck=true
        for(let i=0;i<newCheckBoxes.length;i++){ 
            if(newCheckBoxes[i] === false){  
                setcheck=false
                break;
            }    
        
        }  
        if(setcheck){ 
            setCheckAll(true)
        } 
        else{ 
            setCheckAll(false)
        }
        
        formik.setFieldValue("checkbox", newCheckBoxes);    

    };
    const handleAll = () => {
        const newCheckBoxes = formik.values.checkbox.map(() => !checkAll); 
        
        formik.setFieldValue("checkbox", newCheckBoxes);
        setCheckAll(!checkAll);
    };
    const handleNext = async () => {   

        setIsLoading(true);
        const data = {
            userId: id,
        };
        try {
            const res = await axios.post(`${BASE_URL}/api/enrollment/termsAndConditions`, data);
            const responseData = res.data; // Assuming the API response contains the data you need
            navigate("/prepaid-selfresumeapplication", { state: { responseData } });
            setIsLoading(false);
        } catch (error) {
            // Handle any errors here
            toast.error(error?.response?.data?.msg);
            setIsLoading(false);
        }
        setIsLoading(false);
    };
    const handleBack = () => {
       
        navigate("/prepaid-selfaddress");
    };
    
    const checkBoxLabels = [
        `${companyName}, Inc agrees to provide the selected equipment and services to the customer at the rates discussed with the customer`,
        `The service provided is pre-paid, and the customer agrees to pay the monthly bill at the start of each service month.`,
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <div className="col-7">
                    <div className="card p-8 col-12 mx-0">
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
                  
                </div>
                        
                        <div className="flex flex-column mt-4">
                            <Button label="Next" icon={isLoading ? <ProgressSpinner strokeWidth="6" style={{ width: "1.5rem", height: "1.5rem", color: "white" }} /> : null} className="mb-3" onClick={() => handleNext()} disabled={!checkAll || isLoading} />
                            <Button label="Back" onClick={handleBack} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrepaidSelfNationalVerifier;
