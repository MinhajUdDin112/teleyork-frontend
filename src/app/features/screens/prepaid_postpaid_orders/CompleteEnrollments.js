import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CompleteEnrollments = () => {
    const [dateRange, setDateRange] = useState(null);
    const [search, setSearch] = useState(null);

    const tableData = [
        {
            SNo: "",
            EnrollmentID: "",
            Name: "",
            Address: "",
            City: "",
            State: "",
            Zip: "",
            Planname: "",
            planprice: "",
            Phonecost: "",
            Amountpaid: "",
            Paymentmode: "",
            Postingdate: "",
            EsnNumber: "",
            Phonenumber: "",
            Activationcall: "",
            Activationcalldatetime: "",
            Status: "",
            Handover: "",
            Rejected: "",
            Option: "",
        },
    ];

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">List of Completed Non-Lifeline Enrollments</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Date Range</p>
                        <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Search</p>
                        <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Customer F Name, L Name, Enrollment ID" style={{ width: "23rem" }} />
                    </div>
                    <div className="p-1">
                        <Button label="Search" className="mt-4 text-sm bg-green-200 border-none w-7rem" />
                    </div>
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
                        <Column header="Plan Name" field="Planname" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Plan Price" field="Planprice" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Phone Cost" field="Phonecost" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Amount Paid by Customer" field="Amountpaid" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Payment Mode" field="Postingmode" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Posting Date" field="Postingdate" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="ESN Number" field="EsnNumber" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Telephone Number" field="Phonenumber" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Activation Call" field="Activationcall" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Activation Call Date Time" field="Activationcalldatetime" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Status" field="Status" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Handover Equipment" field="Handover" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Rejected Reason" field="Rejected" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Option" field="Option" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                    </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default CompleteEnrollments;
