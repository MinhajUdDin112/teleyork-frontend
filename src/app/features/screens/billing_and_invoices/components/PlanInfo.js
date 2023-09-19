import React from "react";

const PlanInfo = () => {
    return (
        <div className="card p-1 mx-4 ">
            <div className="flex flex-wrap mx-5">
                <div className="col-3 ">
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
    );
};

export default PlanInfo;
