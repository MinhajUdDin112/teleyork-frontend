import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const HandoverEventOrder = () => {
    const [customer, setCustomer] = useState(null);
    const [search, setSearch] = useState(null);
    const [dob, setDob] = useState(null);
    const [ssn, setSsn] = useState(null);

    const customerOptions = [
        { name: "Enrollment Id", code: "ID" },
        { name: "First Name", code: "FN" },
        { name: "Last Name", code: "LN" },
    ];

    const tableData = [
        {
            SNo: "",
            EnrollmentID: "",
            Name: "",
            Address: "",
            City: "",
            State: "",
            Zip: "",
            Dob: "",
            Planname: "",
            Option: "",
        },
    ];

    return (
        <div className="card p-0 border-noround">
            <div className="card bg-teal-300 px-4 py-2  border-noround">
                <p className="text-md font-medium text-0">Handover Event Order List</p>
            </div>
            <div className="mx-5 my-0">
                <span>
                    <a href="" className="flex text-sm font-semibold justify-content-end">
                        Completed Event Order List
                    </a>
                </span>
            </div>
            <div className="flex flex-wrap mx-5 my-3">
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
                    <Button label="Search" className="text-sm" />
                </div>
            </div>
            <div className="mx-5">
                <DataTable value={tableData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="SNo" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Enrollment ID" field="EnrolmentID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Name" field="Name" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Address" field="Address" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="City" field="City" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="State" field="State" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Zip" field="Zip" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="DOB" field="Dob" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Plan Name" field="Planname" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Option" field="Option" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                </DataTable>
            </div>
            <br />
        </div>
    );
};

export default HandoverEventOrder;
