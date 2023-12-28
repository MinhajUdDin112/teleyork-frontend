import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { feature, type } from "./assets";
import EsnSimSingleUpload from "./update_esn_sim/single_upload";
import EsnSimBulkUpload from "./update_esn_sim/bulk_upload";
import UpdateDeviceSingleUpload from "./update_device/single_upload";
import UpdateDeviceBulkUpload from "./update_device/bulk_upload";
const UpdateInventory = ({ setActiveComponent,permissions }) => {  
    const formik = useFormik({
        initialValues: {
            updatefeature: "",
            uploadtype: "",
        },
    });

    return (
        <div className="card"> 
        <div >
            <Button
                label="Back"
                onClick={() => {
                    setActiveComponent("");
                }}
            />  
            </div>
            <p className="font-semibold mt-6 " style={{ fontSize: "1.5rem", color: "black" }}>
                Update Inventory
            </p>

            <div className=" mt-4 flex flex-wrap mb-3 justify-content-around  ">
                <div className="mr-3 mb-3">
                    <p className="m-0">
                        Update Feature <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown value={formik.values.updatefeature} options={feature} onChange={(e) => formik.setFieldValue("updatefeature", e.value)} placeholder="Select an option" className="field-width" />
                </div>
                <div className="mr-3 mb-3">
                    <p className="m-0">
                        Upload Type <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown value={formik.values.uploadtype} options={type} onChange={(e) => formik.setFieldValue("uploadtype", e.value)} placeholder="Select an option" className="field-width" />
                </div>
            </div>
            <div >
                {formik.values.updatefeature === "esnsim" && formik.values.uploadtype === "single" ? (
                    <EsnSimSingleUpload permissions={permissions} />
                ) : formik.values.updatefeature === "esnsim" && formik.values.uploadtype === "bulk" ? (
                    <EsnSimBulkUpload permissions={permissions} />
                ) : formik.values.updatefeature === "device" && formik.values.uploadtype === "single" ? (
                    <UpdateDeviceSingleUpload permissions={permissions} />
                ) : formik.values.updatefeature === "device" && formik.values.uploadtype === "bulk" ? (
                    <UpdateDeviceBulkUpload permissions={permissions} />
                ) : undefined}
            </div>
        </div>
    );
};

export default UpdateInventory;
