import React from "react";
import { vendor, carrier,shipperid, model, BYOD } from "../assets"; 
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
export default function UpdateDeviceSingleUpload() {
    const formik = useFormik({
        initialValues: {
            carrier: "",
            vendor: "",
            model: "",
            deviceid: "",
            po: "",
            box: "",
            wholesaleprice: "",
            notes: "",
            shipperid: "",
            byod: "",
            retailprice: "",
            acpcopayamount: "",
            acpdevicereimbursementamount: "",
        },
    });
    return (
        <div className="card">
            <div className="flex flex-wrap mb-3 justify-content-around">
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">
                        Device Id <span style={{ color: "red" }}>*</span>
                    </p>
                    <InputText type="text" value={formik.values.deviceid} name="deviceid" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Model</p>
                    <Dropdown value={formik.values.model} options={model} onChange={(e) => formik.setFieldValue("model", e.value)} placeholder="Select an option" className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Vendor</p>
                    <Dropdown value={formik.values.vendor} options={vendor} onChange={(e) => formik.setFieldValue("vendor", e.value)} placeholder="Select an option" className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">BYOD</p>
                    <Dropdown value={formik.values.byod} options={BYOD} onChange={(e) => formik.setFieldValue("byod", e.value)} placeholder="Select an option" className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Notes</p>
                    <InputText type="text" value={formik.values.notes} name="notes" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Wholesale Price</p>
                    <InputText type="text" value={formik.values.wholesaleprice} name="wholesaleprice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Carrier</p>
                    <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">PO</p>
                    <InputText type="text" value={formik.values.po} name="po" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Box</p>
                    <InputText type="text" value={formik.values.box} name="box" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Shipper Id</p>
                    <Dropdown value={formik.values.shipperid} options={shipperid} onChange={(e) => formik.setFieldValue("shipperid", e.value)} placeholder="Select an option" className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">Device Retail Price </p>
                    <InputText type="text" value={formik.values.retailprice} name="retailprice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">ACP Co-Pay Amount </p>
                    <InputText type="text" value={formik.values.acpcopayamount} name="acpcopayamount" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
                <div className="mr-3 mb-3 mt-3">
                    <p className="m-0">ACP Device Reimbursement Amount </p>
                    <InputText type="text" value={formik.values.acpdevicereimbursementamount} name="acpdevicereimbursementamount" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                </div>
            </div>

            <div style={{ width: "50%", marginLeft: "50%", transform: "translate(-50%)" }}>
                <p style={{ textAlign: "center",  marginTop: "45px" }}>Note: Please update at least one field to update Device</p>
                <div style={{ marginLeft: "50%", marginTop: "45px", transform: "translate(-50%)", width: "100px", marginTop: "20px" }}>
                    <Button label="Submit" type="submit" />
                </div>
            </div>
        </div>
    );
}
