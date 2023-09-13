import React from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import Header from "./Header";
import { FileUpload } from "primereact/fileupload";
import { useRef } from "react";
const AddUnits = () => {
    const validationSchema = Yup.object().shape({
        unitType: Yup.string().required("please select"),
        uploadType: Yup.string().required("please select type "),
        provisionType: Yup.string(),
        setCarrier: Yup.string(),
        setSIM: Yup.string(),
        setCompanyName: Yup.string(),
        setAgent: Yup.string(),
        setMaster: Yup.string(),
        setModel: Yup.string(),
        setCostPriceForSim: Yup.string(),
        setRetailPriceForSim: Yup.string(),
        setActivationFee: Yup.string(),
        setMSLPUK: Yup.string(),
        setPO: Yup.string(),
        setBox: Yup.string(),
        setPortinReservedStatus: Yup.string(),
        setPUK2: Yup.string(),
        setIMEI: Yup.string(),
        setPlanId: Yup.string(),
        setTrackingNum: Yup.string(),
        setTINNum: Yup.string(),
        setBYOD: Yup.string(),
        setACP: Yup.string(),
        setAcpReimbursementAmount: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            unitType: "",
            uploadType: "",
            provisionType: "",
            setCarrier: "",
            setSIM: "",
            setCompanyName: "",
            setAgent: "",
            setMaster: "",
            setModel: "",
            setCostPriceForSim: "",
            setRetailPriceForSim: "",
            setActivationFee: "",
            setMSLPUK: "",
            setPO: "",
            setBox: "",
            setPortinReservedStatus: "",
            setPUK2: "",
            setIMEI: "",
            setPlanId: "",
            setTrackingNum: "",
            setTINNum: "",
            setBYOD: "",
            setACP: "",
            setAcpReimbursementAmount: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            actions.resetForm();
        },
    });
    // dropdown options
    const unit = [
        { label: "SIM", value: "SIM" },
        { label: "CDMA Device", value: "CDMA" },
        { label: "GSM Device", value: "GSM" },
    ];
    const type = [
        { label: "Single Unit", value: "Single" },
        { label: "Bulk Upload", value: "Bulk" },
    ];
    const provision = [
        { label: "Add Stocks(PC384)", value: "PC384" },
        { label: "Add Pre Activated(PC4)", value: "PC4" },
        { label: "Add and  Activated(PC6)", value: "PC6" },
        { label: "Add and assign non Activated(PC5)", value: "PC5" },
        { label: "Reprovision(PC385)", value: "PC385" },
    ];
    const carrier = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const company = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const agent = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const master = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const model = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const portin = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const plan = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const BYOD = [
        { label: "Single Unit", value: "Single" },
        { label: "Bulk Upload", value: "Bulk" },
    ];

    const fileUploadRef = useRef(null);
    const onUpload = (event) => {
        const files = event.files;
        console.log(files);
    };

    // conditional rendering base on selected option

    if (formik.values.unitType === "GSM") {
        if (formik.values.unitType === "GSM" && formik.values.uploadType === "Bulk") {
            return (
                <>
                    <div>
                        <Header />
                        <div className="flex flex-wrap mb-3  ">
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Unit Type <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                            </div>

                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Upload Type <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                            </div>

                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Carrier <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Company Name <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Agent Type <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>

                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Tracking Number <span style={{ color: "red" }}>*</span>
                                </p>
                                <InputText type="text" value={formik.values.setTrackingNum} name="setTrackingNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">TIN Number</p>
                                <InputText type="text" value={formik.values.setTINNum} name="setTINNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                        </div>
                        <div>
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
                            />
                            <div className="mt-3">
                                <p>Note: Please Select Carrier To Download the Sample File</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Card
                            style={{
                                width: "70em",
                                height: "17em",
                                backgroundColor: "#aae5e9",
                                marginBottom: "20px",
                                marginLeft: "80px",
                                marginTop: "50px",
                                boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <div className="ml-3">
                                <h2>ACP Co-Pay Amount</h2>
                                <p>in this feild enter the amount that will be paid by the customer when thy are eligible to get acp supported device</p>
                                <h3>ACP Device Reimbursement Amount </h3>
                                <p>in this feild enter the amount that will be Reimbursed from USAC for selling the acp device</p>
                            </div>
                        </Card>
                    </div>
                </>
            );
        } else if (formik.values.unitType === "GSM" && formik.values.uploadType === "Single") {
            return (
                <>
                    <div>
                        <Header />
                        <div className="flex flex-wrap mb-3 ">
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Unit Type <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>

                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Upload Type <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>

                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Carrier <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>

                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Company Name <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Agent Type <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Model(PC176)<span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.setModel} options={model} onChange={(e) => formik.setFieldValue("setModel", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">BYOD</p>
                                <Dropdown value={formik.values.setBYOD} options={BYOD} onChange={(e) => formik.setFieldValue("setBYOD", e.value)} placeholder="Select an option" className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">ACP Co-Pay Amount </p>
                                <InputText type="text" value={formik.values.setACP} name="setACP" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">ACP Device Reimbursement Amount </p>
                                <InputText type="text" value={formik.values.setAcpReimbursementAmount} name="setAcpReimbursementAmount" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">Wholesale Price </p>
                                <InputText type="text" value={formik.values.setCostPriceForSim} name="setCostPriceForSim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">Retail Price</p>
                                <InputText type="text" value={formik.values.setRetailPriceForSim} name="setRetailPriceForSim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Tracking Number <span style={{ color: "red" }}>*</span>
                                </p>
                                <InputText type="text" value={formik.values.setTrackingNum} name="setTrackingNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">Activation Fee</p>
                                <InputText type="text" value={formik.values.setActivationFee} name="setActivationFee" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">TIN</p>
                                <InputText type="text" value={formik.values.setTINNum} name="setTINNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">PO#</p>
                                <InputText type="text" value={formik.values.setPO} name="setPO" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">
                                    Box#<span style={{ color: "red" }}>*</span>
                                </p>
                                <InputText type="text" value={formik.values.setBox} name="setBox" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>

                            <div className="mr-3 mb-3 mt-3">
                                <p className="m-0">Device ID</p>
                                <InputText type="text" value={formik.values.setIMEI} name="setIMEI" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                            </div>
                        </div>
                        <div style={{ marginLeft: "700px", marginTop: "20px" }}>
                            <Button label="Submit" type="submit" />
                        </div>
                    </div>
                    <div>
                        <Card
                            style={{
                                width: "70em",
                                height: "17em",
                                backgroundColor: "#aae5e9",
                                marginBottom: "20px",
                                marginLeft: "80px",
                                marginTop: "50px",
                                boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <div className="ml-3">
                                <h2>ACP Co-Pay Amount</h2>
                                <p>in this feild enter the amount that will be paid by the customer when thy are eligible to get acp supported device</p>
                                <h3>ACP Device Reimbursement Amount </h3>
                                <p>in this feild enter the amount that will be Reimbursed from USAC for selling the acp device</p>
                            </div>
                        </Card>
                    </div>
                </>
            );
        }
    }

    if (formik.values.unitType === "SIM" && formik.values.provisionType === "PC384" && formik.values.uploadType === "Single") {
        return (
            <>
                <div>
                    <Header />
                    <div className="flex flex-wrap mb-3 ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Unit Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Carrier <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                SIM <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setSIM} name="setSIM" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Agent Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Master <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setMaster} options={master} onChange={(e) => formik.setFieldValue("setMaster", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Model(PC176)<span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setModel} options={model} onChange={(e) => formik.setFieldValue("setModel", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Wholesale/Cost Price For Sim</p>
                            <InputText type="text" value={formik.values.setCostPriceForSim} name="setCostPriceForSim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Selling/Retail Price For Sim</p>
                            <InputText type="text" value={formik.values.setRetailPriceForSim} name="setRetailPriceForSim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Activation Fee</p>
                            <InputText type="text" value={formik.values.setActivationFee} name="setActivationFee" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">MSL/PUK</p>
                            <InputText type="text" value={formik.values.setMSLPUK} name="setMSLPUK" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                PO#<span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setPO} name="setPO" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Box#<span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setBox} name="setBox" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Portin Reserved Status</p>
                            <Dropdown value={formik.values.setPortinReservedStatus} options={portin} onChange={(e) => formik.setFieldValue("setPortinReservedStatus", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">PUK2</p>
                            <InputText type="text" value={formik.values.setPUK2} name="setPUK2" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Device ID/IMEI</p>
                            <InputText type="text" value={formik.values.setIMEI} name="setIMEI" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                    </div>
                    <div style={{ marginLeft: "700px", marginTop: "20px" }}>
                        <Button label="Submit" type="submit" />
                    </div>
                </div>
            </>
        );
    } else if (formik.values.unitType === "SIM" && formik.values.provisionType === "PC384" && formik.values.uploadType === "Bulk") {
        return (
            <>
                <div>
                    <Header />
                    <div className="flex flex-wrap mb-3  ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Unit Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Carrier <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Agent Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Master <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setMaster} options={master} onChange={(e) => formik.setFieldValue("setMaster", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                    </div>
                    <div>
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
                        />
                        <div className="mt-3">
                            <p>Note: Please Select Carrier To Download the Sample File</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (formik.values.unitType === "CDMA" && formik.values.provisionType === "PC384" && formik.values.uploadType === "Bulk") {
        return (
            <>
                <div>
                    <Header />
                    <div className="flex flex-wrap mb-3  ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Unit Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Carrier <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Agent Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Master <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setMaster} options={master} onChange={(e) => formik.setFieldValue("setMaster", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                    </div>
                    <div>
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
                        />
                        <div className="mt-3">
                            <p>Note: Please Select Carrier To Download the Sample File</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (formik.values.unitType === "CDMA" && formik.values.provisionType === "PC4" && formik.values.uploadType === "Bulk") {
        return (
            <>
                <div>
                    <Header />
                    <div className="flex flex-wrap mb-3  ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Unit Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Carrier <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Agent Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Master <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setMaster} options={master} onChange={(e) => formik.setFieldValue("setMaster", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Plan ID <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setPlanId} options={plan} onChange={(e) => formik.setFieldValue("setPlanId", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Tracking Number <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setTrackingNum} name="setTrackingNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">TIN Number</p>
                            <InputText type="text" value={formik.values.setTINNum} name="setTINNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                    </div>
                    <div>
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
                        />
                        <div className="mt-3">
                            <p>Note: Please Select Carrier To Download the Sample File</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (formik.values.unitType === "CDMA" && formik.values.provisionType === "PC6" && formik.values.uploadType === "Bulk") {
        return (
            <>
                <div>
                    <Header />
                    <div className="flex flex-wrap mb-3  ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Unit Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Carrier <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Agent Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Master <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setMaster} options={master} onChange={(e) => formik.setFieldValue("setMaster", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Plan ID <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setPlanId} options={plan} onChange={(e) => formik.setFieldValue("setPlanId", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Tracking Number <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setTrackingNum} name="setTrackingNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">TIN Number</p>
                            <InputText type="text" value={formik.values.setTINNum} name="setTINNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                    </div>
                    <div>
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
                        />
                        <div className="mt-3">
                            <p>Note: Please Select Carrier To Download the Sample File</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (formik.values.unitType === "CDMA" && formik.values.provisionType === "PC5" && formik.values.uploadType === "Bulk") {
        return (
            <>
                <div>
                    <Header />
                    <div className="flex flex-wrap mb-3  ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Unit Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Carrier <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Agent Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Master <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setMaster} options={master} onChange={(e) => formik.setFieldValue("setMaster", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Tracking Number <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setTrackingNum} name="setTrackingNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">TIN Number</p>
                            <InputText type="text" value={formik.values.setTINNum} name="setTINNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                    </div>
                    <div>
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
                        />
                        <div className="mt-3">
                            <p>Note: Please Select Carrier To Download the Sample File</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (formik.values.unitType === "CDMA" && formik.values.provisionType === "PC385" && formik.values.uploadType === "Bulk") {
        return (
            <>
                <div>
                    <Header />

                    <div className="flex flex-wrap mb-3  ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Unit Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Carrier <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Company Name <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setCompanyName} options={company} onChange={(e) => formik.setFieldValue("setCompanyName", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Agent Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setAgent} options={agent} onChange={(e) => formik.setFieldValue("setAgent", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Master <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setMaster} options={master} onChange={(e) => formik.setFieldValue("setMaster", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Box#<span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setBox} name="setBox" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Plan ID <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.setPlanId} options={plan} onChange={(e) => formik.setFieldValue("setPlanId", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>

                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Tracking Number <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setTrackingNum} name="setTrackingNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">TIN Number</p>
                            <InputText type="text" value={formik.values.setTINNum} name="setTINNum" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                    </div>
                    <div>
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
                        />
                        <div className="mt-3">
                            <p>Note: Please Select Carrier To Download the Sample File</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div>
                <div className="flex flex-wrap mb-3  ">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Unit Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.unitType} options={unit} onChange={(e) => formik.setFieldValue("unitType", e.value)} placeholder="Select an option" className="w-21rem" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Upload Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Provision Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.provisionType} options={provision} onChange={(e) => formik.setFieldValue("provisionType", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUnits;
