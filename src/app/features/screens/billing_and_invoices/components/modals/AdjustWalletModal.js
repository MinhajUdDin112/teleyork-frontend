import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

const AdjustWalletModal = ({ adjustWalletModal, setAdjustWalletModal }) => {
    const [value1, setValue1] = useState("");
    const renderFooter = () => {
        return (
            <div className="flex justify-content-between m-3">
                <Button label="Submit" onClick={() => setAdjustWalletModal(false)} />
                <Button label="Close" onClick={() => setAdjustWalletModal(false)} />
            </div>
        );
    };
    return (
        <div>
            <Dialog header="CSR Screen For Adjust Wallet" headerStyle={{ borderBottom: "1px solid #c5c5c5", paddingLeft: "35px" }} closable={false} visible={adjustWalletModal} footer={renderFooter()} style={{ width: "50vw" }}>
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
                        <p className="col-4 font-semibold m-0 p-1">Wallet Balance</p>
                        <p className="col-8 m-0 p-1">
                            <input className="h-2rem w-7 border-round-xs" placeholder="Enter Wallet Balance" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Adjust Amount</p>
                        <p className="col-8 m-0 p-1">
                            <input placeholder="Enter Adjust Amount" className="h-2rem w-7 border-round-xs" />
                        </p>
                    </div>
                    <div className="flex">
                        <p className="col-4 font-semibold m-0 p-1">Reason</p>
                        <p className="col-8 m-0 p-1">
                            <InputTextarea className="w-7 h-4rem border-700" value={value1} onChange={(e) => setValue1(e.target.value)} rows={5} cols={30} />
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AdjustWalletModal;
