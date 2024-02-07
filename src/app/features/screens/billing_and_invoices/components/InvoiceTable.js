import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";  
import {useState} from "react"
import CustomerInvoice from "./customer_invoice/customer_invoice"
import "./css/invoicetable.css";  
const InvoiceTable = ({ setDetailedTransactionModal,userDetails, invoiceData }) => {
    const cardData = invoiceData;  
    const [singleInvoiceData,setInvoiceData]=useState()
    const handleCellClick = () => {
        setDetailedTransactionModal(true);
    };
    const rowClassName = (rowData) => {
        // Example condition: apply different classes based on status
        if (rowData.invoiceStatus === "Paid") {
            return "paid-invoice";
        } else {
            return "unpaid-invoice"; // No class
        }
    };
    return (
        <div className="mx-4">
            <DataTable value={cardData} rowClassName={rowClassName}>
                <Column
                    InvoiceTable
                    field="invoiceNo"
                    header="Invoice No."
                    style={{ minWidth: "250px" }}
                    body={(rowData) => (
                        <span style={{ cursor: "pointer" }} onClick={() => handleCellClick()}>
                            {rowData?.invoiceNo}
                        </span>
                    )}
                />

                <Column field="invoiceType" header="Invoice Type" style={{ minWidth: "250px" }} />
                <Column field="invoiceOneTimeCharges" header="Invoice One Time Charges" style={{ minWidth: "250px" }} />
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
                    style={{ minWidth: "350px" }}
                />
                <Column
                    field="discount"
                    header="Discounts"
                    style={{ minWidth: "250px" }}
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
                <Column field="planCharges" header="Plan Charges" style={{ minWidth: "250px" }} />
                <Column field="totalAmount" header="Total Amount" style={{ minWidth: "250px" }} />
                <Column field="amountPaid" header="Paid Amount" style={{ minWidth: "250px" }} />
                <Column field="lateFee" header="Late Fee" style={{ minWidth: "250px" }} />
                <Column field="invoiceDueDate" header="DueDate" style={{ minWidth: "250px" }} />
                <Column field="invoiceStatus" header="Status" style={{ minWidth: "250px" }} />
                <Column field="invoicePaymentMethod" header="Payment Method" style={{ minWidth: "250px" }} />
                <Column
                    field="BillingPeriod"
                    header="Billing Period"
                    body={(rowData) => {
                        console.log(rowData.billingPeriod);
                        let billingperiod = "From :" + rowData.billingPeriod.from + "," + " To:" + rowData.billingPeriod.to;

                        return <p>{billingperiod}</p>;
                    }}
                    style={{ minWidth: "350px" }}
                />

                <Column
                    field="Action"
                    body={
                        <Button className="bg-green-700 pl-2 pr-2 pt-1 pb-1 border-none" onClick={() => setDetailedTransactionModal(true)}>
                            Void
                        </Button>
                    }
                    header="Download "
                    style={{ minWidth: "250px" }}
                />
                <Column
                    field="Invoice Refund"
                    body={
                        <Button className="bg-green-700 pl-2 pr-2 pt-1 pb-1 border-none" onClick={() => setDetailedTransactionModal(true)}>
                            Refund{" "}
                        </Button>
                    }
                    header="Invoice Refund"
                    style={{ minWidth: "250px" }}
                />
                <Column
                    field="Invoice_Ebill"
                    body={
                        <Button className="bg-green-700 pl-2 pr-2 pt-1 pb-1 border-none" onClick={() => setDetailedTransactionModal(true)}>
                            Ebill{" "}
                        </Button>
                    }
                    header="Invoice EBill"
                    style={{ minWidth: "250px" }}
                />

                <Column
                    field="Invoice_Pdf"
                    body={ 
                          (rowData)=>{ 
                            return (
                        <Button className="bg-green-700  pl-2 pr-2 pt-1 pb-1 border-none" onClick={() => {setInvoiceData(rowData)}}>
                            Download{" "}
                        </Button>  
                            )
                          }
                    }
                    header="Invoice Pdf"
                    style={{ minWidth: "250px" }}
                /> 
                
            </DataTable>  
           <CustomerInvoice userDetails={userDetails} invoiceData={singleInvoiceData} />
        </div>
    );
};

export default InvoiceTable;
