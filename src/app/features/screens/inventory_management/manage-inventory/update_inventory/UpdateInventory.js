import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { feature, type } from "./assets";
import EsnSimSingleUpload from "./update_esn_sim/single_upload";
import EsnSimBulkUpload from "./update_esn_sim/bulk_upload";
import UpdateDeviceSingleUpload from "./update_device/single_upload";
import UpdateDeviceBulkUpload from "./update_device/bulk_upload";
const UpdateInventory = ({ setActiveComponent }) => {
    const formik = useFormik({
        initialValues: {
            updatefeature: "",
            uploadtype: "",
        },
    });

    return (
        <div className="card">
            <Button
                label="Back"
                style={{ position: "absolute", marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                onClick={() => {
                    setActiveComponent("");
                }}
            />
            <p className="card font-semibold " style={{ fontSize: "1.5rem", color: "black", marginTop: "90px" }}>
                Update Inventory
            </p>

            <div className="flex flex-wrap mb-3 justify-content-around  ">
                <div className="mr-3 mb-3">
                    <p className="m-0">
                        Update Feature <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown value={formik.values.updatefeature} options={feature} onChange={(e) => formik.setFieldValue("updatefeature", e.value)} placeholder="Select an option" className="w-21rem" />
                </div>
                <div className="mr-3 mb-3">
                    <p className="m-0">
                        Upload Type <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown value={formik.values.uploadtype} options={type} onChange={(e) => formik.setFieldValue("uploadtype", e.value)} placeholder="Select an option" className="w-21rem" />
                </div>
            </div>
            <div>
                {formik.values.updatefeature === "esnsim" && formik.values.uploadtype === "single" ? (
                    <EsnSimSingleUpload />
                ) : formik.values.updatefeature === "esnsim" && formik.values.uploadtype === "bulk" ? (
                    <EsnSimBulkUpload />
                ) : formik.values.updatefeature === "device" && formik.values.uploadtype === "single" ? (
                    <UpdateDeviceSingleUpload />
                ) : formik.values.uploadfeature === "device" && formik.values.uploadtype === "bulk" ? (
                    <UpdateDeviceBulkUpload />
                ) : undefined}
            </div>
        </div>
    );
};

export default UpdateInventory;
