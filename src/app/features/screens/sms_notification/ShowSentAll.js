import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSentByTemplateIdAction } from "../../../store/notification/NotificationAction";
import CustomLoading from "../../components/custom_spinner";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
const ShowSentAll = () => {
    const location = useLocation();
    const currentPath = location?.pathname;
    const actionBasedChecks = () => {
        const loginPerms = localStorage.getItem("permissions");
        const parsedLoginPerms = JSON.parse(loginPerms);

        const isCreate = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "create")));
        setIsCreate(isCreate);

        const isManage = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "manage")));
        setIsManage(isManage);
    };
    const [isManage, setIsManage] = useState(null);
    const [isCreate, setIsCreate] = useState(null);

    useEffect(() => {
        actionBasedChecks();
    }, []);
    const [visible, setVisible] = useState(false);
    const [templatebody, setTemplatebody] = useState("");
    const messageBody = (rowData) => {
        let template = rowData.message;
        let shortline = template.substring(0, 10);

        return (
            <div id="template">
                {template.length > 10 ? (
                    <p>
                        {shortline}
                        <span
                            style={{ color: "red", cursor: "pointer", fontSize: "12px" }}
                            onClick={(e) => {
                                setTemplatebody(rowData.message);
                                setVisible(true);
                            }}
                        >
                            {" "}
                            See more
                        </span>
                    </p>
                ) : (
                    <p>{template}</p>
                )}
            </div>
        );
    };
    const { id } = useParams();
    const dispatch = useDispatch();
    const { getSentByTemplateId, getSentByTemplateIdLoading } = useSelector((state) => state.notification);
    const navigate = useNavigate();
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const companyId = parseLoginRes?.company;
    useEffect(() => {
        let body = {
            userId: parseLoginRes?._id,
            templateId: id,
            company: companyId,
        };
        dispatch(getSentByTemplateIdAction(body));
    }, [id]);

    const handleBack = () => {
        navigate("/sent");
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Sent Records</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                {getSentByTemplateIdLoading ? (
                    <CustomLoading />
                ) : (
                    <>
                        <div className="flex justify-content-between border-bottom-2 bg-orange-200 px-5 py-2 my-3">
                            <i className="pi pi-arrow-circle-left flex align-items-center" onClick={() => handleBack()} style={{ cursor: "pointer", fontSize: "2rem" }}></i>
                        </div>
                        <div>
                            <DataTable value={getSentByTemplateId?.data} showGridlines>
                                <Column header="Name" field="name"></Column>
                                <Column header="Message" field={messageBody}></Column>
                                <Column header="Status" field="status"></Column>
                                <Column header="Email" field="email"></Column>
                                <Column header="contact" field="phone"></Column>
                            </DataTable>
                        </div>
                    </>
                )}
            </div>
            <Dialog
                header="Message Body"
                visible={visible}
                style={{ width: "50vw" }}
                draggable={false}
                onHide={() => {
                    setVisible(false);
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: `<p>${templatebody}</p>` }} />
            </Dialog>
        </div>
    );
};

export default ShowSentAll;
