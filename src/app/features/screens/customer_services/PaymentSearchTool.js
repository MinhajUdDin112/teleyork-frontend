import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const PaymentSearchTool = () => {
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [payment, setPayment] = useState(null);
    const [search, setSearch] = useState(null);

    const searchOptions = [
        { name: "All", code: "CC" },
        { name: "Amount", code: "C" },
        { name: "Confirmation", code: "LB" },
        { name: "CC# (Last 4 Digits)", code: "CBP" },
    ];

    const paymentOptions = [
        { name: "Credit Card", code: "CC" },
        { name: "Cash", code: "C" },
        { name: "Lock Box", code: "LB" },
        { name: "Check By Phones", code: "CBP" },
        { name: "Money Order", code: "MO" },
        { name: "Fi Server", code: "FS" },
        { name: "Ace Cash Express", code: "ACE" },
        { name: "US Payment", code: "UP" },
        { name: "Money Gram", code: "MG" },
    ];

    return (
        <div className="card p-2 min-h-screen border-noround">
            <div className="card border-noround p-0">
                <div className="surface-100 p-3 my-3 border-y-1">
                    <p className="text-xl font-bold">Search</p>
                </div>
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Search Type:</p>
                        <Dropdown placeholder="Select Search Type" value={search} options={searchOptions} optionLabel="name" onChange={(e) => setSearch(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Search by "Search type" optons</p>
                        <InputText placeholder="Amount, Confirmation, Last 4 digits" style={{ width: "18rem" }} />
                    </div>

                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">From Date(MM-DD-YYYY)</p>
                        <Calendar id="basic" value={dateFrom} onChange={(e) => setDateFrom(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">To Date(MM-DD-YYYY)</p>
                        <Calendar id="basic" value={dateTo} onChange={(e) => setDateTo(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Payment Type:</p>
                        <Dropdown placeholder="Select Payment Type" value={payment} options={paymentOptions} optionLabel="name" onChange={(e) => setPayment(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div>
                        <Button label="Search" className="mt-5 text-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSearchTool;
