import React from "react";
import PlanInfo from "../components/plan_info";
import { Button } from "primereact/button";

export default function InvoicePage() {
    const billingInvoice = () => {
        return (
            <div>
                <div className="card border-noround p-3 surface-50">
                    <p className="font-bold text-xl">Invoices</p>
                </div>

                <div className="card p-1">
                    <div className="flex flex-wrap">
                        <div className="col-3">
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Current Plan Name:</p>
                                <p className="text-sm m-0">City Communication special bundle plan</p>
                            </div>
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Bill Generate:</p>
                                <p className="text-sm m-0">Enabled</p>
                            </div>
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Current Deposit Amount:</p>
                                <p className="text-sm m-0">0.00</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Current Plan Price($):</p>
                                <p className="text-sm m-0">54.99</p>
                            </div>
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Current credit Limit:</p>
                                <p className="text-sm m-0">500</p>
                            </div>
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Due date day is:</p>
                                <p className="text-sm m-0">4th of month</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Charging type:</p>
                                <p className="text-sm m-0">Monthly</p>
                            </div>
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Consumed Credit:</p>
                                <p className="text-sm m-0">365</p>
                            </div>
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Promo Discount:</p>
                                <p className="text-sm m-0">For 3 invoices</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Current Bill cycle day is:</p>
                                <p className="text-sm m-0">$th of month</p>
                            </div>
                            <div className="mb-1">
                                <p className="font-bold text-sm m-0">Available Postpaid Limit:</p>
                                <p className="text-sm m-0">765</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap mt-3">
                    <div className="col-3">
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-medium justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-medium justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-medium justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-medium justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                        <div className="flex align-items-center mb-3">
                            <Button id="refundInvoice" className="w-9rem h-2rem text-base font-normal justify-content-center border-noround">
                                Back
                            </Button>
                            <label htmlFor="refundInvoice" className="text-xs">
                                (PC453)
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap ">
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button label="Secondary" className="border-noround mr-2 mb-2 p-button-outlined p-button-secondary" />
                </div>
                <div>
                    <p className="m-0 text-xs font-bold" style={{ color: "red" }}>
                        •Row in red color are unpaid invoices
                    </p>
                    <p className="text-xs font-bold" style={{ color: "blue" }}>
                        •Row in blue color are paid invoices
                    </p>
                </div>
            </div>
        );
    };
    return (
        <>
            <div>
                <PlanInfo />
            </div>
        </>
    );
}
