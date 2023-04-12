import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const NsfModal = ({ nsfModal, setNsfModal }) => {
    const [selectedCity1, setSelectedCity1] = useState(null);
    const cities = [
        { name: "NSF", code: "NY" },
        { name: "Credit Card Fraud", code: "RM" },
        { name: "Others Return Payment", code: "LDN" },
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between">
                <Button className="ml-3" label="Submit" onClick={() => setNsfModal(false)} />
                <Button className="mr-3" label="Close" onClick={() => setNsfModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Add NSF/Fraud Invoice" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={nsfModal} footer={renderFooter()} style={{ width: "50vw" }}>
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
                        <p className="col-4 font-semibold m-0 p-1">Invoice Amount:</p>
                        <p className="col-8 m-0 p-2">
                            <input placeholder="Enter Invoice Amount" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Ref.No.:</p>
                        <p className="col-8 m-0 p-2">
                            <input placeholder="Enter Ref.No" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default NsfModal;
