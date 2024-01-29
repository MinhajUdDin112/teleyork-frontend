
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Axios from "axios"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
const Select = ({ handleNext, handleBack, enrollment_id, _id, csr }) => {
    const dispatch = useDispatch();

    const [checkAll, setCheckAll] = useState(false);
    const [tempAdd, setTempAdd] = useState(true);
    const [permaAdd, setPermaAdd] = useState(false);
    const [ACPtransfer, setACPtransfer] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isBack, setIsBack] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

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

     //get ZipData data from local storage 
 const zipdata= localStorage.getItem("zipData");
 const parseZipData = JSON.parse(zipdata);

    const postdata= async()=>{
        setIsLoading(true)
        const userId = _id;
        csr = csr;
        const dataToSend = { csr, userId };
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/termsAndConditions`, dataToSend);
            if(response?.status===201 || response?.status===200){
               localStorage.setItem("agreeData",JSON.stringify(response?.data))
               setIsBack(isBack+1);
               handleNext();
               setIsLoading(false)
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg)
            setIsLoading(false)
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

     useEffect(()=>{
        if(parseZipData){
      //get checkEligiblity data from local storage 
     const checkEligiblity= localStorage.getItem("checkEligiblity");
     const parseCheckEligiblity = JSON.parse(checkEligiblity);
     
    // if((parseCheckEligiblity?.data?.Message).includes("not")){
    //     toast.error(parseCheckEligiblity?.data?.Message)
    // } else{
    //     toast.success(parseCheckEligiblity?.data?.Message)
    // }      
        }
     },[])

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
        toast.warn("Error: A Yes is required on ACP Benefit Transfer");
    }

    const handleButton = () => {
        setButtonClicked(true);
    };

    const checkBoxLabels = [
        "I'm going to go over the required information to participate in the Affordable Connectivity Program. Answering affirmatively is required in order to enroll in the Affordable Connectivity Program in my state.",
        "This authorization is only for the purpose of verifying my participation in this program and will not be used for any purpose other than Affordable Connectivity Program(ACP)",
        `I am authorizing the Company, ${companyName}, Inc., to access any records required to verify my statements on this form and to confirm my eligibility for the Affordable Connectivity Program.`,
        `For my household, I affirm and understand that the ACP is a temporary federal government subsidy that reduces my broadband internet access service bill and at the conclusion of the program, my household will be subject to the provider's undiscounted general rates, terms, and conditions if my household continues to subscribe to the service.`,
        <p>
        My annual household income is 200% or less than the Federal Poverty Guidelines (the amount listed in the Federal Poverty Guidelines on FCC's website (<a href="https://www.usac.org/lifeline/consumer-eligibility/" target="_blank" rel="noopener noreferrer">https://www.usac.org/lifeline/consumer-eligibility/</a>)
      </p>
,
        `I agree that if I move I will provide my new address to my service provider within 30 days.`,
        "I understand that I have to tell my service provider within 30 days if I do not qualify for ACP benefit anymore, including: I, or the person in my household that qualifies, do not qualify through a government program or income anymore.",
        "I know that my household can only get one ACP benefit and, to the best of my knowledge, my household is not getting more than one ACP benefit. ",
        `I understand that I can only receive one connected device (Tablet) through the ACP benefit, even if I switch ACP providers.`,
        "I agree that all of the information I provided on this form may be collected, used, shared, and retained for the purposes of applying for and/or receiving the ACP benefit. I understand that if this information is not provided to the Program Administrator, I will not be able to get ACP benefits.",
        "If the laws of my state or Tribal government require it, I agree that the state or Tribal government may share information about my benefits for a qualifying program with the ACP Administrator. The information shared by the state or Tribal government will be used only to help find out if I can get an ACP benefit.",
        `All the answers and agreements that I provided on this form are true and correct to the best of my knowledge. I know that willingly giving false or fraudulent information to get ACP benefits is punishable by law and can result in fines, jail time, de-enrollment, or being barred from the program.`,
        <strong>I hereby certify that I have thoroughly read and agree to this disclosure.</strong>
    ];

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <ToastContainer />
                <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons">
                    <Button label="Back" type="button" onClick={handleBack} />
                    <Button label="Continue" type="submit"  disabled={ACPtransfer} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""}  />
                </div>
                <div>
                <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
                </div>
                <br />

                <div>
                    <p className="font-normal my-3 text-xl ">
                    Please carefully read and agree by initialing all the boxes for the following statements. By clicking the boxes below, you agree to e-sign the statements with your initials and acknowledge that the initialed statements are enforceable
                    </p>
                    <p className="font-semibold" style={{ color: "red" }}>
                    Please carefully read and mark all the statements and accept the Terms and Conditions
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
                            <label>By signing the FCC application, I agree to accept the Terms & Conditions.</label>
                        </div>
                    </div>
                 
                    <div className="mt-5">
                        <p>Request the user for additional documents</p>
                        <div className="flex ">
                            <Button label={buttonClicked ? "Sent" : "Send an SMS"}  className="p-button-success mr-2" type="button" disabled={buttonClicked} />
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

export default Select;

