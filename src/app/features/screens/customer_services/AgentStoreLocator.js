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
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Agent Store Locator</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Enter Zip Code:</p>
                        <InputText placeholder="Amount, Confirmation, Last 4 digits" style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Salect distance in miles from this point:</p>
                        <Dropdown placeholder="Select distance Type" value={distance} options={distanceOptions} optionLabel="name" onChange={(e) => setDistance(e.value)} style={{ width: "23rem" }} />
                    </div>
                    <div>
                        <Button label="Search" className="mt-5 text-sm bg-green-200 border-none w-7rem" />
                    </div>
                </div>
            </div>
            <div className="card p-3 mx-5 border-noround bg-green-200 ">
                <p className="text-sm font-semibold">Search Result: 0</p>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">
                    <InputText className="w-15rem my-2 text-base h-2.5rem" placeholder="Keyword Search"></InputText>
                </div>
                <div className="">
                    <DataTable value={tabledata} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="Sno" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="Zip Code" field="Zip" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="Account" field="Account" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="Store Type" field="StoreType" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                        <Column header="Contact Phone" field="Contact" resizeable={false} headerStyle={{ color: "black", fontWeight: "normal", fontSize: "small" }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default AgentStoreLocator;
