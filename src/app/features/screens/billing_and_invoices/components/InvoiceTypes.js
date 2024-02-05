import React from "react";
import { Button } from "primereact/button";

const InvoiceTypes = ({ accountType, setNsfModal, setAdHocInvoiceModal, setMisMatchInvoiceModal, setEbillModal, setMisMatchBillModal, setAdjustBalanceModal, setPayInvoiceModal, setDiscountCreditModal, setAdjustWalletModal, setAddWalletModal }) => {
    return (
        <div className="mx-4 ">
            <div className="flex flex-wrap flex-row justify-content-left">
                {accountType === "Prepaid" ? (
                    <>
                        <Button onClick={() => setPayInvoiceModal(true)} id="refundInvoice" className="w-14rem h-3rem  ml-2 mt-2 text-sm font-bold justify-content-center border-round  border-none">
                            Pay Invoice
                        </Button>
                    </>
                ) : (
                    <>
                        {" "}
                        <Button onClick={() => setAdHocInvoiceModal(true)} id="refundInvoice" className="w-14rem mt-2 ml-2 h-3rem text-sm font-bold justify-content-center border-round  border-none">
                            Add Ad hoc-Invoice
                        </Button>
                        <Button onClick={() => setAdjustBalanceModal(true)} id="refundInvoice" className="w-14rem mt-2 ml-2 h-3rem text-sm font-bold justify-content-center border-round  border-none">
                            Adjust Balance
                        </Button>
                        <Button onClick={() => setAddWalletModal(true)} id="refundInvoice" className="w-14rem h-3rem mt-2 ml-2 text-sm font-bold justify-content-center border-round  border-none">
                            Add Wallet
                        </Button>
                        <Button onClick={() => setPayInvoiceModal(true)} id="refundInvoice" className="w-14rem h-3rem  mt-2 ml-2 text-sm font-bold justify-content-center border-round  border-none">
                            Pay Invoice(s)
                        </Button>
                        <Button onClick={() => setEbillModal(true)} id="refundInvoice" className="w-14rem h-3rem text-sm mt-2 ml-2 font-bold justify-content-center border-round  border-none">
                            E-Bill Setting
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default InvoiceTypes;
