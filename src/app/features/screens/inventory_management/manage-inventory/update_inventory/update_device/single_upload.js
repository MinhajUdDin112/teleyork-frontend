import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./Dialogs/add_agent_detail";
import AddSimModelDialog from "./Dialogs/add_sim_model_dialog";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function UpdateDeviceSingleUpload({ permissions }) {
    let ref = useRef(null);
    //Getting User Data from localstorage
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    //Adding SIM Model And Agent Details Screen Dialog Visibility
    const [addsim_Model_dialog_visibility, setAddSimModelDialogVisbility] = useState(false);
    const [add_agent_detail_dialog_visibility, setAddAgentDialogVisbility] = useState(false);
    const [carrier, setCarrier] = useState(null);
    const [department, setDepartment] = useState(null);
    const [agent, setAgent] = useState(null);
    const [departmentselected, setDepartmentSelected] = useState(null);
    const [Model, setModel] = useState(null);
    const [defaultSelectedAgent, setDefaultSelectedAgent] = useState(null);
    const [esnExist, setEsnExist] = useState(null);
    const [simNumberError, setSimNumberError] = useState(false);
    const [imeiNumberError, setImeiNumberError] = useState(false);
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
                    if (defaultSelectedAgent !== null) {
                        formik.setFieldValue("AgentName", defaultSelectedAgent);
                    }
                })
                .catch(() => {});
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
            .catch(() => {});
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
            .catch(() => {});
        //Getting Departments for DropDown and Setting it
        if (department === null) {
            Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes.company}`)
                .then((res) => {
                    let departmentholder = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        const obj = {};
                        obj.label = res.data.data[i].department;
                        obj.value = res.data.data[i]._id;
                        departmentholder.push(obj);
                    }
                    setDepartment(departmentholder);
                })
                .catch(() => {});
        }
    }, []);
    const formik = useFormik({
        validationSchema: Yup.object({
            SimNumberToUpdate: Yup.string().required("SIM Number Is Required").min(18, "Sim Number must be at least  18 characters").max(19, "Sim Number must be at most 19 characters"),
        }),
        initialValues: {
            carrier: "",
            agentType: "",
            AgentName: "",
            SimNumber: "",
            SimNumberToUpdate: "",
            box: "",
            Model: "",
            status: "",
            IMEI: "",
        },
        onSubmit: (e) => {
            handlesubmit();
        },
    });
    function handlePopulateDataByEsn(e) {
        if (e.target.value.length === 18 || e.target.value.length === 19) {
            //Getting SIM Details
            Axios.get(`${BASE_URL}/api/web/simInventory/getByESN?esn=${e.target.value}`)
                .then((res) => {
                    setEsnExist(e.target.value);

                    formik.setFieldValue("agentType", res.data.data.AgentType._id);
                    formik.setFieldValue("carrier", res.data.data.carrier._id);
                    formik.setFieldValue("status", res.data.data.status);
                    formik.setFieldValue("Model", res.data.data.Model.toLowerCase());
                    formik.setFieldValue("box", res.data.data.box);
                    formik.setFieldValue("IMEI", res.data.data.IMEI);
                    formik.setFieldValue("SimNumber", res.data.data.SimNumber);

                    setDefaultSelectedAgent(res.data.data.AgentName._id);
                    setDepartmentSelected(res.data.data.AgentType._id);

                    toast.success("Inventory Detail Successfully Fetched");
                })
                .catch((err) => {
                    //Setting this to null so Api Not call if ESN Not found in Inventory
                    setEsnExist(null);
                    ;
                    formik.setFieldValue("carrier", "");
                    formik.setFieldValue("status", "");
                    formik.setFieldValue("Model", "");
                    formik.setFieldValue("box", "");
                    formik.setFieldValue("IMEI", "");
                    ;
                    formik.setFieldValue("SimNumber", "");
                    setDefaultSelectedAgent(null);
                    setDepartmentSelected(null);

                    toast.error(err?.response?.data?.message);
                    toast.error(err?.response?.data?.msg);
                });
        } else {
            setEsnExist(null);
            ;
            formik.setFieldValue("carrier", "");
            formik.setFieldValue("status", "");
            formik.setFieldValue("Model", "");
            formik.setFieldValue("box", "");
            ;
            formik.setFieldValue("SimNumber", "");
            formik.setFieldValue("IMEI", "");
            setDefaultSelectedAgent(null);
            setDepartmentSelected(null);
        }
        formik.setFieldValue("SimNumberToUpdate", e.target.value);
    }
    function handlesubmit() {
        let obj = formik.values;
        let currentvalue = obj.SimNumberToUpdate;
        Object.keys(obj).map((item) => {
            if (obj[item].length === 0) {
                delete obj[item];
            }
        });
        delete obj.SimNumberToUpdate;

        if (esnExist !== null) {
            if (obj.hasOwnProperty("SimNumber") && obj.hasOwnProperty("IMEI")) {
                if (formik.values.SimNumber.length === 18 || formik.values.SimNumber.length === 19) {
                    if (formik.values.IMEI.length === 15) {
                        Axios.put(`${BASE_URL}/api/web/simInventory/update?simNumber=${esnExist}`, obj)
                            .then(() => {
                                obj.SimNumberToUpdate = currentvalue;

                                toast.success("Inventory Successfully Updated");
                            })
                            .catch(() => {   
                                obj.SimNumberToUpdate = currentvalue;
                                toast.error("Inventory Updation Failed");

                            });
                    } else {
                        obj.SimNumberToUpdate = currentvalue;
                        setImeiNumberError(true);
                    }
                } else {
                    if (formik.values.IMEI.length === 15) {
                    } else {
                        setImeiNumberError(true);
                    }
                    obj.SimNumberToUpdate = currentvalue;
                    setSimNumberError(true);
                }
            } else {
                if (obj.hasOwnProperty("SimNumber")) {
                    if (formik.values.SimNumber.length === 18 || formik.values.SimNumber.length === 19) {
                        Axios.put(`${BASE_URL}/api/web/simInventory/update?simNumber=${esnExist}`, obj)
                            .then(() => {
                                obj.SimNumberToUpdate = currentvalue;

                                toast.success("Inventory Successfully Updated");
                            })
                            .catch((err) => {
                                obj.SimNumberToUpdate = currentvalue;
    
                                toast.error("Inventory Updation Failed"); 
                                

                            });
                    }
                } else if (obj.hasOwnProperty("IMEI")) {
                    if (formik.values.IMEI.length === 15) {
                        Axios.put(`${BASE_URL}/api/web/simInventory/update?simNumber=${esnExist}`, obj)
                            .then(() => {
                                obj.SimNumberToUpdate = currentvalue;

                                toast.success("Inventory Successfully Updated");
                            })
                            .catch((err) => {
                                obj.SimNumberToUpdate = currentvalue;
                          
                                toast.error("Inventory Updation Failed");
                            });
                    } else {
                        setImeiNumberError(true);
                    }
                } else {
                    Axios.put(`${BASE_URL}/api/web/simInventory/update?simNumber=${esnExist}`, obj)
                        .then(() => {
                            obj.SimNumberToUpdate = currentvalue; 
                            
                            toast.success("Inventory Successfully Updated");
                        })
                        .catch(() => {
                            obj.SimNumberToUpdate = currentvalue; 
                             
                            toast.error("Inventory Updation Failed");
                        });
                }
            }
        }
    }
    return (
        <>
            <div>
                <ToastContainer />
                <div className="flex flex-wrap mb-3 justify-content-around ">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            ESN/SIM Number To Update <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText
                            keyfilter="int"
                            value={formik.values.SimNumberToUpdate}
                            name="SimNumberToUpdate"
                            onChange={(e) => {
                                handlePopulateDataByEsn(e);
                            }}
                            onBlur={formik.handleBlur}
                            className="field-width mt-2"
                        />
                        {formik.errors.SimNumberToUpdate && formik.touched.SimNumberToUpdate && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.SimNumberToUpdate}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">ESN/SIM Number</p>
                        <InputText
                            keyfilter="int"
                            value={formik.values.SimNumber}
                            name="SimNumber"
                            onChange={(e) => {
                                formik.setFieldValue("SimNumber", e.target.value);
                                setSimNumberError(false);
                            }}
                            onBlur={formik.handleBlur}
                            className="field-width mt-2"
                        />
                        {simNumberError === true ? (
                            <p className="field-width mt-2" style={{ color: "red" }}>
                                Sim Number must be at least 18 and at most 19 characters
                            </p>
                        ) : undefined}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">IMEI</p>
                        <InputText
                            type="text"
                            keyfilter="int"
                            value={formik.values.IMEI}
                            name="IMEI"
                            onChange={(e) => {
                                formik.setFieldValue("IMEI", e.target.value);
                                setImeiNumberError(false);
                            }}
                            onBlur={formik.handleBlur}
                            className="field-width mt-2"
                        />
                        {imeiNumberError === true ? (
                            <p className="field-width mt-2" style={{ color: "red" }}>
                                IMEI Number must be of 15 characters
                            </p>
                        ) : undefined}
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Carrier</p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder=" -- Select -- " className="field-width mt-2" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Department/Vendor Name</p>

                        <Dropdown
                            value={formik.values.agentType}
                            options={department}
                            onChange={(e) => {
                                formik.setFieldValue("agentType", e.value);
                                ;
                                setDepartmentSelected(e.value);
                            }}
                            placeholder=" Select "
                            className="field-width mt-2"
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

                        <Dropdown value={formik.values.AgentName} options={agent} onChange={(e) => formik.setFieldValue("AgentName", e.value)} placeholder="Select" className="field-width mt-2" />
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
                        <Dropdown value={formik.values.Model} options={Model} onChange={(e) => formik.setFieldValue("Model", e.value)} placeholder=" -- Select --" className="field-width mt-2" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Status</p>

                        <Dropdown
                            value={formik.values.status}
                            options={[
                                { label: "AVAILABLE", value: "available" },
                                { label: "INUSE", value: "inUse" },
                                { label: "DEACTIVATED", value: "deactivated" },
                            ]}
                            onChange={(e) => formik.setFieldValue("status", e.value)}
                            placeholder="Select"
                            className="field-width mt-2"
                        />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Box#</p>
                        <InputText type="text" value={formik.values.box} name="box" onChange={formik.handleChange} onBlur={formik.handleBlur} className="field-width mt-2" />
                    </div>
                </div>
                <div className="flex flex-wrap justify-content-center align-item-center">
                    <Button
                        className="field-width justify-content-center"
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
