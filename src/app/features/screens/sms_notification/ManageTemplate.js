import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { GetAllTemplates } from "../../../store/getAllTemplateSlice";
import { GetOneTemplate } from "../../../store/getOneTemplateSlice";
import * as XLSX from "xlsx";
import Axios from "axios";
import BASE_URL from '../../../../config'

const ManageTemplate = () => {
    const [keys, setKeys] = useState([]);
    const [isDataReady, setIsDataReady] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [templateId, setTemplateId] = useState([]);
    const [downloadFlag, setDownloadFlag] = useState(false);
    const [allTemplates, setAllTemplates] = useState([]);
    const dispatch = useDispatch();
    const { templates } = useSelector((state) => state.getalltemplates);
    const { singleTemplate } = useSelector((state) => state.getOneTemplate);
  
const array1 = [keys,templateId]
    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="Download" onClick={() => handleDownload(rowData)} />
            </div>
        );
    };

    // const arrData = [[keys],[templateId]]
    const handleDownload = (rowData) => {
        const { templateId } = rowData;
        dispatch(GetOneTemplate(templateId));
        setDownloadFlag(true);
    };
    const getAllTemplates = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/draft`);
        if (response.status === 200) {
            const { data, msg } = response?.data;
            setAllTemplates(data);
        }
    };

    useEffect(() => {
        dispatch(GetAllTemplates());
        getAllTemplates();
    }, []);
    useEffect(() => {
        if (downloadFlag && singleTemplate && singleTemplate.data) {
            const keySequence = singleTemplate.data.keySequence;
            const name = singleTemplate.data.name;
            const id = singleTemplate.data.templateId;
            setTemplateName(name);
            setTemplateId(id);
            setKeys(keySequence);
            console.log("keyssssss",keys)
            setIsDataReady(true);
            setDownloadFlag(false);
        }
    }, [singleTemplate]);
    useEffect(() => {
        if (isDataReady && keys.length > 0) {
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet([keys,templateId]);
            XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
            const fileName = `${templateName}.xlsx`;
            XLSX.writeFile(wb, fileName, { bookType: "xlsx", type: "binary" }, () => {
                setIsDataReady(false);
                setKeys([]);
            });
        }
    }, [isDataReady, keys, templateName]);
    const dataArray = Array.isArray(templates.data) ? templates.data : [templates.data];
    const templateType = (rowData) => {
        console.log("row data", rowData);
        return <div>{rowData.type === 0 ? "SMS" : (rowData.type === 1 ? "Email" : "Both")}</div>;
    };
    const status = (rowData) => {
        console.log("row data", rowData);
        return <div>{rowData.active == true? "Active" : "False"}</div>;
    };
    return (
        <div className="card bg-pink-50">
            <div className="card mx-5 p-0 border-noround">
                <div className="">
                    <DataTable value={allTemplates} showGridlines>
                        <Column header="Name" field="name"></Column>
                        <Column header="Template ID" field="templateId"></Column>
                        <Column header="Type" body={templateType}></Column>
                        <Column header="Template Body" field="template"></Column>
                        <Column header="Status" body={status}></Column>
                        <Column header="Action" body={renderActions} style={{ width: "120px" }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default ManageTemplate;
