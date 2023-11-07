    import React, { useRef,useState } from "react";
    import { useFormik } from "formik";
    import { carrier, emptymaster,retailer,distributor,employee,company, agent,plan,master } from "../../assets";
    import { InputText } from "primereact/inputtext";
    import { Dropdown } from "primereact/dropdown";
    import { FileUpload } from "primereact/fileupload";    
    import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./dialogs/add_agent_detail";
import InfoForUsers from "./InfoForUsers/info_for_users";
    export default function SIMBulkUploadAddPreActivatedProvision(){  
        const [addAgentDialogVisibility, setAddAgentDialogVisibility] = useState(false);
    
        const fileUploadRef=useRef(null) 
    function onUpload(){  
    } 
    const formik = useFormik({
        initialValues: {
            carrier: "",
            company: "",
            agent: "",
            master:"", 
            trackingnumber:"", 
            tinnumber:"", 
            planid:"", 
    
        },
    });
        return (
            <>
                <div>
                    
                    <div className="flex flex-wrap mb-3 justify-content-around ">
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
                                        *
                                        {formik.values.agent !== "employee" ? (
                                            <i
                                                onClick={() => {
                                                    setAddAgentDialogVisibility((prev) => !prev);
                                                }}
                                                className="pi pi pi-plus"
                                                style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                            ></i>
                                        ) : undefined}
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
                                Plan ID <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.planid} options={plan} onChange={(e) => formik.setFieldValue("planid", e.value)} placeholder="Select an option" className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Tracking Number <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.setTrackingNum} name="trackingnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">TIN Number</p>
                            <InputText type="text" value={formik.values.setTINNum} name="tinnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                        </div>
                    </div>
                         <div className="flex justify-content-center align-item-center">
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
                        </div>
                        <InfoForUsers ProvisionType={"AddPreActivated"}/>
                
                </div>  
                <Dialog
                style={{ width: "90vw" }}
                visible={addAgentDialogVisibility}
                onHide={() => {
                    setAddAgentDialogVisibility((prev) => !prev);
                }}
            >
                <AddAgentDetail AgentName={formik.values.agent} />
            </Dialog>
            </>
        );
        
    
    }