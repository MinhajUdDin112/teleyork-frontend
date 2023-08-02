import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { GetAllTemplates } from "../../../store/getAllTemplateSlice";
import { GetOneTemplate } from "../../../store/getOneTemplateSlice";
import * as XLSX from "xlsx";
import { useCallback } from "react";

const ManageTemplate = () => {
    const [keys, setKeys] = useState([]);
    const [isDataReady, setIsDataReady] = useState(false);
    const [downloadFlag, setDownloadFlag] = useState(false);
    // const [templateList, setTemplateList] = useState([]);
    const dispatch = useDispatch();
    const { templates } = useSelector((state) => state.getalltemplates);
    console.log("template data", templates.data);
    const { singleTemplate } = useSelector((state) => state.getOneTemplate);

    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="Download" onClick={() => handleDownload(rowData)} />
            </div>
        );
    };
    const handleDownload = (rowData) => {
        const { templateId } = rowData;
        dispatch(GetOneTemplate(templateId));
        setDownloadFlag(true);
    };

    useEffect(() => {
        dispatch(GetAllTemplates());
    }, []);
    useEffect(() => {
        if (downloadFlag && singleTemplate && singleTemplate.data) {
            const keySequence = singleTemplate.data.keySequence;
            setKeys(keySequence);
            setIsDataReady(true);
            setDownloadFlag(false);
        }
    }, [singleTemplate]);
    useEffect(() => {
        if (isDataReady && keys.length > 0) {
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet([keys]);
            XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
            XLSX.writeFile(wb, "Template.xlsx", { bookType: "xlsx", type: "binary" }, () => {
                setIsDataReady(false);
                setKeys([]);
            });
        }
    }, [isDataReady, keys]);
    const dataArray = Array.isArray(templates.data) ? templates.data : [templates.data];
    return (
        <div className="card bg-pink-50">
            <div className="card mx-5 p-0 border-noround">
                <div className="">
                    <DataTable value={dataArray} showGridlines>
                        <Column header="Name" field="name"></Column>
                        <Column header="Template ID" field="templateId"></Column>
                        <Column header="Type" field="type"></Column>
                        <Column header="Template Body" field="template"></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Action" body={renderActions} style={{ width: "120px" }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default ManageTemplate;
