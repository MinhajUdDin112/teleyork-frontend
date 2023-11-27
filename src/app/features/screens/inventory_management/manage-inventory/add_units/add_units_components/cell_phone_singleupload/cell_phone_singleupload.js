import React,{useState} from "react"; 
import { useFormik } from "formik";  
import { BYOD,carrier, company, agent, emptymaster, master, model, portin, retailer, distributor, employee } from "../../assets";
import {InputText} from "primereact/inputtext" 
import {Dropdown} from "primereact/dropdown" 
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./Dialogs/add_agent_detail";
import AddGsmModelDialog from "./Dialogs/add_gsm_model_dialog";
import { Card } from "primereact/card";
export default function CellPhoneSingleUpload() {      
    const [addgsm_model_dialog_visibility, setAddGsmModelDialogVisbility] = useState(false);
    const [add_agent_detail_dialog_visibility,setAddAgentDialogVisbility]=useState(false)
  
    const formik=useFormik({ 
        initialValues:{
            carrier:"", 
            company:"", 
            agent:"", 
            model:"", 
             byod:"", 
             po:"", 
             master:"",
             tinnum:"", 
             box:"", 
             retailpriceforsim:"", 
             activationfee:"",  
             acpcopayamount:"", 
             trackingnumber:"", 
            acpreimbursementamount:"", 
            imei:""
        }
    })
    return (
        <>
            <div>
               
 <div className="flex flex-wrap mb-3 justify-content-around">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Carrier <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-20rem" />
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
                        {formik.values.agent !== "" ? (
                            <>
                                <p className="m-0">
                                    {formik.values.agent.charAt(0).toUpperCase() + formik.values.agent.slice(1)}{" "}
                                    <span style={{ color: "red" }}>
                                        *  { 
                                        formik.values.agent !== "employee" ?
                                        <i
                                            onClick={() => {
                                                setAddAgentDialogVisbility((prev) => !prev);
                                            }}
                                            className="pi pi pi-plus"
                                            style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                        ></i>  :undefined 
                                        }
                                    </span>
                                </p>
                                <Dropdown
                                    value={formik.values.master}
                                    options={formik.values.agent === "master" ? master : formik.values.agent === "retailer" ? retailer : formik.values.agent === "distributor" ? distributor : employee}
                                    onChange={(e) => formik.setFieldValue("master", e.value)}
                                    placeholder="Select an option"
                                    className="w-20rem"
                                />
                            </>
                        ) : (
                            <>
                                <p className="m-0">
                                    Master <span style={{ color: "red" }}>*</span>
                                </p>
                                <Dropdown value={formik.values.master} options={emptymaster} onChange={(e) => formik.setFieldValue("master", e.value)} placeholder="Select an option" className="w-20rem" />
                            </>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Model(PC176)<span style={{ color: "red" }}>*<i onClick={()=>{setAddGsmModelDialogVisbility(prev=>!prev)}} className="pi pi pi-plus" style={{marginLeft:"5px", fontSize: '14px',color:"#fff",padding:"5px",cursor:"pointer",paddingLeft:"10px",borderRadius:"5px",paddingRight:"10px",background:"#00c0ef" }}></i></span>
                        </p>
                        <Dropdown value={formik.values.model} options={model} onChange={(e) => formik.setFieldValue("model", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">BYOD</p>
                        <Dropdown value={formik.values.byod} options={BYOD} onChange={(e) => formik.setFieldValue("byod", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">ACP Co-Pay Amount </p>
                        <InputText type="text" value={formik.values.acpcopayamount} name="acpcopayamount" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">ACP Device Reimbursement Amount </p>
                        <InputText type="text" value={formik.values.acpreimbursementamount} name="acpreimbursementamount" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Wholesale Price </p>
                        <InputText type="text" value={formik.values.costpriceforsim} name="costpriceforsim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Retail Price</p>
                        <InputText type="text" value={formik.values.retailpriceforsim} name="retailpriceforsim" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Tracking Number <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.trackingnumber} name="trackingnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Activation Fee</p>
                        <InputText type="text" value={formik.values.activationfee} name="activationfee" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">TIN</p>
                        <InputText type="text" value={formik.values.tinnum} name="tinnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">PO#</p>
                        <InputText type="text" value={formik.values.po} name="po" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Box#<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.box} name="box" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Device ID</p>
                        <InputText type="text" value={formik.values.imei} name="imei" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <Button style={{ marginLeft: "50%", transform: "translate(-50%)", width: "100px" }} label="Submit" type="submit" />
                </div>
            </div>
            <div>
                <Card
                    style={{
                        width: "50%",
                        height: "auto",
                        backgroundColor: "#aae5e9",
                        marginBottom: "20px",

                        marginTop: "50px",
                        marginLeft: "50%",
                        transform: "translate(-50%)",
                        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div className="ml-3">
                        <h2>ACP Co-Pay Amount</h2>
                        <p>In this field enter the amount that will be paid by the customer when thy are eligible to get acp supported device</p>
                        <h3>ACP Device Reimbursement Amount </h3>
                        <p>In this field enter the amount that will be Reimbursed from USAC for selling the acp device</p>
                    </div>
                </Card>
            </div> 
            <Dialog
                visible={addgsm_model_dialog_visibility}
                onHide={() => {
                    setAddGsmModelDialogVisbility((prev) => !prev);
                }}
            >
                <AddGsmModelDialog agent={formik.values.agent} />
            </Dialog>
            <Dialog
                visible={add_agent_detail_dialog_visibility}
                onHide={() => {
                    setAddAgentDialogVisbility((prev) => !prev);
                }}
            >
                <AddAgentDetail AgentName={formik.values.agent} />
            </Dialog>
        </>
    );
}
