import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import Preview_Final_Component from './Preview_Final_Component'
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { ColumnGroup } from "primereact/columngroup";
const BASE_URL = process.env.REACT_APP_BASE_URL
const Preview = ({ setActiveIndex, enrollment_id, _id, csr }) => {
    const [showFinalComponent, setShowFinalComponent] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const [fromIncomplete, setFromIncomplete] = useState(false);
    const [goBack, setGoBack] = useState(false);

    //get preview  information from local storage
    const previewsRes = localStorage.getItem("address");
    const parsepreviewsRes = JSON.parse(previewsRes);
    const previewInfo = parsepreviewsRes?.data;

    const productData = localStorage.getItem("productData");
    const parseproductData = JSON.parse(productData);
    let paymentInfo = JSON.parse(localStorage.getItem("paymentallinfo"))?.data;

    const paymentStatus = localStorage.getItem("paymentstatus")

    const zipRes = localStorage.getItem("zipData");

    const loginRes = JSON.parse(localStorage.getItem("userData"));
    const companyName = loginRes?.companyName;
 
  

    //check that user come from incomplete or not 
    const fromIncompl = localStorage.getItem("fromIncomplete");
    const parsefromIncompl = JSON.parse(fromIncompl);
    //check the user from rejected
    const fromRejected = localStorage.getItem("fromRejected");
    const parsefromRejected = JSON.parse(fromRejected);

    let basicData = JSON.parse(localStorage.getItem("basicData"))?.data;

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
            localStorage.removeItem("paymentstatus");
            localStorage.removeItem("address");
            localStorage.removeItem("agreeData");
            localStorage.removeItem("programmeId");
            localStorage.removeItem("fromRejected")


        } catch (error) {
            toast.error(error?.response?.data?.msg)
            setIsLoading(false);
        }
        setShowFinalComponent(true);
        // setFromIncomplete(false)
        // localStorage.setItem("fromIncomplete", JSON.stringify(fromIncomplete))

    };

    useEffect(() => {

        if (!zipRes && parsefromIncompl == false) {
            setIsChecked(true)


        }
        else if (!zipRes && parsefromIncompl == true) {
            setIsChecked(false)
        }
    }, [])
    let productName;
    let inventory;
    let discount = "";
    let additional = "";
    let inventoryType = JSON.parse(localStorage.getItem("inventoryType"));
    
    for (let i = 0; i < inventoryType?.length; i++) {
        if (paymentInfo?.billId === inventoryType[i].value) {
            inventory = inventoryType[i].label;
            inventory = inventoryType[i].label;

            break;
        }
    }
    if (inventory === "SIM") {
        productName = "SIM"

        let selecteddiscount = JSON.parse(localStorage.getItem("simpricing"))?.selectdiscount;
        let simalladditional = JSON.parse(localStorage.getItem("simadditional"));
      
        let additionallocal = JSON.parse(localStorage.getItem("simadditionalfeaturearray"));

      
        for (let i = 0; i < additionallocal?.length; i++) {
            for (let k = 0; k < simalladditional?.length; k++) {
                if (additionallocal[i] === simalladditional[k].value) {
                    additional += `${simalladditional[k].name},`;
                }
            }
        }
        for (let i = 0; i < selecteddiscount?.length; i++) {
            discount += `${selecteddiscount[i].discountname},`;
        }
    } else if (inventory === "Wireless Device") {
        productName = "WIRELESS DEVICE"

        let selecteddiscount = JSON.parse(localStorage.getItem("devicepricing"))?.selectdiscount;
        let devicealladditional = JSON.parse(localStorage.getItem("deviceadditional"));
        let additionallocal = JSON.parse(localStorage.getItem("deviceadditionalfeaturearray"));
        for (let i = 0; i < additionallocal?.length; i++) {
            for (let k = 0; k < devicealladditional?.length; k++) {
                if (additionallocal[i] === devicealladditional[k].value) {
                    additional += `${devicealladditional[k].name}`;
                }
            }
        }
        for (let i = 0; i < selecteddiscount?.length; i++) {
            discount += `${selecteddiscount[i].discountname},`;
        }
    }

    const handleSign = () => {
        setChecked(true);
    }

    return (
        <>
            <ToastContainer />
            {!showFinalComponent ? (
                <div className="card ">
                    <div className="flex flex-row justify-content-between sticky-buttons">
                        <Button
                            label="Back"
                            onClick={() => {
                                setActiveIndex(1);
                                setGoBack(true);
                            }}
                        />
                        <Button label="Submit" onClick={postData} disabled={!isChecked || isLoading} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} />
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
                                    <p className="w-6 ml-4">Mother's Maiden Name:</p>
                                    <p className="w-6">{previewInfo?.maidenMotherName !== undefined && previewInfo?.maidenMotherName.trim() !== "" ? previewInfo?.maidenMotherName.toUpperCase() : "---"}</p>
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
                                <div className="flex  pt-2 border-bottom-2">
                                    <p className="w-6 ml-4">Telephone:</p>
                                    <p className="w-6">{previewInfo?.contact}</p>
                                </div>
                             
                                {
                                    parsefromRejected && basicData && basicData.currentPlan && (
                                        <div className="flex pt-2 border-bottom-2">
                                            <p className="w-6 ml-4">Product:</p>
                                            <p className="w-6">{basicData?.selectProduct.toUpperCase()}</p>
                                        </div>
                                    )
                                }
                                  {
                                    !parsefromRejected && parseproductData && (
                                        <div className="flex pt-2 border-bottom-2 ">
                                            <p className="w-6 ml-4">Product:</p>
                                            <p className="w-6">{parseproductData?.
                                        selectProduct.toUpperCase()
                                    }</p>
                                        </div>
                                    )
                                }
                                 {
                                    paymentStatus && paymentStatus === "paid" ?
                                        <div className="flex pt-2 border-bottom-2">
                                            <p className="w-6 ml-4">Payment Method:</p>
                                            <p className="w-6">CREDIT CARD</p>

                                        </div> :
                                        <div className="flex pt-2 border-bottom-2">
                                            <p className="w-6 ml-4">Payment Method:</p>
                                            <p className="w-6">SKIP</p>

                                        </div>
                                        
                                }

                                {/* {
                                    parsefromRejected ? <div className="flex  pt-2">
                                        <p className="w-6 ml-4">Amount:</p>
                                        <p className="w-6">{parseFloat(basicData?.totalAmount).toFixed(2)}</p>

                                    </div> : <div className="flex  pt-2">
                                        <p className="w-6 ml-4">Amount:</p>
                                        <p className="w-6">{parseFloat(parseproductData?.totalAmount).toFixed(2)}</p>

                                    </div>
                                } */}
                            </div>
                            <div className="border-2 w-5 ">
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">LastName:</p>
                                    <p className="w-6">{previewInfo?.lastName}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">City:</p>
                                    <p style={{ marginLeft: "-10px" }}>{previewInfo?.city}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Address 2:</p>
                                    <p style={{ marginLeft: "-10px" }}>{previewInfo?.address2 !== undefined && previewInfo?.address2.trim() !== "" ? previewInfo?.address2.toUpperCase() : "---"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Zip Code:</p>
                                    <p className="w-6">{previewInfo?.zip}</p>
                                </div>

                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">SSN:</p>
                                    <p className="w-6">{previewInfo?.SSN}</p>
                                </div>

                                <div className="flex pt-2 border-bottom-2">
                                    <p className="w-6 ml-4">Email:</p>
                                    <p className="w-6">{previewInfo?.email.toUpperCase()}</p>
                                </div>
                                {
                                    parsefromRejected && basicData && basicData.currentPlan && (
                                        <div className="flex pt-2 border-bottom-2">
                                            <p className="w-6 ml-4">Plan:</p>
                                            <p className="w-6">{basicData.currentPlan.planName?.toUpperCase()}</p>
                                        </div>
                                    )
                                }

                                {
                                    !parsefromRejected && parseproductData && (
                                        <div className="flex pt-2 border-bottom-2">
                                            <p className="w-6 ml-4">Plan:</p>
                                            <p className="w-6">{parseproductData.currentPlan?.planName?.toUpperCase()}</p>
                                        </div>
                                    )
                                }

{
                                    parsefromRejected ? <div className="flex  pt-2 ">
                                        <p className="w-6 ml-4">Amount:</p>
                                        <p className="w-6">{parseFloat(basicData?.totalAmount).toFixed(2)}</p>

                                    </div> : <div className="flex  pt-2 ">
                                        <p className="w-6 ml-4">Amount:</p>
                                        <p className="w-6">{parseFloat(parseproductData?.totalAmount).toFixed(2)}</p>

                                    </div>
                                }
                                

                            </div>
                        </div>

                        <br />
                        <br />
                        {
                            zipRes ? <div className="flex">
                                <Checkbox inputId="cb1" value="New York" checked={isChecked} onClick={handleSign} onChange={(e) => setIsChecked(e.checked)}></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                    <p>I further consent to receive calls, emails and/or text messages that may deliver auto-dialed or pre-recorded messages from {companyName}, Inc or its duly appointed agent, either using my telephone number assigned by {companyName}, Inc or provided by me herein or later. I understand this is not a condition of purchase.
                                    </p>
                                    <p>
                                        I hereby give my informed consent to electronically sign this form, and I acknowledge that this electronic signature has the same legal effect as a handwritten signature. I understand that this action signifies my agreement to the terms and conditions outlined in this form and any related documents.
                                    </p>
                                    <br />
                                    {checked ? <p><strong>This form is electronically signed by <strong>{(previewInfo?.firstName).toUpperCase()} {(previewInfo?.lastName).toUpperCase()}</strong> on {new Date().toLocaleDateString()}</strong></p> : null}

                                </label>
                            </div>
                                : !zipRes && parsefromIncompl == true ?
                                    <div className="flex">
                                        <Checkbox inputId="cb1" value="New York" checked={isChecked} onClick={handleSign} onChange={(e) => setIsChecked(e.checked)}></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                            <p>I further consent to receive calls, emails and/or text messages that may deliver auto-dialed or pre-recorded messages from {companyName}, Inc or its duly appointed agent, either using my telephone number assigned by {companyName}, Inc or provided by me herein or later. I understand this is not a condition of purchase.
                                            </p>
                                            <p>
                                                I hereby give my informed consent to electronically sign this form, and I acknowledge that this electronic signature has the same legal effect as a handwritten signature. I understand that this action signifies my agreement to the terms and conditions outlined in this form and any related documents.
                                            </p>
                                            <br />
                                            {checked ? <p><strong>This form is electronically signed by <strong>{(previewInfo?.firstName).toUpperCase()} {(previewInfo?.lastName).toUpperCase()}</strong> on {new Date().toLocaleDateString()}</strong></p> : null}

                                        </label>
                                    </div> : ""
                        }


                    </div>
                </div>
            ) : (
                <Preview_Final_Component enrollment_id={enrollment_id} />
            )}
        </>
    );
};

export default Preview;
