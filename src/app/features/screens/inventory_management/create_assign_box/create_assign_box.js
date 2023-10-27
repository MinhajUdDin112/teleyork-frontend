import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
export default function CreateAssignBox({ setActiveComponent }) {
    const [esn_sim_check, setESN_SIM_Checked] = useState(true);
    const [device_emi_check, setDevice_Emei_Checked] = useState(false);
    const [esn_device_emei_number, setEsn_Device_Emei] = useState("");
    const [errorInInput, setErrorInInput] = useState(false);
    function handleSubmit(e) {
        if (esn_device_emei_number === "") {
            setErrorInInput(true);
        }
        //Api will call from here
    }
    function handleInputEsn_Device_Emei(e) {
        setErrorInInput(false);
        setEsn_Device_Emei(e.target.value);
    }
    function handleDevice_Emei_Check() {
        if (!device_emi_check) {
            setDevice_Emei_Checked((prev) => !prev);
            setESN_SIM_Checked((prev) => !prev);
        }
    }
    function handleEsn_Sim_Check() {
        if (!esn_sim_check) {
            setESN_SIM_Checked((prev) => !prev);
            setDevice_Emei_Checked((prev) => !prev);
        }
    }
    return (
        <Card>
            <Button
                label="Back"
                style={{ marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                onClick={() => {
                    setActiveComponent("");
                }}
            />   
            <Card className="mt-4">
                <div className="flex flex-wrap justify-content-between">
                    <div>
                        <h1 style={{ fontSize: "16px" }} className="font-bold">
                            Ship ESN/SIM OR Device/IMEI to Agent
                        </h1>
                    </div>
                    <div style={{ marginTop: "-10px" }}>
                        <Button label="View Report" className="font-semibold" />
                    </div>
                </div>
            </Card>
            <Card className="mt-4">
                <div className="flex flex-wrap justify-content-around">
                    <div>
                        <span style={{ marginRight: "12px" }}>ESN/SIM</span>
                        <Checkbox onChange={handleEsn_Sim_Check} checked={esn_sim_check}></Checkbox>
                    </div>
                    <div>
                        <span style={{ marginRight: "12px" }}>EMEI/DEVICE</span>
                        <Checkbox onChange={handleDevice_Emei_Check} checked={device_emi_check}></Checkbox>
                    </div>
                </div>

                <div className="flex flex-wrap justify-content-center">
                    <div className="mt-4">
                        <label style={{ display: "block", color: `${errorInInput ? "red" : "black"}` }}>Enter ESN/SIM OR IMEI/Device *</label>
                        <InputText className="mt-4" onChange={handleInputEsn_Device_Emei} />
                        <Button onClick={handleSubmit} style={{ display: "block", width: "100%", alignContent: "center", marginLeft: "50%", transform: "translate(-50%)" }} className="mt-4" label={esn_sim_check ? "Scan ESN" : "Scan EMEI/Device"} />
                    </div>
                </div>
            </Card>
        </Card>
    );
}
