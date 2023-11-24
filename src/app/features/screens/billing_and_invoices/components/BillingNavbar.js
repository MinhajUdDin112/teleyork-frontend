import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import Axios from "axios";
import BASE_URL from "../../../../../config";
import { toast } from "react-toastify";
import { useEffect } from "react";

const BillingNavbar = () => {
    const [cpData, setCpData] = useState([])

    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=654cf6e905e9f8273013343e`);
            setCpData(res?.data?.data || []);
        } catch (error) {
            toast.error(`Error fetching module data: ${error?.response?.data?.msg}`);
        }
    };

    useEffect(() => {
        getCustomerProfileData()
    }, []);


    const items = [
        {
            label: `${cpData?.firstName} ${cpData?.lastName}`,
            icon: "pi pi-fw pi-user surface-800",
        },
        {
            label: `${cpData?.phoneNumber}`,
        },
        {
            label: "Wallet Balance: $ 0",
            icon: "pi pi-fw pi-plus",
        },
        {
            label: "Discount Credit: $ 0.00",
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
            <Menubar model={items} className="border-noround text-sm mx-0 bg-white mx-0 p-2" />
        </>
    );
};

export default BillingNavbar;
