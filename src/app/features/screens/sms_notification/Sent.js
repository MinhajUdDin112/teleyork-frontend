import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomLoading from "../../components/custom_spinner";
import { getSentAllTemplateAction } from "../../../store/notification/NotificationAction";
import Axios from "axios";
import BASE_URL from "../../../../config";

const Sent = () => {
    const [allSent, setAllSent] = useState([])

    const loginResponse = useSelector((state) => state.login)
    const loginData = loginResponse.loginData
    const companyId = loginData?.compony

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

    const getAllSent = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/all?companyId=${companyId}`);
        setAllSent(response?.data?.data)
    }

    useEffect(() => {
        getAllSent()
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
                            <Column header="Template Id" field="templateId" />
                            <Column header="Name" field="name" />
                            <Column header="Message" field="template" />
                            <Column header="Type" body={type} />
                            <Column header="Status" field="status" />
                            <Column header="Actions" body={renderActions} style={{ width: "50px" }} />
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sent;
