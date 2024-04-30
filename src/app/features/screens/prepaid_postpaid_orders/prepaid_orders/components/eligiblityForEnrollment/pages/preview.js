import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import Preview_Final_component from "./Preview_Final_component";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Preview = ({ setActiveIndex, enrollment_id, _id, csr }) => {
    const [showFinalComponent, setShowFinalComponent] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [fromIncomplete, setFromIncomplete] = useState(false);
    //get preview  information from local storage
    const previewsRes = localStorage.getItem("prepaidaddress");
    const parsepreviewsRes = JSON.parse(previewsRes);
    const previewInfo = parsepreviewsRes?.data;
    const zipRes = localStorage.getItem("prepaidzipData");
    //check that user come from incomplete or not
    const fromIncompl = localStorage.getItem("comingfromincomplete");
    const parsefromIncompl = JSON.parse(fromIncompl);
    let paymentInfo = JSON.parse(localStorage.getItem("paymentscreendetails"));
    const formatDate = (date) => {
        if (!date) return ""; // Handle null or undefined dates
        return new Date(date).toLocaleDateString("en-US");
    };

    const postData = async () => {
        setIsLoading(true);
        const dataToSend = {
            csr: csr,
            userId: _id,
            isWithInvoice: paymentInfo?.prospectwithinvoice,
            isWithoutInvoice: paymentInfo?.prospectwithoutinvoice,
        };
        Axios.post(`${BASE_URL}/api/user/esnAssingment`, dataToSend)
            .then(() => {
                toast.success("Esn Successfully Assigned");
                Axios.post(`${BASE_URL}/api/user/prepaidHandOver`, dataToSend)
                    .then((res) => {

                        Axios.post(`${BASE_URL}/api/web/order`, { orderNumber: enrollment_id })
                            .then((response) => {
                                toast.success("Order Placed Successfully");
                                Axios.post(`${BASE_URL}/api/web/order/createLable`, { orderId: response.data.data.orderId.toString(), userId: _id, testLabel: true })
                                    .then(() => {
                                        toast.success("Label created Successfully");
                                        setIsLoading(false);

                                        setShowFinalComponent(true);
                                        setFromIncomplete(false);
                                       localStorage.setItem("comingfromincomplete", JSON.stringify(fromIncomplete));
                                    })
                                    .catch((err) => {
                                        toast.error("Label Creation Failed");         
                                        toast.success("Label created Successfully");
                                        setIsLoading(false);

                                        setShowFinalComponent(true);
                                        setFromIncomplete(false);
                                       localStorage.setItem("comingfromincomplete", JSON.stringify(fromIncomplete));
                                 
                                    });
                            })
                            .catch((err) => {
                                toast.error("Order Placing Failed");
                            });
                    })
                    .catch((error) => {
                        toast.error(error?.response?.data?.msg);
                        setIsLoading(false); 
                    });
            })
            .catch((error) => {
                
                setIsLoading(false);
                toast.error(error?.response?.data?.msg);
            });
    };
    useEffect(() => {
        if (!zipRes && parsefromIncompl == false) {
            setIsChecked(true);
        } else if (!zipRes && parsefromIncompl == true) {
            setIsChecked(false);
        }
    }, []);
    let inventory;
    let oneTimeCharge;
    let discount = "";
    let additional = "";
    let discountobjectsendin = [];
    let additionalobjectsendin = [];
    let productName;
    let dueDate;
    let applyLateFee;
    let planname;
    let plancharges;
    let plandata = JSON.parse(localStorage.getItem("planprices"));
    for (let i = 0; i < plandata?.length; i++) {
        if (paymentInfo?.plan === plandata[i]?._id) {
            planname = plandata[i]?.name;
            plancharges = plandata[i]?.price;
            //planId = plandata[i]?._id;
        }
    }
    let inventoryType = JSON.parse(localStorage.getItem("inventoryType"));
    for (let i = 0; i < inventoryType?.length; i++) {
        if (paymentInfo?.billId === inventoryType[i].value) {
            inventory = inventoryType[i].label;
            break;
        }
    }
    if (inventory === "SIM") {
        productName = "SIM";
        let selectdiscount = JSON.parse(localStorage.getItem("simdiscountobjectarray"));
        let alldiscounts = JSON.parse(localStorage.getItem("simpricing"))?.selectdiscount;
        applyLateFee = JSON.parse(localStorage.getItem("simpricing"))?.applyLateFee;
        dueDate = JSON.parse(localStorage.getItem("simpricing"))?.dueDate;
        oneTimeCharge = JSON.parse(localStorage.getItem("simpricing"))?.oneTimeCharge;
        let simalladditional = JSON.parse(localStorage.getItem("simpricing"))?.additionalFeature;
        let additionallocal = JSON.parse(localStorage.getItem("simadditionalfeaturearray"));
        for (let i = 0; i < additionallocal?.length; i++) {
            for (let k = 0; k < simalladditional?.length; k++) {
                if (additionallocal[i] === simalladditional[k]._id) {
                    let obj = {
                        name: simalladditional[k]?.featureName,
                        amount: simalladditional[k]?.featureAmount,
                    };
                    additionalobjectsendin.push(obj);
                    if (i + 1 === additionallocal?.length) {
                        additional += `${simalladditional[k].featureName}`;
                    } else {
                        additional += `${simalladditional[k].featureName},`;
                    }
                }
            }
        }

        for (let k = 0; k < selectdiscount?.length; k++) {
            for (let i = 0; i < alldiscounts?.length; i++) {
                if (selectdiscount[k] === alldiscounts[i]._id) {
                    let obj = {
                        name: alldiscounts[i]?.discountname,
                        amount: alldiscounts[i]?.amount,
                    };
                    discountobjectsendin.push(obj);
                    if (k + 1 === selectdiscount?.length) {
                        discount += `${alldiscounts[i].discountname}`;
                    } else {
                        discount += `${alldiscounts[i].discountname},`;
                    }
                }
            }
        }
    } else if (inventory === "WIRELESS DEVICE") {
        productName = "WIRELESS DEVICE";
        let selectdiscount = JSON.parse(localStorage.getItem("devicediscountobjectarray"));
        let alldiscounts = JSON.parse(localStorage.getItem("devicepricing"))?.selectdiscount;
        oneTimeCharge = JSON.parse(localStorage.getItem("devicepricing"))?.oneTimeCharge;
        applyLateFee = JSON.parse(localStorage.getItem("devicepricing"))?.applyLateFee;
        dueDate = JSON.parse(localStorage.getItem("devicepricing"))?.dueDate;
        let devicealladditional = JSON.parse(localStorage.getItem("devicepricing"))?.additionalFeature;
        let additionallocal = JSON.parse(localStorage.getItem("deviceadditionalfeaturearray"));
        for (let i = 0; i < additionallocal?.length; i++) {
            for (let k = 0; k < devicealladditional?.length; k++) {
                if (additionallocal[i] === devicealladditional[k]._id) {
                    let obj = {
                        name: devicealladditional[k]?.featureName,
                        amount: devicealladditional[k]?.featureAmount,
                    };
                    additionalobjectsendin.push(obj);
                    if (i + 1 === additionallocal?.length) {
                        additional += `${devicealladditional[k].featureName}`;
                    } else {
                        additional += `${devicealladditional[k].featureName},`;
                    }
                }
            }
        }
        for (let k = 0; k < selectdiscount?.length; k++) {
            for (let i = 0; i < alldiscounts?.length; i++) {
                if (selectdiscount[k] === alldiscounts[i]._id) {
                    let obj = {
                        name: alldiscounts[i]?.discountname,
                        amount: alldiscounts[i]?.amount,
                    };
                    discountobjectsendin.push(obj);
                    if (k + 1 === selectdiscount?.length) {
                        discount += `${alldiscounts[i].discountname}`;
                    } else {
                        discount += `${alldiscounts[i].discountname},`;
                    }
                }
            }
        }
    }

    const handleSign = () => {
        setChecked(true);
    };
    const postDataWithinvoice = () => {
        setIsLoading(true);
        const dataToSend = {
            csr: csr,
            userId: _id,
            isWithInvoice: paymentInfo?.prospectwithinvoice,
            isWithoutInvoice: paymentInfo?.prospectwithoutinvoice,
        };

        Axios.post(`${BASE_URL}/api/user/prepaidHandOver`, dataToSend)
            .then(() => {
                let dataToSend = {
                    customerId: paymentInfo.customerid,
                    invoiceType: "Sign Up",
                    totalAmount: paymentInfo.totalamount,
                    additionalCharges: additionalobjectsendin,
                    discount: discountobjectsendin,
                    amountPaid: 0,
                    selectProduct: paymentInfo.billId,
                    invoiceDueDate: dueDate,
                    lateFee: applyLateFee,
                    invoiceOneTimeCharges: oneTimeCharge,
                    invoiceStatus: "Unpaid",
                    planId: paymentInfo?.plan,
                    planName: planname,
                    planCharges: plancharges,
                    chargingType: "monthly",
                    invoicePaymentMethod: "Credit/Debit Card",
                    printSetting: "Both",
                    isInvoice: paymentInfo.prospectwithinvoice,
                    billingPeriod: {
                        from: "onActivation",
                        to: "onActivation",
                    },
                };
                const loginRes = localStorage.getItem("userData");
                const parseLoginRes = JSON.parse(loginRes);
                const data = {
                    serviceProvider: parseLoginRes?.company,
                    userId: parseLoginRes?._id,
                    customerId: paymentInfo?.customerid,
                    noteType: "Sign Up Plan Activation",
                    note: "Sign Up Plan  Activated Successfully",
                    priority: "medium",
                };
                Axios.post(`${BASE_URL}/api/web/invoices/prepaidgenerateInvoice`, dataToSend).then(() => {
                    Axios.post(`${BASE_URL}/api/web/notes/addnotifcationNote`, data)
                        .then(() => {
                            toast.current.show({ severity: "success", summary: "Sign Up Plan Note", detail: "Customer Plan Is Successfully Activated" });

                            setActiveIndex(3);
                        })
                        .catch((err) => {});
                    // toast.success("Label created Successfully");
                    setIsLoading(false);
                    setShowFinalComponent(true);
                    setFromIncomplete(false);
                    localStorage.setItem("comingfromincomplete", JSON.stringify(fromIncomplete));
                });
            })
            .catch((error) => {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            });
    };
    function ChangeIsoDateToECT(date) {
        // Given ISO formatted date/time
        const isoDate = date;

        // Convert ISO string to Date object
        const utcDate = new Date(isoDate);

        // Format the date according to Eastern Time Zone (EST/EDT)
        const estTimeString = utcDate.toLocaleString("en-US", {
            timeZone: "America/New_York",
        });
        return estTimeString;
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
                                if (localStorage.getItem("comingforedit")) {
                                    setActiveIndex(1);
                                } else {
                                    setActiveIndex(2);
                                }
                            }}
                        />
                        <Button label="Submit" onClick={localStorage.getItem("paymentstatus") ? postData : postDataWithinvoice} disabled={!isChecked} icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} />
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
                                    <p className="w-6">{previewInfo?.firstName?.toUpperCase() || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Service Address:</p>
                                    <p className="w-6">{previewInfo?.address1?.toUpperCase() || "-"}</p>
                                </div>

                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">State:</p>
                                    <p className="w-6">{previewInfo?.state?.toUpperCase() || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">DOB:</p>
                                    <p className="w-6">{formatDate(previewInfo?.DOB || "-")}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Telephone:</p>
                                    <p className="w-6">{previewInfo?.contact || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Discounts:</p>
                                    <p className="w-6"> {discount?.toUpperCase() || "-"}</p>
                                </div>

                                <div className="flex  border-bottom-2  pt-2">
                                    <p className="w-6 ml-4">Net Amount: </p>
                                    {/* <p className="w-6">{paymentInfo?.paid ? `$${paymentInfo.paid}` : "-"}</p> */}
                                    <p className="w-6">{paymentInfo?.totalamount ? `$${paymentInfo?.totalamount}` : "-"}</p>
                                </div>
                                <div className="flex  pt-2">
                                    <p className="w-6 ml-4">Inventory: </p>
                                    <p className="w-6">{(localStorage.getItem("product") || "-").toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="border-2 w-5 ">
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">LastName:</p>
                                    <p className="w-6">{previewInfo?.lastName.toUpperCase() || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">City:</p>
                                    <p style={{ marginLeft: "-10px" }}>{previewInfo?.city?.toUpperCase() || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Zip Code:</p>
                                    <p className="w-6">{previewInfo?.zip || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">SSN:</p>
                                    <p className="w-6">{previewInfo?.SSN || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Email:</p>
                                    <p className="w-6">{previewInfo?.email.toUpperCase() || "-"}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Plan:</p>
                                    <p className="w-6">{(planname || "-").toUpperCase()}</p>
                                </div>
                                <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Amount Paid: </p>
                                    <p className="w-6">{paymentInfo?.paid ? `$${paymentInfo.paid}` : "-"}</p>
                                </div>

                                {/*  <div className="flex border-bottom-2 pt-2">
                                    <p className="w-6 ml-4">Inventory:</p>
                                    <p className="w-6">{inventory}</p>
                                </div>     */}
                                <div className="flex  pt-2">
                                    <p className="w-6 ml-4">Additional Feature:</p>
                                    <p className="w-6">
                                        <div>
                                            <p className="inline">{additional.toUpperCase() || "-"}</p>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <br />
                        <br />
                        {zipRes ? (
                            <div className="flex">
                                <Checkbox inputId="cb1" value="New York" checked={isChecked} onClick={handleSign} onChange={(e) => setIsChecked(e.checked)}></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                    <p>
                                        I further consent to receive calls, emails and/or text messages that may deliver auto-dialed or pre-recorded messages from IJ Wireless, Inc or its duly appointed agent, either using my telephone number assigned by IJ Wireless, Inc or provided by me herein or
                                        later. I understand this is not a condition of purchase.
                                    </p>
                                    <p>
                                        I hereby give my informed consent to electronically sign this form, and I acknowledge that this electronic signature has the same legal effect as a handwritten signature. I understand that this action signifies my agreement to the terms and conditions outlined
                                        in this form and any related documents.
                                    </p>
                                    <br />
                                    {checked ? (
                                        <p>
                                            <strong>
                                                This form is electronically signed by <span> </span>
                                                <strong>
                                                    {previewInfo && previewInfo.firstName ? previewInfo.firstName.toUpperCase() : "Unknown"} {previewInfo && previewInfo.lastName ? previewInfo.lastName.toUpperCase() : "User"}
                                                </strong>{" "}
                                                <span> </span>
                                                on <span> </span> {ChangeIsoDateToECT(new Date().toISOString())}
                                            </strong>
                                        </p>
                                    ) : null}
                                </label>
                            </div>
                        ) : !zipRes && (parsefromIncompl == true || localStorage.getItem("comingforedit")) ? (
                            <div className="flex">
                                <Checkbox inputId="cb1" value="New York" checked={isChecked} onClick={handleSign} onChange={(e) => setIsChecked(e.checked)}></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                    <p>
                                        I further consent to receive calls, emails and/or text messages that may deliver auto-dialed or pre-recorded messages from IJ Wireless, Inc or its duly appointed agent, either using my telephone number assigned by IJ Wireless, Inc or provided by me herein or
                                        later. I understand this is not a condition of purchase.
                                    </p>
                                    <p>
                                        I hereby give my informed consent to electronically sign this form, and I acknowledge that this electronic signature has the same legal effect as a handwritten signature. I understand that this action signifies my agreement to the terms and conditions outlined
                                        in this form and any related documents.
                                    </p>
                                    <br />
                                    {checked ? (
                                        <p>
                                            <strong>
                                                This form is electronically signed by <span> </span>
                                                <strong>
                                                    {(previewInfo?.firstName).toUpperCase()} {(previewInfo?.lastName).toUpperCase()}
                                                </strong>
                                                <span> </span> on <span> </span> {ChangeIsoDateToECT(new Date().toISOString())}
                                            </strong>
                                        </p>
                                    ) : null}
                                </label>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            ) : (
                <Preview_Final_component enrollment_id={enrollment_id} />
            )}
        </>
    );
};

export default Preview;
