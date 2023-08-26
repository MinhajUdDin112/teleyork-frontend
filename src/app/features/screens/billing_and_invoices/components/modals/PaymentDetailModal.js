import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const PaymentDetailModal = ({ paymentDetailModal, setPaymentDetailModal }) => {
    const renderFooter = () => {
        return (
            <div>
                <Button label="Close" onClick={() => setPaymentDetailModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Payment Detail" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={paymentDetailModal} footer={renderFooter()} style={{ width: "50vw" }}>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID:</p>
                        <p className="col-8 m-0 p-1">119350</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Telephone Number:</p>
                        <p className="col-8 m-0 p-1">0313-55***52</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Customer Name:</p>
                        <p className="col-8 m-0 p-1">Hammad Ullah</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Date:</p>
                        <p className="col-8 m-0 p-1">2023-03-24</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Number:</p>
                        <p className="col-8 m-0 p-1">1193550</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Reference#:</p>
                        <p className="col-8 m-0 p-1">WITHOUTPAYMENT_1234567</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Payment Amount:</p>
                        <p className="col-8 m-0 p-1">$0.00</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Payment Date Time:</p>
                        <p className="col-8 m-0 p-1">2023-03-24 17:15:20</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Payment Method:</p>
                        <p className="col-8 m-0 p-1">Credit Card</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Transaction Detail:</p>
                        <p className="col-8 m-0 p-1"></p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CC Last 4 Digit:</p>
                        <p className="col-8 m-0 p-1">2345</p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default PaymentDetailModal;
