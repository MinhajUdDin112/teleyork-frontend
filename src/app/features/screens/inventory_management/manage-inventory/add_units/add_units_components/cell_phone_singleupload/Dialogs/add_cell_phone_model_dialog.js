import { Card } from "primereact/card";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import FileUploadTemplate from "./add_cell_phone_model_dialog_uploadfiletemplate";
export default function AddCellPhoneModelDialog({ agent }) {
    const [networktype, setNetworkType] = useState(null);
    const [description, setDescription] = useState(null);
    const [simtype, setSimType] = useState(null);
    const wificapableoptions = [
        { label: "YES", value: "yes" },
        { label: "NO", value: "no" },
    ];
    const [wificapable, setWifiCapable] = useState(null);
    const [datacapable, setDataCapable] = useState(null);
    const [os, setOs] = useState(null);
    //
    const [grade, setGrade] = useState(null);
    const [voiceonlycapable, setVoiceOnlyCapable] = useState(null);
    const [hotspotcapable, setHotSpotCapable] = useState(null);
    const [showcsrequipmentphonetype, setShowCSREquipmentPhoneType] = useState(null);
    const [handover, setHandOver] = useState(null);
    const [esimcompitable, setEsimCompitable] = useState(null);
    const [ram, setRam] = useState(null);
    const [devicetype, setDeviceType] = useState(null);
    const [imeitype, setImeiType] = useState(null);
    const [status, setStatus] = useState(null);
    const ramoptions = [{ label: "GB", value: "gb" }];
    const devicetypeoptions = [
        { label: "PHONE", value: "phone" },
        { label: "WIFI (Hotspot and Connected Devices", value: "wifi" },
        { label: "TABLET", value: "tablet" },
        { label: "WATCH", value: "watch" },
        { label: "LAPTOP", value: "laptop" },
        { label: "DESKTOP", value: "desktop" },
        { label: "Ipad", value: "ipad" },
        { label: "Hotspot5G", value: "hotspot5g" },
        { label: "HotspotLTE", value: "hotspotlte" },
    ];
    const imeitypeoptions = [
        { label: "iPhone LTE", value: "iphonelte" },
        { label: "iPhone 5G", value: "iphone5g" },
        { label: "Tablet 5G", value: "tablet5g" },
        { label: "Tablet LTE", value: "tabletelte" },
        { label: "Android 5G", value: "android5g" },
        { label: "Android LTE", value: "androidlte" },
        { label: "Feature LTE", value: "featurelte" },
        { label: "Hotspot 5G", value: "hotspot5g" },
        { label: "Hotspot LTE", value: "hotspotlte" },
        { label: "iPad 5G", value: "ipad5g" },
        { label: "iPad LTE", value: "ipadlte" },
    ];
    const statusoptions = [{ label: "Active", value: "active" }];
    const esimcompitableoptions = [
        { label: "YES", value: "yes" },
        { label: "NO", value: "no" },
    ];
    const handoveroptions = [
        { label: "Y", value: "yes" },
        { label: "N", value: "no" },
    ];
    const showcsrequipmentphonetypeoptions = [
        { label: "Y", value: "yes" },
        { label: "N", value: "no" },
    ];
    const hotspotcapableoptions = [
        { label: "YES", value: "yes" },
        { label: "NO", value: "no" },
    ];
    const voiceonlycapableoptions = [
        { label: "YES", value: "yes" },
        { label: "NO", value: "no" },
    ];
    const gradeoptions = [
        { label: "New", value: "new" },
        { label: "Refurbished", value: "refurbished" },
    ];
    const networktypeoptions = [
        { label: "GSM", value: "gsm" },
        { label: "CDMA", value: "cdma" },
        { label: "SIM", value: "sim" },
    ];
    const datacapableoptions = [
        { label: "2G", value: "2g" },
        { label: "3G", value: "3g" },
        { label: "4G", value: "4g" },
        { label: "4GLTE", value: "4glte" },
        { label: "LTE", value: "lte" },
        { label: "5G", value: "5g" },
    ];
    const osoptions = [
        { label: "ANDROID", value: "other" },
        { label: "IOS", value: "ios" },
        { label: "WINDOW", value: "window" },
        { label: "OTHER", value: "other" },
    ];
    const simtypeoptions = [
        { label: "STANDARD", value: "standard" },
        { label: "MICRO", value: "micro" },
        { label: "NANO", value: "nano" },
    ];
    const formik = useFormik({
        initialValues: {
            makemodel: "",
            make: "",
            networktype: "",
            simtype: "",
            model: "",
            modelno: "",
            fccid: "",
            hac: "",
            sku: "",
            wificapable: "",
            datacapable: "",
            pis_url: "",
            grade: "",
            voiceonlycapable: "",
            mrating: "",
            trating: "",
            hotspotcapable: "",
            amount: "",
            handover: "",
            os: "",
            talktime: "",
            camera: "",
            screen: "",
            version: "",
            ram: "",
            stock: "",
            devicetype: "",
            imeitype: "",
            status: "",
            esimcompitable: "",
            pis_url: "",
            showcsrequipmentphonetype: "",
        },
        validate: (values) => {
            // Implement your validation logic here
            const errors = {};
            if (!values.makemodel) {
                errors.makemodel = "MakeModel is required";
            }
            if (!values.make) {
                errors.make = "Make is required";
            }
            if (!values.networktype) {
                errors.networktype = "NetworkType e is required";
            }
            if (!values.modelno) {
                errors.modelno = "ModelNo is required";
            }
            if (!values.fccid) {
                errors.fccid = "Fccid is required";
            }

            if (!values.hac) {
                errors.hac = "HAC is required";
            }
            if (!values.sku) {
                errors.sku = "SKU is required";
            }
            if (!values.wificapable) {
                errors.wificapable = "WifiCapable is required";
            }
            if (!values.datacapable) {
                errors.datacapable = "DataCapable e is required";
            }
            if (!values.os) {
                errors.os = "OS is required";
            }
            if (!values.voiceonlycapable) {
                errors.voiceonlycapable = "VoiceOnlyCapable is required";
            }

            if (!values.esimcompitable) {
                errors.esimcompitable = "EsimCompitable is required";
            }
            if (!values.talktime) {
                errors.talktime = "TalkTime is required";
            }
            if (!values.camera) {
                errors.camera = "Camera is required";
            }
            if (!values.ram) {
                errors.ram = "Ram e is required";
            }
            if (!values.screen) {
                errors.screen = "Screen is required";
            }
            if (!values.version) {
                errors.version = "Version is required";
            }

            if (!values.stock) {
                errors.stock = "Stock is required";
            }
            if (!values.devicetype) {
                errors.devicetype = "DeviceType is required";
            }
            if (!values.imeitype) {
                errors.imeitype = "ImeiType is required";
            }
            if (!values.status) {
                errors.status = "Status is required";
            }

            return errors;
        },
    });
    return (
        <>
            {agent === "" ? <h4 className="card font-semi-bold">Model</h4> : undefined}
            <Card style={{ width: "80vw" }}>
                <div style={{ height: "79px" }} className="card flex flex-wrap justify-content-between">
                    <div>
                        <h4 className="font-semibold"> {agent !== "" ? "Add " + agent.charAt(0).toUpperCase() + agent.slice(1) + " Detail" : "Add Model Detail"}</h4>
                    </div>
                    <div>
                        <Button label="View Batch Report" />
                    </div>
                </div>
                <div className="flex flex-wrap justify-content-around">
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Make <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.make} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Model <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.model} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Network Type<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={networktype}
                            options={networktypeoptions}
                            onChange={(e) => {
                                setNetworkType(e.value);
                                formik.values.networktype = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            SIM Type<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={simtype}
                            options={simtypeoptions}
                            onChange={(e) => {
                                setSimType(e.value);
                                formik.values.simtype = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Model No <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.modelno} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            FCC ID <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.fccid} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            HAC (Hearing Aid Compatibility) <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.hac} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            SKU <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.sku} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Wifi Capable<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={wificapable}
                            options={wificapableoptions}
                            onChange={(e) => {
                                setWifiCapable(e.value);
                                formik.values.wificapable = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Data Capable<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={datacapable}
                            options={datacapableoptions}
                            onChange={(e) => {
                                setDataCapable(e.value);
                                formik.values.datacapable = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            OS<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={os}
                            options={osoptions}
                            onChange={(e) => {
                                setOs(e.value);
                                formik.values.os = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>Programming Instruction Supporting URL</label>
                        <InputText value={formik.pis_url} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>Grade</label>
                        <Dropdown
                            value={grade}
                            options={gradeoptions}
                            onChange={(e) => {
                                setGrade(e.value);
                                formik.values.grade = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Voice Only Capable<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={voiceonlycapable}
                            options={voiceonlycapableoptions}
                            onChange={(e) => {
                                setVoiceOnlyCapable(e.value);
                                formik.values.voiceonlycapable = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>M Rating</label>
                        <InputText value={formik.mrating} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>T Rating</label>
                        <InputText value={formik.trating} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            HotSpot Capable<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={hotspotcapable}
                            options={hotspotcapableoptions}
                            onChange={(e) => {
                                setHotSpotCapable(e.value);
                                formik.values.hotspotcapable = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Amount (In $) <span style={{ color: "red" }}></span>
                        </label>
                        <InputText value={formik.amount} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Show CSR Equipment Phone Type<span style={{ color: "red" }}></span>
                        </label>
                        <Dropdown
                            value={showcsrequipmentphonetype}
                            options={showcsrequipmentphonetypeoptions}
                            onChange={(e) => {
                                setShowCSREquipmentPhoneType(e.value);
                                formik.values.showcsrequipmentphonetype = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>Handover</label>
                        <Dropdown
                            value={handover}
                            options={handoveroptions}
                            onChange={(e) => {
                                setHandOver(e.value);
                                formik.values.handover = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            ESIM Compitable<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={esimcompitable}
                            options={esimcompitableoptions}
                            onChange={(e) => {
                                setEsimCompitable(e.value);
                                formik.values.esimcompitable = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            TalkTime <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.talktime} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Camera <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.camera} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Screen <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.screen} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Version <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.version} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Stock <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.stock} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Ram<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={ram}
                            options={ramoptions}
                            onChange={(e) => {
                                setRam(e.value);
                                formik.values.ram = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Device Type<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={devicetype}
                            options={devicetypeoptions}
                            onChange={(e) => {
                                setDeviceType(e.value);
                                formik.values.devicetype = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Imei Type<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={imeitype}
                            options={imeitypeoptions}
                            onChange={(e) => {
                                setImeiType(e.value);
                                formik.values.imeitype = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                    <div className="mt-8">
                        <label style={{ display: "block" }}>
                            Status<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown
                            value={status}
                            options={statusoptions}
                            onChange={(e) => {
                                setStatus(e.value);
                                formik.values.status = e.value;
                            }}
                            optionLabel="label"
                            placeholder="--Select--"
                            className="mt-4 w-full md:w-14rem"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <FileUploadTemplate />
                    <h5 className="mt-4">Note/Description:</h5>
                    <InputTextarea
                        className="mt-4 w-full"
                        onChange={(e) => {
                            setDescription(e.value);
                        }}
                        value={description}
                    />
                </div>
                <div className="mt-4">
                    <FileUploadTemplate />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }} className="mt-7">
                    <Button label="Add Model" />
                </div>
            </Card>
        </>
    );
}
