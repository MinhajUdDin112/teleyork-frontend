import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomLoading from "../../components/custom_spinner";
import { getAllTemplateAction, submitTemplateAction } from "../../../store/notification/NotificationAction";
import Axios from "axios";
import BASE_URL from "../../../../config";

const Draft = () => {

    const [allDraft, setAllDraft] = useState([])

    const dispatch = useDispatch();
    const { getAllTemplate, getAllTemplateLoading, submitTemplate } = useSelector((state) => state.notification);
    const { loginData } = useSelector((state) => state.login);
    const companyId = loginData?.compony

    const navigate = useNavigate();
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
        navigate(`/draftall/${templateId}`);
    };
    const handleSend = (rowData) => {
        const { templateId } = rowData;
        let body = {
            userId: loginData?._id,
            templateId: templateId,
        };
        dispatch(submitTemplateAction(body));
    };
    useEffect(() => {
        dispatch(getAllTemplateAction());
    }, [submitTemplate]);

    const type = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "SMS, Email"}</div>;
    };

    const getAllDraft = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/draft?companyId=${companyId}`);
        setAllDraft(response?.data?.data)
    }

    useEffect(() => {
        getAllDraft()
    }, []);

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Draft</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                {getAllTemplateLoading ? (
                    <CustomLoading />
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default Draft;
