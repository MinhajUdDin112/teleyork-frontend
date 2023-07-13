import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import * as XLSX from "xlsx"; // Import XLSX library

const SmsNotification = () => {
    const [data, setData] = useState([]); // State to hold the datatable data

    const handleFileUpload = (event) => {
        const file = event.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            setData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const onUpload = () => {
        // Handle file upload completion
        console.log("File uploaded");
    };

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">SMS Notifications</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <FileUpload
                    name="demo[]"
                    url="https://primefaces.org/primereact/showcase/upload.php"
                    onUpload={onUpload}
                    multiple
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                    onSelect={handleFileUpload}
                />
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">
                    <Button className="w-13rem my-2 text-base h-2.5rem font-light" label="Send Draft SMS" />
                </div>
                <div className="">
                    <DataTable value={data} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" body={(rowData, rowIndex) => rowIndex + 1} resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Mobile Number" field="mobileNumber" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Tracking ID" field="message" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Name" field="template" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Email" field="status" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Template ID" field="createdAt" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Updated At" field="updatedAt" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Uploaded By" field="uploadedBy" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="Sent By" field="sentBy" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                        <Column header="" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }}></Column>
                    </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default SmsNotification;
