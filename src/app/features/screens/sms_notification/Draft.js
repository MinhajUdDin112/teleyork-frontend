import Axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const Draft = () => {
    const [allDraft, setAllDraft] = useState([]);
    const {user}= useSelector((state)=>state.login)
    const userId = user?.data._id;
    const history = useHistory();
    //actions
    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="View" onClick={() => handleView(rowData)} className="w-6rem" />
                <Button label="Send" onClick={() => handleSend(rowData)} className="w-6rem" />
            </div>
        );
    };

    const handleView = (rowData) => {
        const { templateId } = rowData;
        history.push(`/draftall/${templateId}`)
    };
    const handleSend = (rowData) => {
        const { templateId } = rowData;
        const response = Axios.post(`${BASE_URL}/api/sms/send?sentBy=${userId}&templateId=${templateId}`);
        if (response.status === 200) {
            console.log("Sent Successfully");
        }
    };

    //Get All Draft
    const getAllDraft = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/sms/template/draft`);
            if (response.status === 200) {
                const { data, msg } = response?.data;
                setAllDraft(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllDraft();
    }, []);

    // const handleSubmit = () => {
    //     const response = Axios.post(`${BASE_URL}/api/sms/send/64ad9b07fc04dc6ca623b9c3`);
    //     if (response.status === 200) {
    //         console.log("Sent Successfully");
    //     }
    // };

    const type = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "SMS, Email"}</div>;
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Draft Template</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                {/* <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">
                    <Button className="w-13rem my-2 text-base h-2.5rem font-light" label="Send Draft SMS" onClick={handleSubmit} /> 
                </div> */}
                <div className="">
                    <DataTable value={allDraft} showGridlines>
                        <Column header="Template Id" field="templateId"></Column>
                        <Column header="Name" field="name"></Column>
                        <Column header="Message" field="template"></Column>
                        <Column header="Type" body={type}></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Draft SMS Count" field="draftSMSCount"></Column>
                        <Column header="Sent SMS Count" field="sentSMSCount"></Column>
                        <Column header="" body={renderActions} style={{ width: "220px" }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Draft;
