import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { toast } from "react-toastify";
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
        initialValues: {
            comRemarks:"",
            confidenceRemarks:"",
            verificationRemarks:"",
            informationRemarks:"",
            disclaimerRemarks:"",
            DOBRemarks:"",
            csrRemarks:"",
            callDropRemarks:"",
            callQualityRemarks:"",
            comment:"",
        },
        onSubmit: async (values, actions) => {
            const dataToSend={
                
            }
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`,dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("Remarks Added");
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        },
    });

    return (
        <>
        <form onSubmit={formik.handleSubmit}>
        <div className="">
            <div className="flex mrgn ">
                <p>0</p>
                <p>20</p>
            </div>
            <div className="flex justify-content-center ">
                <div style={{marginLeft:'15px'}}>
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

            <div className="flex mrgnn mt-5 ">
                <p>Yes</p>
                <p>No</p>
            </div>

            <div className="flex ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'130px'}}>CSR was rude/ Misbehaves with customer </label>
                </div>
                <div className="flex gap " style={{marginLeft:'515px'}}>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isCsrRemarks" name="pizza" value="yes" onChange={(e) => setIsCsrRemarks(e.value)} checked={isCsrRemarks === "yes"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isCsrRemarks" name="pizza" value="no" onChange={(e) => setIsCsrRemarks(e.value)} checked={isCsrRemarks === "no"} />
                    </div>
                </div>
            </div>
            <div className="flex mt-5 ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'130px'}}>Call Drop/Hang Up by CSE </label>
                </div>
                <div className="flex gap " style={{marginLeft:'620px'}}>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isCallDropRemarks" name="pizza" value="yes" onChange={(e) => setIsCallDropRemarks(e.value)} checked={isCallDropRemarks === "yes"} />
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton inputId="isCallDropRemarks" name="pizza" value="no" onChange={(e) => setIsCallDropRemarks(e.value)} checked={isCallDropRemarks === "no"} />
                    </div>
                </div>
            </div>
            
            <div className="flex  mrgnnn mt-5 ">
                <p>Standard </p>
                <p> Below Standard </p>
                <p> Fatal </p>
            </div>

            <div className="flex mb-5 ">
                <div>
                    <label className="field_label mr-5" style={{marginLeft:'130px'}}>Call Quality </label>
                </div>
                <div className="flex gapp " style={{marginLeft:'650px'}}>
                    <div className="flex align-items-center mr-5 ">
                        <RadioButton inputId="isCallQualityRemarks" name="pizza" value="Standard" onChange={(e) => setIsCallQualityRemarks(e.value)} checked={isCallQualityRemarks === "Standard"} />
                    </div>
                    <div className="flex align-items-center mr-5">
                        <RadioButton inputId="isCallQualityRemarks" name="pizza" value="Below" onChange={(e) => setIsCallQualityRemarks(e.value)} checked={isCallQualityRemarks === "Below"} />
                    </div>
                    <div className="flex align-items-center " >
                        <RadioButton inputId="isCallQualityRemarks" name="pizza" value="Fatal" onChange={(e) => setIsCallQualityRemarks(e.value)} checked={isCallQualityRemarks === "Fatal"} />
                    </div>
                </div>
            </div>         

        </div>

{
    isCallQualityRemarks === "Below" || isCallQualityRemarks === "Fatal" ? 
    <div>
        <div className="mt-5">
            <h4 style={{marginLeft:"110px"}}>
                Comments 
            </h4>
            <InputTextarea id="reason" value={formik.values.comment} onChange={formik.handleChange} cols={90} rows={5} className="p-2" style={{marginLeft:'110px'}} />
        </div>
        <br />
    </div>
    : ""
}

            <div className="text-right ">
            <Button label="Submit" type="submit"  />
            </div>
            </form>
            </>
    );
};

export default DialogeForRemarks;
