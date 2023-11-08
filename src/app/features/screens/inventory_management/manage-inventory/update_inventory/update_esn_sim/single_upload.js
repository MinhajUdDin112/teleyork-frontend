import React from "react";
import { vendor,carrier ,model,BYOD} from "../assets"; 
import {InputText} from "primereact/inputtext"
import { Button } from "primereact/button"; 
import { Dropdown } from "primereact/dropdown"; 
import { useFormik } from "formik";
export default function EsnSimSingleUpload(){   
    const formik = useFormik({
        initialValues: {
            carrier: "",
             vendor:"", 
             esnsim:"",
             model:"", 
              mslpuk:"", 
                msid:"", 
                po:"", 
                box:"", 
                wholesaleprice:"", 
                sellingprice:"", 
                notes:"", 
                uiccid:"", 
                activationfee:"", 
                byod:"", 
                deviceid:"", 


        },
    });
    return (
        <div>
        
                <div className="flex flex-wrap mb-3 justify-content-around">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            ESN/SIM <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.esnsim} name="esnsim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Carrier</p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Model</p>
                        <Dropdown value={formik.values.model} options={model} onChange={(e) => formik.setFieldValue("model", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">MSL/PUK</p>
                        <InputText type="text" value={formik.values.mslpuk} name="mslpuk" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Vendor</p>
                        <Dropdown value={formik.values.vendor} options={vendor} onChange={(e) => formik.setFieldValue("vendor", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">MSID</p>
                        <InputText type="text" value={formik.values.msid} name="msid" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
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
                        <p className="m-0">Wholesale Price</p>
                        <InputText type="text" value={formik.values.wholesaleprice} name="wholesalerice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Selling Price</p>
                        <InputText type="text" value={formik.values.sellingprice} name="sellingprice" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Notes</p>
                        <InputText type="text" value={formik.values.notes} name="notes" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">UICCID</p>
                        <InputText type="text" value={formik.values.uiccid} name="uiccid" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Activation Fee</p>
                        <InputText type="text" value={formik.values.activationfee} name="activationfee" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">BYOD</p>
                        <Dropdown value={formik.values.byod} options={BYOD} onChange={(e) => formik.setFieldValue("byod", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3 justify-content-around">
                        <p className="m-0">Device ID</p>
                        <InputText type="text" value={formik.values.deviceid} name="deviceid" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>  
                    <div style={{width:"50%",marginLeft:"50%",transform:"translate(-50%)"}}>
                    <p style={{textAlign:"center",marginTop:"45px"}}>Note: Please update at least one field to update ESN/SIM</p>
                    <div style={{ marginLeft: "50%",marginTop:"45px",transform:"translate(-50%)",width:"100px", marginTop: "20px" }}>
                        <Button label="Submit" type="submit" />
                    </div>      
                    </div>
                </div>
        </div>
    );
}