import React, { useState } from "react";
import PlanInfo from "../components/PlanInfo";
import InvoiceTypes from "../components/InvoiceTypes";
import EditabaleInvoices from "../components/EditableInvoices";
import InvoiceTable from "../components/InvoiceTable";
import DetailedTransactionModal from "../components/modals/DetailedTransactionModal";
import NsfModal from "../components/modals/NsfModal";
import AdHocModal from "../components/modals/AdHocModal";
import MismatchInvoiceModal from "../components/modals/MismatchInvoiceModal";
import EbillModal from "../components/modals/EbillModal";
import MismatchBillModal from "../components/modals/MismatchBillModal";
import AdjustBalanceModal from "../components/modals/AdjustBalanceModal";
import PayInvoiceModal from "../components/modals/PayInvoiceModal";
import DiscountCreditModal from "../components/modals/DiscountCreditModal";
import AdjustWalletModal from "../components/modals/AdjustWalletModal";
import AddWalletModal from "../components/modals/AddWalletModal";
import PaymentModal from "../components/modals/PaymentModal";
import PaymentDetailModal from "../components/modals/PaymentDetailModal";
import BillingNavbar from "../components/BillingNavbar";

const InvoicePage = () => {
    const [detailedTransactionModal, setDetailedTransactionModal] = useState(false);
    const [nsfModal, setNsfModal] = useState(false);
    const [adHocInvoiceModal, setAdHocInvoiceModal] = useState(false);
    const [misMatchInvoiceModal, setMisMatchInvoiceModal] = useState(false);
    const [ebillModal, setEbillModal] = useState(false);
    const [misMatchBillModal, setMisMatchBillModal] = useState(false);
    const [adjustBalanceModal, setAdjustBalanceModal] = useState(false);
    const [payInvoiceModal, setPayInvoiceModal] = useState(false);
    const [discountCreditModal, setDiscountCreditModal] = useState(false);
    const [adjustWalletModal, setAdjustWalletModal] = useState(false);
    const [addWalletModal, setAddWalletModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [paymentDetailModal, setPaymentDetailModal] = useState(false);

    return (
        <>
            <div className="card p-0">
                <BillingNavbar />
                <div className="card border-noround p-3 surface-50 mx-4 mt-3">
                    <p className="font-bold text-xl">Invoices</p>
                </div>
                <PlanInfo />
                <InvoiceTypes
                    setNsfModal={setNsfModal}
                    setAdHocInvoiceModal={setAdHocInvoiceModal}
                    setMisMatchInvoiceModal={setMisMatchInvoiceModal}
                    setEbillModal={setEbillModal}
                    setMisMatchBillModal={setMisMatchBillModal}
                    setAdjustBalanceModal={setAdjustBalanceModal}
                    setPayInvoiceModal={setPayInvoiceModal}
                    setDiscountCreditModal={setDiscountCreditModal}
                    setAdjustWalletModal={setAdjustWalletModal}
                    setAddWalletModal={setAddWalletModal}
                />
                <EditabaleInvoices setPaymentModal={setPaymentModal} />
                <div>
                    <DetailedTransactionModal detailedTransactionModal={detailedTransactionModal} setDetailedTransactionModal={setDetailedTransactionModal} />
                    <NsfModal nsfModal={nsfModal} setNsfModal={setNsfModal} />
                    <AdHocModal adHocInvoiceModal={adHocInvoiceModal} setAdHocInvoiceModal={setAdHocInvoiceModal} />
                    <MismatchInvoiceModal misMatchInvoiceModal={misMatchInvoiceModal} setMisMatchInvoiceModal={setMisMatchInvoiceModal} />
                    <EbillModal ebillModal={ebillModal} setEbillModal={setEbillModal} />
                    <MismatchBillModal misMatchBillModal={misMatchBillModal} setMisMatchBillModal={setMisMatchBillModal} />
                    <AdjustBalanceModal adjustBalanceModal={adjustBalanceModal} setAdjustBalanceModal={setAdjustBalanceModal} />
                    <AdjustWalletModal adjustWalletModal={adjustWalletModal} setAdjustWalletModal={setAdjustWalletModal} />
                    <PayInvoiceModal payInvoiceModal={payInvoiceModal} setPayInvoiceModal={setPayInvoiceModal} />
                    <DiscountCreditModal discountCreditModal={discountCreditModal} setDiscountCreditModal={setDiscountCreditModal} />
                    <AddWalletModal addWalletModal={addWalletModal} setAddWalletModal={setAddWalletModal} />
                    <PaymentModal paymentModal={paymentModal} setPaymentModal={setPaymentModal} setPaymentDetailModal={setPaymentDetailModal} />
                    <PaymentDetailModal paymentDetailModal={paymentDetailModal} setPaymentDetailModal={setPaymentDetailModal} />
                </div>
                <div className="mx-4">
                    <p className="m-0 text-xs font-bold" style={{ color: "red" }}>
                        •Row in red color are unpaid invoices
                    </p>
                    <p className="text-xs font-bold" style={{ color: "blue" }}>
                        •Row in blue color are paid invoices
                    </p>
                </div>
                <br />
                <InvoiceTable className="mb-3" setDetailedTransactionModal={setDetailedTransactionModal} />
            </div>
        </>
    );
};

export default InvoicePage;
