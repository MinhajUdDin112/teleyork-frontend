import { Card } from "primereact/card";
import React, { useState } from "react";
import { Button } from "primereact/button";
import ManagePhoneRequest from "./manage_submodules/manage_phone_request";
export default function ManagePhoneRequests({ setActiveComponent }) {  
    const [hidebackinventorybutton,setHideBackInventoryButton]=useState(false)
    return (
        <Card>
            <Button
                label="Back"
                onClick={() => {
                    setActiveComponent("");
                }}
                style={{ padding: "10px",display:`${hidebackinventorybutton ? "none":"block"}`, paddingLeft: "15px", paddingRight: "15px" }}
            />
            <ManagePhoneRequest setHideBackInventoryButton={setHideBackInventoryButton} />
        </Card>
    );
}
