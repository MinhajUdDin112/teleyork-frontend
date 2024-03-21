import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import Papa from "papaparse";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Reports = () => {
    const [value, setValue] = useState("");
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [dates, setDates] = useState([]);
    const [personalInformation, setPersonalInformation] = useState([]);
    const [planInformation, setPlanInformation] = useState([]);
    const [miscellaneous, setMiscellaneous] = useState([]);
    const [visible, setVisible] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [id, setId] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [enteredDetails, setEnteredDetails] = useState({
        "Report Name": "",
        "Date From": "",
        "Date To": "",
        Dates: [],
        "Personal Information": [],
        "Plan Information": [],
        Miscellaneous: [],
    });

    const Dates = [
        { name: "Order Create Date", value: "OrderCreateDate" },
        { name: "QA Approval Date", value: "QAApprovalDate" },
        { name: "QA Reject Date", value: "QARejectDate" },
        { name: "ESN Assign Date", value: "ESNAssignDate" },
        { name: "Label Create Date", value: "LabelCreateDate" },
        { name: "Invoice Create Date", value: "InvoiceCreateDate" },
        { name: "Label Print Date", value: "LabelPrintDate" },
        { name: "Package Delivered Date", value: "PackageDeliveredDate" },
        { name: "ESN Activation Date", value: "ESNActivationDate" },
        { name: "Account Activation Date (Internally)", value: "AccountActivationDate" },
        { name: "Plan Activation Date", value: "PlanActivationDate" },
        { name: "Plan Expiration Date", value: "PlanExpirationDate" },
        { name: "Disconnection Date", value: "DisconnectionDateReason" },
        { name: "Disconnection Reason", value: "DisconnectionReason" },
    ];

    const personalInformationValues = [
        { name: "First Name", value: "FirstName" },
        { name: "Last Name", value: "Lastname" },
        { name: "Middle Initial", value: "MiddleInitial" },
        { name: "Suffix", value: "Suffix" },
        { name: "SSN", value: "SSN" },
        { name: "Date of Birth", value: "DateOfBirth" },
        { name: "Contact Number", value: "ContactNumber" },
        { name: "Email", value: "Email" },
        { name: "Alternate Number", value: "AlternateNumber" },
        { name: "Address 1", value: "Address1" },
        { name: "Address 2, ", value: "Address2" },
        { name: "City", value: "City" },
        { name: "State", value: "State" },
        { name: "Zip Code", value: "Zipcode" },
        { name: "Mailing Address 1", value: "MailingAddress1" },
        { name: "Mailing Address 2", value: "MailingAddress2" },
        { name: "Mailing City, ", value: "MailingCity" },
        { name: "Mailing State,", value: "MailingState" },
        { name: "Mailing Zip Code,", value: "MailingZipCode" },
        { name: "PO Box Address", value: "PoBocAddress" },
        { name: "Account ID", value: "AccountID" },
        { name: "Enrolment ID", value: "EnrolmentID" },
    ];

    const planInformationValues = [
        { name: "ESN Number", value: "ESNNumber" },
        { name: "IMEI Number", value: "IMEINumber" },
        { name: "MDN", value: "MDN" },
        { name: "Plan Name ", value: "PlanName" },
        { name: "Plan Code", value: "PlanCode" },
        { name: "PWG Customer ID", value: "PWGCustomer" },
        { name: "Carrier", value: "Carrier" },
        { name: "Line Status", value: "LineStatus" },
    ];

    const miscellaneousValues = [
        { name: "Created by", value: "CreatedBy" },
        { name: "QA Agent (Assigned)", value: "QAAgentAssigned" },
        { name: "QA Agent (Approved By)", value: "QAAgentApprovedBy" },
        { name: "QA Agent (Rejected By)", value: "QAAgentRejectedBy" },
    ];

    const formatDate = (date) => {
        return date ? date.toISOString() : "";
    };

    const handleInputChange = (field, newValue) => {
        setEnteredDetails((prevState) => ({
            ...prevState,
            [field]: newValue instanceof Date ? formatDate(newValue) : newValue,
        }));
    };
    const handleSubmit = () => {
        const selectedFields = Object.keys(enteredDetails).filter((key) => enteredDetails[key].length > 0);

        // Create an object to hold the data for each row
        const rowData = {};

        // Iterate over each selected field
        selectedFields.forEach((field) => {
            // If the field has multiple selected values
            if (Array.isArray(enteredDetails[field])) {
                // Iterate over each selected value and assign it to the corresponding field in the rowData object
                enteredDetails[field].forEach((value, index) => {
                    rowData[`${field}_${index + 1}`] = value; // Use index + 1 to start from 1 instead of 0
                });
            } else {
                // If the field has a single selected value, assign it directly to the corresponding field in the rowData object
                rowData[field] = enteredDetails[field];
            }
        });

        // Convert the rowData object to an array of values
        const rowValues = Object.values(rowData);

        // Convert the rowValues array to a CSV string using PapaParse
        const csvString = Papa.unparse([rowValues]);

        // Prepend "CUSTOMER INFORMATION" to the CSV data
        let csvData = "CUSTOMER INFORMATION\n";

        // Append the "Report Creation Date" with the current date
        const currentDate = new Date().toISOString().slice(0, 10);
        csvData += `Report Creation Date,${currentDate}\n\n`;

        // Append the CSV data
        csvData += csvString;

        // Create a Blob containing the CSV string
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        if (link.download !== undefined) {
            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);
            // Set the link's href and download attributes
            link.setAttribute("href", url);
            link.setAttribute("download", "report.csv");
            // Hide the link
            link.style.visibility = "hidden";
            // Append the link to the document body
            document.body.appendChild(link);
            // Click the link to trigger the download
            link.click();
            // Remove the link from the document body
            document.body.removeChild(link);
        }
    };

    // add template to database
    const getAllData = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/web/reportDownload/getAllData`);
            const data = await response?.data?.result;
            console.log(data);
            if (response?.status === 200 || response?.status === 201) {
                const successMessage = response?.data?.msg;
                console.log("Data fetched successfully:", successMessage);
                setApiData(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error?.response?.data);
            toast.error(error?.response?.data?.error);
        }
    };
    // Fetch all data on component mount
    useEffect(() => {
        getAllData();
    }, []);

    const handleTemplate = async () => {
        try {
            const formattedDateFrom = dateFrom ? new Date(dateFrom).toISOString().slice(0, 19) : "";
            const formattedDateTo = dateTo ? new Date(dateTo).toISOString().slice(0, 19) : "";

            const dataToSend = {
                reportName: value,
                startDate: formattedDateFrom,
                endDate: formattedDateTo,
                dates: dates,
                personalInformation: personalInformation,
                planInformation: planInformation,
                miscellaneous: miscellaneous,
            };
            const response = await Axios.post(`${BASE_URL}/api/web/reportDownload/add`, dataToSend);
            const data = await response?.data;
            console.log(data);
            if (response?.status === 200 || response?.status === 201) {
                const successMessage = response?.data?.msg;
                console.log("Data stored successfully:", successMessage);
                toast.success(successMessage);
                // After saving the template, fetch all data again to update the table
                getAllData();
            }
        } catch (error) {
            console.error("Error fetching data:", error?.response?.data);
            toast.error(error?.response?.data?.error);
        }
    };

    // get all data and show in table
    useEffect(() => {
        const getAllData = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/reportDownload/getAllData`);
                const data = await response?.data?.result;
                console.log(data);
                if (response?.status === 200 || response?.status === 201) {
                    const successMessage = response?.data?.msg;
                    console.log("Data fetched successfully:", successMessage);
                    setApiData(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error?.response?.data);
                toast.error(error?.response?.data?.error);
            }
        };
        getAllData();
    }, []);
    const DateFormat = (dateString) => {
        const date = new Date(dateString);
        return date;
    };
    // edit api
    const handleEdit = async (_id) => {
        try {
            console.log("Row id is:", _id);
            setId(_id);
            const response = await Axios.get(`${BASE_URL}/api/web/reportDownload/getOne/${_id}`);
            const data = response?.data?.result;
            console.log("Data for row:", data);
            console.log("Start Date (Original):", data.startDate);
            console.log("End Date (Original):", data.endDate);
            setValue(data.reportName);
            setDateFrom(DateFormat(data.startDate));
            console.log("start date formatted", DateFormat(data.startDate));
            setDateTo(DateFormat(data.endDate));
            console.log("end date formatted", DateFormat(data.endDate));
            setDates(data.dates);
            setPersonalInformation(data.personalInformation);
            setPlanInformation(data.planInformation);
            setMiscellaneous(data.miscellaneous);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data");
        }
    };

    const handleDelete = async (_id) => {
        try {
            console.log("Delete row id", _id);
            const response = await Axios.delete(`${BASE_URL}/api/web/reportDownload/delete/${_id}`);
            if (response.status === 200) {
                toast.success("Data deleted successfully");
                setApiData(apiData.filter((row) => row._id !== _id));
            } else {
                toast.error("Error deleting data");
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            toast.error("Error deleting data");
        }
    };
    const editAction = (rowData) => {
        return (
            <>
                <div className="flex align-items-center">
                    <Button icon="pi pi-user-edit" rounded outlined onClick={() => handleEdit(rowData._id)} />
                </div>
            </>
        );
    };
    const deleteAction = (rowData) => {
        return (
            <>
                <div className="flex align-items-center">
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleDelete(rowData._id)} />
                </div>
            </>
        );
    };

    const handleUpdate = async () => {
        try {
            const formattedDateFrom = dateFrom ? new Date(dateFrom).toISOString().slice(0, 19) : "";
            const formattedDateTo = dateTo ? new Date(dateTo).toISOString().slice(0, 19) : "";

            const dataToUpdate = {
                reportName: value,
                startDate: formattedDateFrom,
                endDate: formattedDateTo,
                dates: dates,
                personalInformation: personalInformation,
                planInformation: planInformation,
                miscellaneous: miscellaneous,
            };

            const response = await Axios.put(`${BASE_URL}/api/web/reportDownload/edit/${id}`, dataToUpdate);
            // console.log("selected row to update", selectedRowData._id);
            const updatedData = await response?.data?.result;
            console.log(updatedData);
            if (response?.status === 200 || response?.status === 201) {
                const successMessage = response?.data?.msg;
                console.log("Data updated successfully:", successMessage);
                toast.success(successMessage);
                // After updating the template, fetch all data again to update the table
                getAllData();
            }
            setId("");
        } catch (error) {
            console.error("Error updating data:", error?.response?.data);
            toast.error(error?.response?.data?.error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Card style={{ height: "33rem" }}>
                <div className="p-field col-12 md:col-3">
                    <label className="Label__Text"> Report Name</label> <br />
                    <InputText
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            handleInputChange("Report Name", e.target.value);
                        }}
                    />
                </div>

                <Button label="Save Template" onClick={handleTemplate} style={{ marginLeft: "25.5rem", marginTop: "-3.3rem", position: "absolute" }} />
                <Button label="Update Template" onClick={handleUpdate} style={{ marginLeft: "38.5rem", marginTop: "-3.3rem", position: "absolute" }} />

                <div className="p-field col-12 md:col-3 " style={{ marginTop: "2rem" }}>
                    <label className="Label__Text">Date From</label>
                    <br />
                    <Calendar
                        value={dateFrom}
                        onChange={(e) => {
                            console.log(e.value);
                            setDateFrom(e.value);
                            handleInputChange("Date From", e.value);
                        }}
                    />
                </div>
                <div className="p-field col-12 md:col-3 " style={{ marginLeft: "25rem", marginTop: "-5rem" }}>
                    <label className="Label__Text">Date To</label>
                    <br />
                    <Calendar
                        value={dateTo}
                        onChange={(e) => {
                            setDateTo(e.value);
                            handleInputChange("Date To", e.value);
                        }}
                    />
                </div>
                <br />
                <div className="p-field col-12 md:col-3">
                    <label className="Label__Text"> Dates</label>
                    <br />
                    <MultiSelect
                        value={dates}
                        onChange={(e) => {
                            setDates(e.value);
                            handleInputChange("Dates", e.value);
                        }}
                        options={Dates}
                        optionLabel="name"
                        display="chip"
                        placeholder="Select Dates"
                        maxSelectedLabels={3}
                        optionValue="value"
                        className="w-full md:w-20rem"
                    />
                </div>
                <div className="p-field col-12 md:col-3" style={{ marginLeft: "25rem", marginTop: "-5.2rem" }}>
                    <label className="Label__Text"> Personal Information</label>
                    <br />
                    <MultiSelect
                        value={personalInformation}
                        onChange={(e) => {
                            setPersonalInformation(e.value);
                            handleInputChange("Personal Information", e.value);
                        }}
                        options={personalInformationValues}
                        optionLabel="name"
                        display="chip"
                        placeholder="Select Personal Information"
                        maxSelectedLabels={3}
                        optionValue="value"
                        className="w-full md:w-20rem"
                    />
                </div>
                <br />
                <div className="p-field col-12 md:col-3">
                    <label className="Label__Text"> Plan Information</label>
                    <br />
                    <MultiSelect
                        value={planInformation}
                        onChange={(e) => {
                            setPlanInformation(e.value);
                            handleInputChange("Plan Information", e.value);
                        }}
                        options={planInformationValues}
                        optionLabel="name"
                        display="chip"
                        placeholder="Select Plan Information"
                        maxSelectedLabels={3}
                        optionValue="value"
                        className="w-full md:w-20rem"
                    />
                </div>
                <div className="p-field col-12 md:col-3" style={{ marginLeft: "25rem", marginTop: "-5.2rem" }}>
                    <label className="Label__Text"> Miscellaneous</label>
                    <br />
                    <MultiSelect
                        value={miscellaneous}
                        onChange={(e) => {
                            setMiscellaneous(e.value);
                            handleInputChange("Miscellaneous", e.value);
                        }}
                        options={miscellaneousValues}
                        optionLabel="name"
                        display="chip"
                        placeholder="Select Miscellaneous"
                        maxSelectedLabels={3}
                        optionValue="value"
                        className="w-full md:w-20rem"
                    />
                </div>
                <Button label="Check Entered Details" icon="pi pi-external-link" onClick={() => setVisible(true)} style={{ marginLeft: "25.5rem", marginTop: "0.7rem" }} />
                <Dialog header="Entered Details" visible={visible} style={{ width: "50vw" }} onHide={() => setVisible(false)}>
                    <table className="p-table">
                        <tbody>
                            {Object.entries(enteredDetails).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{Array.isArray(value) ? value.join(", ") : value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button label="Close" onClick={() => setVisible(false)} />
                </Dialog>
                <Button label="Submit" style={{ marginLeft: "0.8rem", marginTop: "0.6rem", position: "absolute" }} onClick={handleSubmit} />
            </Card>
            <div className="card" style={{ marginTop: "1rem" }}>
                <DataTable value={apiData} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="reportName" header="Report Name"></Column>
                    <Column body={editAction} header="Edit"></Column>
                    <Column body={deleteAction} header="Delete"></Column>
                    <Column
                        field="Action"
                        body={() => {
                            return <Button className="bg-blue-700 pl-2 pr-2 pt-1 pb-1 border-none">Download</Button>;
                        }}
                    />
                </DataTable>
            </div>
        </>
    );
};

export default Reports;
