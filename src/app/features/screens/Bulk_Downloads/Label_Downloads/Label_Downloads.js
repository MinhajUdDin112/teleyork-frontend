import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
const Label_Downloads = () => {
    const [apiData, setApiData] = useState([]);
    const [model, setModel] = useState("");
    const [user, setUser] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [downloadType, setDownloadType] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const Billing_models = [{ name: "Prepaid" }, { name: "Postpaid" }, { name: "ACP" }];
    const User = [{ name: "CSA" }, { name: "TeamLead" }, { name: "QA" }, { name: "All Users" }];
    // const DownloadType = [{ name: "Label" }, { name: "Invoices" }, { name: "Inventory" }];

    // calling api

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://65e5a109d7f0758a76e6e5ab.mockapi.io/api/labels/user", {
                method: "GET",
            });
            const data = await response.json();
            setApiData(data);
            setFilteredData(data);
            console.log("api data", data);
        };
        fetchData();
    }, []);

    const handleDownload = () => {
        // Construct data for download
        const dataToDownload = filteredData.map((filteredData) => ({
            Users: filteredData.name,
            "Download Type": filteredData["downloadtype"],
            Counter: filteredData.counter,
        }));

        // Convert data to CSV format
        const csvData = "data:text/csv;charset=utf-8," + Object.keys(dataToDownload[0]).join(",") + "\n" + dataToDownload.map((row) => Object.values(row).join(",")).join("\n");

        // Create download link
        const encodedUri = encodeURI(csvData);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "label_downloads.csv");
        document.body.appendChild(link);

        // Trigger download
        link.click();
    };
    // consoling all the data which user enter in the dashboard of bulk download

    // console.log("model", model);
    // console.log("user", user);
    // console.log("dateFrom", dateFrom);
    // console.log("dateTo", dateTo);
    // console.log("downloadType", downloadType);

    const handleFilter = () => {
        // Convert selected date values to JavaScript Date objects
        const fromDate = dateFrom ? new Date(dateFrom) : null;
        const toDate = dateTo ? new Date(dateTo) : null;

        // Filter data based on start and end date
        const filtered = apiData.filter((data) => {
            const startDate = new Date(data.startdate);
            const endDate = new Date(data.enddate);
            return (!fromDate || startDate >= fromDate) && (!toDate || endDate <= toDate);
        });

        // Update filtered data state
        setFilteredData(filtered);
    };
    return (
        <Card className="pl-0 pr-0">
            <div>
                <h1>Label Downloads</h1>
            </div>
            <Card style={{ height: "18rem" }}>
                <div className="p-field col-12 md:col-3" style={{ marginLeft: "20rem" }}>
                    <label className="Label__Text">Billing Model</label>
                    <Dropdown value={model} onChange={(e) => setModel(e.value)} options={Billing_models} optionLabel="name" editable placeholder="Select Model" className="w-full md:w-14rem " />
                </div>
                <div className="p-field col-12 md:col-3" style={{ marginLeft: "40rem", marginTop: "-5.1rem" }}>
                    <label className="Label__Text">Add Users</label>
                    <Dropdown value={user} onChange={(e) => setUser(e.value)} options={User} optionLabel="name" editable placeholder="Select User" className="w-full md:w-14rem " />
                </div>
                <div className="p-field col-12 md:col-3 " style={{ marginLeft: "20rem" }}>
                    <label className="Label__Text">Date From</label>
                    <Calendar value={dateFrom} onChange={(e) => setDateFrom(e.value)} />
                </div>
                <div className="p-field col-12 md:col-3 " style={{ marginLeft: "40rem", marginTop: "-5rem" }}>
                    <label className="Label__Text">Date To</label>
                    <Calendar value={dateTo} onChange={(e) => setDateTo(e.value)} />
                </div>
                {/* <div className="p-field col-12 md:col-3" style={{ marginLeft: "20rem", paddingTop: "0.5rem" }}>
                    <label className="Label__Text">
                        Download Type 
                    </label>
                    <Dropdown value={downloadType} onChange={(e) => setDownloadType(e.value)} options={DownloadType} optionLabel="name" editable placeholder="Select Download Type" className="w-full md:w-14rem " />
                </div> */}
                <Button label="Apply Filters" onClick={handleFilter} style={{ marginLeft: "20.5rem", marginTop: "0.5rem", position: "absolute" }} />
            </Card>
            <div className="card" style={{ width: "62rem", marginLeft: "5rem", marginTop: "4rem" }}>
                <Button label="Download" onClick={handleDownload} style={{ marginLeft: "50.5rem", marginTop: "0.3rem", position: "absolute" }} />
                <DataTable value={filteredData} style={{ width: "50rem" }}>
                    <Column field="name" header="Users"></Column>
                    <Column field="downloadtype" header="Download Type"></Column>
                    <Column field="counter" header="Counter"></Column>
                </DataTable>
            </div>
        </Card>
    );
};

export default Label_Downloads;
