import React, { useState } from "react";
import { useFormik } from "formik";
import { carrier, company, emptymaster, retailer, distributor, employee, agent, plan, master } from "../../assets";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./Dialogs/add_agent_detail";
import { Button } from "primereact/button";
export default function TabletSingleUploadReprovision() {
    const [add_agent_detail_dialog_visibility, setAddAgentDialogVisbility] = useState(false);
    const formik = useFormik({
        initialValues: {
            esn: "",
            carrier: "",
            company: "",
            agent: "",
            zipcode: "",
            master: "",
            trackingnumber: "",
            tinnumber: "",
            planid: "",
            box: "",
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
                                        *{" "}
                                        {formik.values.agent !== "employee" ? (
                                            <i
                                                onClick={() => {
                                                    setAddAgentDialogVisbility((prev) => !prev);
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
                            ESN<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.esn} name="esn" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Zip Code<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.zipcode} name="zipcode" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Box#<span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.box} name="box" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
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
                        <InputText type="text" value={formik.values.trackingnumber} name="trackingnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">TIN Number</p>
                        <InputText type="text" value={formik.values.tinnumber} name="tinnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                </div>
            </div>
            <div className="mt-2 flex flex-wrap justify-content-center">
                <div>
                    <span>Notes :-</span>
                    <ul className="ml-2">
                        <li className="mt-2"> If MDN is found active in inventory it will be disconnected; reassigned and reactivated. If already disconnected it will be directly activated, in both cases with the zip code.</li>{" "}
                        <li className="mt-2">Carrier can only be ; for TMB, once a SIM is used it cannot be re-provisioning.</li>
                        <li className="mt-2"> Box and tracking numbers are auto generated by the system, however they can be edited.</li>
                        <li className="mt-2">
                            The system assumes that the ESN that will be uploaded will exist in inventory and not be associated with any active customer account. If the ESN is not inventory it can be added from Manage inventory Add units Add stock Please do not sent the same ESN for re-provisioning
                            in less than 5 minutes.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-2 flex flex-wrap justify-content-center">
                <Button label="Submit" />
            </div>
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
