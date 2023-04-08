import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TransactionModal = () => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {
        displayBasic: setDisplayBasic,
    };
    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    };
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    };
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Close" onClick={() => onHide(name)}/>
            </div>
        );
    };

    const tabledata = [
        {
            invoiceno: "2023-03-65910",
            invicetype: "New Signup Plan Purchase",
            paymentmode: "Credit Card",
            type: "CR",
            credit: "0.00",
            debit: "0.00",
            balance: "0.00",
            createddate: "Mar-24-2023",
            void: "N",
        },
        {
            invoiceno: "2023-03-65910",
            invicetype: "New Signup Plan Purchase",
            paymentmode: "Credit Card",
            type: "CR",
            credit: "0.00",
            debit: "0.00",
            balance: "0.00",
            createddate: "Mar-24-2023",
            void: "N",
        },
    ];
    return (
        <div>
            <h5>Detail Transaction</h5>
            <Button label="Show" icon="pi pi-external-link" onClick={() => onClick("displayBasic")} />
            <Dialog header="Detailed Transaction" visible={displayBasic} style={{ width: "80vw" }} footer={renderFooter("displayBasic")}>
                <DataTable value={tabledata}>
                    <Column field="invoiceno" header="Invoice No." />
                    <Column field="invicetype" header="Invoice Type" />
                    <Column field="paymentmode" header="Payment Mode" />
                    <Column field="type" header="Type" />
                    <Column field="credit" header="Credit" />
                    <Column field="debit" header="Debit" />
                    <Column field="balance" header="Balance" />
                    <Column field="createddate" header="Created Date" />
                    <Column field="void" header="Void" />
                </DataTable>
            </Dialog>
        </div>
    );
};

export default TransactionModal;
