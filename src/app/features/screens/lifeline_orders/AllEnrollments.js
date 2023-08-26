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
            SNo: "1",
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
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">All Enrollments</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className=" flex p-0 mx-3">
                    <div className="mr-5">
                        <p className="m-0 text-sm font-semibold">Date Range</p>
                        <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} showIcon selectionMode="range" readOnlyInput className="w-25rem" style={{ width: "5px" }} />
                    </div>
                    <div>
                        <p className="m-0 text-sm font-semibold ">Search</p>
                        <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Customer F Name, L Name" className="w-25rem text-base" />
                    </div>
                </div>
                <div className=" flex p-0 mx-3">
                    <div className="mr-5">
                        <p className="m-0 text-sm font-semibold ">Master</p>
                        <Dropdown placeholder="Select Master" value={master} options={masterOptions} onChange={(e) => setMaster(e.value)} optionLabel="name" className="w-25rem flex align-items-center" />
                    </div>
                    <div>
                        <p className="m-0 text-sm font-semibold ">Distributor</p>
                        <Dropdown placeholder="Select Distributor" value={distributor} options={distributorOptions} onChange={(e) => setDistributor(e.value)} optionLabel="name" className="w-25rem flex align-items-center" />
                    </div>
                </div>
                <div className=" flex p-0 mx-3">
                    <div className="mr-5">
                        <p className="m-0 text-sm font-semibold ">Retailer</p>
                        <Dropdown placeholder="Select Retailer" value={retailer} options={retailerOptions} onChange={(e) => setRetailer(e.value)} optionLabel="name" className="w-25rem flex align-items-center" />
                    </div>
                    <div>
                        <p className="m-0 text-sm font-semibold ">Employee</p>
                        <Dropdown placeholder="Select Employee" value={employee} options={employeeOptions} onChange={(e) => setEmloyee(e.value)} optionLabel="name" className="w-25rem flex align-items-center text-sm" />
                    </div>
                </div>
                <div className="flex justify-content-end pt-1">
                    <Button label="Submit" className=" w-15rem bg-green-200 border-none" />
                </div>
            </div>
            <div className="card p-3 mx-5 border-noround bg-green-200 ">
                <p className="text-sm font-semibold">Search Result: 0</p>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">
                    <InputText className="w-15rem my-2 text-base h-2.5rem" placeholder="Keyword Search"></InputText>
                </div>
                <div className="">
                    <DataTable showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="SNo" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Option" field="Option" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Enrollment ID" field="EnrollmentID" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Zip" field="Zip" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="DOB" field="Dob" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Plan Name" field="Planname" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Plan Price" field="Planprice" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Phone Cost" field="Phonecost" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Amount Paid by Customer" field="Amountpaid" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Posting Date" field="Postingdate" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="ESN Number" field="EsnNumber" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Telephone Number" field="Telephone" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Activation Call" field="Activationcall" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Activation Call Date Time" field="Activationcalldatetime" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Status" field="Status" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Handover Equipment" field="Handover" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Rejected Reason" field="Rejectedreason" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Enroll Type" field="Enrolltype" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Reviewer Note" field="Reviewernote" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                    </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default AllEnrollments;
