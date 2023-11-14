import { Card } from "primereact/card";
import React from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { inventorytype, actions } from "./assets";
import { Dropdown } from "primereact/dropdown";
import DeviceReceiveReturnAgentBox from "./sub_modules/device_recieve_return_agent_box";
import DeviceReAssignReturnAgentBox from "./sub_modules/device_reassign_return_agent_box";
import EsnSimReceiveReturnAgentBox from "./sub_modules/esn_sim_recieve_return_agent_box";
import EsnSimReAssignReturnAgentBox from "./sub_modules/esn_sim_reassign_return_agent_box";
export default function ReturnMerchandise({ setActiveComponent }) {
    const formik = useFormik({
        initialValues: {
            inventorytype: "",
            action: "",
        },
    });
    return (
        <Card>
            <div className="card mt-4">
                <Button
                    label="Back"
                    onClick={() => {
                        setActiveComponent("");
                    }}
                    style={{ padding: "10px", paddingLeft: "15px", paddingRight: "15px" }}
                />
                <p className="mt-4" style={{fontSize:"16px"}}>RMA</p>
            </div>
            <div className="card ">
                <div className="flex flex-wrap justify-content-around">
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Inventory Type <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.inventorytype} options={inventorytype} onChange={(e) => formik.setFieldValue("inventorytype", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>

                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Action <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.action} options={actions} onChange={(e) => formik.setFieldValue("action", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>
                </div>
            </div>
        
                {formik.values.inventorytype === "device" ? (
                    formik.values.action === "receivereturnagentbox" ? (
                        <Card> <DeviceReceiveReturnAgentBox /></Card>
                    ) : formik.values.action === "reassignreturnagentbox" ? (
                        <Card><DeviceReAssignReturnAgentBox /></Card>
                    ) : undefined
                ) : formik.values.inventorytype === "esnsim" ? (
                    formik.values.action === "receivereturnagentbox" ? (
                       <Card> <EsnSimReceiveReturnAgentBox/> </Card>
                    ) : formik.values.action === "reassignreturnagentbox" ? (
                        <Card><EsnSimReAssignReturnAgentBox /></Card>
                    ) : undefined
                ) : undefined}
            </Card>
        
    );
}
