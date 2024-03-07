import { Button } from "primereact/button";
import html2canvas from "html2canvas";
import "./css/customer_invoice.css";
import { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";
import InvoiceTypes from "../InvoiceTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function CustomerInvoice({ userDetails, invoiceData, setIsLoading }) {
    // const [isLoading, setIsLoading] = useState(false);
    const downloadButtonRef = useRef();

    useEffect(() => {
        if (invoiceData !== undefined && invoiceData !== null) {
            downloadButtonRef.current.click();
            
        }
    }, [invoiceData]);

    const downloadInvoice = () => {
        setIsLoading(true);
        document.querySelector(".downloadtemp").style.width = "1050px";
        html2canvas(document.querySelector(".downloadtemp"), { scale: 1.5 }).then((canvas) => {
            const pdf = new jsPDF();
            // pdf.setFont("Roboto");
            const createdAtDate = new Date(invoiceData?.createdAt);
            const formattedDate = createdAtDate.toLocaleDateString();
            pdf.setFont("Roboto-Black-normal");
            pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
            pdf.save(`${formattedDate}-${userDetails?.lastName}-${userDetails?.accountId}.pdf`);
            setIsLoading(false);
        });
    };

    // Get role name  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const companyName = parseLoginRes?.companyName;
    const companyNameToCapital = companyName.toUpperCase();

    return (
        <div>
            <Button ref={downloadButtonRef} className="download-invoice" label="" onClick={downloadInvoice}></Button>
            {invoiceData && invoiceData.isAdHocInvoice ?
                <div className="flex flex-wrap justify-content-around  downloadtemp">
                    <div className="flex flex-column mb-5">
                        {companyNameToCapital.includes("ZISFONE") ?
                            <div className="ml-4">
                                <img className="mb-0  pt-4" src="/zisfonelogo.png" height="50" width="170" />
                                <h6 className="mt-0">170 Old Country Road, Suite 303, Mineola, NY, 11501</h6>
                            </div>
                            : <div className="ml-4">
                                <img className="mb-0  pt-4" src="/companyLogo2.png" height="80" width="200" />
                                <h6 className="mt-0">1755 Park Street, Suite 200, Naperville, IL, 60563</h6>
                            </div>}


                        <div className="customer-info line1">
                            <p className="font-semibold line3">{userDetails?.firstName} {userDetails?.lastName}</p>
                            <p className="font-semibold line3">{userDetails?.contact}</p>
                            <p className="font-semibold line3">{userDetails?.address1}{userDetails?.address2}</p>
                            <p className="font-semibold line3">{userDetails?.city}, {userDetails?.state}, {userDetails?.zip}</p>
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
                                    <p>{userDetails?.accountId}</p>
                                </div>
                                <div className="pl-2  flex remittancesec flex-wrap justify-content-between">
                                    <p>Invoice No</p>
                                    <p>{invoiceData?.invoiceNo}</p>
                                </div>
                                <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                                    <p>Invoice Date</p>
                                    <p>{invoiceData?.createdAt}</p>
                                </div>


                                <div className=" pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                    <p>Amount Paid</p>
                                    <p>${invoiceData?.amountPaid}</p>
                                </div>


                                <div className=" pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                    <p>Total Amount Due</p>
                                    <p>${invoiceData?.totalAmount}</p>
                                </div>


                                <div className=" pl-2 remittancesec  flex flex-wrap justify-content-between line1">
                                    <p>Due Date</p>
                                    <p>{invoiceData?.invoiceDueDate}</p>
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
                        <div className="topline" ></div>
                        <div className=" pl-2 font-bold flex flex-wrap justify-content-between line">
                            <p>Invoice Number</p>
                            <p>{invoiceData?.invoiceNo}</p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Customer Name</p>
                            <p>{userDetails?.firstName} {userDetails?.lastName}</p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Invoice Type</p>
                            <p> {invoiceData?.invoiceType}</p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Total Amount</p>
                            <p> ${invoiceData?.totalAmount}</p>
                        </div>
                        <div className="pl-2 w-full font-bold  flex flex-wrap justify-content-between line">
                            <p>Amount Paid</p>
                            <p> ${invoiceData?.amountPaid}</p>
                        </div>
                        <div className=" pl-2 font-bold flex flex-wrap justify-content-between line">

                            <p className="line">Due Date</p>
                            <p>{invoiceData?.invoiceDueDate}</p>
                        </div>

                        <div className="mt-3 pl-2 remittancesec font-bold flex flex-wrap justify-content-between " style={{ marginBottom: 250 }}>
                            <p>Total Amount Due</p>
                            <p>${invoiceData?.totalAmount}</p>
                        </div>


                    </div>
                </div>
                :
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
                            {userDetails?.firstName} {userDetails?.lastName}
                        </p>
                        <p className="font-semibold line3">{userDetails?.contact}</p>
                        <p className="font-semibold line3">
                            {userDetails?.address1}
                            {userDetails?.address2}
                        </p>
                        <p className="font-semibold line3">
                            {userDetails?.city}, {userDetails?.state} {userDetails?.zip}
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
                                <p>{userDetails?.accountId}</p>
                            </div>
                            <div className="pl-2  flex remittancesec flex-wrap justify-content-between">
                                <p>Invoice No</p>
                                <p>{invoiceData?.invoiceNo}</p>
                            </div>
                            <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                                <p>Invoice Date</p>
                                <p>{invoiceData?.createdAt}</p>
                            </div>

                            <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                                <p>Billing Period</p>
                                <p>{`${invoiceData?.billingPeriod?.from} / ${invoiceData?.billingPeriod?.to} `}</p>
                            </div>
                          
                                <div className=" pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                                    <p>Amount Paid</p>
                                    <p>${parseFloat(invoiceData?.amountPaid).toFixed(2)}</p>
                                </div>
                           
                            
                            <div className="pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
    <p>Total Amount Due</p>
    <p>${parseFloat(invoiceData?.netPrice).toFixed(2)}</p>
</div>

                            

                            <div className=" pl-2 remittancesec  flex flex-wrap justify-content-between line1">
                                <p>Due Date</p>
                                <p>{invoiceData?.invoiceDueDate}</p>
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
                        <p> {userDetails?.accountId}</p>
                    </div>
                    <div className="pl-2 w-full   flex flex-wrap justify-content-between line">
                        <p>Customer Name</p>
                        <p>
                            {userDetails?.firstName} {userDetails?.lastName}
                        </p>
                    </div>
                    <div className=" pl-2  remittancesec flex flex-wrap justify-content-between">
                        <p>Invoice Date</p>
                        <p>{invoiceData?.createdAt}</p>
                    </div>

                    <div className=" pl-2  flex flex-wrap justify-content-between line">
                        <p>Invoice Number</p>
                        <p>{invoiceData?.invoiceNo}</p>
                    </div>
                    <div className=" pl-2  flex flex-wrap justify-content-between line">
                        <p className="line">Due Date</p>
                        <p>{invoiceData?.invoiceDueDate}</p>
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
                    <div className=" pl-2 flex flex-wrap justify-content-between">
                        <p>Balance Forward</p>
                        <p>{`$${parseFloat(userDetails?.wallet).toFixed(2)}`}</p>
                    </div>
                    <div>
                        <p className="font-bold  mt-0 pt-1 pl-1">CURRENT SERVICES</p>
                        <div className="pl-2 w-full mt-2 flex flex-wrap justify-content-between line">
                            <p>Total Recurring Charges</p>
                            <p>${invoiceData?.recurringCharges}</p>
                        </div>

                        <div className="pl-2  flex flex-wrap justify-content-between ">
                            <p>One Time Charge</p>
                            <p>${userDetails?.invoiceOneTimeCharges}</p>
                        </div>
                        <div className="pl-2  flex flex-wrap justify-content-between ">
                            <p>Taxes and Surcharges</p>
                            <p>$0.00</p>
                        </div>
                        <h5 className="font-bold line2">CURRENT SERVICES</h5>
                        <div className="pl-2 w-full  mt-2 flex flex-wrap justify-content-between line ">
                            <p>Total Recurring Charges</p>
                            <p>${invoiceData?.recurringCharges}</p>
                        </div>
                        <div className="pl-2  flex flex-wrap justify-content-between ">
                            <p>One Time Charge</p>
                            <p>${userDetails?.invoiceOneTimeCharges}</p>
                        </div>
                        <div className="pl-2  flex flex-wrap justify-content-between ">
                            <p>Taxes and Surcharges</p>
                            <p>$0.00</p>
                        </div>
                    </div>

                    <div className="topline"></div>
                    <div className="mt-2 pl-2 remittancesec font-bold flex flex-wrap justify-content-between">
                        <p>Total Amount Due</p>
                        <p>${parseFloat(invoiceData?.netPrice).toFixed(2)}</p>
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
                                <td>{userDetails?.selectProduct}</td>

                                <td>${userDetails?.invoiceOneTimeCharges}</td>
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
                                <td>{userDetails?.currentPlan?.planName}</td>

                                <td>${userDetails?.currentPlan?.planCharges}</td>
                            </tr>
                            <tr>
                                <td>
                                    {userDetails?.currentPlan.additionalCharges.map((charge, index) => (
                                        <div key={index}>{charge.name}</div>
                                    ))}
                                </td>
                                <td>
                                    {userDetails?.currentPlan.additionalCharges.map((charge, index) => (
                                        <div key={index}>${charge.amount}</div>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {userDetails?.currentPlan.discount.map((discount, index) => (
                                        <div key={index}>{discount.name}</div>
                                    ))}
                                </td>
                                <td>
                                    {userDetails?.currentPlan.discount.map((discount, index) => (
                                        <div key={index}>-${discount.amount}</div>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex font-bold flex-row flex-wrap justify-content-between">
                        <p>Total Recurring Charges</p>
                        <p>${invoiceData?.recurringCharges}</p>
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
            }
        </div>
    );
}
