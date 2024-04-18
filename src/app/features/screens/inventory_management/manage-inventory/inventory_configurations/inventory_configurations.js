import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import { Card } from "primereact/card";
import UpdateInventory from "./components/update_invenory";
import { ToastContainer } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import AddInventory from "./components/add_inventory";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
export default function ListAllInventories() {
    const [refresh, setRefresh] = useState(false);
    const [editInventoryVisibility, setEditInventoryVisibility] = useState(false);
    useEffect(() => {
        if (editInventoryVisibility === false) {
            Axios.get(`${BASE_URL}/api/inventoryType/all?serviceProvider=${parseLoginRes?.company}`)
                .then((res) => {
                    setInventoryList(res?.data?.data);
                })
                .catch((err) => {});
        }
        if (addInventoryVisibility === false) {
            Axios.get(`${BASE_URL}/api/inventoryType/all?serviceProvider=${parseLoginRes?.company}`)
                .then((res) => {
                    setInventoryList(res?.data?.data);
                })
                .catch((err) => {});
        }
    }, [refresh]);
    const [inventoryList, setInventoryList] = useState([]);
    const [rowData, setRowData] = useState(null);
    const [addInventoryVisibility, setAddInventoryVisibility] = useState(false);
    return (
        <div className="overflow-hidden">
            <ToastContainer />
            <Button
                onClick={() => {
                    setAddInventoryVisibility(true);
                }}
                className="text-center mr-0"
                style={{ marginTop: "0px", textAlign: "center", marginLeft: "90%", transform: "translate(-70%)", width: "250px" }}
                label="Add Inventory Type"
            />

            <Dialog
                header="Add Inventory Type"
                visible={addInventoryVisibility}
                style={{ width: "80vw" }}
                onHide={() => {
                    setAddInventoryVisibility(false);
                }}
            >
                <AddInventory setRefresh={setRefresh} setAddInventoryVisibility={setAddInventoryVisibility} />
            </Dialog>
            <Dialog
                header="Update Inventory Type"
                visible={editInventoryVisibility}
                className="pt-0"
                style={{ width: "80vw" }}
                onHide={() => {
                    setEditInventoryVisibility(false);
                }}
            >
                <UpdateInventory data={rowData} setRefresh={setRefresh} setEditInventoryVisibility={setEditInventoryVisibility} />
            </Dialog>
            <DataTable value={inventoryList} size="small" stripedRows resizableColumns emptyMessage="No Inventory found." style={{ marginTop: "10px" }}>
                <Column header="ID" field="_id" />
                <Column header="Inventory Type" field="inventoryType" />

                <Column
                    header="Actions"
                    body={(rowData) => {
                        return (
                            <>
                                <Button
                                    label="Update"
                                    onClick={() => {
                                        setRowData(rowData);
                                        setEditInventoryVisibility(true);
                                    }}
                                    className=" p-button-primary mr-2 ml-2 pt-1 pb-1"
                                    text
                                    raised
                                />
                                <Button
                                    label="Delete"
                                    onClick={() => {
                                        Axios.put(`${BASE_URL}/api/inventoryType/delete?id=${rowData._id}`)
                                            .then((res) => {
                                                toast.success("Inventory Type Removed Successdully");

                                                setRefresh((prev) => !prev);
                                            })
                                            .catch((err) => {
                                                toast.error("Inventory Type Removal Failed");
                                            });
                                    }}
                                    className=" p-button-primary mr-2 ml-2 pt-1 pb-1"
                                    text
                                    raised
                                />
                            </>
                        );
                    }}
                    field="Edit"
                />
            </DataTable>
        </div>
    );
}
