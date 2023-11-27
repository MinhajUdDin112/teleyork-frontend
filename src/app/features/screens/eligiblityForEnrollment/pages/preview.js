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
   const [checked, setChecked] = useState(false)

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

   const handleSign=()=>{
    setChecked(true);
   }
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
                        <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
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
                                    <p className="w-6 ml-4">Service Address:</p>
                                    <p className="w-6">{previewInfo?.address1}</p>
                                </div>
                               
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">State:</p>
                                    <p className="w-6">{previewInfo?.state}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">DOB:</p>
                                    <p className="w-6">{formatDate(previewInfo?.DOB)}</p>
                                </div>
                                <div className="flex  pt-2">
                                    <p className="w-6 ml-4">Telephone:</p>
                                    <p className="w-6">{previewInfo?.contact}</p>
                                </div>
                             
                            </div>
                            <div className="border-2 w-5 ">
                            <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">LastName:</p>
                                    <p className="w-6">{previewInfo?.lastName}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">City:</p>
                                    <p style={{marginLeft:"-10px"}}>{previewInfo?.city}</p>
                                </div>
                            <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Zip Code:</p>
                                    <p className="w-6">{previewInfo?.zip}</p>
                                </div>
                               
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">SSN:</p>
                                    <p className="w-6">{previewInfo?.SSN}</p>
                                </div>
                             
                              
                              
                                <div className="flex pt-2">
                                    <p className="w-6 ml-4">Email:</p>
                                    <p className="w-6">{previewInfo?.email}</p>
                                </div>
                            </div>
                        </div>

                        <br />
                        <br />
                        {
                            zipRes? <div className="flex">
                            <Checkbox inputId="cb1" value="New York" checked={isChecked} onClick={handleSign} onChange={(e) => setIsChecked(e.checked)}></Checkbox>
                            <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                <p>I further consent to receive calls, emails and/or text messages that may deliver auto-dialed or pre-recorded messages from IJ Wireless, Inc or its duly appointed agent, either using my telephone number assigned by IJ Wireless, Inc or provided by me herein or later. I understand this is not a condition of purchase.
                                </p>                               
                                <p>
                                I hereby give my informed consent to electronically sign this form, and I acknowledge that this electronic signature has the same legal effect as a handwritten signature. I understand that this action signifies my agreement to the terms and conditions outlined in this form and any related documents.
                                </p>
                                <br />
                                {checked?  <p><strong>This form is electronically signed by <strong>{(previewInfo?.firstName).toUpperCase()} {(previewInfo?.lastName).toUpperCase()}</strong> on {new Date().toLocaleDateString()}</strong></p>:null}
                               
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
