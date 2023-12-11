import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./Dialogs/add_agent_detail";
import AddSimModelDialog from "./Dialogs/add_sim_model_dialog";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function EsnSimSingleUpload({ permissions }) {
    let ref = useRef(null);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    console.log(parseLoginRes);
    const [addsim_Model_dialog_visibility, setAddSimModelDialogVisbility] = useState(false);
    const [add_agent_detail_dialog_visibility, setAddAgentDialogVisbility] = useState(false);
    const [carrier, setCarrier] = useState(null);
    const [department, setDepartment] = useState(null);
    const [agent, setAgent] = useState(null);
    const [departmentselected, setDepartmentSelected] = useState(null);
    const [Model, setModel] = useState(null);      
    const [defaultSelectedAgent,setDefaultSelectedAgent ]=useState(null)  
    const [currentEsnToUpdate,setCurrentEsnToUpdate]=useState(null)  
    useEffect(() => {
        //Getting Department Selected and Whenever its value change calling this api to get agentName for DropDown and Setting it
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
                    if(defaultSelectedAgent !== null){ 
                        formik.setFieldValue("AgentName",defaultSelectedAgent)
                    }
                })
                .catch(() => {
                    console.log("error");   
                    currentEsnToUpdate(null)
                });
        }
    }, [departmentselected]);
    useEffect(() => {
        //Getting carriers  for DropDown and Setting it
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
                console.log("error");  

            });
        //Getting SIM Model Type for DropDown and Setting it
        Axios.get(`${BASE_URL}/api/simType/all`)
            .then((res) => {
                let Modelholder = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    const obj = {};
                    obj.label = res.data.data[i].simType;
                    obj.value = res.data.data[i].simType;
                    Modelholder.push(obj);
                }

                setModel(Modelholder);
            })
            .catch(() => {
                console.log("error");
            });
        //Getting Departments for DropDown and Setting it
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
                    console.log("department holder is ", departmentholder);
                    setDepartment(departmentholder);
                    console.log(department); // Move this inside the promise callback
                })
                .catch(() => {
                    console.log("error");
                });
        }
    }, []);
    console.log("department is ", department);
    const formik = useFormik({
        validationSchema: Yup.object({
            SimNumber: Yup.string().required("SIM Number Is Required").min(18, "Sim Number must be at least  18 characters").max(19, "Sim Number must be at most 19 characters"),
        }),
        initialValues: {
            carrier: "",
            agentType: "",
            AgentName: "",
            SimNumber: "",
            /* team: "",*/
            box: "",
            Model: "",
     
        },
        onSubmit: (e) => {
            handlesubmit();
        },
    });
    function handlePopulateDataByEsn(e) {    
          if(e.target.value.length === 18 || e.target.value.length === 19 ){ 
            Axios.get(`${BASE_URL}/api/web/simInventory/getByESN?esn=${e.target.value}`).then((res)=>{  
                console.log("res is ",res)      
                setCurrentEsnToUpdate(e.target.value)
                      formik.setFieldValue("agentType",res.data.data.AgentType._id)  
                      console.log("department data of agent type is",res.data.data.AgentType._id) 
                      formik.setFieldValue("carrier",res.data.data.carrier._id) 
                      formik.setFieldValue("Model",(res.data.data.Model).toLowerCase()) 
                      formik.setFieldValue("box",res.data.data.box)
                      setDefaultSelectedAgent(res.data.data.AgentName._id)
                      setDepartmentSelected(res.data.data.AgentType._id);  
                       
            }).catch(err=>{ 
                    setCurrentEsnToUpdate(null)
            })
              
          } 
  
        formik.setFieldValue("SimNumber", e.target.value);
    }
    function handlesubmit() {
      
        let obj = formik.values;          
          Object.keys(obj).map(item=>{ 
            if(obj[item].length === 0){ 
                 delete obj[item]
            }
          })
        if(currentEsnToUpdate !== null){ 
            Axios.put(`${BASE_URL}/api/web/simInventory/update?simNumber=${currentEsnToUpdate}`,obj).then(()=>{ 
                
            }).catch(err=>{ 

            })
        }
       
    }
    return (
        <>
            <div>
                <div className="flex flex-wrap mb-3 justify-content-around ">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            ESN/SIM Number <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText
                            keyfilter="int"
                            value={formik.values.SimNumber}
                            name="SimNumber"
                            onChange={(e) => {
                                handlePopulateDataByEsn(e);
                            }}
                            onBlur={formik.handleBlur}
                            className="w-15rem mt-2"
                        />
                        {formik.errors.SimNumber && formik.touched.SimNumber && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.SimNumber}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Carrier</p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder=" -- Select -- " className="w-15rem mt-2" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Company Name</p>
                        <InputText value={formik.values.serviceProvider} name="serviceProvider" disabled className="w-15rem mt-2" />
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
                            className="w-15rem mt-2"
                        />
                        {formik.errors.team && formik.touched.team && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.team}
                            </div>
                        )}
                    </div>    */}
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Department/Vendor Name</p>

                        <Dropdown
                            value={formik.values.agentType}
                            options={department}
                            onChange={(e) => {
                                formik.setFieldValue("agentType", e.value);
                                formik.setFieldValue("AgentName", "");
                                setDepartmentSelected(e.value);
                            }}
                            placeholder=" Select "
                            className="w-15rem mt-2"
                        />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Agent Name
                            {formik.values.agentType !== "" ? (
                                <Button style={{ border: "none", padding: "0px", backgroundColor: "transparent" }} disabled={!permissions.isCreate}>
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

                        <Dropdown value={formik.values.AgentName} options={agent} onChange={(e) => formik.setFieldValue("AgentName", e.value)} placeholder="Select" className="w-15rem mt-2" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Model<span style={{ fontSize: "12px" }}>(MICRO/NANO/SIM)</span>
                            <span style={{ color: "red" }}>
                                <i
                                    onClick={() => {
                                        setAddSimModelDialogVisbility((prev) => !prev);
                                    }}
                                    className="pi pi pi-plus"
                                    style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                ></i>
                            </span>
                        </p>
                        <Dropdown value={formik.values.Model} options={Model} onChange={(e) => formik.setFieldValue("Model", e.value)} placeholder=" -- Select --" className="w-15rem mt-2" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Box#</p>
                        <InputText type="text" value={formik.values.box} name="box" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-15rem mt-2" />
                    </div>
                </div>
                <div className="flex flex-wrap justify-content-center align-item-center">
                    <Button
                        label="Submit"
                        onClick={() => {
                            formik.handleSubmit();
                            //  handlesubmit()
                        }}
                        disabled={!permissions.isCreate}
                    />
                </div>
            </div>
            <Dialog
                visible={addsim_Model_dialog_visibility}
                onHide={() => {
                    setAddSimModelDialogVisbility((prev) => !prev);
                }}
            >
                <AddSimModelDialog agent={"Dummy"} />
            </Dialog>
            <Dialog
                visible={add_agent_detail_dialog_visibility}
                onHide={() => {
                    setAddAgentDialogVisbility((prev) => !prev);
                }}
            >
                <AddAgentDetail agent={"Dummy"} />
            </Dialog>
            <Toast ref={ref} />
        </>
    );
}
