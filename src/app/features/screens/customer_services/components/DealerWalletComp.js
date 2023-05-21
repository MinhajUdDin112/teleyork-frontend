import React from "react";

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

export default DealerWalletComp;
