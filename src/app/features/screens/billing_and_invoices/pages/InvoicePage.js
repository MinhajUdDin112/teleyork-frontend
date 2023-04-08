import React, { useState } from "react";
import BillingNavbar from "../../../../../components/billing_navbar";
import PlanInfo from "../components/PlanInfo";
import InvoiceTypes from "../components/InvoiceTypes";
import EditabaleInvoices from "../components/EditableInvoices";
import InvoiceTable from "../components/InvoiceTable";
import NsfModal from "../components/modals/NsfModal";

const InvoicePage = () => {
    const [displayModal, setDisplayModal] = useState(false);
    return (
        <>
            <BillingNavbar />
            <div className="card">
                <div className="card border-noround p-3 surface-50">
                    <p className="font-bold text-xl">Invoices</p>
                </div>
                <PlanInfo />
                <InvoiceTypes setDisplayModal={setDisplayModal} />
                <EditabaleInvoices />
                <div>
                    <NsfModal displayModal={displayModal} setDisplayModal={setDisplayModal} />
                </div>
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
};

export default InvoicePage;
