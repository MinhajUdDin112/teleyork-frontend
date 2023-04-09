import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

const PayInvoiceModal = ({ payInvoiceModal, setPayInvoiceModal }) => {
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
                <Button label="Submit" onClick={() => setPayInvoiceModal(false)} />
                <Button label="Close" onClick={() => setPayInvoiceModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="Pay Invoice (s)" closable={false} visible={payInvoiceModal} footer={renderFooter()} style={{ width: "70vw" }}>
                <div>
                    <p className="m-0">Note:</p>
                    <p className="m-0">1. If there is no pending outstanding invoice on this account hence default payable amount would be similar to customer plan amount.</p>
                    <p>2. Any additional amount greater than total due amount will be added to Customer walet instantly.</p>
                </div>
                <br />
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">CustomerID</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Enter Customer ID" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Amount (A) ($)</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Enter Amount" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Processing Fee (B) ($)</p>
                        <p className="col-8 m-0 p-1">0</p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Total Amount (A+B) ($)</p>
                        <p className="col-8 m-0 p-1"></p>
                    </div>
                </div>
                <div className="m-3">
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Payment Mode</p>
                        <p className="col-8 m-0 p-1 text-sm">
                            <div>
                                <RadioButton inputId="city1" name="city" value="Yes" onChange={(e) => setCity(e.value)} checked={city === "Yes"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Credit Card (PC649)
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Echeck (PC651)
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Cash (PC650)
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Wallet Balance ($0) (PC652)
                                </label>
                                <RadioButton inputId="city1" name="city" value="Yes" onChange={(e) => setCity(e.value)} checked={city === "Yes"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Money Order (PC824)
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                Money Gram (PC825)
                                </label>
                                <RadioButton inputId="city1" name="city" value="No" onChange={(e) => setCity(e.value)} checked={city === "No"} />
                                <label htmlFor="city1" className="mr-2 px-2">
                                    Cheque (PC823)
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
                            <Dropdown value={cardType} options={cards} onChange={onCardChange} placeholder="Select" optionLabel="name" className="h-2rem align-items-center w-full " />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Security Code</p>
                        <div className="flex col-8 m-0 p-1">
                            <input className="w-2 h-2rem" />
                            <p className="w-2 ml-3">Exp Date</p>
                            <Dropdown placeholder="Select" className="h-2rem w-3 ml-3 align-items-center" />
                            <Dropdown placeholder="Select" className="h-2rem w-3 ml-3 align-items-center" />
                        </div>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Name on Card</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Name on Card" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Receipt Number</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-full border-round-xs" placeholder="Receipt Number" />
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
                            <Dropdown placeholder="Select" className="h-2rem align-items-center w-full" />
                            <div className="flex my-2">
                                <Checkbox inputId="binary" checked={checked} onChange={() => setChecked(e.checked)} />
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
                            <Checkbox inputId="binary" checked={checked} onChange={() => setChecked(e.checked)} />
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

export default PayInvoiceModal;
