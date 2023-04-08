import React from "react";
import { Button } from "primereact/button";

const InvoiceTypes = ({ setDisplayModal }) => {
    return (
        <>
            <div>
                <div className="flex flex-wrap">
                    <div className="col-4">
                        <div className="flex align-items-center mb-3">
                            <Button onClick={() => setDisplayModal(true)} id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                Add NSF/Fraud Invoice
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                E-Bill Setting
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC460)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3 justify-content-start">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                Adjust Wallet
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC765)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Pay Invoice(s)
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC67)
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-medium justify-content-center border-round">
                                Add Ad hoc-Invoice
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Mismatch Bill Pay
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC461)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Discount Credit
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC843)
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Mismatch Invoice
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC455)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Adjust Balance
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC462)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-14rem h-2rem text-sm font-normal justify-content-center border-round">
                                Add Wallet
                            </Button>
                            <label htmlFor="refundInvoice" className="text-x">
                                (PC456)
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="flex flex-wrap my-4 justify-content-between px-3">
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-medium justify-content-center border-round">
                        Add NSF/Fraud Invoice
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC453)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-medium justify-content-center border-round">
                        Add Ad hoc-Invoice
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC454)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-normal justify-content-center border-round">
                        Add Mismatch Invoice
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC455)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-normal justify-content-center border-round">
                        Add Wallet
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC456)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-medium justify-content-center border-round">
                        E-Bill Setting
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC460)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-normal justify-content-center border-round">
                        Add Mismatch Bill Pay
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC461)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-normal justify-content-center border-round">
                        Adjust Balance
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC462)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-normal justify-content-center border-round">
                        Pay Invoice(s)
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC67)
                    </label>
                </div>
                <div className="flex align-items-center mb-3 justify-content-start">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-medium justify-content-center border-round">
                        Adjust Wallet
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC765)
                    </label>
                </div>
                <div className="flex align-items-center mb-3">
                    <Button id="refundInvoice" className="w-14rem h-2rem text-base font-normal justify-content-center border-round">
                        Add Discount Credit
                    </Button>
                    <label htmlFor="refundInvoice" className="text-x">
                        (PC843)
                    </label>
                </div>
            </div> */}
        </>
    );
};

export default InvoiceTypes;
