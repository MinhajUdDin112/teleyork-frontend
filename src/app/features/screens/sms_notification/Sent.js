import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomLoading from "../../components/custom_spinner";
import { getSentAllTemplateAction } from "../../../store/notification/NotificationAction";

const Sent = () => {
    const dispatch = useDispatch();
    const { getSentAllTemplate, getSentAllTemplateLoading } = useSelector((state) => state.notification);
    const navigate = useNavigate();
    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="View" onClick={() => handleView(rowData)} className="w-8rem" />
            </div>
        );
    };

    const handleView = (rowData) => {
        const { templateId } = rowData;
        navigate(`/sentall/${templateId}`);
    };

    useEffect(() => {
        dispatch(getSentAllTemplateAction());
    }, []);

    const type = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "SMS, Email"}</div>;
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Sent</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                {getSentAllTemplateLoading ? (
                    <CustomLoading />
                ) : (
                    <div className="">
                        <DataTable value={getSentAllTemplate?.data} showGridlines>
                            <Column header="Template Id" field="templateId"></Column>
                            <Column header="Name" field="name"></Column>
                            <Column header="Message" field="template"></Column>
                            <Column header="Type" body={type}></Column>
                            <Column header="Status" field="status"></Column>
                            <Column header="" body={renderActions} style={{ width: "50px" }}></Column>
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sent;
