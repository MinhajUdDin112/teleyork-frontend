import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RadioButton } from "primereact/radiobutton";
const DialogeForRemarks = () => {
    const [isComRemarks, setIsComRemarks] = useState();
    const [isConfidenceRemarks, setIsConfidenceRemarks] = useState();
    const [isVerificationRemarks, setIsVerificationRemarks] = useState();
    const [isInformationRemarks, setIsInformationRemarks] = useState();
    const [isDisclaimerRemarks, setIsDisclaimerRemarks] = useState();
    const [isDOBRemarks, setIsDOBRemarks] = useState();
    const [isCsrRemarks, setIsCsrRemarks] = useState();
    const [isCallDropRemarks, setIsCallDropRemarks] = useState();
    const [isCallQualityRemarks, setIsCallQualityRemarks] = useState();

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values, actions) => {
            // try {
            //     const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`);
            //     if (response?.status === 200 || response?.status === 201) {
            //         localStorage.setItem("basicData", JSON.stringify(response.data));
            //         toast.success("information saved Successfully");
            //     }
            // } catch (error) {
            //     toast.error(error?.response?.data?.msg);
            // }
        },
    });

    return (
        <div className="">
            <div className="flex mrgn ">
                <p>0</p>
                <p>20</p>
            </div>
            <div className="flex justify-content-center ">
                <div>
                    <label className="field_label mr-5"> Listening without Interruption/Two way communication/Helping Tone  /Focus/Active Listening/Prolong Call/Probing (20) </label>
                </div>
                <div className="flex gap">
                    <div className="flex align-items-center">
                        <RadioButton inputId="isComRemarks" name="pizza" value="0" onChange={(e) => setIsComRemarks(e.value)} checked={isComRemarks === "0"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="ingredient2" name="pizza" value="20" onChange={(e) => setIsComRemarks(e.value)} checked={isComRemarks === "20"} />
                    </div>
                </div>
            </div>

            <div className="flex mt-5  ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'135px'}}> Confidence/Accent/Fluency (20) </label>
                </div>
                <div className="flex gap " style={{marginLeft:'572px'}}>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isConfidenceRemarks" name="pizza" value="0" onChange={(e) => setIsConfidenceRemarks(e.value)} checked={isConfidenceRemarks === "0"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isConfidenceRemarks" name="pizza" value="20" onChange={(e) => setIsConfidenceRemarks(e.value)} checked={isConfidenceRemarks === "20"} />
                    </div>
                </div>
            </div>

           

            <div className="flex mt-5  ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'135px'}}> Correct and complete Information taken (Name,Address,Street,City,State/Zip Code/Apartment) (20) </label>
                </div>
                <div className="flex gap " style={{marginLeft:'128px'}}>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isInformationRemarks" name="pizza" value="0" onChange={(e) => setIsInformationRemarks(e.value)} checked={isInformationRemarks === "0"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isInformationRemarks" name="pizza" value="20" onChange={(e) => setIsInformationRemarks(e.value)} checked={isInformationRemarks === "20"} />
                    </div>
                </div>
            </div>
            <div className="flex mt-5  ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'135px'}}> DOB/SSN/Govt Assit (20) </label>
                </div>
                <div className="flex gap " style={{marginLeft:'620px'}}>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isDOBRemarks" name="pizza" value="0" onChange={(e) => setIsDOBRemarks(e.value)} checked={isDOBRemarks === "0"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isDOBRemarks" name="pizza" value="20" onChange={(e) => setIsDOBRemarks(e.value)} checked={isDOBRemarks === "20"} />
                    </div>
                </div>
            </div>
            <div className="flex mrgn mt-5 ">
                <p>0</p>
                <p>10</p>
            </div>

            <div className="flex  ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'135px'}}> Confirmed Details before verification/Correct and Complete Info Provided/Opening & Closing Greeting (10) </label>
                </div>
                <div className="flex gap " style={{marginLeft:'85px'}}>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isVerificationRemarks" name="pizza" value="0" onChange={(e) => setIsVerificationRemarks(e.value)} checked={isVerificationRemarks === "0"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isVerificationRemarks" name="pizza" value="20" onChange={(e) => setIsVerificationRemarks(e.value)} checked={isVerificationRemarks === "20"} />
                    </div>
                </div>
            </div>

            <div className="flex mt-5  ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'135px'}}> Disclaimer/ Yes/TPV (10) </label>
                </div>
                <div className="flex gap " style={{marginLeft:'625px'}}>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isDisclaimerRemarks" name="pizza" value="0" onChange={(e) => setIsDisclaimerRemarks(e.value)} checked={isDisclaimerRemarks === "0"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isDisclaimerRemarks" name="pizza" value="20" onChange={(e) => setIsDisclaimerRemarks(e.value)} checked={isDisclaimerRemarks === "20"} />
                    </div>
                </div>
            </div>

           

        </div>
    );
};

export default DialogeForRemarks;
