import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AllEnrollments = () => {
    const [dateRange, setDateRange] = useState(null);
    const [search, setSearch] = useState(null);
    const [master, setMaster] = useState(null);
    const [distributor, setDistributor] = useState(null);
    const [retailer, setRetailer] = useState(null);
    const [employee, setEmloyee] = useState(null);

    const masterOptions = [{ name: "Corporate Master", code: "CM" }];
    const distributorOptions = [{ name: "Distributor", code: "DB" }];
    const retailerOptions = [{ name: "Retailer", code: "RT" }];
    const employeeOptions = [{ name: "Employee", code: "EP" }];

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
            planprice: "",
            Phonecost: "",
            Amountpaid: "",
            Postingdate: "",
            EsnNumber: "",
            Telephone: "",
            Activationcall: "",
            Activationcalldatetime: "",
            Status: "",
            Handover: "",
            Rejectedreason: "",
            Enrolltype: "",
            Reviewernote: "",
        },
    ];

    return (
        <div className="card p-0 border-noround">
            <div className="card bg-teal-300 px-4 py-2  border-noround">
                <p className="text-md font-medium text-0">List of All Enrollments</p>
            </div>
            <div className="flex flex-wrap mx-5 my-3">
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Date Range</p>
                    <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" readOnlyInput style={{ width: "14rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Search</p>
                    <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Customer F Name, L Name" style={{ width: "14rem", fontSize: "12px" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Master</p>
                    <Dropdown placeholder="Select Master" value={master} options={masterOptions} onChange={(e) => setMaster(e.value)} optionLabel="name" style={{ width: "14rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Distributor</p>
                    <Dropdown placeholder="Select Distributor" value={distributor} options={distributorOptions} onChange={(e) => setDistributor(e.value)} optionLabel="name" style={{ width: "14rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Retailer</p>
                    <Dropdown placeholder="Select Retailer" value={retailer} options={retailerOptions} onChange={(e) => setRetailer(e.value)} optionLabel="name" style={{ width: "14rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Employee</p>
                    <Dropdown placeholder="Select Employee" value={employee} options={employeeOptions} onChange={(e) => setEmloyee(e.value)} optionLabel="name" style={{ width: "14rem" }} />
                </div>
                <div>
                    <Button label="Search" className="mt-4 text-sm" />
                </div>
            </div>
            <div className="card surface-300 p-3 mx-5 border-noround">
                <p className="text-sm font-semibold">Search Result: 0</p>
            </div>
            <div className="mx-5">
                <DataTable value={tableData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="SNo" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Option" field="Option" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Enrollment ID" field="EnrollmentID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Name" field="Name" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Address" field="Address" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="City" field="City" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="State" field="State" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Zip" field="Zip" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="DOB" field="Dob" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Plan Name" field="Planname" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Plan Price" field="Planprice" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Phone Cost" field="Phonecost" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Amount Paid by Customer" field="Amountpaid" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Posting Date" field="Postingdate" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="ESN Number" field="EsnNumber" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Telephone Number" field="Telephone" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Activation Call" field="Activationcall" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Activation Call Date Time" field="Activationcalldatetime" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Status" field="Status" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Handover Equipment" field="Handover" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Rejected Reason" field="Rejectedreason" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Enroll Type" field="Enrolltype" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Reviewer Note" field="Reviewernote" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                </DataTable>
            </div>
            <br />
        </div>
    );
};

export default AllEnrollments;
