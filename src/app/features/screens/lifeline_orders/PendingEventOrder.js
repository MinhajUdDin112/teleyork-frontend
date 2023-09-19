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
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Pending Event Order</h3>
            </div>
            <div className="mb-3 mr-3">
                <span>
                    <a href="" className="flex text-sm font-semibold justify-content-end mr-3">
                        Pending Event Order List
                    </a>
                </span>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className=" flex flex-wrap p-0 mx-3 mb-1">
                    <div className="mr-5 mb-2">
                        <p className="m-0 pb-1 text-sm font-semibold  ">Search Customer:</p>
                        <Dropdown style={{ width: "23rem" }} placeholder="Select Master" value={customer} options={customerOptions} onChange={(e) => setCustomer(e.value)} optionLabel="name" />
                    </div>
                    <div className="mr-5 mb-2">
                        <InputText value={search} onChange={(e) => setSearch(e.value)} style={{ width: "23rem" }} className="mt-4" />
                    </div>
                    <div className="mr-5 mb-2">
                        <p className="m-0 pb-1 text-sm font-semibold ">Enter The DOB:</p>
                        <Calendar id="icon" value={dob} onChange={(e) => setDob(e.value)} showIcon style={{ width: "23rem" }} />
                    </div>
                    <div className=" mb-2">
                        <p className="m-0 pb-1 text-sm font-semibold ">Enter SSN(Last 4 Digits):</p>
                        <InputText value={ssn} onChange={(e) => setSsn(e.value)} style={{ width: "23rem" }} />
                    </div>
                </div>
                <div className="flex justify-content-end pt-1">
                    <Button label="Search" className=" bg-green-200 border-none w-15rem mr-2 mt-3" />
                </div>
            </div>
            <div className="card p-3 mx-5 border-noround bg-green-200 ">
                <p className="text-sm font-semibold">Search Result: 0</p>
            </div>
            <br />
        </div>
    );
};

export default PendingEventOrder;
