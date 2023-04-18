import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const PendingEventOrder = () => {
    const [customer, setCustomer] = useState(null);
    const [search, setSearch] = useState(null);
    const [dob, setDob] = useState(null);
    const [ssn, setSsn] = useState(null);

    const customerOptions = [
        { name: "Enrollment Id", code: "ID" },
        { name: "First Name", code: "FN" },
        { name: "Last Name", code: "LN" },
    ];

    return (
        <div className="card p-0 border-noround">
            <div className="card bg-teal-300 px-4 py-2  border-noround">
                <p className="text-md font-medium text-0">Pending Event Order</p>
            </div>
            <div className="mx-5 my-0">
                <span>
                    <a href="" className="flex text-sm font-semibold justify-content-end">
                        Pending Event Order List
                    </a>
                </span>
            </div>
            <div className="flex flex-wrap mx-5 my-2">
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Search Customer:</p>
                    <Dropdown style={{ width: "18rem" }} placeholder="Select Master" value={customer} options={customerOptions} onChange={(e) => setCustomer(e.value)} optionLabel="name" />
                </div>
                <div className="mb-3 mr-3">
                    <InputText value={search} onChange={(e) => setSearch(e.value)} style={{ width: "18rem" }} className="mt-4" />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Enter The DOB:</p>
                    <Calendar id="icon" value={dob} onChange={(e) => setDob(e.value)} showIcon style={{ width: "18rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Enter SSN(Last 4 Digits):</p>
                    <InputText value={ssn} onChange={(e) => setSsn(e.value)} style={{ width: "18rem" }} />
                </div>
                <div>
                    <Button label="Search" className=" text-sm" />
                </div>
            </div>
            <br />
        </div>
    );
};

export default PendingEventOrder;
