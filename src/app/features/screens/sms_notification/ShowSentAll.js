import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSentByTemplateIdAction } from "../../../store/notification/NotificationAction";
import CustomLoading from "../../components/custom_spinner";

const ShowSentAll = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { getSentByTemplateId, getSentByTemplateIdLoading } = useSelector((state) => state.notification);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSentByTemplateIdAction(id));
    }, [id]);
    const handleBack = () => {
        navigate("/sent");
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Template Data</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                {getSentByTemplateIdLoading ? (
                    <CustomLoading />
                ) : (
                    <>
                        <div className="flex justify-content-between border-bottom-2 bg-orange-200 px-5 py-2 my-3">
                            <i className="pi pi-arrow-circle-left flex align-items-center" onClick={() => handleBack()} style={{ cursor: "pointer", fontSize: "2rem" }}></i>
                        </div>
                        <div className="">
                            <DataTable value={getSentByTemplateId?.data} showGridlines>
                                <Column header="Name" field="name"></Column>
                                <Column header="Message" field="message"></Column>
                                <Column header="Status" field="status"></Column>
                                <Column header="Email" field="email"></Column>
                            </DataTable>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowSentAll;
