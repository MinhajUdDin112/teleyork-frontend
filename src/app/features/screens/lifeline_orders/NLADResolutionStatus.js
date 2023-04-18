import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const NLADResolutionStatus = () => {
    const [dateRange, setDateRange] = useState(null);
    const [search, setSearch] = useState(null);
    const [status, setStatus] = useState(null);

    const statusOptions = [
        { name: "All", code: "AL" },
        { name: "Open", code: "ON" },
        { name: "Approved", code: "AD" },
        { name: "Rejected", code: "RD" },
    ];

    return (
        <div className="card p-0  border-noround">
            <div className="card bg-teal-300 px-4 py-2 border-noround">
                <p className="text-md font-medium text-0">NLAD Resolution Status</p>
            </div>
            <div className="flex flex-wrap mx-5">
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Date Range:</p>
                    <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "20rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Search:</p>
                    <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Enrollment ID" style={{ width: "20rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Status:</p>
                    <Dropdown style={{ width: "20rem" }} placeholder="Select Status" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} optionLabel="name" />
                </div>
                <div>
                    <Button label="Search" className="mt-4 text-sm" />
                </div>
            </div>
            <br />
        </div>
    );
};

export default NLADResolutionStatus;
