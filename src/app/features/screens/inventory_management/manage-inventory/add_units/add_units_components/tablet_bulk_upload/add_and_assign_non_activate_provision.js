//company agent tracking master carrier tin//
import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./Dialogs/add_agent_detail";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function TabletBulkUploadAddAndAssignNonActivateProvision({ permissions, unit, model }) {
    const ref = useRef(null);
    const [filename, setFilename] = useState(null);
    useEffect(()=>{  
        formik.values.billingModel=model
       console.log(formik.values)
},[model])
    const [addAgentDialogVisibility, setAddAgentDialogVisibility] = useState(false);
    const loginRes = localStorage.getItem("userData");
    const [agent, setAgent] = useState(null);
    const [department, setDepartment] = useState(null);
    const parseLoginRes = JSON.parse(loginRes);
    const [departmentselected, setDepartmentSelected] = useState(parseLoginRes?.department);
    const [carrier, setCarrier] = useState(null);
    const [fileerror, setFileError] = useState(false);
    useEffect(() => {
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
                .catch(() => {});
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
            .catch(() => {});
    }, []);

    const formik = useFormik({
        validationSchema: Yup.object({
            carrier: Yup.string().required("Carrier is required"),

            AgentName: Yup.string().required("Agent Name is required"),
            agentType: Yup.string().required("Department is required"),
        }),
        initialValues: {
            carrier: "",
            file: "",
            serviceProvider: parseLoginRes?.companyName,
            agentType: parseLoginRes?.department,
            AgentName: parseLoginRes?._id,
            /*team:"",*/
            unitType: unit,
            billingModel: model,
            Uploaded_by: parseLoginRes?._id,
            provisionType: "Add And Assign Non Active",
        },

        onSubmit: (values, actions) => {
            handlesubmit();
        },
    });
    function ApiResponseShow({ res }) { 
        return (
            <div className="flex flex-wrap justify-content-left ">
                <p>{res?.msg}</p>
                <div>
                    <p> Duplicate Numbers : {res?.data?.data?.duplicateNumbers?.length}</p>
                    <ul className="m-0 list-none errormsg  ">
                        {res?.data?.data?.duplicateNumbers?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div> 
                <div>
                    <p> Empty SIMS Rows : {res?.data?.data?.emptySIMRows?.length}</p>
                    <ul className="m-0 list-none errormsg  ">
                        {res?.data?.data?.emptySIMRows?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-3 w-full">
                    <p>Sim Numbers Added: {res?.data?.data?.newSimNumbers?.length}</p>
                    <ul className=" m-0 list-none">
                        {res?.data?.data?.newSimNumbers?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div> 
                <div className="mt-3 w-full">
                    <p>Invalid SIMS: {res?.data?.data?.invalidSIMs?.length}</p>
                    <ul className=" m-0 list-none">
                        {res?.data?.data?.invalidSIMs?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div>    
                <div className="mt-3 w-full">
                    <p>No BoxNo Added For SIMS: {res?.data?.data?.noBoxNoAddedForSIMS?.length}</p>
                    <ul className=" m-0 list-none">
                        {res?.data?.data?.noBoxNoAddedForSIMS?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div> 
                <div className="mt-3 w-full">
                    <p>No Model Added For SIMs: {res?.data?.data?.noModelAddedForSIMs?.length}</p>
                    <ul className=" m-0 list-none">
                        {res?.data?.data?.noModelAddedForSIMs?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div>  
                <div className="mt-3 w-full">
                    <p>No IMEI Added For SIMs: {res?.data?.data?.noIMEIAddedForSIMS?.length}</p>
                    <ul className=" m-0 list-none">
                        {res?.data?.data?.noIMEIAddedForSIMS?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div>  
                <div className="mt-3 w-full">
                    <p>No Make Added For SIMs: {res?.data?.data?.noMakeForSIMS?.length}</p>
                    <ul className=" m-0 list-none">
                        {res?.data?.data?.noMakeForSIMS?.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div> 
       

                
            </div>
        );
    }
    function handlesubmit(actions) {
        const formData = new FormData();
        formData.append("file", formik.values.file);
        formData.append("serviceProvider", parseLoginRes?.company);
        formData.append("Uploaded_by", formik.values.Uploaded_by);
        formData.append("carrier", formik.values.carrier);

        formData.append("billingModel", formik.values.billingModel);
        formData.append("agentType", formik.values.agentType);
        formData.append("AgentName", formik.values.AgentName);
        formData.append("unitType", formik.values.unitType);
        formData.append("provisionType", formik.values.provisionType);
        // Perform API call or other actions with the formData
        if (Object.keys(formik.errors).length === 0) {
            if (formik.values.file !== "") {
                formik.values.serviceProvider = parseLoginRes?.company;
                Axios.post(`${BASE_URL}/api/web/tabletInventory/bulkAddAndAssignNonActivate`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((res) => {
                        try {
                            // ref.current.show({ severity: "success", summary: "Inventory", detail: <ApiResponseShow res={res} /> });

                            if (res?.data?.data?.duplicateNumbers?.length !== 0 || res?.data?.data?.emptySIMRows?.length !== 0 ||  res?.data?.data?.newSimNumbers?.length !== 0 ||  res?.data?.data?.noBoxNoAddedForSIMS?.length !== 0 || res?.data?.data?.noModelAddedForSIMs?.length !== 0 ||  res?.data?.data?.noIMEIAddedForSIMS?.length !==0 ||  res?.data?.data?.noMakeForSIMS?.length !== 0 ) {
                                ref.current.show({ severity: "error", summary: "Inventory", detail: <ApiResponseShow res={res} /> });
                            } else {
                                ref.current.show({ severity: "success", summary: "Inventory", detail: <ApiResponseShow res={res} /> });
                            }
                            formik.setFieldValue("carrier", "");
                            formik.setFieldValue("file", "");
                            formik.setFieldValue("serviceProvider", parseLoginRes?.companyName);
                            ;
                            ;
                            formik.setFieldValue("SimNumber", "");
                            formik.setFieldValue("unitType", "Tablet");
                            formik.setFieldValue("Uploaded_by", parseLoginRes?._id);
                            formik.setFieldValue("provisionType", "Bulk Add And Assign Non Active Tablets");
                            ;
                            setFilename(null);
                            actions.resetForm();
                        } catch (err) {
                        }
                    })
                    .catch((err) => {
                        ref.current.show({ severity: "error", summary: "Inventory", detail: "Bulk Upload Failed" });
                    });
                formik.values.serviceProvider = parseLoginRes?.companyName;
            } else {
                setFileError(true);
            }
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
                            Company Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText value={formik.values.serviceProvider} name="serviceProvider" disabled className="field-width mt-2" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Department/Vendor Name <span style={{ color: "red" }}>* </span>
                        </p>

                        <Dropdown 
                        disabled
                            value={formik.values.agentType}
                            options={department} 
                            name="agentType"
                            onChange={(e) => {
                                formik.setFieldValue("agentType", e.value);
                                ;
                                setDepartmentSelected(e.value); 
                                 formik.handleChange(e)
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
                    <div className="mr-3 mb-3 mt-4">
                        {" "}
                        <Button
                            className="mt-4 field-width justify-content-center"
                            onClick={() => {
                                setFileError(false);
                                let input = document.createElement("input");
                                input.type = "file";
                                input.accept = ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                                input.click();
                                input.onchange = (e) => {
                                    setFilename(e.target.files[0].name);

                                    formik.setFieldValue("file", e.target.files[0]);
                                };
                            }}
                        >
                            {" "}
                            {filename === null ? "Add File" : filename}
                        </Button>
                        {fileerror ? (
                            <p className="mt-2" style={{ color: "red" }}>
                                File is required
                            </p>
                        ) : undefined}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Agent Name <span style={{ color: "red" }}>* </span>
                            {formik.values.AgentName !== "" ? (
                                <Button style={{ border: "none", padding: "0px", backgroundColor: "transparent" }} disabled={!permissions.isCreate}>
                                    <i
                                        onClick={() => {
                                            setAddAgentDialogVisibility((prev) => !prev);
                                        }}
                                        className="pi pi pi-plus"
                                        style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                    ></i>
                                </Button>
                            ) : undefined}
                        </p>

                        <Dropdown 
                          disabled
                         value={formik.values.AgentName} options={agent} onChange={(e) => formik.setFieldValue("AgentName", e.value)} placeholder="Select an option" className="field-width mt-2" />
                        {formik.errors.AgentName && formik.touched.AgentName && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.AgentName}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-4">
                        <Button
                            className="mt-4 field-width justify-content-center"
                            onClick={() => {
                                if (formik.values.file === "") {
                                    setFileError(true);
                                }
                                formik.handleSubmit();
                            }}
                            disabled={!permissions.isCreate}
                        >
                            Submit{" "}
                        </Button>
                    </div>
                </div>

                <>
                    <p className="mt-4">
                        <strong>Notes:</strong>
                        SIM, MDN, Model ID (STANDARD/MICRO/NANO), MSL/PUK,Puk2, PO#,BOX#, Wholesale/Cost Price for SIM, Selling/Retail Price for SIM, UICCID, Zipcode, Activation Fee , MSID,Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Device Retail Price
                        {formik.values.carrier === "" ? (
                            <p className="font-bold" style={{ display: "inline-block" }}>
                                {" "}
                                &nbsp; (Sample file)
                            </p>
                        ) : (
                            <a download={true} href="/images/inventory Sample File.xlsx" className="font-bold">
                                {" "}
                                &nbsp; (Sample file)
                            </a>
                        )}
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the (Sample File)
                    </p>
                </>
                {/* <InfoForUsers ProvisionType={"AddAndAssignNonActive"}/>*/}
                <Dialog
                    style={{ width: "90vw" }}
                    visible={addAgentDialogVisibility}
                    onHide={() => {
                        setAddAgentDialogVisibility((prev) => !prev);
                    }}
                >
                    <AddAgentDetail AgentName={"Dummy"} />
                </Dialog>
                <Toast ref={ref} />
            </div>
        </>
    );
}
