import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import DialogeForAuthPayment from "./DialogeForAuthPayment";
import CustomerInvoice from "./customer_invoice/customer_invoice";
import "./css/invoicetable.css";
import { Dialog } from "primereact/dialog";
import CustomerInvoicePrepaid from "./customer_invoice/customer_invoice_prepaid";
import PaymentStripModule from "./dialog/stripe_payment";
const InvoiceTable = ({ setRefresh, userDetails, invoiceData }) => {
    const cardData = invoiceData;
    const [isLoading, setIsLoading] = useState(false);
    const [singleInvoiceData, setInvoiceData] = useState();
    const [dialogeForAuthPayment, setdialogeForAuthPayment] = useState(false);
    const [invoiceId, setInvoiceId] = useState();
    const [dueAmount, setdueAmount] = useState();

    const rowClassName = (rowData) => {
        // Example condition: apply different classes based on status
        if (rowData.invoiceStatus === "Paid" || rowData.invoiceStatus === "Partially Paid" || rowData.invoiceStatus === "Partial") {
            if (rowData.invoiceStatus === "Paid") {
                return "text-blue-400";
            } else {
                return "partialpaidinvoice";
            }
        } else {
            return "unpaid-invoice-red"; // No class
        }
    };
    // Get role name  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const companyName = parseLoginRes?.companyName;
    const companyNameToCapital = companyName.toUpperCase();
    const [paymentDialogVisibility, setPaymentDialogVisibility] = useState(false);
    function convertDateToRequiredFormat(inputDate) {
        // Create a new Date object from the input string
        var originalDate = new Date(inputDate);
        // Extract the components of the date
        var year = originalDate.getFullYear();
        var month = ("0" + (originalDate.getMonth() + 1)).slice(-2);
        var day = ("0" + originalDate.getDate()).slice(-2);
        var hours = ("0" + originalDate.getHours()).slice(-2);
        var minutes = ("0" + originalDate.getMinutes()).slice(-2);
        var seconds = ("0" + originalDate.getSeconds()).slice(-2);

        // Create a new date string in the desired format
        var newDateString = `${year}-${month}-${day}`;

        return newDateString;
    }
    return (
        <div className="mx-4">
            <Dialog header={"Payment"} visible={dialogeForAuthPayment} style={{ width: "50vw" }} onHide={() => setdialogeForAuthPayment(false)}>
                <DialogeForAuthPayment dueAmount={dueAmount} setdialogeForAuthPayment={setdialogeForAuthPayment} invoiceId={invoiceId} userDetails={userDetails} invoiceData={invoiceData} />
            </Dialog>
            <Dialog className="stripe-dialog-width" header="Stripe Payment" visible={paymentDialogVisibility} onHide={() => setPaymentDialogVisibility(false)}>
                <PaymentStripModule setRefresh={setRefresh} dueAmount={dueAmount} userDetails={userDetails} setPaymentDialogVisibility={setPaymentDialogVisibility} invoiceId={invoiceId} />
            </Dialog>
            <DataTable size="small" className="mt-4" stripedRows resizableColumns emptyMessage="No Invoice found." value={cardData} rowClassName={rowClassName}>
                <Column InvoiceTable field="invoiceNo" header="Invoice No." body={(rowData) => <span style={{ cursor: "pointer" }}>{rowData?.invoiceNo}</span>} />

                <Column field="invoiceType" header="Invoice Type" />
                <Column field="invoiceOneTimeCharges" header="Invoice One Time Charges" />
                <Column
                    field="additionalCharges"
                    header="Additional Charges"
                    body={(rowData) => {
                        let additional = "";
                        for (let i = 0; i < rowData?.additionalCharges.length; i++) {
                            if (i + 1 === rowData?.additionalCharges.length) {
                                let name = rowData?.additionalCharges[i].name + ":" + rowData.additionalCharges[i].amount;
                                additional += name;
                            } else {
                                let name = rowData?.additionalCharges[i].name + ":" + rowData.additionalCharges[i].amount + ",";
                                additional += name;
                            }
                        }
                        return <p>{additional}</p>;
                    }}
                />
                <Column
                    field="discount"
                    header="Discounts"
                    body={(rowData) => {
                        let discount = "";
                        for (let i = 0; i < rowData?.discount.length; i++) {
                            if (i + 1 === rowData.discount.length) {
                                let name = rowData.discount[i].name + ":" + rowData.discount[i].amount;
                                discount += name;
                            } else {
                                let name = rowData.discount[i].name + ":" + rowData.discount[i].amount + ",";
                                discount += name;
                            }
                        }
                        return <p>{discount}</p>;
                    }}
                />
                <Column field="planCharges" header="Plan Charges" />
                <Column field="totalAmount" header="Total Amount" body={(rowData) => parseFloat(rowData.totalAmount).toFixed(2)} />
                <Column field="amountPaid" header="Paid Amount" body={(rowData) => parseFloat(rowData.amountPaid).toFixed(2)} />

                <Column field="lateFee" header="Late Fee" />
                <Column
                    field="invoiceDueDate"
                    header="DueDate"
                    body={(rowData) => {
                        return <p>{convertDateToRequiredFormat(rowData?.invoiceDueDate)}</p>;
                    }}
                />
                {/* <Column field="invoiceStatus" header="Status" body={(rowData)=>{
                            if (parseFloat(rowData.amountPaid) === 0) {
                                return <p>Pending</p>;
                            } else if ( parseFloat(rowData.dueAmount) === 0) {
                                return <p>Paid</p>;
                            } else if (parseFloat(rowData.amountPaid) > 0 && parseFloat(rowData.dueAmount) > 0) {
                                return <p>Partially Paid</p>;
                            } else {
                                return <p>Pending</p>;
                            }
                            

                }}  /> */}
                <Column field="invoicePaymentMethod" header="Payment Method" />
                {/* {
                    invoiceData?.isAdHocInvoice ?    
                    <Column
                    field="NO"
                    header="Billing Period"
                   
                /> :
                    <Column
                    field="BillingPeriod"
                    header="Billing Period"
                    body={(rowData) => {
                       
                        let billingperiod = "From :" + rowData?.billingPeriod?.from + "," + " To:" + rowData?.billingPeriod?.to;

                        return <p>{billingperiod}</p>;
                    }}
                    style={{ minWidth: "350px" }}
                />
                } */}

                {companyNameToCapital.includes("ZISFONE") ? (
                    <Column
                        field="Action"
                        body={(rowData) => (
                            <Button
                                className="bg-green-700 pl-2 pr-2 pt-1 pb-1 border-none"
                                onClick={() => {
                                    setdialogeForAuthPayment(true);
                                    setInvoiceId(rowData?._id);
                                    setdueAmount(rowData?.netPrice);
                                }}
                            >
                                Payment
                            </Button>
                        )}
                        header="Payment"
                        style={{ minWidth: "250px" }}
                    />
                ) : companyNameToCapital.includes("IJ") ? (
                    <Column
                        field="Action"
                        body={(rowData) => (
                            <Button
                                className="bg-green-700 pl-2 pr-2 pt-1 pb-1 border-none"
                                onClick={() => {
                                    setPaymentDialogVisibility(true);
                                    setInvoiceId(rowData?._id);
                                    setdueAmount(rowData?.netPrice);
                                }}
                            >
                                Payment
                            </Button>
                        )}
                        header="Payment"
                        style={{ minWidth: "250px" }}
                    />
                ) : undefined}

                <Column field="Action" body={<Button className="bg-green-400 rounded-none pl-2 pr-2 pt-2 pr-3  pb-2 border-none">Void</Button>} header="Void " />
                <Column field="Invoice Refund" body={<Button className="bg-green-400  pr-2 pt-2 pl-3 pr-3  pb-2 border-none">Refund </Button>} header="Invoice Refund" />
                <Column field="Invoice_Ebill" body={<Button className="bg-green-400 pr-2 pt-2 pl-3 pr-3  pb-2 border-none">Ebill </Button>} header="Invoice EBill" />
                {/* icon={isLoading ? "pi pi-spin pi-spinner" : ""} */}
                <Column
                    field="Invoice_Pdf"
                    body={(rowData) => (
                        <Button
                            className="bg-green-700 pr-2 pt-2 pl-3 pr-3 pb-2 border-none ml-2"
                            onClick={() => {
                                setInvoiceData(rowData);
                            }}
                            disabled={isLoading}
                        >
                            Download
                        </Button>
                    )}
                    header="Invoice Pdf"
                />
            </DataTable>
            {userDetails?.accountType === "Prepaid" ? <CustomerInvoicePrepaid userDetails={userDetails} invoiceData={singleInvoiceData} setIsLoading={setIsLoading} /> : <CustomerInvoice userDetails={userDetails} invoiceData={singleInvoiceData} setIsLoading={setIsLoading} />}
        </div>
    );
};

export default InvoiceTable;
