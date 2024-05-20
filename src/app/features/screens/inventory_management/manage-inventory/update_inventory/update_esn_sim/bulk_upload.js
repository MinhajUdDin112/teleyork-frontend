import React, { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { vendor, carrier } from "../assets";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
export default function EsnSimBulkUpload() {
    const fileUploadRef = useRef(null);
    function onUpload() {}
    const formik = useFormik({
        initialValues: {
            carrier: "",
            vendor: "",
        },
    });
    return (
        <div>
            <div>
                <Button style={{ height: "45px", top: "115px", position: "absolute", right: "75px", fontSize: "bold" }} label="ViewReport" type="button" />
            </div>

            <div className="flex flex-wrap mb-3 mt-3 justify-content-left ">
                <div className="calendar_field">
                    <p className="field_label  mt-2">Carrier</p>
                    <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-full" />
                </div>
                <div className="calendar_field">
                    <p className="field_label ml-2 mt-2">Vendor</p>
                    <Dropdown value={formik.values.vendor} options={vendor} onChange={(e) => formik.setFieldValue("vendor", e.value)} placeholder="Select an option" className="w-full ml-2" />
                </div>
                <div className="calendar_field">
                    <p className="field_label ml-4 mt-2">Upload File</p>
                    <FileUpload
                        ref={fileUploadRef}
                        mode="basic"
                        chooseLabel="Choose File"
                        uploadLabel="Upload"
                        cancelLabel="Cancel"
                        multiple
                        accept="image/*,application/pdf"
                        maxFileSize={1000000} // Set the maximum file size (1MB in this example)
                        onUpload={onUpload}
                        className="ml-3"
                    />
                </div>
            </div>

            {/* <div className="field_label -mt-3" style={{ marginLeft: "68%" }}>
             
            </div> */}
            <div className="mt-8">
                <p style={{ fontWeight: "600" }}>Please Upload File To Update ESN/SIM's Details Into Inventory</p>
            </div>
            <p className="mt-4">
                <span>
                    <strong>Header: </strong>(Header Required):
                </span>
                ESN/SIM,Model ID, MSL/PUK, PO#, Box, Notes, Wholesale Price, Selling Price, Activation Fee,BYOD (Y/N),MSID , UICCID, Device ID <strong>(Download Sample File)</strong>
            </p>
        </div>
    );
}
