import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTermsAction } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Axios from "axios";
import BASE_URL from "../../../../../config";
const Agree = ({ handleNext, handleBack, enrollment_id, _id }) => {
    const dispatch = useDispatch();

    const [buttonClicked, setButtonClicked] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [checkBox1, setCheckBox1] = useState(false);
    const [checkBox2, setCheckBox2] = useState(false);
    const [checkBox3, setCheckBox3] = useState(false);
    const [checkBox4, setCheckBox4] = useState(false);
    const [checkBox5, setCheckBox5] = useState(false);
    const [checkBox6, setCheckBox6] = useState(false);
    const [checkBox7, setCheckBox7] = useState(false);
    const [checkBox8, setCheckBox8] = useState(false);
    const [checkBox9, setCheckBox9] = useState(false);
    const [checkBox10, setCheckBox10] = useState(false);
    const [checkBox11, setCheckBox11] = useState(false);
    const [checkBox12, setCheckBox12] = useState(false);
    const [checkBox13, setCheckBox13] = useState(false);
    const [tempAdd, setTempAdd] = useState(true);
    const [permaAdd, setPermaAdd] = useState(false);
    const [ACPtransfer, setACPtransfer] = useState(false)

    const validationSchema = Yup.object().shape({
        isTemporaryAddress: Yup.string().required("please confrim address is required"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            checkAll: "",
            checkbox1: "",
            checkbox2: "",
            checkbox3: "",
            checkbox4: "",
            checkbox5: "",
            checkbox6: "",
            checkbox7: "",
            checkbox8: "",
            checkbox9: "",
            checkbox10: "",
            checkbox11: "",
            checkbox12: "",
            checkbox13: "",
            isTemporaryAddress: "",
        },
        onSubmit: async (values, actions) => {
            const userId = _id;
            const csr = "645c7bcfe5098ff6251a2255";
            const dataToSend = { csr, userId };
            dispatch(addTermsAction(dataToSend));

        //    try {
        //     const res = await Axios.post(`${BASE_URL}/api/user/termsAndConditions`, dataToSend);
        //     if (res?.status === 200 || res?.status === 201) {
        //       localStorage.setItem("previewData", JSON.stringify(res.data));
        //       console.log("data from agree",res.data)
        //       handleNext();
        //     }
        //   } catch (error) {
        //     console.error("Error posting data:", error);
        //   }
           
        },
    });
    const handleAll = () => {
        if (checkAll === false) {
            setCheckAll(true);
            setCheckBox1(true)
            setCheckBox2(true)
            setCheckBox3(true)
            setCheckBox4(true)
            setCheckBox5(true)
            setCheckBox6(true)
            setCheckBox7(true)
            setCheckBox8(true)
            setCheckBox9(true)
            setCheckBox10(true)
            setCheckBox11(true)
            setCheckBox12(true)
            setCheckBox13(true)          
        } else if (checkAll === true) {
            setCheckAll(false);
            setCheckBox1(false)
            setCheckBox2(false)
            setCheckBox3(false)
            setCheckBox4(false)
            setCheckBox5(false)
            setCheckBox6(false)
            setCheckBox7(false)
            setCheckBox8(false)
            setCheckBox9(false)
            setCheckBox10(false)
            setCheckBox11(false)
            setCheckBox12(false)
            setCheckBox13(false)     
        }
    };

    const handleCheckBox1 = (e) => {
        if (formik.values.checkbox1 == true) {
            formik.values.checkbox1 = false;
            setCheckBox1(false);
        } else {
            formik.values.checkbox1 = true;
            setCheckBox1(true);
        }
    };
    const handleCheckBox2 = (e) => {
        if (formik.values.checkbox2 == true) {
            formik.values.checkbox2 = false;
            setCheckBox2(false);
        } else {
            formik.values.checkbox2 = true;
            setCheckBox2(true);
        }
    };
    const handleCheckBox3 = (e) => {
        if (formik.values.checkbox3 == true) {
            formik.values.checkbox3 = false;
            setCheckBox3(false);
        } else {
            formik.values.checkbox3 = true;
            setCheckBox3(true);
        }
    };
    const handleCheckBox4 = (e) => {
        if (formik.values.checkbox4 == true) {
            formik.values.checkbox4 = false;
            setCheckBox4(false);
        } else {
            formik.values.checkbox4 = true;
            setCheckBox4(true);
        }
    };
    const handleCheckBox5 = (e) => {
        if (formik.values.checkbox5 == true) {
            formik.values.checkbox5 = false;
            setCheckBox5(false);
        } else {
            formik.values.checkbox5 = true;
            setCheckBox5(true);
        }
    };
    const handleCheckBox6 = (e) => {
        if (formik.values.checkbox6 == true) {
            formik.values.checkbox6 = false;
            setCheckBox6(false);
        } else {
            formik.values.checkbox6 = true;
            setCheckBox6(true);
        }
    };
    const handleCheckBox7 = (e) => {
        if (formik.values.checkbox7 == true) {
            formik.values.checkbox7 = false;
            setCheckBox7(false);
        } else {
            formik.values.checkbox7 = true;
            setCheckBox7(true);
        }
    };
    const handleCheckBox8 = (e) => {
        if (formik.values.checkbox8 == true) {
            formik.values.checkbox8 = false;
            setCheckBox8(false);
        } else {
            formik.values.checkbox8 = true;
            setCheckBox8(true);
        }
    };
    const handleCheckBox9 = (e) => {
        if (formik.values.checkbox9 == true) {
            formik.values.checkbox9 = false;
            setCheckBox9(false);
        } else {
            formik.values.checkbox9 = true;
            setCheckBox9(true);
        }
    };
    const handleCheckBox10 = (e) => {
        if (formik.values.checkbox10 == true) {
            formik.values.checkbox10 = false;
            setCheckBox10(false);
        } else {
            formik.values.checkbox10 = true;
            setCheckBox10(true);
        }
    };
    const handleCheckBox11 = (e) => {
        if (formik.values.checkbox11 == true) {
            formik.values.checkbox11 = false;
            setCheckBox11(false);
        } else {
            formik.values.checkbox11 = true;
            setCheckBox11(true);
        }
    };
    const handleCheckBox12 = (e) => {
        if (formik.values.checkbox12 == true) {
            formik.values.checkbox12 = false;
            setCheckBox12(false);
        } else {
            formik.values.checkbox12 = true;
            setCheckBox12(true);
        }
    };
    const handleCheckBox13 = (e) => {
        if (formik.values.checkbox13 == true) {
            formik.values.checkbox13 = false;
            setCheckBox13(false);
        } else {
            formik.values.checkbox13 = true;
            setCheckBox13(true);
        }
    };
    const handleAddress = (e) => {
        if (e.value === "temp") {
            setACPtransfer(false);
            if (e.value == formik.values.isTemporaryAddress) {
                setTempAdd(false);
            } else {
                setTempAdd(true);
            }
            setPermaAdd(false);
            formik.values.isTemporaryAddress = true;
        } else if (e.value === "permanent") {
            setACPtransfer(true);
            if (e.value == formik.values.isTemporaryAddress) {
                setPermaAdd(false);
            } else {
                setPermaAdd(true);
            }
            setTempAdd(false);
            formik.values.isTemporaryAddress = false;
        }
    };
    if(ACPtransfer){
        toast.warn("please Select Yes In ACP Benefit Transfer")
        
    }
    const handleButton = () => {
        setButtonClicked(true);
    };
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <ToastContainer/>
                <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons">
                    <Button label="Back" type="button" onClick={handleBack} />

                    <Button label="Continue" type="submit" onClick={handleNext} disabled={ACPtransfer} />
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
                        <Checkbox
                            inputId="checkAll"
                            onChange={(e) => {
                                handleAll(e);
                            }}
                            checked={checkAll}
                        />
                        <label htmlFor="checkAll"> Select/Unselect All.</label>
                    </div>
                    <div className="p-3 ml-3">
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox1"
                                onChange={(e) => {
                                    handleCheckBox1(e);
                                }}
                                checked={checkBox1}
                            />
                            <label htmlFor="checkbox1">I (or my dependent or other person in my household) currently get benefits from the government program(s) listed on this form or my annual household income is 200% or less than the Federal Poverty Guidelines.).</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox2"
                                onChange={(e) => {
                                    handleCheckBox2(e);
                                }}
                                checked={checkBox2}
                            />
                            <label htmlFor="binary">I agree that if I move, I will give my internet company my new address within 30 days.</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox3"
                                onChange={(e) => {
                                    handleCheckBox3(e);
                                }}
                                checked={checkBox3}
                            />
                            <label htmlFor="binary">I give IJ Wireless, Inc. permission to enroll me for the first time and, if necessary, transfer my existing records rather than classifying me as a new subscriber.</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox4"
                                onChange={(e) => {
                                    handleCheckBox4(e);
                                }}
                                checked={checkBox4}
                            />
                            <label htmlFor="binary">
                                I understand that I have to tell my internet company within 30 days if I do not qualify for the ACP anymore, including: I, or the person in my household that qualifies, do not qualify through a government program or income anymore. Either I or someone in my
                                household gets more than one ACP benefit.
                            </label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox5"
                                onChange={(e) => {
                                    handleCheckBox5(e);
                                }}
                                checked={checkBox5}
                            />
                            <label htmlFor="binary">
                                I understand that I have to tell my internet company within 30 days if I do not qualify for the ACP anymore including,
                               I, or the person in my household that qualifies, do not qualify through a government program or income anymore.
                                   Either I or someone in my household gets more than one ACP benifit.
                               
                            </label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox6"
                                onChange={(e) => {
                                    handleCheckBox6(e);
                                }}
                                checked={checkBox6}
                            />
                            <label htmlFor="binary">
                                I know that my household can only get one ACP benefit and, to the best of my knowledge, my household is not getting more than one ACP benefit. I understand that I can only receive one connected device (desktop, laptop, or tablet) through the ACP, even if I switch ACP
                                companies.
                            </label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox7"
                                onChange={(e) => {
                                    handleCheckBox7(e);
                                }}
                                checked={checkBox7}
                            />
                            <label htmlFor="binary">
                                I agree that all of the information that I provide on this form may be collected, used, shared and retained for the purposes of applying for and/or recieving the ACP benefit. I understand that if this information is not provided to the Program Administrator. I will
                                not be Able to get ACP benefits. 
                            </label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox8"
                                onChange={(e) => {
                                    handleCheckBox8(e);
                                }}
                                checked={checkBox8}
                            />
                            <label htmlFor="binary">
                                For my household, I affirm and understand that the ACP is a federal government subsidy that reduces my broadband internet access service bill and at the conclusion of the program, my household will be subject to the company's undiscounted general rates, terms and
                                conditions if my household continues to subscribe to the service.
                            </label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox9"
                                onChange={(e) => {
                                    handleCheckBox9(e);
                                }}
                                checked={checkBox9}
                            />
                            <label htmlFor="binary">All the answers and the agreemnets that I provided on this form are true and correct to the best of my knowledge.</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox10"
                                onChange={(e) => {
                                    handleCheckBox10(e);
                                }}
                                checked={checkBox10}
                            />
                            <label htmlFor="binary">I know that willingly giving false or fraudulent information to get ACP benefits is punishable by law and can result in fines, jail time, de-enrollment, or being barred from the program.</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox11"
                                onChange={(e) => {
                                    handleCheckBox11(e);
                                }}
                                checked={checkBox11}
                            />
                            <label htmlFor="binary">I was truthful about whether or not I am a resident of Tribal lands as defined in the "Your Information" section of this form.</label>
                        </div>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox12"
                                onChange={(e) => {
                                    handleCheckBox12(e);
                                }}
                                checked={checkBox12}
                            />
                            <label htmlFor="binary">
                                The ACP Administrator or my service provider may have to check whether I still qualify at any time. If I need to recertify my ACP benefit, I understand that I have to respond by the deadline or I will be removed from the Affordable Connectivity Program and my ACP
                                benefit will stop.
                            </label>
                        </div>
                    </div>
                    <div>
                        <h3>Terms and Conditions</h3>
                        <div className="field-checkbox">
                            <Checkbox
                                inputId="checkbox13"
                                onChange={(e) => {
                                    handleCheckBox13(e);
                                }}
                                checked={checkBox13}
                            />
                            <label>By my signing the FCC application, I agree to accept IJ Wireless, Inc Terms & Conditions.</label>
                        </div>
                    </div>
                    <div>
                        <h3>ACP Benefit Transfer</h3>
                        <p>Do you consent to enrollment or transfer into the IJ Wireless, Inc Affordable Connectivity Program, and do you understand you are not allowed multiple ACP program benefits with the same or different providers? Please answer Yes or No.</p>
                        <p>Please confirm which of these statements is true for this application by answering yes or no after the following two questions.</p>
                        <div className="field-radiobutton m-4">
                            <div className="flex">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="permaAdd" value="permanent" name="permanent" checked={permaAdd} onChange={(e) => handleAddress(e)}></Checkbox>
                                    <label className="ml-2">NO</label>
                                </div>
                                <div className="flex align-items-center ml-2">
                                    <Checkbox inputId="tempAdd" value="temp" name="temp" checked={tempAdd} onChange={(e) => handleAddress(e)}></Checkbox>
                                    <label className="ml-2">Yes</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                            <p>Request User For additional Documents</p>
                            <div className="flex">
                                <Button label={buttonClicked ? "Sent" : "Send an Sms"} onClick={handleButton} className="p-button-success" disabled={buttonClicked} />
                                {buttonClicked ? (
                                    <div className=" ml-2">
                                        <Button label="ReSend" type="button" className="p-button-success" />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                </div>
            </form>
        </>
    );
};
export default Agree;
