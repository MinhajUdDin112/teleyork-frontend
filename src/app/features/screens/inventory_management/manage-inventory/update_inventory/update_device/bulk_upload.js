import React, { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
export default function UpdateDeviceBulkUpload() {
    const fileUploadRef = useRef(null);
    function onUpload() {}
    return (
        <div className="card">
            <div className="card" style={{ boxShadow: "unset", marginLeft: "50%", transform: "translate(-50%)", marginTop: "45px" }}>
                <FileUpload
                    ref={fileUploadRef}
                    mode="basic"
                    chooseLabel="Add File"
                    uploadLabel="Upload"
                    cancelLabel="Cancel"
                    multiple
                    accept="image/*,application/pdf"
                    maxFileSize={1000000} // Set the maximum file size (1MB in this example)
                    onUpload={onUpload}
                    style={{ position: "absolute", left: "50%", transform: "translate(-50%)" }}
                ></FileUpload>
                <div style={{ marginLeft: "88%", marginTop: "95px", transform: "translate(-90%)", textAlign: "center", width: "90%" }}>
                    <p>Please Upload File To Update Device Detail Into Inventory</p>
                </div>
            </div>
        </div>
    );
}
