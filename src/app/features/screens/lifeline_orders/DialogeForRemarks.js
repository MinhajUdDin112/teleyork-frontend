import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import Axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
const DialogeForRemarks = ({enrollmentId}) => {
    const [isComRemarks, setIsComRemarks] = useState();
    const [isConfidenceRemarks, setIsConfidenceRemarks] = useState();
    const [isVerificationRemarks, setIsVerificationRemarks] = useState();
    const [isInformationRemarks, setIsInformationRemarks] = useState();
    const [isDisclaimerRemarks, setIsDisclaimerRemarks] = useState();
    const [isDOBRemarks, setIsDOBRemarks] = useState();
    const [isCsrRemarks, setIsCsrRemarks] = useState(false);
    const [isCallDropRemarks, setIsCallDropRemarks] = useState(false);
    const [isCallQualityRemarks, setIsCallQualityRemarks] = useState();

    const formik = useFormik({
        initialValues: {
            comRemarks:"",
            confidenceRemarks:"",
            verificationRemarks:"",
            informationRemarks:"",
            disclaimerRemarks:"",
            DOBRemarks:"",
            csrRemarks:false,
            callDropRemarks:false,
            callQualityRemarks:"",
            remarksComment:"",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                enrollmentId,
                ...values
            };
            try {
                const response = await Axios.patch(`${BASE_URL}/api/user/remarks`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("Remarks Added");
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        },
        
    });
    useEffect(() => {
        formik.setValues({
          comRemarks: isComRemarks,
          confidenceRemarks: isConfidenceRemarks,
          verificationRemarks: isVerificationRemarks,
          informationRemarks: isInformationRemarks,
          disclaimerRemarks: isDisclaimerRemarks,
          DOBRemarks: isDOBRemarks,
          csrRemarks: isCsrRemarks,
          callDropRemarks: isCallDropRemarks,
          callQualityRemarks: isCallQualityRemarks,
          remarksComment: "",
        });
      }, [
        isComRemarks,
        isConfidenceRemarks,
        isVerificationRemarks,
        isInformationRemarks,
        isDisclaimerRemarks,
        isDOBRemarks,
        isCsrRemarks,
        isCallDropRemarks,
        isCallQualityRemarks,
      ]);
    return (
        <>
            <form onSubmit={formik.handleSubmit}>  
            <div className="flex flex-wrap justify-content-center card">
                        <p>0</p>
                        <p className="ml-4">20</p>
                    </div>
                <div className="flex flex-wrap justify-content-around card">
                   
                    <div className="w-20rem mt-3 card">
                        <div >
                            <label > Listening without Interruption/Two way communication/Helping Tone /Focus/Active Listening/Prolong Call/Probing (20) </label>
                        </div>
                        <div className="flex flex-wrap justify-content-around mt-3">
                            <div>
                                <RadioButton inputId="isComRemarks" name="pizza" value="0" onChange={(e) => setIsComRemarks(e.value)} checked={isComRemarks === "0"} />
                            </div>
                            <div>
                                <RadioButton inputId="ingredient2" name="pizza" value="20" onChange={(e) => setIsComRemarks(e.value)} checked={isComRemarks === "20"} />
                            </div>
                        </div>
                    </div>

                    <div className="w-20rem mt-3 card ">
                        <div>
                            <label >
                                {" "}
                                Confidence/Accent/Fluency (20){" "}
                            </label>
                        </div>
                        <div  className="flex flex-wrap justify-content-around mt-3 " >
                            <div >
                                <RadioButton inputId="isConfidenceRemarks" name="pizza" value="0" onChange={(e) => setIsConfidenceRemarks(e.value)} checked={isConfidenceRemarks === "0"} />
                            </div>
                            <div>
                                <RadioButton inputId="isConfidenceRemarks" name="pizza" value="20" onChange={(e) => setIsConfidenceRemarks(e.value)} checked={isConfidenceRemarks === "20"} />
                            </div>
                        </div>
                    </div>

                    <div className="w-20rem mt-3 card">
                        <div>
                            <label >
                                {" "}
                                Correct and complete Information taken (Name,Address,Street,City,State/Zip Code/Apartment) (20){" "}
                            </label>
                        </div>
                        <div className="flex flex-wrap justify-content-around mt-3">
                            <div>
                                <RadioButton inputId="isInformationRemarks" name="pizza" value="0" onChange={(e) => setIsInformationRemarks(e.value)} checked={isInformationRemarks === "0"} />
                            </div>
                            <div >
                                <RadioButton inputId="isInformationRemarks" name="pizza" value="20" onChange={(e) => setIsInformationRemarks(e.value)} checked={isInformationRemarks === "20"} />
                            </div>
                        </div>
                    </div>
                    <div className="w-20rem mt-3 card">
                        <div>
                            <label >
                                {" "}
                                DOB/SSN/Govt Assit (20){" "}
                            </label>
                        </div>
                        <div className="flex flex-wrap justify-content-around mt-3">
                            <div>
                                <RadioButton inputId="isDOBRemarks" name="pizza" value="0" onChange={(e) => setIsDOBRemarks(e.value)} checked={isDOBRemarks === "0"} />
                            </div>
                            <div >
                                <RadioButton inputId="isDOBRemarks" name="pizza" value="20" onChange={(e) => setIsDOBRemarks(e.value)} checked={isDOBRemarks === "20"} />
                            </div>
                        </div>
                    </div>
                    <div style={{width:"100vw",display:"flex",justifyContent:"center"}} className="card ">
                        <p>0</p>
                        <p className="ml-4">10</p>
                    </div>

                    <div className="w-20rem mt-3 card ">
                        <div>
                            <label >
                                {" "}
                                Confirmed Details before verification/Correct and Complete Info Provided/Opening & Closing Greeting (10){" "}
                            </label>
                        </div>
                        <div className="flex flex-wrap justify-content-around mt-3">
                            <div >
                                <RadioButton inputId="isVerificationRemarks" name="pizza" value="0" onChange={(e) => setIsVerificationRemarks(e.value)} checked={isVerificationRemarks === "0"} />
                            </div>
                            <div >
                                <RadioButton inputId="isVerificationRemarks" name="pizza" value="20" onChange={(e) => setIsVerificationRemarks(e.value)} checked={isVerificationRemarks === "20"} />
                            </div>
                        </div>
                    </div>

                    <div className="w-20rem mt-3 card  ">
                        <div>
                            <label >
                                {" "}
                                Disclaimer/ Yes/TPV (10){" "}
                            </label>
                        </div>
                        <div className="flex flex-wrap justify-content-around mt-3">
                            <div>
                                <RadioButton inputId="isDisclaimerRemarks" name="pizza" value="0" onChange={(e) => setIsDisclaimerRemarks(e.value)} checked={isDisclaimerRemarks === "0"} />
                            </div>
                            <div>
                                <RadioButton inputId="isDisclaimerRemarks" name="pizza" value="20" onChange={(e) => setIsDisclaimerRemarks(e.value)} checked={isDisclaimerRemarks === "20"} />
                            </div>
                        </div>
                    </div>

                   
                    <div style={{width:"100vw",display:"flex",justifyContent:"center"}} className="card">
                        <p>Yes</p>
                        <p className="ml-4">No</p>
                    </div>

                    <div className="w-20rem card mt-3">
                        <div>
                            <label >
                                CSR was rude/ Misbehaves with customer{" "}
                            </label>
                        </div>
                        <div className="flex flex-wrap justify-content-around mt-3" >
                            <div >
                                <RadioButton inputId="isCsrRemarks" name="pizza" value="true" onChange={(e) => setIsCsrRemarks(e.value)} checked={isCsrRemarks === "true"} />
                            </div>
                            <div >
                                <RadioButton inputId="isCsrRemarks" name="pizza" value="false" onChange={(e) => setIsCsrRemarks(e.value)} checked={isCsrRemarks === "false"} />
                            </div>
                        </div>
                    </div>
                    <div className="w-20rem card mt-3">
                        <div>
                            <label >
                                Call Drop/Hang Up by CSE{" "}
                            </label>
                        </div>
                        <div  className="flex flex-wrap justify-content-around mt-3">
                            <div >
                                <RadioButton inputId="isCallDropRemarks" name="pizza" value="true" onChange={(e) => setIsCallDropRemarks(e.value)} checked={isCallDropRemarks === "true"} />
                            </div>
                            <div >
                                <RadioButton inputId="isCallDropRemarks" name="pizza" value="false" onChange={(e) => setIsCallDropRemarks(e.value)} checked={isCallDropRemarks === "false"} />
                            </div>
                        </div>
                    </div>

               
                    <div style={{width:"100vw",display:"flex",justifyContent:"center"}} className="card">
                        <p className="mt-2">Standard</p>
                        <p className="ml-4 mt-2">Below Standard</p>  
                        <p className="ml-4 mt-2">Fatal</p>
                    </div>

                    <div className="card w-20rem mt-3">
                        <div>
                            <label>
                                Call Quality{" "}
                            </label>
                        </div>
                        <div className="flex flex-wrap justify-content-around mt-3">
                            <div >
                                <RadioButton inputId="isCallQualityRemarks" name="pizza" value="Standard" onChange={(e) => setIsCallQualityRemarks(e.value)} checked={isCallQualityRemarks === "Standard"} />
                            </div>
                            <div >
                                <RadioButton inputId="isCallQualityRemarks" name="pizza" value="Below" onChange={(e) => setIsCallQualityRemarks(e.value)} checked={isCallQualityRemarks === "Below"} />
                            </div>
                            <div >
                                <RadioButton inputId="isCallQualityRemarks" name="pizza" value="Fatal" onChange={(e) => setIsCallQualityRemarks(e.value)} checked={isCallQualityRemarks === "Fatal"} />
                            </div>
                        </div>
                    </div>       
                    {isCallQualityRemarks === "Below" || isCallQualityRemarks === "Fatal" ? (
                    <div className="mt-3 flex flex-wrap justify-content-center" style={{width:"100vw"}}  >
                        <div style={{width:"80%"}}>
                            <h4 >Comments</h4>
                            <InputTextarea id="remarksComment" style={{width:"100%"}}  value={formik.values.remarksComment} onChange={formik.handleChange}  className="p-2"  />
                        </div>
                        <br />
                    </div>
                ) : (
                    ""
                )}
                </div>

               

                <div className="flex flex-wrap justify-content-center mt-4">
                    <Button label="Submit" type="submit" />
                </div>
            </form>
        </>
    );
};

export default DialogeForRemarks;
