import Axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import BASE_URL from '../../../../config'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Sent = () => {
    const [allSent, setAllSent] = useState([]);
    const history = useHistory();
    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="View" onClick={() => handleView(rowData)} className="w-8rem" />
            </div>
        );
    };

    const handleView = (rowData) => {
        const { templateId } = rowData;
        history.push(`/sentall/${templateId}`)
    };

    //Get All Draft
    const getAllDraft = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/sms/template/sent`);
            if (response.status === 200) {
                const { data, msg } = response?.data;
                console.log("data", data);
                setAllSent(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllDraft();
    }, []);

    const type = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "SMS, Email"}</div>;
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Sent Template</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="">
                        <DataTable value={allSent} showGridlines>
                        <Column header="Template Id" field="templateId"></Column>
                        <Column header="Name" field="name"></Column>
                        <Column header="Message" field="template"></Column>
                        <Column header="Type" body={type}></Column>
                        <Column header="Status" field="status"></Column>  
                        <Column header="" body={renderActions} style={{ width: "50px" }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Sent;
