import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./dialogs/add_agent_detail";
import { carrier, company, agent, emptymaster, retailer, employee, distributor, master } from "../../assets";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
export default function SIMBulkUploadAddProvision() {
    const fileUploadRef = useRef(null);
    const [addAgentDialogVisibility, setAddAgentDialogVisibility] = useState(false);
    function onUpload() {}
    const formik = useFormik({
        initialValues: {
            carrier: "",
            company: "",
            agent: "",
            master: "",
        },
    });
    return (
        <>
            <div>
                <div className="flex flex-wrap mb-3  justify-content-around">
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
                </div>
                <div className="flex flex-wrap justify-content-center align-item-center">
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
                <div className="mt-3 flex flex-wrap justify-content-center align-item-center">
                    <p>Note: Please Select Carrier To Download the Sample File</p>
                </div>
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
