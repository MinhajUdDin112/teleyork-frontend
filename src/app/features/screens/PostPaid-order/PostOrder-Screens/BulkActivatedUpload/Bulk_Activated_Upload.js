import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import "./css/bulk_activated_upload.css";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Axios from "axios";
import { EnrollmentSvg } from "./assets";
export default function PostpaidActivatedBulkUpload() {
    const toast = useRef(null);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [buttonLabel, setButtonLabel] = useState("Upload File");
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState(null);
    function submitFile() {
        
        if (selectedFile !== null) { 
            setDisableSubmit(true);
            let formData = new FormData();
            formData.append("file", selectedFile);

            formData.append("uploadedBy", parseLoginRes._id);
            formData.append("serviceProvider", parseLoginRes.company);
            Axios.post(`${BASE_URL}/api/user/bulkPostpaidActivatedUpload`, formData)
                .then((res) => {
                    toast.current.show({ severity: "success", summary: "Bulk Upload Activated Enrollments", detail: "Added Successfully " });
                    setDisableSubmit(false);
                    selectedFile(null);
                    setFileError(null);
                    setButtonLabel("Upload File");
                })
                .catch((err) => {
                    toast.current.show({ severity: "error", summary: "Bulk Upload Activated Enrollments", detail: err?.response?.data?.msg });
                    setDisableSubmit(false);
                });
        } else {
            setFileError(true);
        }
    }
    return (
        <Card className="mainbulk">
            <div className="headerenrollment">
                <h1 className="font-semibold underline2">
                    <div className="enrollmentsvg">
                        <EnrollmentSvg />
                    </div>
                    Postpaid Activated Bulk Enrollments
                </h1>
            </div>
            <div className="bulkbutton mt-4 flex flex-row items-center flex-wrap justify-content-evenly ">
                <div>
                    <Button
                        label={buttonLabel}
                        icon={`${selectedFile === null ? "pi pi-plus" : ""}`}
                        onClick={() => {
                            let create = document.createElement("input");
                            create.type = "file";
                            create.onchange = (e) => {
                                setFileError(false);
                                console.log(e.target.files[0]);
                                setButtonLabel(e.target.files[0].name);
                                setSelectedFile(e.target.files[0]);
                            };
                            create.click();
                        }}
                    ></Button>
                    <p style={{ color: "red" }} className=" mt-2 ml-1">
                        {fileError ? "File Is Required" : ""}
                    </p>
                </div>
                <div>
                    <Button disabled={disableSubmit} label="Submit" onClick={submitFile} />
                </div>
            </div>
            <Toast ref={toast} />
        </Card>
    );
}
