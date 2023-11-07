import React from "react";
import { Button } from "primereact/button";

const InvoiceTypes = ({ setNsfModal, setAdHocInvoiceModal, setMisMatchInvoiceModal, setEbillModal, setMisMatchBillModal, setAdjustBalanceModal, setPayInvoiceModal, setDiscountCreditModal, setAdjustWalletModal, setAddWalletModal }) => {
    return (
        <div className="card p-1 mx-4 ">
            <div className="flex flex-wrap mx-4 mt-3">
                <div className="col-4 ">
                    {/* <div className="flex align-items-center mb-3 ">
                        <Button onClick={() => setNsfModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round  border-none">
                            Add NSF/Fraud Invoice
                        </Button>
                       
                    </div> */}
                    <div className="flex align-items-center mb-3">
                        <Button onClick={() => setEbillModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round  border-none">
                            E-Bill Setting
                        </Button>
                      
                    </div>
                    {/* <div className="flex align-items-center mb-3 justify-content-start">
                        <Button onClick={() => setAdjustWalletModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round bg-green-200 border-none">
                            Adjust Wallet
                        </Button>
                       
                    </div> */}
                    <div className="flex align-items-center mb-3">
                        <Button onClick={() => setPayInvoiceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round  border-none">
                            Pay Invoice(s)
                        </Button>
                       
                    </div>
                    <div className="flex align-items-center mb-3">
                        <Button onClick={() => setAdHocInvoiceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round  border-none">
                            Add Ad hoc-Invoice
                        </Button>
                       
                    </div>
                </div>
                {/* <div className="col-4">
                  
                    <div className="flex align-items-center mb-3">
                        <Button onClick={() => setMisMatchBillModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round bg-green-200 border-none">
                            Add Mismatch Bill Pay
                        </Button>
                       
                    </div>
                    <div className="flex align-items-center mb-3">
                        <Button onClick={() => setDiscountCreditModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round bg-green-200 border-none">
                            Add Discount Credit
                        </Button>
                       
                    </div>
                </div> */}
                <div className="col-4">
                    {/* <div className="flex align-items-center mb-3">
                        <Button onClick={() => setMisMatchInvoiceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round bg-green-200 border-none">
                            Add Mismatch Invoice
                        </Button>
                       
                    </div> */}
                    <div className="flex align-items-center mb-3">
                        <Button onClick={() => setAdjustBalanceModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round  border-none">
                            Adjust Balance
                        </Button>
                        
                    </div>
                    <div className="flex align-items-center mb-3">
                        <Button onClick={() => setAddWalletModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round  border-none">
                            Add Wallet
                        </Button>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTypes;
