import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const InvoiceTable = ({ setDetailedTransactionModal }) => {
    const cardData = [
        {
            Invoice_No: "2023-03-65910",
            Invoice_Type: "New Signup Plan Purchase",
            Debit: "0.00",
            Tax: "0.00",
            Processing_Fee: "0.00",
            Inv_Balance: "0.00",
            Amount_Paid: "0.00",
            Total_Dues: "0.00",
            From_Date: "March-24-2023",
            Due_Date: "March-24-2023",
            Created_Date: "March-24-2023",
            Created_By: "Ziscom",
            Source: "Enrollment_Portal",
            Paid_Using: "Credit Card",
            Paid_Unpaid: "Paid",
            Action: "",
            Invoice_Pdf: "",
        },
    ];
    const handleCellClick = () => {
        setDetailedTransactionModal(true);
    };

    return (
        <div>
            <DataTable value={cardData} showGridlines>
                <Column
                    field="Invoice_No"
                    header="Invoice No."
                    style={{ minWidth: "150px" }}
                    body={(rowData) => (
                        <span style={{ cursor: "pointer" }} onClick={() => handleCellClick()}>
                            {rowData.Invoice_No}
                        </span>
                    )}
                />
                <Column field="Invoice_Type" header="Invoice Type" style={{ minWidth: "150px" }} />
                <Column field="Debit" header="Debit(A)" style={{ minWidth: "150px" }} />
                <Column field="Tax" header="Tax(B)" style={{ minWidth: "150px" }} />
                <Column field="Processing_Fee" header="Processing Fee(C)" style={{ minWidth: "150px" }} />
                <Column field="Inv_Balance" header="Inv Balance D=(A+B+C)" style={{ minWidth: "150px" }} />
                <Column field="Amount_Paid" header="Amount Paid($) E" style={{ minWidth: "150px" }} />
                <Column field="Total_Dues" header="Total Dues($) (D-E)" style={{ minWidth: "150px" }} />
                <Column field="From_Date" header="From Date" style={{ minWidth: "150px" }} />
                <Column field="Due_Date" header="Due Date" style={{ minWidth: "150px" }} />
                <Column field="Created_Date" header="Created Date" style={{ minWidth: "150px" }} />
                <Column field="Created_By" header="Created By" style={{ minWidth: "150px" }} />
                <Column field="Source" header="Source" style={{ minWidth: "150px" }} />
                <Column field="Paid_Using" header="Paid Using" style={{ minWidth: "150px" }} />
                <Column field="Paid_Unpaid" header="Paid/Unpaid" style={{ minWidth: "150px" }} />
                <Column field="Action" body={<Button onClick={() => setDetailedTransactionModal(true)}>Void</Button>} header="Action (PC609)" style={{ minWidth: "150px" }} />
                <Column field="Invoice_Pdf" body={<Button onClick={() => setDetailedTransactionModal(true)}>Download</Button>} header="Invoice Pdf" style={{ minWidth: "150px" }} />
            </DataTable>
        </div>
    );
};

export default InvoiceTable;
