import React from "react"
import { useFormik } from "formik";
import { carrier,company,agent,master,model,portin } from "../../assets"; 
import {InputText} from "primereact/inputtext" 
import {Dropdown} from "primereact/dropdown"  
import { Button } from "primereact/button"; 
export default function SIMSingleUploadAddProvision(){ 
    const formik=useFormik({ 
        initialValues:{
            carrier:"", 
            company:"", 
            agent:"",  
            sim:"", 
            master:"",
             puk:"", 
             box:"", 
             po:"", 
             puk2:"", 
             portinstatus:"", 
             activationfee:"",
             model:"",
            imei:"", 
            costpriceforsim:"", 
            retailpriceforsim:"", 

        }
    }) 
    return (
        <>
            <div>
               
                <div className="flex flex-wrap mb-3 justify-content-around ">
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
                        <InputText type="text" value={formik.values.sim} name="sim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Company Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.company} options={company} onChange={(e) => formik.setFieldValue("company", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Agent Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.agent} options={agent} onChange={(e) => formik.setFieldValue("agent", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Master <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.master} options={master} onChange={(e) => formik.setFieldValue("master", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Model<span style={{fontSize:"12px"}}>(MICRO/NANO/SIM)</span><span style={{ color: "red" }}>*<i className="pi pi pi-plus" style={{marginLeft:"5px", fontSize: '14px',color:"#fff",padding:"5px",cursor:"pointer",paddingLeft:"10px",borderRadius:"5px",paddingRight:"10px",background:"#00c0ef" }}></i></span>
                        </p>
                        <Dropdown value={formik.values.model} options={model} onChange={(e) => formik.setFieldValue("model", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Wholesale/Cost Price For Sim</p>
                        <InputText type="text" value={formik.values.costpriceforsim} name="costpriceforsim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Selling/Retail Price For Sim</p>
                        <InputText type="text" value={formik.values.retailpriceforsim} name="retailpriceforsim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Activation Fee</p>
                        <InputText type="text" value={formik.values.activationfee} name="activationfee" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">MSL/PUK</p>
                        <InputText type="text" value={formik.values.puk} name="puk" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            PO#<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.po} name="po" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Box#<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.box} name="box" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Portin Reserved Status</p>
                        <Dropdown value={formik.values.portinstatus} options={portin} onChange={(e) => formik.setFieldValue("portinstatus", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">PUK2</p>
                        <InputText type="text" value={formik.values.puk2} name="puk2" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
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
}