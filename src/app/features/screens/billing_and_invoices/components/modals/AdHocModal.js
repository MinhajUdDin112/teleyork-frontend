import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";

const AdHocModal = ({ adHocInvoiceModal, setAdHocInvoiceModal }) => {
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [city, setCity] = useState(null);

    const cities = [
        { name: "ace-cash-express", code: "NY" },
        { name: "ACE-PAYMENT", code: "RM" },
        { name: "Ad-hoc-Invoice (Other)", code: "LDN" },
        { name: "Agent add minutes", code: "RM" },
        { name: "Agent add minutes cash", code: "LDN" },
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">
                <Button label="Submit" onClick={() => setAdHocInvoiceModal(false)} />
                <Button label="Close" onClick={() => setAdHocInvoiceModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Add New Invoice" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={adHocInvoiceModal} footer={renderFooter()} style={{ width: "50vw" }}>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID:</p>
                        <p className="col-8 m-0 p-1">119350</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Telephone Number:</p>
                        <p className="col-8 m-0 p-1">0313-55***52</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Customer Name:</p>
                        <p className="col-8 m-0 p-1">Hammad Ullah</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Address:</p>
                        <p className="col-8 m-0 p-1">Islamabad Pakistan</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Type:</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" className="h-2rem w-7 align-items-center border-700 " />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Amount" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Do You want to include tax?:</p>
                        <p className="col-8 m-0 p-1">
                            <div>
                                <RadioButton inputId="city1" name="city" value="Yes" onChange={(e) => setCity(e.value)} checked={city === "Yes"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Yes
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    No
                                </label>
                            </div>
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Tax Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Tax Amount" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Tax Breakup($):</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Tax Breakup" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Amount($):</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Invoice Amount" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AdHocModal;
