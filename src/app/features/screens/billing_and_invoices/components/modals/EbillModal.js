import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const EbillModal = ({ ebillModal, setEbillModal }) => {
    const [selectedCity1, setSelectedCity1] = useState(null);

    const cities = [
        { name: "Email", code: "NY" },
        { name: "Printout", code: "RM" },
        { name: "SMS", code: "LDN" },
        { name: "Both Email and SMS", code: "RM" },
    ];
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">
                <Button label="Submit" onClick={() => setEbillModal(false)} />
                <Button label="Close" onClick={() => setEbillModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Ebill Setting" closable={false} visible={ebillModal} footer={renderFooter()} style={{ width: "50vw" }}>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID</p>
                        <p className="col-8 m-0 p-1">119350</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Name</p>
                        <p className="col-8 m-0 p-1">Hammad Ullah</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Address</p>
                        <p className="col-8 m-0 p-1">Islamabad Pakistan</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">MDN</p>
                        <p className="col-8 m-0 p-1">65376418</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">E-Bill</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" className="h-2rem w-7 align-items-center  " />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EbillModal;
