import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
export default function EsnSimDrawer() {
    const [multiplemei, setMultipleEmeis] = useState("");
    const [totalesnsim, setTotalEsnSim] = useState(0);
    return (
        <Card>
            <h5 className="card">Enter ESN/SIM For Draw(IN PROCESS)</h5>
            <h6 className="text-center ">
                Enter ESN/SIM (Total ESN/SIM - {totalesnsim})<span style={{ color: "red" }}>* </span>
                <br /> <br />
                (Note:-Please insert multiple ESN/SIM with new line and You can only enter 500 ESN at one time)
            </h6>
            <InputTextarea
                className="w-full"
                style={{ height: "50vh" }}
                value={multiplemei}
                onChange={(e) => {
                    setMultipleEmeis(e.value);
                }}
            />
            <div className="mt-4 flex flex-wrap justify-content-center align-items-center">
                <div>
                    {" "}
                    <Button label="Save Open/Close" />
                    <Button className="ml-2" label="Close" />
                </div>
            </div>
        </Card>
    );
}
