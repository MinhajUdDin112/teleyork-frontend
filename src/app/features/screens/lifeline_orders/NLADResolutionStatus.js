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
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">NLAD Resolution Status</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Date Range:</p>
                        <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Search:</p>
                        <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Enrollment ID" style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Status:</p>
                        <Dropdown style={{ width: "23rem" }} placeholder="Select Status" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} optionLabel="name" />
                    </div>
                </div>
                <div className="flex justify-content-end pt-1">
                    <Button label="Search" className="text-sm border-none bg-green-200 mr-2" style={{ width: "15rem" }} />
                </div>
            </div>
            <div></div>
            <div className="card p-3 mx-5 border-noround bg-green-200 ">
                <p className="text-sm font-semibold">Search Result: 0</p>
            </div>
            <br />
        </div>
    );
};

export default NLADResolutionStatus;
