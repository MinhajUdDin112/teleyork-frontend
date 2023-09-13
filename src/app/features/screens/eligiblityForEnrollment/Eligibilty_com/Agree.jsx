import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { useFormik } from "formik";
import * as Yup from'yup'
const Agree = ({ handleNext, handleBack }) => {
    const [checkBox1, setCheckBox1] = useState(false)

    const validationSchema=Yup.object().shape({
       checkbox1:Yup.string().required("check box is required")
    })
    const formik= useFormik({
        validationSchema:validationSchema,
        initialValues:{
            checkbox1:false
        },
        onSubmit: (values, actions) => {
            console.log(values);
            actions.resetForm();
            handleNext();
        },
    })
    const handleCheckBox=(e)=>{
        if (formik.values.checkbox1 == true) {
            formik.values.checkbox1 = false;
            setCheckBox1(false);
        } else {
            formik.values.checkbox1 = true;
            setCheckBox1(true);
        }
    }
    return (
        <>
        <form  onSubmit={formik.handleSubmit}>
            <div className="flex flex-row justify-content-between align-tems-center mb-2">
                <Button label="Back" type="submit" onClick={handleBack} />
                <Button label="Continue" type="submit"  />
            </div>
            <div>
                <p className="font-normal my-3 text-xl line-height-1">PLEASE CAREFULLY READ AND AGREE BY INITIALING ALL THE BOXES FOR THE FOLLOWING STATEMENTS. BY CLICKING THE BOXES BELOW, YOU AGREE TO E-SIGN STATEMENTS BELOW WITH YOUR INITIALS AND THAT THE STATEMENTS INITIALED ARE ENFORCEABLE.</p>
                <p className="font-semibold" style={{ color: "red" }}>
                    Please read and check all Penalty Of Perjury and accept Terms and Conditions.
                </p>
                <div className="p-3">
                    <div className="field-checkbox">
                        <Checkbox inputId="checkbox1" onChange={(e)=>{handleCheckBox(e)}} checked={checkBox1} />
                        <label htmlFor="checkbox1">I agree, under penalty of perjury, to the following statements: (You must initial next to each statement).</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox  />
                        <label htmlFor="binary">However, If I qualify for ACP, I consent to Tone Comms enrolling me into it's ACP servicesin the event Tone Comms is an elligible Telecommunications Carrier(ETC) in my state.</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">
                            I (or my dependent or other person in my household) currently get benefits from the government program(s) listed on this form, experienced a sunstantial loss of income since Feburary 29,2020, or my annual househld income is 200% or less than the Federal Poverty
                            Guidelines(the amount listed in the Federal Poverty Guidelines table on this form).
                        </label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">I agree that if I move I will give my service provider my new address within 30 days.</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">
                            I understand that I have to tell my internet company within 30 days if I do not qualify for the ACP anymore including:
                            <ol>
                                <li>I, or the person in my household that qualifies, do not qualify through a government program or income anymore.</li>
                                <li>Either I or someone in my household gets more than one ACP benifit.</li>
                            </ol>
                        </label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">
                            I know that my household can only get one ACP benefit and the best of my knoowledge, my house hold is not getting more than one ACP benefit. I understand that I can only recieve one connected device (desktop, laptop or mobile) through the ACP, even if I switch ACP
                            companies.
                        </label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">
                            I agree that all of the information that I provide on this form may be collected, used, shared and retained for the purposes of applying for and/or recieving the ACP benefit. I understand that if this information is not provided to the Program Administrator. I will not be
                            Able to get ACP benefits. If the laws of my state or Tribal government require it. I agree that the state or tribal government may share information about my benefits for a qualifying program with the ACP Administrator. The information shared by State or Tribal government
                            will be used only to help find out if I can get an ACP benefit.
                        </label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">
                            For my household, I affirm and understand that the ACP is a federal government subsidy that reduces my broadband internet access service bill and at the conclusion of the program, my household will be subject to the company's undiscounted general rates, terms and
                            conditions if my household continues to subscribe to the service.
                        </label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">All the answers and the agreemnets that I provided on this form are true and correct to the best of my knowledge.</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">I know that willingly giving false or fraudulent information to get ACP benefits is punishable by law and can result in fines, jail time, de-enrollment, or being barred from the program.</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">I was truthful about whether or not I am a resident of Tribal lands as defined in the "Your Information" section of this form.</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">
                            The ACP Administrator or my service provider may have to check whether I still qualify at any time. If I need to recertify my ACP benefit, I understand that I have to respond by the deadline or I will be removed from the Affordable Connectivity Program and my ACP benefit
                            will stop.
                        </label>
                    </div>
                </div>
                <div>
                    <h3>Terms and Conditions</h3>
                    <div className="field-checkbox">
                        <Checkbox />
                        <label>By my signing the FCC application, I agree to accept Tone Comms Terms & Conditions.</label>
                    </div>
                </div>
                <div>
                    <h3>ACP Benefit Transfer</h3>
                    <p>Do you consent to enrollment or transfer into the Tone Comms Affordable Connectivity Program, and do you understand you are not allowed multiple ACP program benefits with the same or different providers? Please answer Yes or No.</p>
                    <p>Please confirm which of these statements is true for this application by answering yes or no after the following two questions.</p>
                    <div className="field-radiobutton m-4">
                        <RadioButton />
                        <label className="mr-3">Yes</label>
                        <RadioButton />
                        <label>No</label>
                    </div>
                </div>
            </div>
            </form>
        </>
    );
};
export default Agree;
