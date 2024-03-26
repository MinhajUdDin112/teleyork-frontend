import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { ToastContainer, toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ManageVendor = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [rowData, setRowData] = useState(null);

    const navigate = useNavigate();
    const actions = (rowData) => {
        return (
            <>
                <div className="flex align-items-center">
                    <Button icon="pi pi-user-edit" rounded outlined onClick={() => handleUserEdit(rowData)} className="mr-2" />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleUserDelete(rowData)} />
                </div>
            </>
        );
    };

    const handleUserEdit = (rowData) => {
        setRowData(rowData);
        setUserId(rowData._id);
        localStorage.setItem("editUserData", JSON.stringify(rowData));
        // console.log("rowData", rowData);
        // console.log("user id", rowData._id);
        navigate("/Update_vendors");
    };
    const handleUserDelete = async (rowData) => {
        // Display confirmation dialogue box
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");

        if (!isConfirmed) {
            return; // If not confirmed, exit the function
        }

        try {
            const response = await Axios.delete(`${BASE_URL}/api/web/manageVendors/delete/${rowData._id}`);
            const message = response.data.msg;
            const updatedUsers = allUsers.filter((user) => user._id !== rowData._id);
            setAllUsers(updatedUsers);
            toast.success(message);
        } catch (error) {
            console.error("Error deleting user:", error);
            const errorMessage = error.response ? error.response.data.msg || "Error deleting user" : "Error deleting user";
            toast.error(errorMessage);
        }
    };

    const formatDate = (rowData, column) => {
        const dateValue = rowData[column.field];
        if (dateValue) {
            const date = new Date(dateValue);
            const formattedDate = date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
            return formattedDate;
        }
        return "";
    };

    const getAllUsers = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/manageVendors/getAll`);
            const responseData = res?.data;

            // Extract the "data added" array from the response
            const usersData = responseData["data added"];

            // Set the extracted data to the allUsers state
            setAllUsers(usersData);
        } catch (error) {
            // Handle errors
            console.error("Error fetching data:", error);
            // Display error message to the user
            toast.error(`Error fetching data: ${error.message}`);
        }
    };
    useEffect(() => {
        getAllUsers();
    }, []);
    const handleAdd = () => {
        navigate("/Add_vendors");
    };
    return (
        <Card className="pl-0 pr-0">
            <ToastContainer />
            <div className="card mx-5 p-0 ">
                <div>
                    <h3 className="mt-1 p-2 pt-4 font-bold ">Manage Vendors</h3>
                </div>
                <div>
                    <Button label="Add Vendor" style={{ marginLeft: "77rem", marginTop: "-4rem", position: "absolute" }} onClick={handleAdd} />
                    {/* here value will be equal to the filtered value provided from api and it will be changed */}
                    <DataTable value={allUsers} tableStyle={{ minWidth: "1400px" }}>
                        <Column field="companyName" header="Company Name"></Column>
                        <Column field="address1" header="Address1"></Column>
                        <Column field="address2" header="Address2"></Column>
                        <Column field="city" header="City"></Column>
                        <Column field="state" header="State"></Column>
                        <Column field="zipCode" header="Zip Code"></Column>
                        <Column field="companyEmail" header="Company's Email"></Column>
                        <Column field="pointOfContact" header="Point of Contact"></Column>
                        <Column field="pointOfContactPhoneNo" header="Phone No "></Column>
                        <Column field="pointOfContactEmail" header="Email"></Column>
                        <Column field="NTN_EIN_Number" header="NTN/EIN Number"></Column>
                        <Column field="contractSignDate" header="Contract Sign Date" body={formatDate}></Column>
                        <Column field="contractExpirationDate" header="Contract Expiration Date" body={formatDate}></Column>
                        <Column field="modeOfWork" header="Mode of Work"></Column>
                        <Column field="status" header="Status"></Column>
                        <Column body={actions} header="Actions"></Column>
                    </DataTable>
                </div>
            </div>
        </Card>
    );
};

export default ManageVendor;
