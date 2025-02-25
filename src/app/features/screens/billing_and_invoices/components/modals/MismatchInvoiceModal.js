import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const MismatchInvoiceModal = ({ misMatchInvoiceModal, setMisMatchInvoiceModal }) => {
    const [selectedCity1, setSelectedCity1] = useState(null);

    const cities = [
        { name: "CSR add minutes", code: "NY" },
        { name: "Upgrade Plan Payment", code: "RM" },
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">
                <Button label="Submit" onClick={() => setMisMatchInvoiceModal(false)} />
                <Button label="Close" onClick={() => setMisMatchInvoiceModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Add Mismatch Invoice" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={misMatchInvoiceModal} footer={renderFooter()} style={{ width: "50vw" }}>
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
                        <p className="col-4 font-semibold m-0 p-1">Mismatch Type:</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" className="h-2rem w-7 align-items-center border-700 " />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Invoice No.:</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Invoioce No" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Ref.No.:</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Ref No" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default MismatchInvoiceModal;
