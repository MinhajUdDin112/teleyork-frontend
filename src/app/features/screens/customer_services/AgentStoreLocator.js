import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AgentStoreLocator = () => {
    const [distance, setDistance] = useState(null);

    const distanceOptions = [
        { name: "5", code: "A" },
        { name: "10", code: "B" },
        { name: "20", code: "C" },
    ];

    const tabledata = [
        {
            Sno: "1",
            Zip: "",
            Acouont: "",
            Name: "",
            Storetype: "",
            Address: "",
            City: "",
            State: "",
            Contact: "",
        },
    ];

    return (
        <div className="card p-2 min-h-screen border-noround">
            <div className="card border-noround p-0">
                <div className="surface-100 p-3 my-3 border-y-1">
                    <p className="text-xl font-bold">Agent Store Locator</p>
                </div>
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Enter Zip Code:</p>
                        <InputText placeholder="Amount, Confirmation, Last 4 digits" style={{ width: "21rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Salect distance in miles from this point:</p>
                        <Dropdown placeholder="Select distance Type" value={distance} options={distanceOptions} optionLabel="name" onChange={(e) => setDistance(e.value)} style={{ width: "21rem" }} />
                    </div>
                    <div>
                        <Button label="Search" className="mt-5 text-sm" />
                    </div>
                </div>
                <div>
                    <DataTable value={tabledata} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="Sno" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="Zip Code" field="Zip" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="Account" field="Account" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="Store Type" field="StoreType" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="City" field="City" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="State" field="State" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                        <Column header="Contact Phone" field="Contact" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default AgentStoreLocator;
