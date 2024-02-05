import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const InvoiceTable = ({ setDetailedTransactionModal,invoiceData }) => {
    const cardData = invoiceData
    const handleCellClick = () => {
        setDetailedTransactionModal(true);
    };

    return (
        <div className="mx-4">
            <DataTable value={cardData} showGridlines>
                <Column
                    InvoiceTable
                    field="invoiceNumber"
                    header="Invoice No."
                    style={{ minWidth: "150px" }}
                    body={(rowData) => (
                        <span style={{ cursor: "pointer" }} onClick={() => handleCellClick()}>
                            {rowData.invoiceNumber}
                        </span>
                    )}
                />
                <Column field="type" header="Type" style={{ minWidth: "150px" }} />
                <Column field="Debit" header="Debit" style={{ minWidth: "150px" }} />
                <Column field="Tax" header="Tax" style={{ minWidth: "150px" }} />
                <Column field="Processing Fee" header="Processing" style={{ minWidth: "150px" }} />
                <Column field="Invoice Balance" header="Inv Balance" style={{ minWidth: "150px" }} />
                <Column field="Amount Paid" header="Amount Paid" style={{ minWidth: "150px" }} />
                <Column field="Total Dues" header="Total Dues" style={{ minWidth: "150px" }} />
                <Column field="From Date" header="From Date" style={{ minWidth: "150px" }} />
                <Column field="Due Date" header="Due Date" style={{ minWidth: "150px" }} />
                <Column field="createdAt" header="Created Date" style={{ minWidth: "150px" }} />
                <Column field="Created By" header="Created By" style={{ minWidth: "150px" }} />
                <Column field="Source" header="Source" style={{ minWidth: "150px" }} />
                <Column field="Paid Using" body={(rowData)=>{ 
                     return "Credit/Debit Card"
                }} header="Paid Using" style={{ minWidth: "150px" }} />
                <Column field="status" header="status" style={{ minWidth: "150px" }} />
                <Column
                    field="Action"
                    body={
                        <Button className="bg-green-200 border-none" onClick={() => setDetailedTransactionModal(true)}>
                            Void
                        </Button>
                    }
                    header="Action (PC609)"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="Invoice_Pdf"
                    body={
                        <Button className="bg-green-200 border-none" onClick={() => setDetailedTransactionModal(true)}>
                            Download{" "}
                        </Button>
                    }
                    header="Invoice Pdf"
                    style={{ minWidth: "150px" }}
                />
            </DataTable>
        </div>
    );
};

export default InvoiceTable;
