import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import * as XLSX from "xlsx";
import { getAllTemplateAction, getOneTemplateAction } from "../../../store/notification/NotificationAction";
import CustomLoading from "../../components/custom_spinner";
import { clearGetOneTemplateData } from "../../../store/notification/NotificationSllice";

const ManageTemplate = () => {
    const dispatch = useDispatch();
    const { getAllTemplate, getOneTemplate, getAllTemplateLoading } = useSelector((state) => state.notification);

    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="Download" onClick={() => handleDownload(rowData)} />
            </div>
        );
    };

    const handleDownload = (rowData) => {
        const { templateId } = rowData;
        dispatch(getOneTemplateAction(templateId));
    };

    useEffect(() => {
        dispatch(getAllTemplateAction());
    }, []);
    useEffect(() => {
        if (getOneTemplate?.data) {
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet([getOneTemplate?.data?.keySequence]);

            // Find the index of the header that contains 'templateId'
            let keys = getOneTemplate?.data?.keySequence;
            const templateIdHeaderIndex = keys.findIndex((row) => row.includes("templateId"));
            // Assuming your value is stored in a variable called 'valueToMap'
            const valueToMap = getOneTemplate?.data?.templateId;

            // Assuming you have a row number where you want to map the value, called 'rowNumberToMap'
            const rowNumberToMap = 1; // Replace 1 with the appropriate row number.

            // Map the value to the specific row and column (assuming the column is 0 in this example)
            if (templateIdHeaderIndex !== -1) {
                XLSX.utils.sheet_add_aoa(ws, [[valueToMap]], { origin: { r: rowNumberToMap, c: templateIdHeaderIndex } });
            }

            XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
            const fileName = `${getOneTemplate?.data?.name}.xlsx`;
            XLSX.writeFile(wb, fileName, { bookType: "xlsx", type: "binary" });
            dispatch(clearGetOneTemplateData());
        }
    }, [getOneTemplate]);

    const templateType = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "Both"}</div>;
    };
    const status = (rowData) => {
        return <div>{rowData.active == true ? "Active" : "False"}</div>;
    };
    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Manage Template</h3>
            </div>

            <div className="card mx-5 p-0 border-noround">
                {getAllTemplateLoading ? (
                    <CustomLoading />
                ) : (
                    <div className="">
                        <DataTable value={getAllTemplate?.data} showGridlines>
                            <Column header="Name" field="name"></Column>
                            <Column header="Template ID" field="templateId"></Column>
                            <Column header="Type" body={templateType}></Column>
                            <Column header="Template Body" field="template"></Column>
                            <Column header="Status" body={status}></Column>
                            <Column header="Action" body={renderActions} style={{ width: "120px" }} />
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageTemplate;
