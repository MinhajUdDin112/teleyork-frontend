import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const DiscountCreditModal = ({ discountCreditModal, setDiscountCreditModal }) => {
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [selectedCity2, setSelectedCity2] = useState(null);

    const cities1 = [
        { name: "Add Credit", code: "NY" },
        { name: "Deduct Credit", code: "RM" },
    ];
    const cities2 = [
        { name: "Please Select", code: "NY" },
        { name: "Portin", code: "RM" },
    ];
    const onCity1Change = (e) => {
        setSelectedCity1(e.value);
    };
    const onCity2Change = (e) => {
        setSelectedCity2(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">
                <Button label="Submit" onClick={() => setDiscountCreditModal(false)} />
                <Button label="Close" onClick={() => setDiscountCreditModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Discount Credit" closable={false} visible={discountCreditModal} footer={renderFooter()} style={{ width: "50vw" }}>
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
                        <p className="col-4 font-semibold m-0 p-1">Phone Number</p>
                        <p className="col-8 m-0 p-1">0313-55***52</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Current Available Discount Credit (in $) </p>
                        <p className="col-8 m-0 p-1">0.00</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Discount Credit Option</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" value={selectedCity1} options={cities1} onChange={onCity1Change} optionLabel="name" className="h-2rem w-7 align-items-center  " />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Amount ( in $ ):</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Amount" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Discount Credit Option</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" value={selectedCity2} options={cities2} onChange={onCity2Change} optionLabel="name" className="h-2rem w-7 align-items-center" />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DiscountCreditModal;
