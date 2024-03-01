import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";

import { Calendar } from "primereact/calendar";

const Label_Downloads = () => {
    const [model, setModel] = useState("");
    const [user, setUser] = useState("");
    const Billing_models = [{ name: "Prepaid" }, { name: "Postpaid" }, { name: "ACP" }];
    const User = [{ name: "CSA" }, { name: "TeamLead" }, { name: "QA" }, { name: "All Users" }];
    // when user select billing model from Dropdown the data stored in model
    console.log(model);
    // when user select users from Dropdown the data stored in user
    console.log(user);
    return (
        <Card className="pl-0 pr-0">
            <div>
                <h1>Label Downloads</h1>
            </div>

            <div className="p-field col-12 md:col-3" style={{ marginLeft: "20rem" }}>
                <label className="Label__Text">
                    Billing Model <span className="steric">*</span>
                </label>
                <Dropdown value={model} onChange={(e) => setModel(e.value)} options={Billing_models} optionLabel="name" editable placeholder="Select Model" className="w-full md:w-14rem " />
                {/* {getFormErrorMessage("mobile")} */}
            </div>

            <div className="p-field col-12 md:col-3" style={{ marginLeft: "40rem", marginTop: "-5.1rem" }}>
                <label className="Label__Text">
                    Add Users <span className="steric">*</span>
                </label>
                <Dropdown value={user} onChange={(e) => setUser(e.value)} options={User} optionLabel="name" editable placeholder="Select User" className="w-full md:w-14rem " />
                {/* {getFormErrorMessage("mobile")} */}
            </div>
            <div className="p-field col-12 md:col-3" style={{ marginLeft: "40rem", marginTop: "-5.1rem" }}>
                <label className="Label__Text">
                    Date Range Filter <span className="steric">*</span>
                </label>
                {/* {getFormErrorMessage("mobile")} */}
            </div>
        </Card>
    );
};

export default Label_Downloads;
