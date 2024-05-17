import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { feature, type } from "./assets";
import EsnSimSingleUpload from "./update_esn_sim/single_upload";
import EsnSimBulkUpload from "./update_esn_sim/bulk_upload";
import UpdateDeviceSingleUpload from "./update_device/single_upload";
import UpdateDeviceBulkUpload from "./update_device/bulk_upload";
const UpdateInventory = ({ setActiveComponent, permissions }) => {
    const formik = useFormik({
        initialValues: {
            updatefeature: "",
            uploadtype: "",
        },
    });

    return (
        <div className="card">
            <p className="font-semibold heading ">Update Inventory</p>
            <hr style={{ border: "1px solid #C68301", opacity: "15%" }} />
            <div className="  flex flex-wrap mb-3 justify-content-left  ">
                <div className="calendar_field">
                    <p className="field_label ml-2 mt-2">
                        Update Feature <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown value={formik.values.updatefeature} options={feature} onChange={(e) => formik.setFieldValue("updatefeature", e.value)} placeholder="Select an option" className="w-full" />
                </div>
                <div className="calendar_field">
                    <p className="field_label ml-2 mt-2">
                        Upload Type <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown value={formik.values.uploadtype} options={type} onChange={(e) => formik.setFieldValue("uploadtype", e.value)} placeholder="Select an option" className="w-full ml-2" />
                </div>
            </div>
            <div>
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
            <div className="flex flex-wrap justify-content-end mt-4">
                <Button
                    className="btn"
                    label="Back"
                    onClick={() => {
                        setActiveComponent("");
                    }}
                />
            </div>
        </div>
    );
};

export default UpdateInventory;
