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
    const dispatch = useDispatch();
    const { templates } = useSelector((state) => state.getalltemplates);
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
    let templateList = templates.data
        ? templates.data.map((template, index) => ({
              sno: index + 1,
              name: template.name,
              templateId: template.templateId,
              type: template.type === 0 ? "SMS" : template.type === 1 ? "Email" : "SMS and Email",
              status: template.active ? "Active" : "Inactive",
              template: template.template,
          }))
        : [];
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

    return (
        <div className="card bg-pink-50">
            <div className="card mx-5 p-0 border-noround">
                <div className="">
                    <DataTable value={templateList} showGridlines>
                        <Column header="#" field="sno"></Column>
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
