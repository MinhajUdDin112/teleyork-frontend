import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const RejectedEnrollments = () => {
    const [dateRange, setDateRange] = useState(null);
    const [search, setSearch] = useState(null);

    const tableData = [
        {
            SNo: "",
            Option: "",
            EnrollmentID: "",
            Name: "",
            Address: "",
            City: "",
            State: "",
            Zip: "",
            Dob: "",
            Planname: "",
            Postingdate: "",
            Status: "",
            Rejectedreason: "",
            Reviewernote: "",
        },
    ];

    return (
        <div className="card p-0 border-noround">
            <div className="card bg-teal-300 px-4 py-2 border-noround">
                <p className="text-md font-medium text-0">List of Rejected Enrollments</p>
            </div>
            <div className="flex flex-wrap mx-5 my-3">
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Date Range</p>
                    <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "25rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Search</p>
                    <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Customer F Name, L Name, Enrollment ID" style={{ width: "25rem" }} />
                </div>
                <div>
                    <Button label="Search" className="mt-4 text-sm" />
                </div>
            </div>
            <div className="card surface-300 p-3 mx-5 border-noround">
                <p className="text-md font-semibold">Search Result: 0</p>
            </div>
            <div className="mx-5">
                <DataTable value={tableData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="SNo" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Option" field="Option" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Enrollment ID" field="EnrolmentID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Name" field="Name" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Address" field="Address" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="City" field="City" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="State" field="State" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Zip" field="Zip" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="DOB" field="Dob" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Plan Name" field="Planname" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Posting Date" field="Postingdate" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Status" field="Status" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Rejected Reason" field="Rejectedreason" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Reviewer Note" field="Reviewernote" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                </DataTable>
            </div>
            <br />
        </div>
    );
};

export default RejectedEnrollments;
