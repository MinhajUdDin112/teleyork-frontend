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
        { name: "Order Create Date", value: "createdAt" },
        { name: "QA Approval Date", value: "approvedAt" },
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
        { name: "First Name", value: "firstName" },
        { name: "Last Name", value: "lastName" },
        { name: "Middle Initial", value: "middleName" },
        { name: "Suffix", value: "suffix" },
        { name: "SSN", value: "SSN" },
        { name: "Date of Birth", value: "DOB" },
        { name: "Contact Number", value: "contact" },
        { name: "Email", value: "email" },
        { name: "Alternate Number", value: "alternateContact" },
        { name: "Address 1", value: "address1" },
        { name: "Address 2, ", value: "address2" },
        { name: "City", value: "city" },
        { name: "State", value: "state" },
        { name: "Zip Code", value: "zip" },
        { name: "Mailing Address 1", value: "mailingAddress1" },
        { name: "Mailing Address 2", value: "mailingAddress2" },
        { name: "Mailing City, ", value: "mailingCity" },
        { name: "Mailing State,", value: "mailingState" },
        { name: "Mailing Zip Code,", value: "mailingZip" },
        { name: "PO Box Address", value: "PoBoxAddress" },
        { name: "Account ID", value: "accountId" },
        { name: "Enrolment ID", value: "enrolmentId" },
    ];

    const planInformationValues = [
        { name: "ESN Number", value: "esn" },
        { name: "IMEI Number", value: "IMEI" },
        { name: "MDN", value: "MDN" },
        { name: "Plan Name ", value: "name" },
        { name: "Plan Code", value: "planId" },
        { name: "PWG Customer ID", value: "customerId" },
        { name: "Carrier", value: "Carrier" },
        { name: "Line Status", value: "status" },
    ];

    const miscellaneousValues = [
        { name: "Created by", value: "createdBy" },
        { name: "QA Agent (Assigned)", value: "assignToQa" },
        { name: "QA Agent (Approved By)", value: "approvedBy" },
        { name: "QA Agent (Rejected By)", value: "rejectedBy" },
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
    const dataToSend = {
        reportName: value,
        startDate: dateFrom,
        endDate: dateTo,
        dates: dates,
        personalInformation: personalInformation,
        planInformation: planInformation,
        miscellaneous: miscellaneous,
    };

    const handleSubmit = async () => {
        if (!value) {
            toast.error("Report Name is required");
            return;
        }

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
            toast.error(error?.response?.data?.error);
        }
    };
    // add template to database

    const handleTemplate = async () => {
        if (!value) {
            toast.error("Report Name is required");
            return;
        }
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
            toast.error(error?.response?.data?.error);
        }
    };

    // get all data and show in table
    useEffect(() => {
        const getAllData = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/reportDownload/getAllData`);
                const data = response?.data?.data;
                console.log(data);
                if (response?.status === 200 || response?.status === 201) {
                    const successMessage = data?.result;
                    console.log("Data fetched successfully:", successMessage);
                    // Assuming setApiData is used to set the data to a state variable
                    setApiData(data); // Set the array of reports to the state
                }
            } catch (error) {
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
            const data = response?.data?.data;
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
            toast.error(error?.response?.data?.error);
        }
    };

    const handleDelete = async (_id) => {
        try {
            console.log("Delete row id", _id);
            const response = await Axios.delete(`${BASE_URL}/api/web/reportDownload/delete/${_id}`);
            if (response.status === 200) {
                toast.success(response?.data?.msg);
                setApiData(apiData.filter((row) => row._id !== _id));
            } else {
                toast.error(response?.data?.error);
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
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
                {!id && <Button label="Save Template" onClick={handleTemplate} style={{ marginLeft: "25.5rem", marginTop: "-3.3rem", position: "absolute" }} />}
                {id && <Button label="Update Template" onClick={handleUpdate} style={{ marginLeft: "25.5rem", marginTop: "-3.3rem", position: "absolute" }} />}
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
                <Button label="Download" style={{ marginLeft: "0.8rem", marginTop: "0.6rem", position: "absolute" }} onClick={handleSubmit} />
            </Card>
            <div className="card" style={{ marginTop: "1rem" }}>
                <DataTable value={apiData} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="reportName" header="Report Name"></Column>
                    <Column body={editAction} header="Edit"></Column>
                    <Column body={deleteAction} header="Delete"></Column>
                </DataTable>
            </div>
        </>
    );
};

export default Reports;
