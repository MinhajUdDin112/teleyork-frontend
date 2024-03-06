import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import Axios from "axios";
import { Column } from "primereact/column";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useEffect } from "react";
export default function RestoreModels({ company, setRefresh, BASE_URL, setRestoreModelsVisiblity }) {
    const [restoreModelList, setRestoreModelList] = useState([]);
    const [refresh, setRefresh2] = useState(false);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/billingModel/getInactiveList?serviceProvider=${company}`)
            .then((res) => {
                setRestoreModelList(res?.data?.data);    
            })
            .catch((err) => { 
                setRestoreModelList([]);   
                toast.error(err?.response?.data?.msg)
            });
    }, [refresh]);
    return (
        <div>
            <ToastContainer />
            <DataTable value={restoreModelList} size="small" stripedRows resizableColumns emptyMessage="Billing Models Not Found" style={{ marginTop: "10px" }}>
                <Column header="ID" field="_id" />
                <Column header="Billing Model" field="billingModel" />
                <Column
                    header="Actions"
                    body={(rowData) => {
                        return (
                            <>
                                <Button
                                    label="Activate"
                                    onClick={() => {
                                        Axios.put(`${BASE_URL}/api/billingModel/statusUpdate`, {
                                            billingModelId: rowData._id,
                                            active: true,
                                        })
                                            .then((res) => {
                                                toast.success("Billing Model Activated Successfully");

                                                setRefresh2((prev) => !prev);
                                            })
                                            .catch((err) => {
                                                toast.error("Billing Model Activation Failed");
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
