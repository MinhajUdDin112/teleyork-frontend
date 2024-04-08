import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { ToastContainer, toast } from "react-toastify";
import { Parser } from "json2csv";
import csvParser from "csv-parser";
import fs from "fs";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Inventory_Download = () => {
    const [apiData, setApiData] = useState([]);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [labels, setLabels] = useState([]);
    const [status, setStatus] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [inventoryTypes, setInventoryTypes] = useState([]);
    const [billingModel, setBillingModel] = useState("");
    const [model, setModel] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const statusValue = [
        { name: "Free", value: "Free" },
        { name: "inUse", value: "inUse" },
    ];

    const serviceProvider = localStorage.getItem("userData");
    const userData = JSON.parse(serviceProvider);
    useEffect(() => {
        const fetchData = async () => {
            const formattedDateFrom = dateFrom ? new Date(dateFrom).toISOString().slice(0, 19) : "";
            const formattedDateTo = dateTo ? new Date(dateTo).toISOString().slice(0, 19) : "";
            try {
                const requestData = {
                    startDate: formattedDateFrom,
                    endDate: formattedDateTo,
                    billingModel: model,
                    inventoryType: inventory,
                    status: status,
                };
                console.log("requestData:", requestData);
                const response = await Axios.post(`${BASE_URL}/api/web/inventoryDownloads/getInventory`, requestData);
                console.log("response for inventory", response);
                if (response?.status === 200 || response?.status === 201) {
                    setApiData(response?.data?.simsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error?.response?.data);
                toast.error(error?.response?.data?.error);
            }
        };
        fetchData();
    }, [dateFrom, dateTo, model, inventory, status]); // Include all dependencies in the dependency array
    useEffect(() => {
        const inventoryTypeData = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/inventoryType/all?serviceProvider=${userData?.company}`);
                const data = response?.data?.data;
                setInventoryTypes(data);
                console.log("roleData api", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        inventoryTypeData();
    }, []);
    useEffect(() => {
        const fetchBillingModels = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${userData?.company}`);
                const data = response?.data?.data;
                setBillingModel(data);
                console.log("billing model api", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchBillingModels(); // Call the function to fetch billing models
    }, []);
    const handleDownload = () => {
        // Format ESN numbers as strings directly in the data
        const apiDataFormatted = apiData.map((item) => ({
            ...item,
            esnNumber: String(item.esnNumber), // Convert ESN number to string
        }));

        // Verify ESN numbers after string conversion
        apiDataFormatted.forEach((item) => {
            console.log(typeof item.esnNumber, item.esnNumber);
        });

        const fields = ["billingModel", "InventoryType", "status", "esnNumber"]; // Include "esnNumber" field
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(apiDataFormatted);

        // Download CSV file
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "inventory_data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    console.log("billing model selected", model);
    console.log("inventory selected", inventory);
    console.log("status selected", status);
    console.log("api data", apiData);

    return (
        <>
            <ToastContainer />
            <Card className="pl-0 pr-0">
                <div>
                    <h1>Inventory Downloads</h1>
                </div>
                <Card style={{ height: "18rem" }}>
                    <div className="p-field col-12 md:col-3" style={{ marginLeft: "7rem" }}>
                        <label className="Label__Text">Billing Model</label> <br />
                        <br />
                        <Dropdown value={model} onChange={(e) => setModel(e.value)} options={billingModel} optionLabel="billingModel" optionValue="billingModel" placeholder="Select Model" className="w-full md:w-14rem " />
                    </div>
                    <div className="p-field col-12 md:col-3" style={{ marginLeft: "25rem", marginTop: "-6.5rem" }}>
                        <label className="Label__Text">Inventory Type</label>
                        <br />
                        <br />
                        <MultiSelect id="inventorySelect" value={inventory} onChange={(e) => setInventory(e.value)} options={inventoryTypes} optionLabel="inventoryType" display="chip" placeholder="Select Inventory" maxSelectedLabels={3} optionValue="inventoryType" className="w-full md:w-20rem" />
                    </div>
                    <div className="p-field col-12 md:col-3" style={{ marginLeft: "50rem", marginTop: "-6.2rem" }}>
                        <label className="Label__Text"> Status</label>
                        <br />
                        <br />
                        <MultiSelect value={status} onChange={(e) => setStatus(e.value)} options={statusValue} optionLabel="name" display="chip" placeholder="Select Status" maxSelectedLabels={3} className="w-full md:w-20rem" />
                    </div>
                    <div className="p-field col-12 md:col-3 " style={{ marginLeft: "7rem", marginTop: "2rem" }}>
                        <label className="Label__Text">Date From</label>
                        <br />
                        <br />
                        <Calendar value={dateFrom} onChange={(e) => setDateFrom(e.value)} />
                    </div>
                    <div className="p-field col-12 md:col-3 " style={{ marginLeft: "25rem", marginTop: "-6.5rem" }}>
                        <label className="Label__Text">Date To</label>
                        <br />
                        <br />
                        <Calendar value={dateTo} onChange={(e) => setDateTo(e.value)} />
                    </div>
                </Card>
                <div className="card" style={{ width: "62rem", marginLeft: "5rem", marginTop: "4rem" }}>
                    {/* <Button label="Download" onClick={handleAllDownload} style={{ marginLeft: "50.5rem", marginTop: "0.3rem", position: "absolute" }} /> */}
                    <DataTable value={apiData.slice(0, 1)} style={{ width: "50rem" }}>
                        <Column field="billingModel" header="Billing Model"></Column>
                        <Column field="InventoryType" header="Inventory Type"></Column>
                        <Column field="status" header="Status"></Column>
                        <Column
                            header="Counter"
                            body={() => <div>{apiData.length}</div>} // Display the length of apiData as counter
                        />{" "}
                        <Column
                            field="Action"
                            body={(rowData) => {
                                return (
                                    <Button
                                        className="bg-blue-700 pl-2 pr-2 pt-1 pb-1 border-none"
                                        onClick={() => {
                                            handleDownload(rowData);
                                        }}
                                    >
                                        Download
                                    </Button>
                                );
                            }}
                        />
                    </DataTable>
                </div>
            </Card>
        </>
    );
};

export default Inventory_Download;
