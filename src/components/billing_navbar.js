import React from "react";
import { Menubar } from "primereact/menubar";

const BillingNavbar = () => {
    const items = [
        {
            label: "Hammad Ullah",
            icon: "pi pi-fw pi-user",
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
            <Menubar model={items} className="border-noround text-xs bg-primary py-3 text-100" style={{ color: "red" }} />
        </>
    );
};

export default BillingNavbar;
