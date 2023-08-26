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
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Search</h3>
            </div>

            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date From:</p>
                        <Calendar id="icon" value={dateFrom} onChange={(e) => setDateFrom(e.value)} showIcon style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date To:</p>
                        <Calendar id="icon" value={dateTo} onChange={(e) => setDateTo(e.value)} showIcon style={{ width: "23rem" }} />
                    </div>
                    <div>
                        <Button label="Search" className="mt-5 text-sm bg-green-200 border-none w-7rem" />
                    </div>
                </div>
            </div>
            <div className="card p-3 mx-5 border-noround bg-green-200 ">
                <p className="text-sm font-semibold">Search Result: 0</p>
            </div>

            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">CSR Search History</h3>
            </div>

            <div className="mx-5">
                <div className="">
                    <DataTable value={tableData} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="SNo" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Carrier" field="CArrier" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Customer ID" field="CustomerID" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Account No" field="AccountNo" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Enrollment ID" field="EnrollmentID" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Telephone" field="Telephone" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="SIM/ESN Number" field="EsnNumber" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="FIrst Name" field="Firstname" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Last Name" field="Lastname" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Service Address" field="ServiceAddress" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Zip" field="Zip" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Status" field="Status" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                    </DataTable>
                </div>

                <div className="p-0 flex justify-content-end m-2 mr-0">
                    <SelectButton value={value2} options={paymentOptions} onChange={(e) => setValue2(e.value)} optionLabel="name" multiple />
                </div>
                <br />
            </div>
        </div>
    );
};

export default RecentSearches;
