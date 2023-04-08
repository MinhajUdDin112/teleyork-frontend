import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";


const NsfModal = ({ displayModal, setDisplayModal }) => {
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
                <Button label="Submit" onClick={() => setDisplayModal(false)} />
                <Button label="Close" onClick={() => setDisplayModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Add NSF/Fraud Invoice" visible={displayModal} footer={renderFooter()} style={{ width: "50vw" }}>
                <div className="flex p-3">
                    <div className="w-18rem font-medium">
                        <p>CustomerID:</p>
                        <p>Telephone Number:</p>
                        <p>Customer Name:</p>
                        <p>Address:</p>
                        <p>Invoice Type:</p>
                        <p>Invoice Amount:</p>
                        <p>Ref.No:</p>
                    </div>
                    <div className="w-full">
                        <p>119350</p>
                        <p>0313-55***52</p>
                        <p>Hammad Ullah</p>
                        <p>Islamabad Pakistan</p>

                        <p>
                            <Dropdown value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" className="h-2rem align-items-center  " />
                        </p>
                        <p>
                            <input />
                        </p>
                        <p>
                            <input />
                        </p>
                    </div>
                </div>
                
            </Dialog>
        </div>
    );
};

export default NsfModal;
