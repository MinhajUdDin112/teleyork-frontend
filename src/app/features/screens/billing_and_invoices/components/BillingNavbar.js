import React from "react";
import { Menubar } from "primereact/menubar";

const BillingNavbar = () => {
    const items = [
        {
            label: "Hammad Ullah ",
            icon: "pi pi-fw pi-user surface-800",
        },
        {
            label: "MDN",
        },
        {
            label: "Wallet Balance: $ 0",
            icon: "pi pi-fw pi-plus",
        },
        {
            label: "Discount Credit; $ 0.00",
            icon: "pi pi-fw pi-plus",
        },
        {
            label: "ACP",
            icon: "pi-circle-fill",
        },
        {
            label: "Modify(PC401) Active(PC95)",
            icon: "pi pi-fw pi-pencil",
        },
    ];
    return (
        <>
            <Menubar model={items} className="border-noround text-sm mx-0 bg-white  mx-0 p-2" />
        </>
    );
};

export default BillingNavbar;
