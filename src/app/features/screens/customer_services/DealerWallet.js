import React from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const DealerWallet = () => {
    return (
        <div className="card p-2 min-h-screen border-noround">
            <div className="card border-noround p-0">
                <div className="surface-100 p-3 my-3 border-y-1">
                    <p className="text-xl font-bold">Dealer Wallet</p>
                </div>
                <div className="mx-5">
                    <p className="text-xl font-semibold">Wallet Detail</p>
                    <div className="flex">
                        <div>
                            <p className="text-md font-semibold">First Name</p>
                            <p>Hammad</p>
                            <p>Wallet ID</p>
                            <p>HammadUllah</p>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <p>Ullah</p>
                            <p>Balance</p>
                            <p>$0.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerWallet;
