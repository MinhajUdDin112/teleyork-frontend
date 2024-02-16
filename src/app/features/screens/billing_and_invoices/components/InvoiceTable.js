import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";  
import {useState} from "react" 
import DialogeForAuthPayment from "./DialogeForAuthPayment";
import CustomerInvoice from "./customer_invoice/customer_invoice"
import "./css/invoicetable.css";  
import { Dialog } from "primereact/dialog";

const InvoiceTable = ({userDetails, invoiceData, onAPISuccess  }) => {
    const cardData = invoiceData;   
   
    const [singleInvoiceData,setInvoiceData]=useState()
    const [dialogeForAuthPayment,setdialogeForAuthPayment]=useState(false)
   
    const rowClassName = (rowData) => {
        // Example condition: apply different classes based on status
        if (rowData.invoiceStatus === "Paid") {
            return "text-blue-400";
        } 
         else {
            return "unpaid-invoice-red"; // No class
        }
    };

      // Get role name  from login response
      const loginRes = localStorage.getItem("userData");
      const parseLoginRes = JSON.parse(loginRes);
       const companyName = parseLoginRes?.companyName;
     const companyNameToCapital = companyName.toUpperCase();
       
     

    return (
        <div className="mx-4">
          
             <Dialog header={"Payment"} visible={dialogeForAuthPayment} style={{ width: "50vw" }} onHide={() => setdialogeForAuthPayment(false)}>
                        <DialogeForAuthPayment onAPISuccess ={onAPISuccess }  setdialogeForAuthPayment={setdialogeForAuthPayment} userDetails={userDetails} invoiceData={invoiceData}/>
                    </Dialog>
          
            <DataTable  
              size="small" 
              className="mt-4"
              stripedRows
              resizableColumns 
              emptyMessage="No Invoice found."
             value={cardData} rowClassName={rowClassName}>
                <Column
                    InvoiceTable
                    field="invoiceNo"
                    header="Invoice No."
                    
                    body={(rowData) => (
                        <span style={{ cursor: "pointer" }} >
                            {rowData?.invoiceNo}
                        </span>
                    )}
                />

                <Column field="invoiceType" header="Invoice Type"  />
                <Column field="invoiceOneTimeCharges" header="Invoice One Time Charges"  />
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
                <Column field="totalAmount" header="Total Amount"  />
                <Column field="amountPaid" header="Paid Amount"  />
                <Column field="lateFee" header="Late Fee"  />
                <Column field="invoiceDueDate" header="DueDate"  />
                <Column field="invoiceStatus" header="Status" body={(rowData)=>{
                            if(rowData.amountPaid=="0"){
return <p>Pending</p>
                            }
                            else if(rowData.amountPaid>"0" && rowData.dueAmount=="0"){
                                return <p>Partially Paid</p>
                            }
                            else {
                                return <p>Paid</p>
                            }

                }}  />
                <Column field="invoicePaymentMethod" header="Payment Method"  />
                <Column
                    field="BillingPeriod"
                    header="Billing Period"
                    body={(rowData) => {
                       
                        let billingperiod = "From :" + rowData.billingPeriod.from + "," + " To:" + rowData.billingPeriod.to;

                        return <p>{billingperiod}</p>;
                    }}
                    style={{ minWidth: "350px" }}
                />
              {  companyNameToCapital.includes("ZISFONE") ?  <Column
                    field="Action"
                    body={
                        <Button className="bg-green-700 pl-2 pr-2 pt-1 pb-1 border-none" onClick={() => setdialogeForAuthPayment(true)}>
                            Payment
                        </Button>
                    }
                    header="Payment"
                    style={{ minWidth: "250px" }}
                />:""}
                 

                <Column
                    field="Action"
                    body={
                        <Button className="bg-green-400 rounded-none pl-2 pr-2 pt-2 pl-3 pr-3  pb-2 border-none" >
                            Void
                        </Button>
                    }
                    header="Download "
                    
                />
                <Column
                    field="Invoice Refund"
                    body={
                        <Button className="bg-green-400  pr-2 pt-2 pl-3 pr-3  pb-2 border-none" >
                            Refund{" "}
                        </Button>
                    }
                    header="Invoice Refund"
                    
                />
                <Column
                    field="Invoice_Ebill"
                    body={
                        <Button className="bg-green-400 pr-2 pt-2 pl-3 pr-3  pb-2 border-none" >
                            Ebill{" "}
                        </Button>
                    }
                    header="Invoice EBill"
                    
                />

                <Column
                    field="Invoice_Pdf"
                    body={ 
                          (rowData)=>{ 
                            return (
                        <Button className="bg-green-400   pr-2 pt-2 pl-3 pr-3  pb-2 border-none" onClick={() => {setInvoiceData(rowData)}}>
                            Download{" "}
                        </Button>  
                            )
                          }
                    }
                    header="Invoice Pdf"
                    
                /> 
                
            </DataTable>  
           <CustomerInvoice  userDetails={userDetails} invoiceData={singleInvoiceData} />
        </div>
    );
};

export default InvoiceTable;
