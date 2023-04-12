import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const AdjustBalanceModal = ({ adjustBalanceModal, setAdjustBalanceModal }) => {
    const [selectedCity1, setSelectedCity1] = useState(null);

    const cities = [
        { name: "DR", code: "NY" },
        { name: "CR", code: "RM" },
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">
                <Button label="Submit" onClick={() => setAdjustBalanceModal(false)} />
                <Button label="Close" onClick={() => setAdjustBalanceModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="CSR Screen For Adjust Payment" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={adjustBalanceModal} footer={renderFooter()} style={{ width: "50vw" }}>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID</p>
                        <p className="col-8 m-0 p-1">119350</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Customer Name</p>
                        <p className="col-8 m-0 p-1">Hammad Ullah</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Amount</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Amount" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice Type:</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" className="h-2rem w-7 align-items-center border-700 " />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AdjustBalanceModal;
