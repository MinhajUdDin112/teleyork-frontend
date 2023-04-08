import React, { useState } from "react";
import PlanInfo from "../components/PlanInfo";
import InvoiceTypes from "../components/InvoiceTypes";
import EditabaleInvoices from "../components/EditableInvoices";
import InvoiceTable from "../components/InvoiceTable";
import BillingNavbar from "../../../../../components/billing_navbar";
import TransactionModal from "../components/modals/detail_transaction_mdal";
import WalletModal from "../components/modals/AddWalletModal";
import NfsModal from "../components/modals/NfsModal";

export default function InvoicePage() {
    // const [displayWallet, setDisplayWallet] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);

    return (
        <>
            <BillingNavbar />
            <div className="card border-noround">
                <div className="card border-noround p-3 surface-50">
                    <p className="font-bold text-xl">Invoices</p>
                </div>
                <PlanInfo />
                <InvoiceTypes setDisplayModal={setDisplayModal} />
                <EditabaleInvoices />
                <TransactionModal />
                <WalletModal displayWallet={displayWallet} />
                <NfsModal displayModal={displayModal} setDisplayWallet={setDisplayModal} />
                <div>
                    <p className="m-0 text-xs font-bold" style={{ color: "red" }}>
                        •Row in red color are unpaid invoices
                    </p>
                    <p className="text-xs font-bold" style={{ color: "blue" }}>
                        •Row in blue color are paid invoices
                    </p>
                </div>
                <br />
                <InvoiceTable />
            </div>
        </>
    );
}
