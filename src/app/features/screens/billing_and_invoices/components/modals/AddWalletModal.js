import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

const AddWalletModal = ({ addWalletModal, setAddWalletModal }) => {
    const [checked, setChecked] = useState(false);
    const [cardType, setCardType] = useState(null);
    const [city, setCity] = useState(null);

    const cards = [
        { name: "Visa Card", code: "VC" },
        { name: "Master Card", code: "MC" },
        { name: "American Express", code: "AE" },
        { name: "Discovery", code: "D" },
    ];
    const onCardChange = (e) => {
        setCardType(e.value);
    };
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">
                <Button label="Submit" onClick={() => setAddWalletModal(false)} />
                <Button label="Close" onClick={() => setAddWalletModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Add Wallet" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={addWalletModal} footer={renderFooter()} style={{ width: "70vw" }}>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID</p>
                        <p className="col-8 m-0 p-1">119350</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Customer Name:</p>
                        <p className="col-8 m-0 p-1">Hammad Ullah</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Customer Number:</p>
                        <p className="col-8 m-0 p-1">0313-55***52</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Ammount ( in $ )</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Amount" className="h-2rem w-7 border-round-xs" required />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Processing Fee:</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-7 border-round-xs" placeholder="Enter Procesing Fee" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Total Ammount:</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-7 border-round-xs" placeholder="Enter Total Amount" />
                        </p>
                    </div>
                </div>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Payment Mode</p>
                        <p className="col-8 m-0 p-1 text-sm">
                            <div>
                                <RadioButton inputId="city1" name="city" value="Yes" onChange={(e) => setCity(e.value)} checked={city === "Yes"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Credit Card
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Cash
                                </label>
                                <RadioButton inputId="city1" name="city" value="Yes" onChange={(e) => setCity(e.value)} checked={city === "Yes"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Using Pin
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Add Wallet through Topup Card
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Skip Payment(PC99)
                                </label>
                            </div>
                        </p>
                    </div>
                </div>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Credit Card Number</p>
                        <div className="col-8 m-0 p-1">
                            <input className="w-2 h-2rem" />
                            <input className="w-2 h-2rem ml-3" />
                            <input className="w-2 h-2rem ml-3" />
                            <input className="w-2 h-2rem ml-3" />
                        </div>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Type Of Card:</p>
                        <p className="col-8 m-0 p-1">
                            <Dropdown value={cardType} options={cards} onChange={onCardChange} placeholder="Select" optionLabel="name" className="h-2rem align-items-center w-full border-700" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Security Code</p>
                        <div className="flex col-8 m-0 p-1">
                            <input className="w-2 h-2rem" />
                            <p className="w-2 ml-3">Exp Date</p>
                            <Dropdown placeholder="Select" className="h-2rem w-3 ml-3 align-items-center border-700" />
                            <Dropdown placeholder="Select" className="h-2rem w-3 ml-3 align-items-center border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Name on Card</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Enter Name" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Receipt Number</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder=" Enter Receipt Number" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Zip Code</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Enter Zip Code" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">City</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Enter City" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">State/Province</p>
                        <div className="col-8 m-0 p-1">
                            <Dropdown placeholder="Select" className="h-2rem align-items-center w-full border-700" />
                            <div className="flex my-2">
                                <Checkbox inputId="binary" checked={checked} onChange={() => setChecked()} />
                                <label htmlFor="binary" className="ml-2">
                                    Apply Address Suggestion
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Billing Address 1</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Enter Billing Address 1" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Billing Address 2</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Enter Billing Address 2" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Save card details (PC777)</p>
                        <div className="flex col-8 m-0 p-1">
                            <Checkbox inputId="binary" checked={checked} onChange={() => setChecked()} />
                            <label htmlFor="binary" className="ml-2">
                                Do you want to save card details?
                            </label>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AddWalletModal;
