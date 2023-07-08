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
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Bulk Port in Report</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Date Range</p>
                        <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Search By Uploaded By:</p>
                        <InputText value={search} onChange={(e) => setSearch(e.value)} style={{ width: "23rem" }} />
                    </div>
                    <div className="p-1">
                        <Button label="Search" className="mt-4 text-sm border-none bg-green-200 w-7rem" />
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
                        <Column header="Batch ID" field="Batchid" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Uploaded Date" field="Uploaddate" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Uploaded By" field="Uploadby" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Total Uploaded" field="Totalupload" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Portin Request Success" field="Portinsuccess" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Portin Failed" field="Portinfailed" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Portin In Process" field="Portinprocess" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Portin Completed" field="Portincomplete" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                    </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default BulkPortin;
