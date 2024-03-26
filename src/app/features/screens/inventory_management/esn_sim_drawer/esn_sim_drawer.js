import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
export default function EsnSimDrawer() {
    const [multiplemei, setMultipleEmeis] = useState("");
    const [totalesnsim, setTotalEsnSim] = useState(0);
    const location = useLocation();
    const currentPath = location?.pathname;
    const actionBasedChecks = () => {
        const loginPerms = localStorage.getItem("permissions");
        const parsedLoginPerms = JSON.parse(loginPerms);

        const isCreate = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "create")));
        setIsCreate(isCreate);

        const isManage = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "manage")));
        setIsManage(isManage);
    };
    const [isManage, setIsManage] = useState(null);
    const [isCreate, setIsCreate] = useState(null);
    useEffect(() => {
        actionBasedChecks();
    }, []);
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
                    <Button disabled={!isManage} label="Save Open/Close" />
                    <Button disabled={!isManage} className="ml-2" label="Close" />
                </div>
            </div>
        </Card>
    );
}
