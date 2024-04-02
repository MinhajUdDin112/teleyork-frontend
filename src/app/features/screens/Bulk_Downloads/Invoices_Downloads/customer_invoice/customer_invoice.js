import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSZip from "jszip";
import Axios from "axios";
import { saveAs } from "file-saver";
import "./css/customer_invoice.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function CustomerInvoice({ userId, invoicesData, setShowInvoice }) {
    console.log("user id is ", userId);
    const [userData, setUserData] = useState(null);
    const [isDataReady, setIsDataReady] = useState(false);
    const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(0);
    const downloadButtonRef = useRef(null);

    useEffect(() => {
        // Fetch user data when the component mounts
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    useEffect(() => {
        // When both user data and invoices data are available, set isDataReady to true
        if (userData && invoicesData && invoicesData.length > 0) {
            setIsDataReady(true);
        }
    }, [userData, invoicesData]);

    const fetchUserData = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${userId}`);
            setUserData(response?.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        // Start downloading when data is ready
        if (isDataReady && currentInvoiceIndex < invoicesData.length) {
            downloadButtonRef.current.click();
        }
        return () => {};
    }, [isDataReady, currentInvoiceIndex]);

    const downloadInvoicesInZip = async () => {
        try {
            const zip = new JSZip();

            for (let i = 0; i < invoicesData.length; i++) {
                const invoice = invoicesData[i];
                document.querySelector(".downloadtemp").style.width = "1050px";
                const canvas = await html2canvas(document.querySelector(".downloadtemp"), { scale: 1.5 });
                const pdf = new jsPDF();
                const createdAtDate = new Date(invoice.createdAt);
                const formattedDate = createdAtDate.toLocaleDateString();
                pdf.setFont("Roboto-Black-normal");
                pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
                const pdfData = pdf.output("blob");
                zip.file(`${formattedDate}-${userData?.data?.lastName}-${userData?.data?.accountId}-${i}.pdf`, pdfData);
            }

            const zipFileName = `invoices.zip`;
            const zipContent = await zip.generateAsync({ type: "blob" });
            saveAs(zipContent, zipFileName);

            setShowInvoice(false);
        } catch (error) {
            console.error("Error generating or downloading zip file:", error);
        }
    };

    const downloadInvoice = async (invoice) => {
        try {
            // Increment the current invoice index using the functional form
            if (currentInvoiceIndex + 1 === invoicesData.length) {
                await downloadInvoicesInZip();
            }
            setCurrentInvoiceIndex((prevIndex) => prevIndex + 1);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const companyName = parseLoginRes?.companyName;
    const companyNameToCapital = companyName.toUpperCase();

    return (
        <div>
            {invoicesData && invoicesData.map((invoice, index) => <Button key={index} className="download-invoice" ref={downloadButtonRef} label="" onClick={() => downloadInvoice(invoice)}></Button>)}
            {invoicesData && invoicesData.isAdHocInvoice ? (
                <div className="flex flex-wrap justify-content-around  downloadtemp">
                    <div className="flex flex-column mb-5">
                        {companyNameToCapital.includes("ZISFONE") ? (
                            <div className="ml-4">
                                <img className="mb-0  pt-4" src="/zisfonelogo.png" height="50" width="170" />
                                <h6 className="mt-0">170 Old Country Road, Suite 303, Mineola, NY, 11501</h6>
                            </div>
                        ) : (
                            <div className="ml-4">
                                <img className="mb-0  pt-4" src="/companyLogo2.png" height="80" width="200" />
                                <h6 className="mt-0">1755 Park Street, Suite 200, Naperville, IL, 60563</h6>
                            </div>
                        )}

                        <div className="customer-info line1">
                            <p className="font-semibold line3">
                                {userData?.data?.firstName} {userData?.data?.lastName}
                            </p>
                            <p className="font-semibold line3">{userData?.data?.contact}</p>
                            <p className="font-semibold line3">
                                {userData?.data?.address1} {userData?.data?.address2}
                            </p>
                            <p className="font-semibold line3">
                                {userData?.data?.city}, {userData?.data?.state}, {userData?.data?.zip}
                            </p>
                        </div>
                    </div>

                    <div className="center-linetop">
                        <hr />
                    </div>
                    <div className="mt-4 companyremittance">
                        <div>
                            <div className="topline"></div>
                            <h6 className="remittancehead font-bold">Remittance Section</h6>
                            <div className="bottomline"></div>
                            <div className="remittance-wrapper">
                                <div className="pl-2 w-full remittancesec  flex flex-wrap justify-content-between">
                                    <p>Account No</p>
                                    <p>{userData?.data?.accountId}</p>
                                </div>
                                <div className="pl-2  flex remittancesec flex-wrap justify-content-between">
                                    <p>Invoice No</p>
                                    <p>{invoicesData[currentInvoiceIndex]?.invoiceNo}</p>
                                </div>
                                <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                                    <p>Invoice Date</p>
                                    <p>{invoicesData[currentInvoiceIndex]?.createdAt}</p>
                                </div>

                                <div className=" pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                    <p>Amount Paid</p>
                                    <p>${invoicesData[currentInvoiceIndex]?.amountPaid}</p>
                                </div>

                                <div className=" pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                    <p>Total Amount Due</p>
                                    <p>${invoicesData[currentInvoiceIndex]?.totalAmount}</p>
                                </div>

                                <div className=" pl-2 remittancesec  flex flex-wrap justify-content-between line1">
                                    <p>Due Date</p>
                                    <p>{invoicesData[currentInvoiceIndex]?.invoiceDueDate}</p>
                                </div>
                            </div>

                            <p className="text-center">
                                Please make checks payable to: <span className="company">{companyName}</span>
                            </p>

                            <div className="remittancebottom"></div>
                        </div>
                    </div>
                    <p className="w-full text-center">
                        Please detach top portion and return with payment. <strong className="company">I</strong>mportant
                    </p>
                    <div className="dashed-line"></div>
                    <div className="account-summary mt-4 ">
                        <p className="text-center font-bold line4">Invoice Details</p>
                        <div className="topline"></div>
                        <div className=" pl-2 font-bold flex flex-wrap justify-content-between line">
                            <p>Invoice Number</p>
                            <p>{invoicesData[currentInvoiceIndex]?.invoiceNo}</p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Customer Name</p>
                            <p>
                                {userData?.data?.firstName} {userData?.data?.lastName}
                            </p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Invoice Type</p>
                            <p> {invoicesData[currentInvoiceIndex]?.invoiceType}</p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Total Amount</p>
                            <p> ${invoicesData[currentInvoiceIndex]?.totalAmount}</p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Amount Paid</p>
                            <p> ${invoicesData[currentInvoiceIndex]?.amountPaid}</p>
                        </div>
                        <div className=" pl-2 font-bold flex flex-wrap justify-content-between line">
                            <p className="line">Due Date</p>
                            <p>{invoicesData[currentInvoiceIndex]?.invoiceDueDate}</p>
                        </div>

                        <div className="mt-3 pl-2 remittancesec font-bold flex flex-wrap justify-content-between " style={{ marginBottom: 250 }}>
                            <p>Total Amount Due</p>
                            <p>${invoicesData[currentInvoiceIndex]?.totalAmount}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap justify-content-around  downloadtemp">
                    <div className="flex flex-column mb-5">
                        {companyNameToCapital.includes("ZISFONE") ? (
                            <div className="ml-4">
                                <img className="mb-0  pt-4" src="/zisfonelogo.png" height="50" width="170" />
                                <h6 className="mt-0">170 Old Country Road, Suite 303, Mineola, NY 11501</h6>
                            </div>
                        ) : (
                            <div className="ml-4">
                                <img className="mb-0  pt-4" src="/companyLogo2.png" height="80" width="200" />
                                <h6 className="mt-0">1755 Park Street, Suite 200, Naperville, IL 60563</h6>
                            </div>
                        )}

                        <div className="customer-info mt-3 line1">
                            <p className="font-semibold line3">
                                {userData?.data?.firstName} {userData?.data?.lastName}
                            </p>
                            <p className="font-semibold line3">{userData?.data?.contact}</p>
                            <p className="font-semibold line3">
                                {userData?.data?.address1} {userData?.data?.address2}
                            </p>
                            <p className="font-semibold line3">
                                {userData?.data?.city}, {userData?.data?.state} {userData?.data?.zip}
                            </p>
                        </div>
                    </div>

                    <div className="center-linetop">
                        <hr />
                    </div>
                    <div className="mt-4 companyremittance">
                        <div>
                            <div className="topline"></div>
                            <h6 className="remittancehead font-bold">Remittance Section</h6>
                            <div className="bottomline"></div>
                            <div className="remittance-wrapper">
                                <div className="pl-2 w-full remittancesec  flex flex-wrap justify-content-between">
                                    <p>Account No</p>
                                    <p>{userData?.data?.accountId}</p>
                                </div>
                                <div className="pl-2  flex remittancesec flex-wrap justify-content-between">
                                    <p>Invoice No</p>
                                    <p>{invoicesData[currentInvoiceIndex]?.invoiceNo}</p>
                                </div>
                                <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                                    <p>Invoice Date</p>
                                    <p>{invoicesData[currentInvoiceIndex]?.createdAt}</p>
                                </div>

                                <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                                    <p>Billing Period</p>
                                    <p>{`${invoicesData[currentInvoiceIndex]?.billingPeriod?.from} / ${invoicesData[currentInvoiceIndex]?.billingPeriod?.to} `}</p>
                                </div>

                                <div className=" pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                    <p>Amount Paid</p>
                                    <p>${parseFloat(invoicesData[currentInvoiceIndex]?.amountPaid).toFixed(2)}</p>
                                </div>

                                <div className="pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                    <p>Total Amount Due</p>
                                    <p>${parseFloat(invoicesData[currentInvoiceIndex]?.netPrice).toFixed(2)}</p>
                                </div>

                                <div className=" pl-2 remittancesec  flex flex-wrap justify-content-between line1">
                                    <p>Due Date</p>
                                    <p>{invoicesData[currentInvoiceIndex]?.invoiceDueDate}</p>
                                </div>
                            </div>

                            <p className="text-center">
                                Please make checks payable to: <span className="company">{companyName}</span>
                            </p>

                            <div className="remittancebottom"></div>
                        </div>
                    </div>
                    <p className="w-full text-center mt-4">
                        Please detach top portion and return with payment. <strong className="company">I</strong>mportant
                    </p>
                    <div className="dashed-line"></div>
                    <div className="account-summary mt-4 ">
                        <p className="text-center font-bold line2">ACCOUNT SUMMARY</p>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Account No</p>
                            <p> {userData?.data?.accountId}</p>
                        </div>
                        <div className="pl-2 w-full   flex flex-wrap justify-content-between line">
                            <p>Customer Name</p>
                            <p>
                                {userData?.data?.firstName} {userData?.data?.lastName}
                            </p>
                        </div>
                        <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                            <p>Invoice Date</p>
                            <p>{invoicesData[currentInvoiceIndex]?.createdAt}</p>
                        </div>

                        <div className=" pl-2  flex flex-wrap justify-content-between line">
                            <p>Invoice Number</p>
                            <p>{invoicesData[currentInvoiceIndex]?.invoiceNo}</p>
                        </div>
                        <div className=" pl-2  flex flex-wrap justify-content-between line">
                            <p className="line">Due Date</p>
                            <p>{invoicesData[currentInvoiceIndex]?.invoiceDueDate}</p>
                        </div>
                        <p className="mt-4 pt-4 pl-1 font-bold ">ACCOUNT DETAILS</p>
                        <div className="pl-2 w-full mt-2  flex flex-wrap justify-content-between line">
                            <p>Previous Balance</p>
                            <p> $0.00</p>
                        </div>
                        <div className="pl-2  flex flex-wrap justify-content-between line">
                            <p>Payment Received On Account</p>
                            <p>$0.00</p>
                        </div>
                        <div className="pl-2 flex flex-wrap justify-content-between">
                            <p>Balance Forward</p>
                            <p>{`$${userData?.data?.wallet !== undefined ? parseFloat(userData.wallet).toFixed(2) : "0"}`}</p>
                        </div>

                        <div>
                            <p className="font-bold  mt-0 pt-1 pl-1">CURRENT SERVICES</p>
                            <div className="pl-2 w-full mt-2 flex flex-wrap justify-content-between line">
                                <p>Total Recurring Charges</p>
                                <p>${invoicesData[currentInvoiceIndex]?.recurringCharges}</p>
                            </div>

                            <div className="pl-2  flex flex-wrap justify-content-between ">
                                <p>One Time Charge</p>
                                <p>${userData?.data?.invoiceOneTimeCharges}</p>
                            </div>
                            <div className="pl-2  flex flex-wrap justify-content-between ">
                                <p>Taxes and Surcharges</p>
                                <p>$0.00</p>
                            </div>
                            <h5 className="font-bold line2">CURRENT SERVICES</h5>
                            <div className="pl-2 w-full  mt-2 flex flex-wrap justify-content-between line ">
                                <p>Total Recurring Charges</p>
                                <p>${invoicesData[currentInvoiceIndex]?.recurringCharges}</p>
                            </div>
                            <div className="pl-2  flex flex-wrap justify-content-between ">
                                <p>One Time Charge</p>
                                <p>${userData?.data?.invoiceOneTimeCharges}</p>
                            </div>
                            <div className="pl-2  flex flex-wrap justify-content-between ">
                                <p>Taxes and Surcharges</p>
                                <p>$0.00</p>
                            </div>
                        </div>

                        <div className="topline"></div>
                        <div className="mt-2 pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                            <p>Total Amount Due</p>
                            <p>${parseFloat(invoicesData[currentInvoiceIndex]?.netPrice).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="center-line">
                        <hr />
                    </div>
                    <div className="recurring-charges mt-4">
                        <h6 className="text-left font-bold">One time Charges</h6>
                        <div className="bottomline"></div>
                        <table className="onetimecharges">
                            <thead>
                                <tr>
                                    <td>Description</td>

                                    <td>Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userData?.data?.selectProduct}</td>

                                    <td>${userData?.data?.invoiceOneTimeCharges}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h6 className="text-left font-bold mt-3">Recurring Charges:</h6>
                        <div className="bottomline"></div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Description</td>
                                    <td>Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userData?.data?.currentPlan?.planName}</td>

                                    <td>${userData?.data?.currentPlan?.planCharges}</td>
                                </tr>
                                <tr>
                                    <td>
                                        {userData?.data?.currentPlan.additionalCharges.map((charge, index) => (
                                            <div key={index}>{charge.name}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {userData?.data?.currentPlan.additionalCharges.map((charge, index) => (
                                            <div key={index}>${charge.amount}</div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {userData?.data?.currentPlan.discount.map((discount, index) => (
                                            <div key={index}>{discount.name}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {userData?.data?.currentPlan.discount.map((discount, index) => (
                                            <div key={index}>-${discount.amount}</div>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex font-bold flex-row flex-wrap justify-content-between">
                            <p>Total Recurring Charges</p>
                            <p>${invoicesData[currentInvoiceIndex]?.recurringCharges}</p>
                        </div>
                        <div className="topline"></div>
                        <h6 className="font-bold">Regulatory Taxes and Surcharges: </h6>
                        <div className="bottomline"></div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Description</td>
                                    <td>$Amount</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>City Sales Tax </td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td> Dallad Mta</td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td>Fedral Cost Recovery Charge </td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td>Fedral Cost Recovery Fee </td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td>Fedral Excise Tax </td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td>Fedral Universal Service Fee </td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td>State Sales Tax </td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td>TX Universal Service </td>
                                    <td>0.00</td>
                                </tr>
                                <tr className="font-bold">
                                    <td>Total Regulatory Taxes and Surcharges </td>
                                    <td>0.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
