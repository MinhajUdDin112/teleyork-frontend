import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const WalletModal = ({ displayWallet }) => {
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
    ];
    return (
        <div>
            <Dialog header="Detailed Transaction" visible={displayWallet} style={{ width: "80vw" }}>
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

export default WalletModal;
