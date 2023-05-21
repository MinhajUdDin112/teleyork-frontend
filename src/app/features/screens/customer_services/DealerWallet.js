import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SelectButton } from "primereact/selectbutton";

const DealerWallet = () => {
    const pages = ["dealerWallet", "addWallet", "shareWallet", "transferWallet", "transactionWallet", "logWallet"];
    const [activeIndex, setActiveIndex] = useState(0);
    const [value9, setValue9] = useState(0);
    const [city, setCity] = useState(null);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [option, setOption] = useState(null);
    const [user, setUser] = useState(null);

    const paymentOptions = [
        { name: "First", value: 1 },
        { name: "<<Previous", value: 2 },
        { name: "Next>>", value: 3 },
        { name: "Last", value: 4 },
    ];

    const userOptions = [
        { name: "Hammad Ullah", code: "A" },
        { name: "Others", code: "B" },
    ];

    const DealerWalletComp = () => {
        return (
            <div className="mx-5">
                <p className="text-xl font-semibold border-bottom-1">Wallet Detail</p>
                <div className="flex">
                    <div>
                        <p className="text-lg font-semibold m-0">First Name</p>
                        <p className="text-md">Hammad</p>
                        <p className="text-lg font-semibold m-0">Wallet ID</p>
                        <p className="text-md">HammadUllah</p>
                    </div>
                    <div className="ml-8">
                        <p className="text-lg font-semibold m-0">Last Name</p>
                        <p className="text-md">Ullah</p>
                        <p className="text-lg font-semibold m-0">Balance</p>
                        <p className="text-md">$0.00</p>
                    </div>
                </div>
            </div>
        );
    };

    const AddWalletComp = () => {
        return (
            <div className="card mx-5 surface-100">
                <div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold m-0">Choose Payment Type</p>
                        </div>
                        <div className="col-5">
                            <RadioButton inputId="city1" name="city" value="Chicago" onChange={(e) => setCity(e.value)} checked={city === "Chicago"} />
                            <label htmlFor="city1" className="ml-3">
                                Credit Card (PC568)
                            </label>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="flex font-semibold mt-2">Amount</p>
                        </div>
                        <div className="col-5">
                            <InputNumber inputId="currency-us" value={value9} onValueChange={(e) => setValue9(e.value)} mode="currency" currency="USD" locale="en-US" className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2 mt-1">
                            <p className="font-semibold m-0">Credit Card Number</p>
                        </div>
                        <div className="col-5">
                            <input className="w-2 h-2rem" />
                            <input className="w-2 h-2rem ml-4" />
                            <input className="w-2 h-2rem ml-4" />
                            <input className="w-2 h-2rem ml-4" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">Type Of Card:</p>
                        </div>
                        <div className="col-5">
                            <Dropdown placeholder="Select" className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold m-0">Security Code</p>
                        </div>
                        <div className="col-5 flex">
                            <input className="w-2 h-2rem" />
                            <p className="w-2 ml-3">Exp Date</p>
                            <Dropdown placeholder="Select" className="h-2rem w-3 ml-3 align-items-center border-700" />
                            <Dropdown placeholder="Select" className="h-2rem w-3 ml-3 align-items-center border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">Name on Card</p>
                        </div>
                        <div className="col-5">
                            <InputText placeholder="Enter Name" className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">Receipt Number</p>
                        </div>
                        <div className="col-5">
                            <InputText placeholder="Enter Receipt Number" className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">Zip Code</p>
                        </div>
                        <div className="col-5">
                            <InputNumber placeholder="Enter Zip Code" useGrouping={false} className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">City</p>
                        </div>
                        <div className="col-5">
                            <InputText placeholder="Enter City" className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">State/Province</p>
                        </div>
                        <div className="col-5">
                            <Dropdown placeholder="Select state" style={{ width: "21rem" }} className="h-3rem align-items-center w-full border-700" />
                            <div className="flex my-2">
                                <Checkbox inputId="binary" />
                                <label htmlFor="binary" className="ml-2">
                                    Apply Address Suggestion
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">Billing Addres 1</p>
                        </div>
                        <div className="col-5">
                            <InputText placeholder="Enter Billing Address 1" className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2">
                            <p className="font-semibold mt-2">Billing Addres 2</p>
                        </div>
                        <div className="col-5">
                            <InputText placeholder="Enter Billing Address 2" className="h-3rem align-items-center w-full border-700" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="col-2"></div>
                        <div className="col-5 flex justify-content-end">
                            <Button label="Submit" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const ShareWalletComp = () => {
        return (
            <div className=" card mx-5 col-8 surface-100">
                <div className="flex col-12">
                    <p className="m-0 p-3 text-md font-semibold col-4">User ID</p>
                    <Dropdown className="h-3rem col-8 p-0" placeholder="Select" options={userOptions} optionLabel="name" value={user} onChange={(e) => setUser(e.value)} />
                </div>
                {user && user.code === "B" && (
                    <div className="flex col-12">
                        <p className="m-0 p-3 text-md font-semibold col-4">Others</p>
                        <InputText placeholder="User ID" className="h-3rem col-8" />
                    </div>
                )}
                <div className="flex justify-content-end col-12">
                    <Button label="Submit" />
                </div>
            </div>
        );
    };
    const TransferWalletComp = () => {
        return (
            <div className=" card mx-5 col-8 surface-100">
                <div className="flex col-12">
                    <p className="m-0 p-3 text-md font-semibold col-4">User ID</p>
                    <Dropdown className="h-3rem col-8 p-0" placeholder="Select" options={userOptions} optionLabel="name" value={user} onChange={(e) => setUser(e.value)} />
                </div>
                {user && user.code === "B" && (
                    <div className="flex col-12">
                        <p className="m-0 p-3 text-md font-semibold col-4">Others</p>
                        <InputText placeholder="User ID" className="h-3rem col-8" />
                    </div>
                )}
                <div className="flex col-12">
                    <p className="m-0 p-3 text-md font-semibold col-4">Enter Transfer Amount</p>
                    <InputText placeholder="Amount" className="h-3rem col-8" />
                </div>
                <div className="flex justify-content-end col-12">
                    <Button label="Submit" />
                </div>
            </div>
        );
    };
    const TransactionWalletComp = () => {
        return (
            <div className="mx-5">
                <div className="flex">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">From Date(MM-DD-YYYY)</p>
                        <Calendar placeholder="From Date" id="basic" value={dateFrom} onChange={(e) => setDateFrom(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">To Date(MM-DD-YYYY)</p>
                        <Calendar placeholder="To Date" id="basic" value={dateTo} onChange={(e) => setDateTo(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div>
                        <Button label="Search" className="mt-4" />
                    </div>
                </div>
                <div className="flex justify-content-end border-y-1 surface-100">
                    <Button label="Download" className="m-2" />
                </div>
                <div>
                    <DataTable showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="S.No" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Effective Wallet ID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Previous Balance" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Tax | Processing Fee | Actual Cost | Transactioon Amount" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Type" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Post Balance" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Wallet Used By" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Transferred" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Transaction ID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Transaction Type" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Description" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Transaction Datetime" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    </DataTable>
                </div>
                <div className="p-0 flex justify-content-end m-2">
                    <SelectButton value={option} options={paymentOptions} onChange={(e) => setOption(e.value)} optionLabel="name" multiple />
                </div>
            </div>
        );
    };
    const LogWalletComp = () => {
        return (
            <div className="mx-5">
                <div className="flex">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">From Date(MM-DD-YYYY)</p>
                        <Calendar placeholder="From Date" id="basic" value={dateFrom} onChange={(e) => setDateFrom(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">To Date(MM-DD-YYYY)</p>
                        <Calendar placeholder="To Date" id="basic" value={dateTo} onChange={(e) => setDateTo(e.value)} style={{ width: "18rem" }} />
                    </div>
                    <div>
                        <Button label="Search" className="mt-4" />
                    </div>
                </div>
                <div className="flex justify-content-end border-y-1 surface-100">
                    <Button label="Download" className="m-2" />
                </div>
                <div>
                    <DataTable showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="S.No" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="User ID" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Wallet Type" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Balance" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Last Modified Date" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Spend" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Status" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                        <Column header="Shared/Transferred By" resizeable={false} headerStyle={{ backgroundColor: "#76b5c5", color: "white", fontWeight: "medium" }}></Column>
                    </DataTable>
                </div>
                <div className="p-0 flex justify-content-end m-2">
                    <SelectButton value={option} options={paymentOptions} onChange={(e) => setOption(e.value)} optionLabel="name" multiple />
                </div>
            </div>
        );
    };

    const builtPages = {
        dealerWallet: DealerWalletComp(),
        addWallet: AddWalletComp(),
        shareWallet: ShareWalletComp(),
        transferWallet: TransferWalletComp(),
        transactionWallet: TransactionWalletComp(),
        logWallet: LogWalletComp(),
    };
    return (
        <div className="card p-2 min-h-screen border-noround">
            <div className="card border-noround p-0">
                <div className="surface-100 p-3 my-3 border-y-1">
                    <p className="text-xl font-bold">Dealer Wallet</p>
                </div>
                <div>
                    <div className="flex m-5">
                        <Button icon="pi pi-folder" label="Dealer Wallet" className="p-button-raised p-button-secondary p-button-text surface-200" onClick={() => setActiveIndex(0)} />
                        <Button icon="pi pi-shopping-cart" label="Add Wallet" className="p-button-raised p-button-secondary p-button-text ml-3 surface-200" onClick={() => setActiveIndex(1)} />
                        <Button icon="pi pi-share-alt" label="Share Wallet" className="p-button-raised p-button-secondary p-button-text ml-3 surface-200" onClick={() => setActiveIndex(2)} />
                        <Button icon="pi pi-sort-alt" label="Transfer Wallet" className="p-button-raised p-button-secondary p-button-text ml-3 surface-200" onClick={() => setActiveIndex(3)} />
                        <Button icon="pi pi-reply" label="Wallet Transaction" className="p-button-raised p-button-secondary p-button-text ml-3 surface-200" onClick={() => setActiveIndex(4)} />
                        <Button icon="pi pi-history" label="Wallet Log" className="p-button-raised p-button-secondary p-button-text ml-3 surface-200" onClick={() => setActiveIndex(5)} />
                    </div>
                    {builtPages[pages[activeIndex]]}
                </div>
                <br />
                <br />
            </div>
        </div>
    );
};

export default DealerWallet;
