import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { FileUpload } from "primereact/fileupload";
import { useRef } from "react";
const UpdateInventory = ({ setActiveComponent }) => {
    const validationSchema = Yup.object().shape({
        updateFeature: Yup.string().required("please select"),
        uploadType: Yup.string().required("please select type "),
        ESNSIM: Yup.string(),
        setCarrier: Yup.string(),
        setModel: Yup.string(),
        MSLPUK: Yup.string(),
        setVendor: Yup.string(),
        MSID: Yup.string(),
        PO: Yup.string(),
        BOX: Yup.string(),
        setWholesalePrice: Yup.string(),
        setSellingPrice: Yup.string(),
        setNotes: Yup.string(),
        setUICCID: Yup.string(),
        setActivationFee: Yup.string(),
        setBYOD: Yup.string(),
        setDeviceId: Yup.string(),
        setShipperid: Yup.string(),
        setRetailPrice: Yup.string(),
        setACP: Yup.string(),
        setAcpReimbursementAmount: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            updateFeature: "",
            uploadType: "",
            ESNSIM: "",
            setCarrier: "",
            setModel: "",
            MSLPUK: "",
            setVendor: "",
            MSID: "",
            PO: "",
            BOX: "",
            setWholesalePrice: "",
            setSellingPrice: "",
            setNotes: "",
            setUICCID: "",
            setActivationFee: "",
            setBYOD: "",
            setDeviceId: "",
            setShipperid: "",
            setRetailPrice: "",
            setACP: "",
            setAcpReimbursementAmount: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            actions.resetForm();
        },
    });

    // dropdown options
    const feature = [
        { label: "ESN/SIM", value: "ESN/SIM" },
        { label: "DEVICE", value: "DEVICE" },
    ];
    const type = [
        { label: "Single Unit", value: "Single" },
        { label: "Bulk Upload", value: "Bulk" },
    ];
    const carrier = [
        { label: "TMB", value: "TMB" },
        { label: "TELGOOATT", value: "TELGOOATT" },
        { label: "ATTDUMMY", value: "ATTDUMMY" },
    ];
    const model = [
        { label: "Single Unit", value: "Single" },
        { label: "Bulk Upload", value: "Bulk" },
    ];
    const vendor = [{ label: "talkdaily", value: "talkdaily" }];
    const BYOD = [
        { label: "Single Unit", value: "Single" },
        { label: "Bulk Upload", value: "Bulk" },
    ];
    const shipper = [
        { label: "Single Unit", value: "Single" },
        { label: "Bulk Upload", value: "Bulk" },
    ];
    const fileUploadRef = useRef(null);
    const onUpload = (event) => {
        const files = event.files;
        console.log(files);
    };

    // conditional rendering base on the selected Option

    if (formik.values.updateFeature === "ESN/SIM" && formik.values.uploadType === "Single") {
        return (
            <div className="card">
                <Button
                    label="Back"
                    style={{ position: "absolute", marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                    onClick={() => {
                        setActiveComponent("");
                    }}
                />

                <form onSubmit={formik.handleSubmit}>
                    <p className="card font-semibold" style={{ fontSize: "1.5rem", color: "black", marginTop: "90px" }}>
                        Update Inventory
                    </p>
                    <div className="flex flex-wrap mb-3 justify-content-around">
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Update Feature <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.updateFeature} options={feature} onChange={(e) => formik.setFieldValue("updateFeature", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-3 justify-content-around">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                ESN/SIM <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.ESNSIM} name="ESNSIM" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Carrier</p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Model (PC176)</p>
                            <Dropdown value={formik.values.setModel} options={model} onChange={(e) => formik.setFieldValue("setModel", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">MSL/PUK</p>
                            <InputText type="text" value={formik.values.MSLPUK} name="MSLPUK" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Vendor (pc120)</p>
                            <Dropdown value={formik.values.setVendor} options={vendor} onChange={(e) => formik.setFieldValue("setVendor", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">MSID</p>
                            <InputText type="text" value={formik.values.MSID} name="MSID" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">PO</p>
                            <InputText type="text" value={formik.values.PO} name="PO" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">BOX</p>
                            <InputText type="text" value={formik.values.BOX} name="BOX" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Wholesale Price</p>
                            <InputText type="text" value={formik.values.setWholesalePrice} name="setWholesalePrice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Selling Price</p>
                            <InputText type="text" value={formik.values.setSellingPrice} name="setSellingPrice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Notes</p>
                            <InputText type="text" value={formik.values.setNotes} name="setNotes" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">UICCID</p>
                            <InputText type="text" value={formik.values.setUICCID} name="setUICCID" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Activation Fee</p>
                            <InputText type="text" value={formik.values.setActivationFee} name="setActivationFee" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">BYOD</p>
                            <Dropdown value={formik.values.setBYOD} options={BYOD} onChange={(e) => formik.setFieldValue("setBYOD", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3 justify-content-around">
                            <p className="m-0">Device ID</p>
                            <InputText type="text" value={formik.values.setDeviceId} name="setDeviceId" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>  
                        <div style={{width:"50%",marginLeft:"50%",transform:"translate(-50%)"}}>
                        <p style={{textAlign:"center",color:"red",marginTop:"45px"}}>Note: Please update at least one field to update ESN/SIM</p>
                        <div style={{ marginLeft: "50%",marginTop:"45px",transform:"translate(-50%)",width:"100px", marginTop: "20px" }}>
                            <Button label="Submit" type="submit" />
                        </div>      
                        </div>
                    </div>
                </form>
            </div>
        );
    } else if (formik.values.updateFeature === "ESN/SIM" && formik.values.uploadType === "Bulk") {
        return (
            <div className="card">
                {" "}
                <Button
                    label="Back"
                    style={{ position: "absolute", marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                    onClick={() => {
                        setActiveComponent("");
                    }}
                />
                <form onSubmit={formik.handleSubmit}>
                    <div className=" flex flex-row justify-content-between ">
                        <p className=" font-semibold" style={{ fontSize: "1.5rem",marginLeft:"25px",color: "black", marginTop: "90px" }}>
                            Update Inventory
                        </p>  
                        <div>
                        <Button style={{height:"45px",fontSize:"bold"}} label="ViewReport" type="button" /> 
                        </div>
                    </div>

                    <div className="flex flex-wrap mb-3  justify-content-around">
                        <div className="mr-3 mb-3" >
                            <p className="m-0">
                                Update Feature <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.updateFeature} options={feature} onChange={(e) => formik.setFieldValue("updateFeature", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-3 justify-content-around ">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Carrier</p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Vendor (pc120)</p>
                            <Dropdown value={formik.values.setVendor} options={vendor} onChange={(e) => formik.setFieldValue("setVendor", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                    </div>
                    <div style={{marginLeft:"55%",marginTop:"50px",transform:"translate(-50%)"}}>
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
                            style={{marginLeft:"50%",transform:"translate(-50%)"}}
                        />
                        <div className="mt-3">
                            <p>Please Upload File To Update Device Detail Into Inventory</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    } else if (formik.values.updateFeature === "DEVICE" && formik.values.uploadType === "Single") {
        return (
            <div className="card">
                <Button
                    label="Back"
                    style={{ position: "absolute", marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                    onClick={() => {
                        setActiveComponent("");
                    }}
                />

                <form onSubmit={formik.handleSubmit}>
                    <p className="font-semibold" style={{ fontSize: "1.5rem", color: "black", marginTop: "90px" }}>
                        Update Inventory
                    </p>
                    <div className="flex flex-wrap mb-3 justify-content-around">
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Update Feature <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.updateFeature} options={feature} onChange={(e) => formik.setFieldValue("updateFeature", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-3 justify-content-around">
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Device Id <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setDeviceId} name="setDeviceId" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Model (PC176)</p>
                            <Dropdown value={formik.values.setModel} options={model} onChange={(e) => formik.setFieldValue("setModel", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Vendor (pc120)</p>
                            <Dropdown value={formik.values.setVendor} options={vendor} onChange={(e) => formik.setFieldValue("setVendor", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">BYOD</p>
                            <Dropdown value={formik.values.setBYOD} options={BYOD} onChange={(e) => formik.setFieldValue("setBYOD", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Notes</p>
                            <InputText type="text" value={formik.values.setNotes} name="setNotes" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Wholesale Price</p>
                            <InputText type="text" value={formik.values.setWholesalePrice} name="setWholesalePrice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Carrier</p>
                            <Dropdown value={formik.values.setCarrier} options={carrier} onChange={(e) => formik.setFieldValue("setCarrier", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">PO</p>
                            <InputText type="text" value={formik.values.PO} name="PO" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">BOX</p>
                            <InputText type="text" value={formik.values.BOX} name="BOX" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Shipper Id(PC120)</p>
                            <Dropdown value={formik.values.setShipperid} options={shipper} onChange={(e) => formik.setFieldValue("setShipperid", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">Device Retail Price </p>
                            <InputText type="text" value={formik.values.setRetailPrice} name="setRetailPrice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">ACP Co-Pay Amount </p>
                            <InputText type="text" value={formik.values.setACP} name="setACP" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">ACP Device Reimbursement Amount </p>
                            <InputText type="text" value={formik.values.setAcpReimbursementAmount} name="setAcpReimbursementAmount" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                    </div>
                  
                    <div style={{width:"50%",marginLeft:"50%",transform:"translate(-50%)"}}>
                        <p style={{textAlign:"center",color:"red",marginTop:"45px"}}>Note: Please update at least one field to update Device</p>
                        <div style={{ marginLeft: "50%",marginTop:"45px",transform:"translate(-50%)",width:"100px", marginTop: "20px" }}>
                            <Button label="Submit" type="submit" />
                        </div>      
                        </div>
                </form>
            </div>
        );
    } else if (formik.values.updateFeature === "DEVICE" && formik.values.uploadType === "Bulk") {
        return (
            <div className="card">
                <Button
                    label="Back"
                    style={{ position: "absolute", marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                    onClick={() => {
                        setActiveComponent("");
                    }}
                />

                <form onSubmit={formik.handleSubmit }>
                    <div className="  flex flex flex-row justify-content-between ">
                        <p className=" font-semibold" style={{ fontSize: "1.5rem", color: "black", marginTop: "90px" }}>
                            Update Inventory
                        </p>   
                        <div>
                        <Button style={{height:"45px",fontSize:"bold"}} label="ViewReport" type="button" /> 
                        </div>
                        
                    </div>

                    <div className="flex flex-wrap mb-3 justify-content-around mt-2">
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Update Feature <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.updateFeature} options={feature} onChange={(e) => formik.setFieldValue("updateFeature", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Upload Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                        </div>
                    </div>
                    <div className="card" style={{boxShadow:"unset",marginLeft:"50%",transform:"translate(-50%)",marginTop:"45px"}}>
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
                            style={{position:"absolute",left:"50%",transform:"translate(-50%)"}}></FileUpload>
                        <div  style={{marginLeft:"88%",marginTop:"95px",transform:"translate(-90%)",textAlign:"center",width:"90%"}}>
                            <p>Please Upload File To Update Device Detail Into Inventory</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

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
                    <Dropdown value={formik.values.updateFeature} options={feature} onChange={(e) => formik.setFieldValue("updateFeature", e.value)} placeholder="Select an option" className="w-21rem" />
                </div>
                <div className="mr-3 mb-3">
                    <p className="m-0">
                        Upload Type <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown value={formik.values.uploadType} options={type} onChange={(e) => formik.setFieldValue("uploadType", e.value)} placeholder="Select an option" className="w-21rem" />
                </div>
            </div>
            <div>
                <hr style={{ height: "10px", width: "500px", color: "black", marginTop: "30px" }} />
            </div>
        </div>
    );
};

export default UpdateInventory;
