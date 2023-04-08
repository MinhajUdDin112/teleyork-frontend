import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import "./eligibility.scss";

const Eligibility = ({ setActiveIndex }) => {
    const [selectedPage, setSelectedPage] = useState(0);
    const data = [{ id: "1500 MB", name: "1500", age: 5000 }];
    let page = ["eligibility", "agree"];

    const eligibilityCard = () => {
        return (
            <div>
                <br />

                <div>
                    <h6>Enrollment ID: ETC175698</h6>
                </div>
                <br />
                <div>
                    <h2>Qualify for the Affordable Connectivity Program</h2>
                    <p>Select the applicable program from below to show that you, your dependent or someone in your household qualifies for Affordable Connectivity Program. You can qualify through some government assistance program or through your income (you don't need to qualify through both) </p>
                    <p>Note: You can only select one from the programs listed below</p>
                </div>
                <div className="flex justify-content-around flex-wrap pt-3">
                    <Card style={{ width: "17em", height: "17em", backgroundColor: "#aae5e9", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                        <img src="/images/medicaid.jpg" alt="medicaid image" style={{ borderRadius: "6px 6px 0px 0px", height: "100%", width: "100%", objectFit: "contain" }} />
                        <div className="flex justify-content-center">
                            <p className="font-semibold">Medicaid</p>
                        </div>
                        <div className="flex justify-content-center">
                            <Button label="SELECT" className="p-button-raised" />
                        </div>
                    </Card>
                </div>
            </div>
        );
    };

    // const agreementPage = () => {
    //     return (
    //         <div>
    //             <h2>Agreement</h2>
    //             <p>You are almost done qualifying, Please initial next to each statement and sign this form to finish the process.</p>
    //             <div className="surface-200 p-3">
    //                 <p className="text-2xl font-medium border-bottom-1 pb-3">I certify, under penalty of perjury, that:</p>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3">
    //                         <p>
    //                             I (or my dependent or other person in my household) currently get benifits from the govrnment programs(s) listed on this form or my annual household income is 200% or less than the Federal Poverty Guidelines(the amount listed in the Federal Poverty Guidelines table on
    //                             this form)
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>I agree that if I move I will give my internet company my new address within 30 days.</p>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>I understand that I have to tell my internet company within 30 days if I do not qualify for the ACP anymore including:</p>
    //                         <ol>
    //                             <li>I, or the person in my household that qualifies, do not qualify through a government program or income anymore.</li>
    //                             <li>Either I or someone in my household gets more than one ACP benifit.</li>
    //                         </ol>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>
    //                             I know that my household can only get one ACP benefit and the best of my knoowledge, my house hold is not getting more than one ACP benefit. I understand that I can only recieve one connected device (desktop, laptop or mobile) through the ACP, even if I switch ACP
    //                             companies.
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>
    //                             I agree that all of the information that I provide on this form may be collected, used, shared and retained for the purposes of applying for and/or recieving the ACP benefit. I understand that if this information is not provided to the Program Administrator. I will
    //                             not be Able to get ACP benefits. If the laws of my state or Tribal government require it. I agree that the state or tribal government may share information about my benefits for a qualifying program with the ACP Administrator. The information shared by State or Tribal
    //                             government will be used only to help find out if I can get an ACP benefit.
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>
    //                             For my household, I affirm and understand that the ACP is a federal government subsidy that reduces my broadband internet access service bill and at the conclusion of the program, my household will be subject to the company's undiscounted general rates, terms and
    //                             conditions if my household continues to subscribe to the service.
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>I know that willingly giving false or fraudulent information to get ACP benefits is punishable by law and can result in fines, jail time, de-enrollment, or being barred from the program.</p>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>
    //                             The ACP Administrator or my service provider may have to check whether I still qualify at any time. If I need to recertify my ACP benefit, I understand that I have to respond by the deadline or I will be removed from the Affordable Connectivity Program and my ACP
    //                             benefit will stop.
    //                         </p>
    //                     </div>
    //                 </div>
    //                 <div className="flex border-bottom-1 py-3">
    //                     <div className="flex flex-column">
    //                         <label htmlFor="point1" className="font-medium">
    //                             Initial
    //                         </label>
    //                         <input id="point1" style={{ width: "50px", height: "40px" }} />
    //                     </div>
    //                     <div className="ml-3 mb-3">
    //                         <p>I was truthful about whether or not I am a resident of Tribal lands as defined in the "Your Information" section of this form.</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="surface-200 my-4 p-3">
    //                 <p className="text-2xl font-medium">Your Signature</p>
    //                 <div>
    //                     <p>Type your full legal name below.</p>
    //                     <input type="text" className="w-full" />
    //                     <p>HAMMAD ULLAH</p>
    //                     <div className="flex">
    //                         <Checkbox inputId="cb1" value="New York"></Checkbox>
    //                         <label htmlFor="cb1" className="p-checkbox-label mx-2">
    //                             I understand this is a digital signature, and is the same as if I signed my name with a pen.
    //                         </label>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div>
    //                 <div className="flex flex-row justify-content-between mb-5">
    //                     <Button label="Back" />
    //                     <Button
    //                         label="Submit"
    //                         onClick={() => {
    //                             if (selectedPage < 2) {
    //                                 setSelectedPage((prev) => {
    //                                     return prev + 1;
    //                                 });
    //                             }
    //                         }}
    //                     />
    //                 </div>
    //                 <div className="border-bottom-1 py-3">
    //                     <p>Need help? Call the Affordable Connectivity Support Center at 1-877-384-2575</p>
    //                 </div>
    //                 <div className="flex flex-column my-4">
    //                     <span>Privacy Act Statement</span>
    //                     <span>Terms and Conditions</span>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // const acpQualifier = () => {
    //     return (
    //         <div>
    //             <div>
    //                 <h2>You Qualify for the Affordable Connectivity Benefit!</h2>
    //                 <p className="font-bold">Sign up with an internet provider by 5/18/2023 (US Eastern Time) to start recieving your benefit and obtain the one-time discount on a computer or tablet.</p>
    //             </div>
    //             <div className="bg-yellow-200 p-2 my-3">
    //                 <p>
    //                     If you do NOT sign up with an internet provider by 5/18/2023, you will have to reapply for the{" "}
    //                     <span>
    //                         <a>Affordable Connectivity Program benefit.</a>
    //                     </span>
    //                 </p>
    //             </div>
    //             <div className="flex border-2 border-yellow-100">
    //                 <div className="col-3 text-right">
    //                     <p>Name:</p>
    //                     <p>Application ID:</p>
    //                     <p>Tribal Status</p>
    //                     <p>Latitude</p>
    //                     <p>Longitude</p>
    //                     <p>Coordinate Source ?</p>
    //                 </div>
    //                 <div className="col-9">
    //                     <p className="font-semibold">HAMMAD ULLAH</p>
    //                     <p className="font-semibold">A7865-3645</p>
    //                     <p className="font-semibold">Not Tribal</p>
    //                     <p className="font-semibold">Provided by Consumer</p>
    //                 </div>
    //             </div>
    //             <div>
    //                 <p className="font-normal my-3 text-2xl">How to finish signing up:</p>
    //                 <p className="font-normal text-2xl ml-2"> • Return to your company to recieve srvice.</p>
    //                 <p>You are almost done signing up for the Affordable Connectivity Program! Now that you are qualified, you can now go back to the company you applied with to recieve the Affordable Connectivity Program on your internet service.</p>
    //                 <p>To return to your company you started your application with please click "Continue" below.</p>
    //                 <div className="flex justify-content-center">
    //                     <Button
    //                         label="Continue"
    //                         onClick={() => {
    //                             if (selectedPage < 3) {
    //                                 setSelectedPage((prev) => {
    //                                     return prev + 1;
    //                                 });
    //                             }else{

    //                             }
    //                         }}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    const agreed = () => {
        return (
            <div>
                <p className="font-normal my-3 text-xl line-height-1">PLEASE CAREFULLY READ AND AGREE BY INITIALING ALL THE BOXES FOR THE FOLLOWING STATEMENTS. BY CLICKING THE BOXES BELOW, YOU AGREE TO E-SIGN STATEMENTS BELOW WITH YOUR INITIALS AND THAT THE STATEMENTS INITIALED ARE ENFORCEABLE.</p>
                <p className="font-semibold" style={{ color: "red" }}>
                    Please read and check all Penalty Of Perjury and accept Terms and Conditions.
                </p>
                <div className="p-3">
                    <div className="field-checkbox">
                        <Checkbox />
                        <label htmlFor="binary">I agree, under penalty of perjury, to the following statements: (You must initial next to each statement).</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox />
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
        );
    };

    let buildpages = {
        eligibility: eligibilityCard(),
        // agreement: agreementPage(),
        // qualifier: acpQualifier(),
        agree: agreed(),
    };
    return (
        <>
        
        <div className="flex flex-row justify-content-between my-3">
                    <Button label="Back" />
                    <Button
                        label="Continue"
                        onClick={() => {
                            if (selectedPage < 1) {
                                setSelectedPage((prev) => {
                                    return prev + 1;
                                });
                            } else {
                                setActiveIndex(2);
                            }
                        }}
                    />
                </div>
                <div>{buildpages[page[selectedPage]]}</div>
            </div>
        </>
    );
};

export default Eligibility;
