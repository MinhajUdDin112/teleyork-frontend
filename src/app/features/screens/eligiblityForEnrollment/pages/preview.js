import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import Preview_Final_component from "./Preview_Final_component";
import Axios from "axios";
import BASE_URL from "../../../../../config";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
const Preview = ({ setActiveIndex, enrollment_id, _id ,csr}) => {
    const [showFinalComponent, setShowFinalComponent] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
   

    //get preview  information from local storage
    const previewsRes = localStorage.getItem("address");
    const parsepreviewsRes = JSON.parse(previewsRes);
    const previewInfo = parsepreviewsRes?.data;

    const zipRes = localStorage.getItem("zipData");
    

    const formatDate = (date) => {
        if (!date) return ""; // Handle null or undefined dates
        return new Date(date).toLocaleDateString("en-US");
    };

    const postData = async () => {
        setIsLoading(true);
        const dataToSend = {
          csr: csr,
          userId: _id,
         
        };
        try {
          const response = await Axios.post(`${BASE_URL}/api/user/handOverEnrollment`, dataToSend);
          setIsLoading(false);
        } catch (error) {
         toast.error(error?.response?.data?.msg)
         setIsLoading(false);
        }
        setShowFinalComponent(true);

      };
      useEffect(() => {
       if(!zipRes){
        setIsChecked(true )
       }
      }, [])

   
    return (
        <>
        <ToastContainer/>
            {!showFinalComponent ? (
                <div className="card ">
                    <div className="flex flex-row justify-content-between sticky-buttons">
                        <Button
                            label="Back"
                            onClick={() => {
                                setActiveIndex(1);
                            }}
                        />
                        <Button label="Submit" onClick={postData} disabled={!isChecked} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""}  />
                    </div>
                    <br></br>

                    <div>
                        <div>
                            <h6>Enrollment_Id:{enrollment_id}</h6>
                        </div>

                        <h2 className="flex flex-row justify-content-center">Preview Your Details</h2>
                        <br />

                        <div className="flex justify-content-around">
                            <div className="border-2 w-5 pt-2">
                                <div className="flex border-bottom-2">
                                    <p className="w-6 ml-4">First Name:</p>
                                    <p className="w-6">{previewInfo?.firstName}</p>
                                </div>
                               
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">City:</p>
                                    <p>{previewInfo?.city}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Zip Code:</p>
                                    <p className="w-6">{previewInfo?.zip}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Telephone:</p>
                                    <p className="w-6">{previewInfo?.contact}</p>
                                </div>
                                <div className="flex pt-2">
                                    <p className="w-6 ml-4">DOB:</p>
                                    <p className="w-6">{formatDate(previewInfo?.DOB)}</p>
                                </div>
                            </div>
                            <div className="border-2 w-5 ">
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Service Address:</p>
                                    <p className="w-6">{previewInfo?.address1}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">State:</p>
                                    <p className="w-6">{previewInfo?.state}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Email:</p>
                                    <p className="w-6">{previewInfo?.email}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">SSN:</p>
                                    <p className="w-6">{previewInfo?.SSN}</p>
                                </div>
                                <div className="flex pt-2">
                                    <p className="w-6 ml-4">LastName:</p>
                                    <p className="w-6">{previewInfo?.lastName}</p>
                                </div>
                                {/* <div className="flex pt-2">
                                    <p className="w-6 ml-4">Plan:</p>
                                    <p className="w-6">{addressInfo?.plan}</p>
                                </div> */}
                            </div>
                        </div>

                        <br />
                        <br />
                        {
                            zipRes? <div className="flex">
                            <Checkbox inputId="cb1" value="New York" checked={isChecked} onChange={(e) => setIsChecked(e.checked)}></Checkbox>
                            <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                <p>
                                    I authorize IJ Wireless, Inc or its duly appointed representative to: (1) access any records required to verify my statements herein; (2) to confirm my continued eligibility for Affordable Connectivity Program (ACP) assistance; (3) to update my address to proper mailing
                                    address format. (4) to provide my name, telephone number, and address to the versal Service Administrative Company (USAC), the administrator of the program and/ or its agents for the purpose of verifying that I do not receive more than one ACP benefit
                                </p>
                                <br />
                                <p>
                                IJ Wireless, Inc is an Affordable Connectivity Program (ACP) supported service. ACP is a federal benefit and only eligible subscribers may enroll. Customers who witfully make false statements to obtain the benefit can be punished by fine, imprisonment, or can be barred
                                    from the program. ACP is available for only one benefit per household. A household is defined as any individual or group of individuals who live together at the same address and share income and expenses. A household is not permitted to receive ACP benefits from
                                    multiple providers. Violation of the one-per-household rule constitutes a violation of FCC rules and will result in the customers de-enrollment from the Affordable Connectivity Program The ACP benefit is non-transferable, and a customer may not transfer his or her
                                    benefit to another person.
                                </p>
                                <br />
                                <p>
                                    I further consent to receive calls and/ or text messages that may deliver auto dialed or pre-recorded messages from IJ Wireless, Inc or its duly appointed agent either using my telephone number assigned by IJ Wireless, Inc or provided by me herein or later. I understand this
                                    is not a condition of purchase.
                                </p>
                                <br />
                                <p className="text-xl font-semibold">By clicking the confirm Signature button, you are electronically signing this form.</p>
                                <p>Electronically Signed by {previewInfo?.firstName} {new Date().toLocaleDateString()}</p>
                            </label>
                        </div>
                        :null
                        }
                       
                      
                    </div>
                </div>
            ) : (
                <Preview_Final_component enrollment_id={enrollment_id} />
            )}
        </>
    );
};

export default Preview;
