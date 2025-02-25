import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import Axios from "axios";
import * as Yup from "yup";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./dialogs/add_agent_detail";
import InfoForUsers from "./InfoForUsers/info_for_users";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function SIMBulkUploadAddPreActivatedProvision({ permissions, unit, model }) {
    const ref = useRef(null);
    useEffect(()=>{  
        formik.values.billingModel=model
       console.log(formik.values)
},[model])
    const [filename, setFilename] = useState(null);
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
            provisionType: "Bulk Add Pre-Activate Sim",
        },

        onSubmit: (values, actions) => {
            handlesubmit(actions);
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
            </div>
        );
    }
    function handlesubmit(actions) {
        const formData = new FormData();
        formData.append("file", formik.values.file);
        formData.append("serviceProvider", parseLoginRes?.company);
        formData.append("Uploaded_by", formik.values.Uploaded_by);
        formData.append("carrier", formik.values.carrier);
        formData.append("agentType", formik.values.agentType);

        formData.append("billingModel", formik.values.billingModel);
        formData.append("AgentName", formik.values.AgentName);
        formData.append("unitType", formik.values.unitType);
        formData.append("provisionType", formik.values.provisionType);
        // Perform API call or other actions with the formData

        if (Object.keys(formik.errors).length === 0) {
            if (formik.values.file !== "") {
                formik.values.serviceProvider = parseLoginRes?.company;
                Axios.post(`${BASE_URL}/api/web/simInventory/bulkAddPreSimActivated`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((res) => {
                        try {
                            // ref.current.show({ severity: "success", summary: "Inventory", detail: <ApiResponseShow res={res} /> });
                            if (res?.data?.data?.duplicateNumbers?.length !== 0 || res?.data?.data?.invalidSIMs?.length !== 0 || res?.data?.data?.noBoxNoAddedForSIMS?.length !== 0 || res?.data?.data?.noModelAddedForSIMs?.length !== 0) {
                                ref.current.show({ severity: "error", summary: "Inventory", detail: <ApiResponseShow res={res} /> });
                            } else {
                                ref.current.show({ severity: "success", summary: "Inventory", detail: <ApiResponseShow res={res} /> });
                            }
                            formik.setFieldValue("carrier", "");
                            formik.setFieldValue("file", "");
                            formik.setFieldValue("serviceProvider", parseLoginRes?.companyName);
                            formik.setFieldValue("SimNumber", "");
                            formik.setFieldValue("unitType", "sim");
                            formik.setFieldValue("Uploaded_by", parseLoginRes?._id);
                            formik.setFieldValue("provisionType", "Bulk Add Pre-Activate Sims");
                            setFilename(null);
                            actions.resetForm();
                        } catch (err) {}
                    })
                    .catch((error) => {
                        if (error.response && error.response.data && error.response.data.msg) {
                            // Display the backend error message
                            ref.current.show({
                                severity: "error",
                                summary: "Inventory",
                                detail: error.response.data.msg,
                            });
                        } else {
                            // Display a generic error message for network errors
                            ref.current.show({
                                severity: "error",
                                summary: "Inventory",
                                detail: "Bulk Upload Failed Due To Network Error Please try Again",
                            });
                        }
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
                <div className="flex flex-wrap mb-3 justify-content-left ">
                    <div className="calendar_field">
                        <p className="field_label mt-4">
                            Carrier <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-full mt-2 " />
                        {formik.errors.carrier && formik.touched.carrier && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.carrier}
                            </div>
                        )}
                    </div>
                    <div className="calendar_field">
                        <p className="field_label mt-4 ml-2">
                            Company Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText value={formik.values.serviceProvider} name="serviceProvider" disabled className="field-width ml-2 mt-2" />
                    </div>

                    <div className="calendar_field">
                        <p className="field_label mt-4 ml-4">
                            Department/Vendor Name <span style={{ color: "red" }}>* </span>
                        </p>

                        <Dropdown
                            disabled
                            value={formik.values.agentType}
                            options={department}
                            name="agentType"
                            onChange={(e) => {
                                formik.setFieldValue("agentType", e.value);
                                setDepartmentSelected(e.value);
                                formik.handleChange(e);
                            }}
                            placeholder="Select an option"
                            className="w-full mt-2 ml-4"
                        />
                        {formik.errors.agentType && formik.touched.agentType && (
                            <div className="mt-2 ml-4" style={{ color: "red" }}>
                                {formik.errors.agentType}
                            </div>
                        )}
                    </div>
                    <div className="calendar_field">
                        <p className="field_label mt-6">
                            Agent Name <span style={{ color: "red" }}>* </span>
                            {formik.values.AgentName !== "" ? (
                                <Button style={{ border: "none", padding: "0px", backgroundColor: "transparent" }} disabled={!permissions.isCreate}>
                                    <i
                                        onClick={() => {
                                            setAddAgentDialogVisibility((prev) => !prev);
                                        }}
                                        className="pi pi pi-plus"
                                        style={{ marginLeft: "5px", fontSize: "10px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                    ></i>
                                </Button>
                            ) : undefined}
                        </p>
                        <Dropdown disabled value={formik.values.AgentName} options={agent} onChange={(e) => formik.setFieldValue("AgentName", e.value)} placeholder="Select an option" className="w-full mt-2" />
                        {formik.errors.AgentName && formik.touched.AgentName && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.AgentName}
                            </div>
                        )}
                    </div>
                    <div className="calendar_field">
                        <p className="field_label mt-6 ml-2">Upload File</p>
                        <Button
                            className="field-width justify-content-center ml-2 mt-2"
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
                            {filename === null ? "Add File" : filename}
                        </Button>
                        {fileerror ? (
                            <p className="mt-2" style={{ color: "red" }}>
                                File is required
                            </p>
                        ) : undefined}
                    </div>
                </div>

                <>
                    <p style={{ marginTop: "14%" }}>
                        <strong>Notes: </strong>
                        SIM, MDN, Model ID (Standard/Micro/Nano), MSL/PUK, Puk2, PO#, BOX#, Wholesale/Cost Price for SIM, Selling/Retail Price for SIM, UICCID, Zipcode, Activation Fee , MSID, Device ID/IMEI, ACP Co-Pay Amount, ACP Device Reimbursement Amount, Device Retail Price
                        {formik.values.carrier === "" ? (
                            <p className="font-bold" style={{ display: "inline-block" }}>
                                (Sample file)
                            </p>
                        ) : (
                            <a download={true} href="/images/Sample File(Sim Bulk Upload).xlsx" className="font-bold">
                                (Sample file)
                            </a>
                        )}
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the <strong>(Sample File)</strong>
                    </p>
                </>
                <InfoForUsers ProvisionType={"AddAndAssignNonActive"} />
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
                {/* <Button
                    style={{ height: "40px" }}
                    className="field-width justify-content-center"
                    onClick={() => {
                        if (formik.values.file === "") {
                            setFileError(true);
                        }
                        formik.handleSubmit();
                    }}
                    disabled={!permissions.isCreate}
                >
                    Submit{" "}
                </Button> */}
                <div className="flex flex-wrap justify-content-end w-full">
                    <Button
                        style={{ marginTop: "3rem", position: "absolute" }}
                        className="btn"
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
        </>
    );
}
