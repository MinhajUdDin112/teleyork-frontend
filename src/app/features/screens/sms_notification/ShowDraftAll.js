import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDraftByTemplateIdAction, submitTemplateAction } from "../../../store/notification/NotificationAction";

const ShowDraftAll = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getDraftByTemplateId, submitTemplate } = useSelector((state) => state.notification);
    const { loginData } = useSelector((state) => state.login);

    useEffect(() => {
        dispatch(getDraftByTemplateIdAction(id));
    }, [id, submitTemplate]);

    const handleSubmit = () => {
        let body = {
            userId: loginData?._id,
            templateId: id,
        };
        dispatch(submitTemplateAction(body));
    };
    const handleBack = () => {
        navigate("/draft");
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Template Data</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-between border-bottom-2 bg-orange-200 px-5 py-2">
                    <i className="pi pi-arrow-circle-left flex align-items-center" onClick={() => handleBack()} style={{ cursor: "pointer", fontSize: "2rem" }}></i>
                    <Button className="w-13rem my-2 text-base h-2.5rem font-light" label="Send Draft SMS" onClick={handleSubmit} />
                </div>
                <div className="">
                    <DataTable value={getDraftByTemplateId?.data} showGridlines>
                        <Column header="Name" field="name"></Column>
                        <Column header="Message" field="message"></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Email" field="email"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default ShowDraftAll;
