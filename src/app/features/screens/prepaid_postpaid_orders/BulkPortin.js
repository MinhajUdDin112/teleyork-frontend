import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const BulkPortin = () => {
    const [dateRange, setDateRange] = useState(null);
    const [search, setSearch] = useState(null);

    const tableData = [
        {
            SNo: "1",
            Batchid: "",
            Uploaddate: "",
            Uploadby: "",
            Totalupload: "",
            Portinsuccess: "",
            Portinfailed: "",
            Portinprocess: "",
            Portincomplete: "",
        },
    ];

    return (
        <div className="card p-0 border-noround">
            <div className="card bg-teal-300 px-4 py-2 border-noround">
                <p className="text-xl font-medium text-0">Bulk Port in Report</p>
            </div>
            <div className="flex flex-wrap mx-5 my-3">
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Date Range</p>
                    <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "25rem" }} />
                </div>
                <div className="mb-3 mr-3">
                    <p className="m-0 pb-1 text-sm font-semibold ">Search By Uploaded By:</p>
                    <InputText value={search} onChange={(e) => setSearch(e.value)} style={{ width: "25rem" }} />
                </div>
                <div>
                    <Button label="Search" className="mt-4 text-sm" />
                </div>
            </div>
            <div className="mx-5">
                <DataTable value={tableData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="SNo" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Batch ID" field="Batchid" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Uploaded Date" field="Uploaddate" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Uploaded By" field="Uploadby" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Total Uploaded" field="Totalupload" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Portin Request Success" field="Portinsuccess" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Portin Failed" field="Portinfailed" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Portin In Process" field="Portinprocess" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    <Column header="Portin Completed" field="Portincomplete" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                </DataTable>
            </div>
            <br />
        </div>
    );
};

export default BulkPortin;
