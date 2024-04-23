import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const NationalVerifier = () => {
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    let storedData = JSON.parse(localStorage.getItem("zip"))
    const id=storedData?.data?._id
    
    const loginRes = JSON.parse(localStorage.getItem("userData"));
    

    const cmpnyResString = localStorage.getItem("companyName");
    const cmpnyRes = cmpnyResString ? JSON.parse(cmpnyResString) : null;
    const companyName = cmpnyRes;
  


    const handleNext = async () => {
        setIsLoading(true);
        const data = {
            userId: id,
        };
        try {
            const res = await axios.post(`${BASE_URL}/api/enrollment/termsAndConditions`, data);
            const responseData = res.data; // Assuming the API response contains the data you need
            navigate("/resumeapplication", { state: { responseData } });
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
                        <p className="text-4xl font-bold flex justify-content-center">Consent Acknowledgment</p>
                        <p className="mt-0 text-xl">
                            I'm going to go over the required information to participate in the Affordable Connectivity Program. Answering affirmatively is required in order to enroll in the Affordable Connectivity Program in my state.<br></br>
                            This authorization is only for the purpose of verifying my participation in this program and will not be used for any purpose other than Affordable Connectivity Program (ACP).
                            <br></br>I am authorizing the Company {companyName}, Inc., to access any records required to verify my statements on this form and to confirm my eligibility for the Affordable Connectivity Program.
                            <br></br>
                            My annual household income is 200% or less than the Federal Poverty Guidelines (the amount listed in the Federal Poverty Guidelines on FCC's website (
                            <a href="https://www.usac.org/lifeline/consumer-eligibility/" target="_blank" rel="noopener noreferrer">
                                https://www.usac.org/lifeline/consumer-eligibility/
                            </a>
                            )<br></br>I agree that if I move I will provide my new address to my service provider within 30 days.<br></br>I understand that I have to tell my service provider within 30 days if I do not qualify for ACP benefit anymore, including: I, or the person in my household that
                            qualifies, do not qualify through a government program or income anymore.<br></br>I know that my household can only get one ACP benefit and, to the best of my knowledge, my household is not getting more than one ACP benefit.<br></br>I understand that I can only receive
                            one connected device (Tablet) through the ACP benefit, even if I switch ACP providers.<br></br>I agree that all of the information I provided on this form may be collected, used, shared, and retained for the purposes of applying for and/or receiving the ACP benefit. I
                            understand that if this information is not provided to the Program Administrator, I will not be able to get ACP benefits.<br></br>If the laws of my state or Tribal government require it, I agree that the state or Tribal government may share information about my benefits.
                            for a qualifying program with the ACP Administrator. The information shared by the state or Tribal government will be used only to help find out if I can get an ACP benefit.<br></br>I acknowledge and consent to the enrollment or transfer of my services with {companyName},
                            Inc for the Affordable Connectivity Program (ACP) and I understand that I cannot receive multiple ACP program benefits concurrently from the same or different providers.<br></br>All the answers and agreements that I provided on this form are true and correct to the best
                            of my knowledge. I know that willingly giving false or fraudulent information to get ACP benefits is punishable by law and can result in fines, jail time, de-enrollment, or being barred from the program.
                        </p>
                        <div className="mb-2 flex">
                            <Checkbox inputId="binary" checked={checked} onChange={(e) => setChecked(e.checked)} />
                            <label htmlFor="binary" className="text-2xl flex align-items-center  ml-2">
                                I hereby certify that I have thoroughly read and agree to this disclosure
                            </label>
                        </div>
                        <div className="flex flex-column mt-4">
                            <Button label="Next" icon={isLoading ? <ProgressSpinner strokeWidth="6" style={{ width: "1.5rem", height: "1.5rem", color: "white" }} /> : null} className="mb-3" onClick={() => handleNext()} disabled={!checked || isLoading} />
                            <Button label="Back" onClick={handleBack} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NationalVerifier;
