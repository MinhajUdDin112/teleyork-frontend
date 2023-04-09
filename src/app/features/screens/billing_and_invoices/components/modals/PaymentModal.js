import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const PaymentModal = ({ paymentModal, setPaymentModal, setPaymentDetailModal }) => {
    const cardData = [
        {
            Invoice_No: "2023-03-65910",
            Invoice_Type: "New Signup Plan Purchase",
            Payment_Type: "Credit Card",
            Amount: "0.00",
            Tax: "0.00",
            Processing_Fee: "0.00",
            Payment_Amount: "0.00",
            Paymentby: "Ziscom",
            Source: "ENROLLMENT_PORTAL",
            Transaction_ID: "WITHOUTPAYMENT_12345678",
            Created_DateTime: "March-24-2023",
            Refunded_Amount: "0.00",
            Action: "",
        },
    ];
    const renderFooter = () => {
        return (
            <div>
                <Button label="Close" onClick={() => setPaymentModal(false)} />
            </div>
        );
    };
    const handleCellClick = () => {
        setPaymentDetailModal(true);
    };
    return (
        <div>
            <Dialog closable={false} visible={paymentModal} style={{ width: "80vw" }} footer={renderFooter()}>
                <DataTable value={cardData} showGridlines>
                    <Column field="Invoice_No" header="IInvoice No" style={{ minWidth: "150px" }} />
                    <Column field="Invoice_Type" header="Invoice Type" style={{ minWidth: "150px" }} />
                    <Column
                        field="Payment_Type"
                        header="Payment Type"
                        style={{ minWidth: "150px" }}
                        body={(rowData) => (
                            <span style={{ cursor: "pointer" }} onClick={() => handleCellClick()}>
                                {rowData.Payment_Type}
                            </span>
                        )}
                    />
                    <Column field="Amount" header="Amount" style={{ minWidth: "150px" }} />
                    <Column field="Tax" header="Tax" style={{ minWidth: "150px" }} />
                    <Column field="Processing_Fee" header="Processing Fee" style={{ minWidth: "150px" }} />
                    <Column field="Payment_Amount" header="Payment Amount" style={{ minWidth: "150px" }} />
                    <Column field="Paymentby" header="Payment By" style={{ minWidth: "150px" }} />
                    <Column field="Source" header="Source" style={{ minWidth: "150px" }} />
                    <Column field="Transaction_ID" header="Transaction ID" style={{ minWidth: "150px" }} />
                    <Column field="Created_DateTime" header="Created DateTime" style={{ minWidth: "150px" }} />
                    <Column field="Refunded_Amount" header="Refunded Amount" style={{ minWidth: "150px" }} />
                    <Column field="Action" body={<Button onClick={() => setDetailedTransactionModal(true)}>Void</Button>} header="Action (PC609)" style={{ minWidth: "150px" }} />
                </DataTable>
            </Dialog>
        </div>
    );
};

export default PaymentModal;
