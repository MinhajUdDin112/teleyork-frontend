import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SelectButton } from "primereact/selectbutton";

const RecentSearches = () => {
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [value2, setValue2] = useState(null);

    const tableData = [
        {
            SNo: "",
            Carrier: "",
            CustomerID: "",
            AccountNo: "",
            EnrollmentID: "",
            Telephone: "",
            EsnNumber: "",
            Firstname: "",
            Lastname: "",
            ServiceAddress: "",
            City: "",
            State: "",
            Zip: "",
            Status: "",
        },
    ];

    const paymentOptions = [
        { name: "First", value: 1 },
        { name: "<<Previous", value: 2 },
        { name: "Next>>", value: 3 },
        { name: "Last", value: 4 },
    ];

    return (
        <div className="card p-2 min-h-screen border-noround">
            <div className="card border-noround p-0">
                <div className="surface-100 p-3 my-3 border-y-1">
                    <p className="text-xl font-bold">Search</p>
                </div>
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date From:</p>
                        <Calendar id="basic" value={dateFrom} onChange={(e) => setDateFrom(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date To:</p>
                        <Calendar id="basic" value={dateTo} onChange={(e) => setDateTo(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div>
                        <Button label="Search" className="mt-4 text-sm" />
                    </div>
                </div>
            </div>
            <div className="card border-noround p-0">
                <p className="surface-100 text-lg font-bold m-0 p-3 border-y-1">CSR Search History</p>
                <DataTable value={tableData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="SNo" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Carrier" field="CArrier" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Customer ID" field="CustomerID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Account No" field="AccountNo" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Enrollment ID" field="EnrollmentID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Telephone" field="Telephone" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="SIM/ESN Number" field="EsnNumber" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="FIrst Name" field="Firstname" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Last Name" field="Lastname" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Service Address" field="ServiceAddress" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="City" field="City" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="State" field="State" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Zip" field="Zip" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Status" field="Status" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                </DataTable>
            </div>
            <div className="p-0 flex justify-content-end px-3">
                <SelectButton value={value2} options={paymentOptions} onChange={(e) => setValue2(e.value)} optionLabel="name" multiple  />
            </div>
            <br />
        </div>
    );
};

export default RecentSearches;
