import React from "react";
import { Button } from "primereact/button";

const InvoiceTypes = ({ setNsfModal, setAdHocInvoiceModal, setMisMatchInvoiceModal, setEbillModal, setMisMatchBillModal, setAdjustBalanceModal, setPayInvoiceModal, setDiscountCreditModal, setAdjustWalletModal, setAddWalletModal }) => {
    return (
        <>
            <div>
                <div className="flex flex-wrap">
                    <div className="col-4">
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setNsfModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                Add NSF/Fraud Invoice
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setEbillModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                E-Bill Setting
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC460)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3 justify-content-start">
                            <Button onClick={() => setAdjustWalletModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                Adjust Wallet
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC765)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setPayInvoiceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Pay Invoice(s)
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC67)
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setAdHocInvoiceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                Add Ad hoc-Invoice
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setMisMatchBillModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Mismatch Bill Pay
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC461)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setDiscountCreditModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Discount Credit
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC843)
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setMisMatchInvoiceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Mismatch Invoice
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC455)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setAdjustBalanceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Adjust Balance
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC462)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setAddWalletModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Wallet
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC456)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceTypes;
