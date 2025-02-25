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
import CustomerInvoice from "./customer_invoice/customer_invoice";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Invoices_Downloads = () => {
    const [apiData, setApiData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [model, setModel] = useState("");
    const [user, setUser] = useState([]);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [invoicesData, setInvoicesData] = useState([]);
    const [customerIds, setCustomerIds] = useState([]);
    const [invoicesByCustomer, setInvoicesByCustomer] = useState({});
    const [userDetails, setUserDetails] = useState("");
    const [userId, setUserId] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
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
            } catch (error) {
            }
        };
        roleData();
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
                const response = await Axios.post(`${BASE_URL}/api/web/invoicesDownloads/invoices`, requestData);
                const data = response?.data;
                if (response?.status === 200 || response?.status === 201) {
                    setApiData(data);
                    const customerIds = data.flatMap((item) => item.customers.map((customer) => customer.customer._id));
                    setCustomerIds(customerIds);

                    setInvoicesData(invoicesByCustomer);
                }
            } catch (error) {
                toast.error(error?.response?.data?.error);
            }
        };
        fetchData();
    }, [dateFrom, dateTo, user, model]);
    useEffect(() => {
        const invoicesByCustomer = [];

        // Loop through the apiData
        apiData.forEach((item) => {
            item.customers.forEach((customer) => {
                const customerId = customer.customer._id;
                const invoices = customer.invoices;

                // Check if customerId already exists in invoicesByCustomer
                const existingCustomerIndex = invoicesByCustomer.findIndex((entry) => entry.customerid === customerId);
                if (existingCustomerIndex !== -1) {
                    // If customerId already exists, append invoices to existing entry
                    invoicesByCustomer[existingCustomerIndex].invoices.push(...invoices);
                } else {
                    // If not, create a new entry with customerid and invoices
                    invoicesByCustomer.push({
                        customerid: customerId,
                        invoices: invoices,
                    });
                }
            });
        });

        setInvoicesByCustomer(invoicesByCustomer);
    }, [apiData]);

    const handleDownload = async (rowData) => {
        setShowInvoice(true);
        const invoiceData = [];
        rowData.customers.forEach((customer) => {
            if (customer.invoices && customer.invoices.length > 0) {
                invoiceData.push(...customer.invoices);
            }
        });
        setInvoicesData(invoiceData);

        // Logging the specific user ID of the clicked row
        const userId = rowData.customers[0]?.customer?._id; // Assuming the user ID is stored in customer.customer._id
        setUserId(userId);
        const userDetailsResponse = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${userId}`);
        // const userDetails = userDetailsResponse.data;
        setUserDetails(userDetailsResponse.data);
        // Set the specific invoices data for downloading
        setInvoicesData(invoiceData);
    };

    return (
        <>
            <ToastContainer />
            <Card className="pl-0 pr-0">
                <div>
                    <h1>Invoices Downloads</h1>
                </div>
                <Card style={{ height: "18rem" }}>
                    <div className="p-field col-12 md:col-3" style={{ marginLeft: "7rem" }}>
                        <label className="Label__Text">Billing Model</label>
                        <br />
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
                    <DataTable value={apiData} style={{ width: "50rem" }}>
                        <Column field="user.name" header="Users"></Column>
                        <Column
                            body={(rowData) => {
                                return <>{rowData.customers.reduce((total, customer) => total + customer.invoiceCount, 0)}</>;
                            }}
                            header="Counter"
                        ></Column>
                        <Column
                            field="Action"
                            body={(rowData) => {
                                return (
                                    <Button onClick={() => handleDownload(rowData)} className="bg-blue-700 pl-2 pr-2 pt-1 pb-1 border-none">
                                        Downloads
                                    </Button>
                                );
                            }}
                        />
                    </DataTable>
                </div>
                {userId && showInvoice && <CustomerInvoice setShowInvoice={setShowInvoice} userId={userId} invoicesData={invoicesData} />}
            </Card>
        </>
    );
};

export default Invoices_Downloads;
