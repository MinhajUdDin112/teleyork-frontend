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
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Handover Event Order List</h3>
            </div>

            <div className="mb-3 mr-3">
                <span>
                    <a href="" className="flex text-sm font-semibold justify-content-end mr-3">
                        Completed Event Order List
                    </a>
                </span>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className=" flex flex-wrap p-0 mx-3 mb-1">
                    <div className="mr-5">
                        <p className="m-0 pb-1 text-sm font-semibold ">Search Customer:</p>
                        <Dropdown style={{ width: "23rem" }} placeholder="Select Master" value={customer} options={customerOptions} onChange={(e) => setCustomer(e.value)} optionLabel="name" />
                    </div>
                    <div className="mr-5">
                        <InputText value={search} onChange={(e) => setSearch(e.value)} style={{ width: "23rem" }} className="mt-4" />
                    </div>
                    <div className="mr-5">
                        <p className="m-0 pb-1 text-sm font-semibold ">Enter The DOB:</p>
                        <Calendar id="icon" value={dob} onChange={(e) => setDob(e.value)} showIcon style={{ width: "23rem" }} />
                    </div>
                    <div>
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
            <div className="mx-5">
                <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">
                    <InputText className="w-15rem my-2 text-base h-2.5rem" placeholder="Keyword Search"></InputText>
                </div>
                <div className="">
                    <DataTable value={tableData} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="SNo" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Enrollment ID" field="EnrolmentID" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Zip" field="Zip" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="DOB" field="Dob" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Plan Name" field="Planname" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Option" field="Option" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                    </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default HandoverEventOrder;
