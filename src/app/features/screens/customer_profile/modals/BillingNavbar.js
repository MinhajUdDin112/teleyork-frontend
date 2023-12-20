import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import Axios from "axios"; 
import "../css/customer-profile.css"
import { toast } from "react-toastify";
import { useEffect } from "react";

const BillingNavbar = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [cpData, setCpData] = useState([]);

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);

    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${parseselectedid}`);
            setCpData(res?.data?.data || []);
        } catch (error) {
            //toast.error(`Error fetching module data: ${error?.response?.data?.msg}`);
        }
    };

    useEffect(() => {
        getCustomerProfileData();
    }, []);

    const items = [
        {
            label: `${cpData?.firstName} ${cpData?.lastName} (Customer ID-${cpData?.enrollmentId})`,
            icon: "pi pi-fw pi-user surface-800",
        },
        {
            label: `MDN:${cpData?.phoneNumber}`,
        },
       
        {
            label: "Wallet Balance: $ 0",
            icon: "pi pi-fw pi-plus",
        },
      
        {
            label: "ACP",
            icon: "pi-circle-fill",
        },
    ];
    return (
        <> 
              
            <Menubar model={items}  end={()=>{ 
                 return( 
                    <span
                    className=" text-white p-3 spanstyle"
                    style={{
                        borderRadius: "10px",
                        backgroundColor: `${cpData?.status === "active" ? "rgba(21, 119, 11, 1)" : cpData?.status === "inactive" ? "rgba(174, 0, 0, 1)" : cpData?.status === "suspended" ? "rgba(255, 191, 0, 1)" : cpData?.status === "prospected" ? "rgba(120, 4, 89, 0.82)" :cpData?.status === "unfitProspect" ? "rgba(0, 0, 0, 1)":"orangered"}`,
                    }}
                >
                     {cpData?.status}
                </span>
                 )
            }} className="mt-4 card border-none menubar text-xl font-semibold mx-0 bg-white mx-0 p-4" /> 
         

        </>
    );
};

export default BillingNavbar;
