import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Label_Downloads = () => {
    const [apiData, setApiData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [model, setModel] = useState("");
    const [user, setUser] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [downloadType, setDownloadType] = useState("");
    const [labels, setLabels] = useState([]);
    const Billing_models = [
        { name: "Prepaid", value: "Prepaid" },
        { name: "Postpaid", value: "Postpaid" },
        { name: "ACP", value: "ACP" },
    ];

    const serviceProvider = localStorage.getItem("userData");
    const userData = JSON.parse(serviceProvider);
    useEffect(() => {
        const roleData = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${userData?.company}`);
                const data = response?.data?.data;
                setRoleData(data);
                console.log("roleData api", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        roleData();
    }, []);
    // label api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedDateFrom = dateFrom ? new Date(dateFrom).toISOString().slice(0, 19) : "";
                const formattedDateTo = dateTo ? new Date(dateTo).toISOString().slice(0, 19) : "";
                // const response = await Axios.get(`${BASE_URL}/api/web/bulkDownloads/label?startDate=2023-03-05T00:00:00&endDate=2024-03-06T23:59:59&role=6533c0f9027ce82576113aac&billingModel=Postpaid`);
                const response = await Axios.get(`${BASE_URL}/api/web/bulkDownloads/label?startDate=${formattedDateFrom}&endDate=${formattedDateTo}&role=${user}&billingModel=${model}`);
                const data = response?.data;
                console.log("get api data ", data);
                setApiData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dateFrom, dateTo, user, model]);
    console.log("api data", apiData);

    // const handleDownload = () => {
    //     const dataToDownload = filteredData.map((filteredData) => ({
    //         Users: filteredData.name,
    //         "Download Type": filteredData["downloadtype"],
    //         Counter: filteredData.counter,
    //     }));

    //     const csvData = "data:text/csv;charset=utf-8," + Object.keys(dataToDownload[0]).join(",") + "\n" + dataToDownload.map((row) => Object.values(row).join(",")).join("\n");

    //     const encodedUri = encodeURI(csvData);
    //     const link = document.createElement("a");
    //     link.setAttribute("href", encodedUri);
    //     link.setAttribute("download", "label_downloads.csv");
    //     document.body.appendChild(link);
    //     link.click();
    // };
    console.log("userdata", user);
    console.log("apiData", apiData);
    // const handleLabels = async (rowData) => {
    //     console.log("handleLabels", rowData.labels);
    //     setLabels([...labels, ...rowData.labels]); // Appending new labels to the existing ones
    //     try {
    //         const labelResponse = await Axios.post(`${BASE_URL}/api/web/bulkDownloads/labelsDownload`, { labels });
    //         console.log("Labels sent successfully:", labelResponse.data);
    //         // Handle response as needed
    //     } catch (error) {
    //         console.error("Error sending labels:", error);
    //     }
    // };
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
                    <Dropdown value={user} onChange={(e) => setUser(e.value)} options={roleData} optionLabel="role" optionValue="_id" editable placeholder="Select User" className="w-full md:w-14rem " />
                </div>
                <div className="p-field col-12 md:col-3 " style={{ marginLeft: "20rem" }}>
                    <label className="Label__Text">Date From</label>
                    <Calendar value={dateFrom} onChange={(e) => setDateFrom(e.value)} />
                </div>
                <div className="p-field col-12 md:col-3 " style={{ marginLeft: "40rem", marginTop: "-5rem" }}>
                    <label className="Label__Text">Date To</label>
                    <Calendar value={dateTo} onChange={(e) => setDateTo(e.value)} />
                </div>
                {/* <Button label="Apply Filters" style={{ marginLeft: "20.5rem", marginTop: "0.5rem", position: "absolute" }} /> */}
            </Card>
            <div className="card" style={{ width: "62rem", marginLeft: "5rem", marginTop: "4rem" }}>
                <Button label="Download" style={{ marginLeft: "50.5rem", marginTop: "0.3rem", position: "absolute" }} />
                <DataTable value={apiData} style={{ width: "50rem" }}>
                    <Column field="user.name" header="Users"></Column>
                    <Column field="labels.length" header="Counter"></Column>
                    <Column
                        field="Action"
                        body={(rowData) => (
                            <Button
                                className="bg-blue-700 pl-2 pr-2 pt-1 pb-1 border-none"
                                onClick={() => {
                                    rowData?.labels.map(() => {
                                        setLabels(rowData?.labels);
                                    });
                                    handleLabels(rowData);
                                }}
                            >
                                Download
                            </Button>
                        )}
                    />
                </DataTable>
            </div>
        </Card>
    );
};

export default Label_Downloads;

// const downloadLabel = () => {
//     const path = cpData?.label;

//     const trimmedPath = path.replace(/^uploads\//, "");
//     const fileUrl = `${BASE_URL}/${trimmedPath}`;

//     const link = document.createElement("a");
//     link.href = fileUrl;
//     link.setAttribute("target", "_blank"); // Open in new tab
//     link.setAttribute("download", ""); // Indicate that the file should be downloaded
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// };
