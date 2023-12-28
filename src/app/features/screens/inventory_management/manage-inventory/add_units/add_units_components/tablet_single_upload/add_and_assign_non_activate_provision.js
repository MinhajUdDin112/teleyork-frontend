import React, { useState,useRef,useEffect } from "react";
import { useFormik } from "formik"; 
import * as Yup from "yup";    
import Axios  from "axios";    
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddTabletModelDialog from "./Dialogs/add_tablet_model_dialog";
import AddAgentDetail from "./Dialogs/add_agent_detail"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
export default function TabletSingleUploadAddAndAssignNonActivateProvision({permissions}) {
    let ref=useRef(null)
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [addTablet_Model_dialog_visibility, setAddTabletModelDialogVisbility] = useState(false);
    const [add_agent_detail_dialog_visibility, setAddAgentDialogVisbility] = useState(false);
    const [carrier, setCarrier] = useState(null);
    const [department, setDepartment] = useState(null);
    const [agent, setAgent] = useState(null);
    const [departmentselected, setDepartmentSelected] = useState(null);
    const [Model, setModel] = useState(null);
    useEffect(() => {
        if (department === null) {
            Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes.compony}`)
                .then((res) => {
                    console.log(res.data.data);
                    let departmentholder = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        const obj = {};
                        obj.label = res.data.data[i].department;
                        obj.value = res.data.data[i]._id;
                        departmentholder.push(obj);
                    }
                    setDepartment(departmentholder);
              // Move this inside the promise callback
                })
                .catch(() => {
                });
        }
    }, []);
    useEffect(() => {
        if (departmentselected !== null) {
            Axios.get(`${BASE_URL}/api/web/user/getByDepartments?department=${departmentselected}`)
                .then((res) => {
                    let agentholder = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        const obj = {};
                        obj.label = res.data.data[i].name;
                        obj.value = res.data.data[i]._id;
                        agentholder.push(obj);
                    }

                    setAgent(agentholder);
                })
                .catch(() => {
                
                });
        }
    }, [departmentselected]);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/carrier/all`)
            .then((res) => {
                let carrierholder = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    const obj = {};
                    obj.label = res.data.data[i].name;
                    obj.value = res.data.data[i]._id;
                    carrierholder.push(obj);
                }

                setCarrier(carrierholder);
            })
            .catch(() => {
            });
        Axios.get(`${BASE_URL}/api/deviceinventory/getTabletDeviceModel`)
            .then((res) => {
                let Modelholder = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    const obj = {};
                    obj.label = res.data.data[i].name;
                    obj.value = res.data.data[i].name;
                    Modelholder.push(obj);
                }

                setModel(Modelholder);
            })
            .catch(() => {
            });
    }, []);
    const formik = useFormik({
        validationSchema: Yup.object({
            carrier: Yup.string().required("Carrier is required"),
            Esn: Yup.string().required("Esn Number Is require").min(18, "Esn Number must be at least 18 characters").max(19, "Esn Number must be at most 19 characters"),
            box: Yup.string().required("Box is required"),
            Model: Yup.string().required("Model is required"),
              IMEI:Yup.string().required("IMEI is required").min(14, "IMEI must be at least 14 characters").max(15, "IMEI Number must be at most 15 characters"),
            AgentName: Yup.string().required("Agent Name is required"),
            agentType: Yup.string().required("Department is required"),
        }),
        initialValues: {
            carrier: "",
            serviceProvider: parseLoginRes?.companyName,
            agentType: "",
            AgentName: "",
            Esn: "",
            /* team: "",*/
            box: "",
            Model: "",
            unitType: "Tablet",
            Uploaded_by: parseLoginRes?._id,
            provisionType: "Add And Assign Non Activated", 
            IMEI:""
        },

        onSubmit: (e) => {
        
            handlesubmit();  
        
        },
    });
    function handlesubmit() {
        console.log(formik.errors);  
         let obj=formik.values; 
         obj.serviceProvider=parseLoginRes.compony 
        if (Object.keys(formik.errors).length === 0) {
            //formik.values.serviceProvider = parseLoginRes?.compony;  
            
            Axios.post(`${BASE_URL}/api/web/tabletInventory/addAndAssignNonActivate`, obj)
                .then((res) => {
                    console.log("Successfully done");  
                    formik.values.serviceProvider = parseLoginRes?.companyName;  
                    ref.current.show({ severity: "success", summary: "Inventory", detail:"Successfully Added"});
                })
                .catch((error) => {    
                    formik.values.serviceProvider = parseLoginRes?.companyName;  
                    console.log("error occured");  
                    ref.current.show({ severity: "error", summary: "Inventory", detail:error.response.data.msg});
                });  
                  
        }           
    }
    return (
        <>
           <div>
                <div className="flex flex-wrap mb-3 justify-content-around ">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Carrier <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="field-width mt-2" />
                        {formik.errors.carrier && formik.touched.carrier && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.carrier}
                            </div>
                        )}
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            ESN <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText keyfilter="int" value={formik.values.Esn} name="Esn" onChange={formik.handleChange} onBlur={formik.handleBlur} className="field-width mt-2" />
                        {formik.errors.Esn && formik.touched.Esn && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.Esn}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Company Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText value={formik.values.serviceProvider} name="serviceProvider" disabled className="field-width mt-2" />
                    </div>
                  {/*  <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Team <span style={{ color: "red" }}>* </span>
                        </p>

                        <Dropdown
                            disabled
                            value={formik.values.team}
                            options={[]}
                            onChange={(e) => {
                                formik.setFieldValue("team", e.value);
                            }}
                            placeholder="Select an option"
                            className="w-20rem mt-2"
                        />
                        {formik.errors.team && formik.touched.team && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.team}
                            </div>
                        )}
                    </div>    */}
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Department/Vendor Name <span style={{ color: "red" }}>* </span>
                        </p>

                        <Dropdown
                            value={formik.values.agentType}
                            options={department}
                            onChange={(e) => {
                                formik.setFieldValue("agentType", e.value); 
                                formik.setFieldValue("AgentName","")
                                setDepartmentSelected(e.value);
                            }}
                            placeholder="Select an option"
                            className="field-width mt-2"
                        />
                        {formik.errors.agentType && formik.touched.agentType && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.agentType}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Agent Name <span style={{ color: "red" }}>* </span>
                            {formik.values.AgentName !== "" ? (   
                                      <Button style={{border:"none",padding:"0px",backgroundColor:"transparent"}} disabled={!(permissions.isCreate)}>
                              
                                <i
                                    onClick={() => {
                                        setAddAgentDialogVisbility((prev) => !prev);
                                    }}
                                    className="pi pi pi-plus"
                                    style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                ></i>  
                                </Button>
                            ) : undefined}
                        </p>

                        <Dropdown value={formik.values.AgentName} options={agent} onChange={(e) => formik.setFieldValue("AgentName", e.value)} placeholder="Select an option" className="field-width mt-2" />
                        {formik.errors.AgentName && formik.touched.AgentName && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.AgentName}
                            </div>
                        )}
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Model
                            <span style={{ color: "red" }}>
                                *
                                <i
                                    onClick={() => {
                                        setAddTabletModelDialogVisbility((prev) => !prev);
                                    }}
                                    className="pi pi pi-plus"
                                    style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                ></i>
                            </span>
                        </p>
                        <Dropdown value={formik.values.Model} options={Model} onChange={(e) => formik.setFieldValue("Model", e.value)} placeholder="Select an option" className="field-width mt-2" />
                        {formik.errors.Model && formik.touched.Model && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.Model}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            IMEI<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" keyfilter="int"  value={formik.values.IMEI} name="IMEI" onChange={formik.handleChange} onBlur={formik.handleBlur} className="field-width mt-2" />
                        {formik.errors.IMEI && formik.touched.IMEI && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.IMEI}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Box#<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.box} name="box" onChange={formik.handleChange} onBlur={formik.handleBlur} className="field-width mt-2" />
                        {formik.errors.box && formik.touched.box && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.box}
                            </div>
                        )}
                    </div>  
                    <div className="mr-3 mb-3 mt-4"> 
                    <Button 
                      className="field-width mt-4 justify-content-center"
                        label="Submit"
                        onClick={() => {
                            formik.handleSubmit();
                            //  handlesubmit()
                        }}     
                        disabled={!(permissions.isCreate)}
                    />
                    </div>
                </div>
                
            </div>
            <Dialog
                visible={addTablet_Model_dialog_visibility}
                onHide={() => {
                    setAddTabletModelDialogVisbility((prev) => !prev);
                }}
            >
                <AddTabletModelDialog agent={"Dummy"} />
            </Dialog>
            <Dialog
                visible={add_agent_detail_dialog_visibility}
                onHide={() => {
                    setAddAgentDialogVisbility((prev) => !prev);
                }}
            >
                <AddAgentDetail agent={"Dummy"} />
            </Dialog>   
            <Toast ref={ref}/>
        </>
    );
}
