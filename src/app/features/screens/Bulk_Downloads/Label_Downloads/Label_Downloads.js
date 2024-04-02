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
const Label_Downloads = () => {
    const [apiData, setApiData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [billingModel, setBillingModel] = useState([]);
    const [model, setModel] = useState("");
    const [user, setUser] = useState([]);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
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
                const response = await Axios.get(`${BASE_URL}/api/web/role/getLabelRole?serviceProvider=${userData?.company}`);
                const data = response?.data?.data;
                setRoleData(data);
                console.log("roleData api", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        roleData();
    }, []);
    useEffect(() => {
        const Billing_models = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${userData?.company}`);

                const data = response?.data?.data;
                setRoleData(data);
                console.log("billing model api", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        Billing_models();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedDateFrom = dateFrom ? new Date(dateFrom).toISOString().slice(0, 19) : "";
                const formattedDateTo = dateTo ? new Date(dateTo).toISOString().slice(0, 19) : "";

                const requestData = {
                    startDate: formattedDateFrom,
                    endDate: formattedDateTo,
                    role: user,
                    billingModel: model,
                };
                const response = await Axios.post(`${BASE_URL}/api/web/bulkDownloads/label`, requestData);
                const data = response?.data;
                if (response?.status === 200 || response?.status === 201) {
                    setApiData(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error?.response?.data);
                toast.error(error?.response?.data?.error);
            }
        };
        fetchData();
    }, [dateFrom, dateTo, user, model]);

    // console.log("api data", apiData);
    // console.log("userdata", user);
    // console.log("apiData", apiData);

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
    const handleAllDownload = async () => {
        try {
            let allLabels = [];
            // Iterate over each row in the table
            apiData.forEach(async (rowData) => {
                // Accumulate labels into the allLabels array
                allLabels = allLabels.concat(rowData.labels);
            });

            // Call the API to download labels
            const labelResponse = await Axios.post(`${BASE_URL}/api/web/bulkDownloads/labelsDownload`, { labels: allLabels }, { responseType: "blob" });
            const blob = new Blob([labelResponse.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "all_labels.zip");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error sending labels:", error);
        }
    };
    console.log("User ids from frontend", user);

    return (
        <>
            <ToastContainer />
            <Card className="pl-0 pr-0">
                <div>
                    <h1>Label Downloads</h1>
                </div>
                <Card style={{ height: "18rem" }}>
                    <div className="p-field col-12 md:col-3" style={{ marginLeft: "7rem" }}>
                        <label className="Label__Text">Billing Model</label> <br />
                        <br />
                        <Dropdown value={model} onChange={(e) => setModel(e.value)} options={Billing_models} optionLabel="name" placeholder="Select Model" className="w-full md:w-14rem " />
                    </div>
                    <div className="p-field col-12 md:col-3" style={{ marginLeft: "30rem", marginTop: "-6.5rem" }}>
                        <label className="Label__Text">Add Users</label>
                        <br />
                        <br />
                        <MultiSelect value={user} onChange={(e) => setUser(e.value)} options={roleData} optionLabel="role" display="chip" placeholder="Select User" maxSelectedLabels={3} optionValue="_id" className="w-full md:w-20rem" />
                    </div>
                    <div className="p-field col-12 md:col-3 " style={{ marginLeft: "7rem", marginTop: "2rem" }}>
                        <label className="Label__Text">Date From</label>
                        <br />
                        <br />
                        <Calendar value={dateFrom} onChange={(e) => setDateFrom(e.value)} />
                    </div>
                    <div className="p-field col-12 md:col-3 " style={{ marginLeft: "30rem", marginTop: "-6.5rem" }}>
                        <label className="Label__Text">Date To</label>
                        <br />
                        <br />
                        <Calendar value={dateTo} onChange={(e) => setDateTo(e.value)} />
                    </div>
                </Card>
                <div className="card" style={{ width: "62rem", marginLeft: "5rem", marginTop: "4rem" }}>
                    <Button label="Download" onClick={handleAllDownload} style={{ marginLeft: "50.5rem", marginTop: "0.3rem", position: "absolute" }} />
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

export default Label_Downloads;
