import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { ToastContainer, toast } from "react-toastify";
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
    const statusValue = [
        { name: "Free", value: "Free" },
        { name: "inUse", value: "inUse" },
    ];

    const serviceProvider = localStorage.getItem("userData");
    const userData = JSON.parse(serviceProvider);
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
        const fetchData = async () => {
            const formattedDateFrom = dateFrom ? new Date(dateFrom).toISOString().slice(0, 19) : "";
            const formattedDateTo = dateTo ? new Date(dateTo).toISOString().slice(0, 19) : "";
            try {
                const requestData = {
                    startDate: formattedDateFrom,
                    endDate: formattedDateTo,
                    billingModel: model,
                    inventoryType: model,
                    status: status,
                };
                const response = await Axios.post(`${BASE_URL}/api/web/inventoryDownloads/getInventory`);
                console.log("response for invnetory", response);
            } catch (error) {
                console.error("Error fetching data:", error?.response?.data);
            }
        };
        fetchData();
    });
    useEffect(() => {
        const fetchBillingModels = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${userData?.company}`);
                const data = response?.data?.data;
                setBillingModel(data); // Set billing model options
                console.log("billing model api", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchBillingModels(); // Call the function to fetch billing models
    }, []);
    // useEffect(() => {
    //     const fetchAllInventory = async () => {
    //         try {
    //             const response = await Axios.get(`${BASE_URL}/api/inventoryType/all?serviceProvider=${userData?.company}`);
    //             const data = response?.data;
    //             setBillingModelOptions(data); // Set billing model options
    //             console.log("  All inventories", data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchAllInventory(); // Call the function to fetch billing models
    // }, []);
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

    const handleLabels = async (rowData) => {
        try {
            const labelResponse = await Axios.post(`${BASE_URL}/api/web/bulkDownloads/labelsDownload`, { labels: rowData.labels }, { responseType: "blob" });
            const blob = new Blob([labelResponse.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "labels.zip");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error sending labels:", error);
        }
    };

    // console.log("User ids from frontend", user);
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
                    <DataTable value={apiData} style={{ width: "50rem" }}>
                        <Column field="user.name" header="Users"></Column>
                        <Column field="labels.length" header="Counter"></Column>
                        <Column
                            field="Action"
                            body={(rowData) => {
                                return (
                                    <Button
                                        className="bg-blue-700 pl-2 pr-2 pt-1 pb-1 border-none"
                                        onClick={() => {
                                            let labelData = rowData?.labels;
                                            labelData.map(() => {
                                                setLabels(rowData?.labels);
                                            });
                                            handleLabels(rowData);
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
