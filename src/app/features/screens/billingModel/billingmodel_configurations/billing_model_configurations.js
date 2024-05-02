import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./css/billingmodelconfig.css";
import Axios from "axios";
import UpdateBillingModel from "./components/update_billing_model";
import { ToastContainer } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import AddBillingModel from "./components/add_billing_model";
import RestoreModels from "./components/Restore_Models/List_Restore_Models";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function BillingModelConfigurations() {  
    const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
    const [refresh, setRefresh] = useState(false);
    const [restoreModelsVisibility, setRestoreModelsVisiblity] = useState(false);
    const [editBillingModelVisibility, setEditBillingModelVisibility] = useState(false);
    useEffect(() => {
        if (editBillingModelVisibility === false) {
            Axios.get(`${BASE_URL}/api/billingModal/all?serviceProvider=${parseLoginRes?.company}`)
                .then((res) => {
                    setBillingModelList(res?.data?.data);
                })
                .catch((err) => {});
        }
        if (addBillingModelVisibility === false) {
            Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`)
                .then((res) => {
                    setBillingModelList(res?.data?.data);
                })
                .catch((err) => {});
        }
    }, [refresh]);
    const [billingModelList, setBillingModelList] = useState([]);
    const [rowData, setRowData] = useState(null);
    const [addBillingModelVisibility, setAddBillingModelVisibility] = useState(false);
    return (
        <div className="overflow-hidden card">
            <ToastContainer />
            <div className="updaterestore">
                <Button className="text-center mr-0" label="Restore Models" 
                  onClick={()=>{ 
                    setRestoreModelsVisiblity(prev=>!prev)
                  }}
                 />
                <Button
                    onClick={() => {
                        setAddBillingModelVisibility(true);
                    }}
                    className="text-center mr-0"
                    label="Add Billing Model"
                />
            </div>
            <Dialog
                header="Restore Models"
                visible={restoreModelsVisibility}
                style={{ width: "80vw" }}
                onHide={() => {
                    setRestoreModelsVisiblity(false); 
                    setRefresh(prev=>!prev)
                }}
            >
                <RestoreModels BASE_URL={BASE_URL} company={parseLoginRes?.company} setRefresh={setRefresh} setRestoreModelsVisiblity={setRestoreModelsVisiblity} />
            </Dialog>
            <Dialog
                header="Add Billing Model"
                visible={addBillingModelVisibility}
                style={{ width: "80vw" }}
                onHide={() => {
                    setAddBillingModelVisibility(false);
                }}
            >
                <AddBillingModel setRefresh={setRefresh} setAddBillingModelVisibility={setAddBillingModelVisibility} />
            </Dialog>
            <Dialog
                header="Update Billing Model"
                visible={editBillingModelVisibility}
                className="pt-0"
                style={{ width: "80vw" }}
                onHide={() => {
                    setEditBillingModelVisibility(false);
                }}
            >
                <UpdateBillingModel data={rowData} setRefresh={setRefresh} setEditBillingModelVisibility={setEditBillingModelVisibility} />
            </Dialog>
            <DataTable value={billingModelList} size="small" stripedRows resizableColumns emptyMessage="Billing Models Not Found" style={{ marginTop: "10px" }}>
                <Column header="ID" field="_id" body={(rowData)=>{  
                    let id=(rowData._id).toUpperCase()
                         return( 
                             <p>{id.substring(Math.max(0, id.length - 4))}</p>
                          )
                }} />
                <Column header="Billing Model" field="billingModel" />

                <Column
                    header="Actions"
                    body={(rowData) => {
                        return (
                            <>
                                <Button
                                    label="Update"
                                    onClick={() => {
                                        setRowData(rowData);
                                        setEditBillingModelVisibility(true);
                                    }}
                                    className=" p-button-primary mr-2 ml-2 pt-1 pb-1"
                                    text
                                    raised
                                />
                                <Button
                                    label="Deactivate"
                                    onClick={() => {
                                        Axios.put(`${BASE_URL}/api/billingModel/statusUpdate`,{"billingModelId":rowData._id,
    "active": false})
                                            .then((res) => {
                                                toast.success(res?.data?.msg !== undefined ? res?.data?.msg :"Billing Model Deactivate Successfully");

                                                setRefresh((prev) => !prev);
                                            })
                                            .catch((err) => {  
                                                 
                                                toast.error(err?.response?.data?.msg !== undefined ? err?.response?.data?.msg :"Billing Model Deactivation Failed" );
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
