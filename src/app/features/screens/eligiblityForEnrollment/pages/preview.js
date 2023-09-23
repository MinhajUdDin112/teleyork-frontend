import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useSelector } from "react-redux";
const Preview = ({setActiveIndex}) => {
    const [selectedPage, setSelectedPage] = useState(0);
    const pages = ["preview"];

    
    const zipCode = useSelector((state) => {
        return state.zip;
    });
     const enrollment_id = zipCode?.serviceAvailability?.data?.enrollmentId; 
    const _id = zipCode?.serviceAvailability?.data?._id; 


    const previewDetails = () => {
        return (
            <div>
                <div>
                    <h6>Enrollment ID: ETC175698</h6>
                </div>
                
                <br></br>
                <h2 className="flex flex-row justify-content-center">Preview Your Details</h2>
                <br />
                <div className="flex justify-content-around">
                    <div className="border-2 w-5 pt-2">
                        <div className="flex border-bottom-2">
                            <p className="w-6 ml-4">Name:</p>
                            <p className="w-6">Hammad</p>
                        </div>
                        <div className="flex border-bottom-2 pt-2">
                            <p className="w-6 ml-4">City:</p>
                            <p className="w-6">Abbottabad</p>
                        </div>
                        <div className="flex border-bottom-2 pt-2">
                            <p className="w-6 ml-4">Zip Code:</p>
                            <p className="w-6">22010</p>
                        </div>
                        <div className="flex border-bottom-2 pt-2">
                            <p className="w-6 ml-4">Telephone:</p>
                            <p className="w-6">03135522652</p>
                        </div>
                        <div className="flex pt-2">
                            <p className="w-6 ml-4">DOB:</p>
                            <p className="w-6">10-10-1999</p>
                        </div>
                    </div>
                    <div className="border-2 w-5 ">
                        <div className="flex border-bottom-2 pt-2">
                            <p className="w-6 ml-4">Service Address:</p>
                            <p className="w-6">Hammad</p>
                        </div>
                        <div className="flex border-bottom-2 pt-2">
                            <p className="w-6 ml-4">State:</p>
                            <p className="w-6">Hammad</p>
                        </div>
                        <div className="flex border-bottom-2 pt-2">
                            <p className="w-6 ml-4">Email:</p>
                            <p className="w-6">Hammad</p>
                        </div>
                        <div className="flex border-bottom-2 pt-2">
                            <p className="w-6 ml-4">SSN:</p>
                            <p className="w-6">Hammad</p>
                        </div>
                        <div className="flex pt-2">
                            <p className="w-6 ml-4">Plan:</p>
                            <p className="w-6">Hammad</p>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="flex">
                    <Checkbox inputId="cb1" value="New York"></Checkbox>
                    <label htmlFor="cb1" className="p-checkbox-label mx-2">
                        <p>
                            I authorize Tone Comms or its duly appointed representative to: (1) access any records required to verify my statements herein; (2) to confirm my continued eligibility for Affordable Connectivity Program (ACP) assistance; (3) to update my address to proper mailing address
                            format. (4) to provide my name, telephone number, and address to the versal Service Administrative Company (USAC), the administrator of the program and/ or its agents for the purpose of verifying that I do not receive more than one ACP benefit
                        </p>
                        <br />
                        <p>
                            Tone Comms is an Affordable Connectivity Program (ACP) supported service. ACP is a federal benefit and only eligible subscribers may enroll. Customers who witfully make false statements to obtain the benefit can be punished by fine, imprisonment, or can be barred from the
                            program. ACP is available for only one benefit per household. A household is defined as any individual or group of individuals who live together at the same address and share income and expenses. A household is not permitted to receive ACP benefits from multiple
                            providers. Violation of the one-per-household rule constitutes a violation of FCC rules and will result in the customers de-enrollment from the Affordable Connectivity Program The ACP benefit is non-transferable, and a customer may not transfer his or her benefit to
                            another person.
                        </p>
                        <br />
                        <p>
                            I further consent to receive calls and/ or text messages that may deliver auto dialed or pre-recorded messages from Tone Comms or its duly appointed agent either using my telephone number assigned by Tone Comms or provided by me herein or later. I understand this is not a
                            condition of purchase.
                        </p>
                        <br />
                        <p className="text-xl font-semibold">By clicking the confirm Signature button, you are electronically signing this form.</p>
                        <p>Electronically Signed by WEECY WIGGINS February 17,2023</p>
                    </label>
                </div>
                <div className="mt-5">
                    <p>Request User For additional Documents</p>
                    <Button label="Send"
                    className="p-button-success"
                     />
                </div>
            </div>
        );
    };
    const builtPages = {
        preview: previewDetails() 
    };
    return (
        <>
            <div className="card">
                <div className="flex flex-row justify-content-between">
                    <Button label="Back"
                    onClick={()=>{
                        setActiveIndex(2);
                    }} />
                    <Button
                        label="Continue"
                        onClick={() => {
                            if (selectedPage < 1) {
                                setSelectedPage((prev) => {
                                    return prev + 1;
                                });
                            }
                        }}
                    />
                </div>
                <br></br>
                {builtPages[pages[selectedPage]]}
            </div>
        </>
    );
};

export default Preview;
