import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import Axios from "axios"; 
import "../css/customer-profile.css"   
import html2canvas from "html2canvas";
import { useEffect } from "react";
const BillingNavbar = ({setChangeCustomerStatus}) => {
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
            label: `${cpData?.firstName} ${cpData?.lastName} (${cpData?.enrollmentId})`,
            icon:<svg className="custom-icon-user" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" fill="#1C274C"></circle> <path opacity="0.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="#1C274C"></path> </g></svg>
        },
        {
            label: `MDN:${cpData?.phoneNumber === undefined ? "NIL":cpData?.phoneNumber}`,
        },
       
        {
            label: "Wallet Balance: $ 0",
            icon: <svg className="custom-icon-plus" viewBox="0 0 8 8" id="meteor-icon-kit__regular-plus-xxs" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 3V0.83333C3 0.3731 3.4477 0 4 0C4.5523 0 5 0.3731 5 0.83333V3H7.1667C7.6269 3 8 3.4477 8 4C8 4.5523 7.6269 5 7.1667 5H5V7.1667C5 7.6269 4.5523 8 4 8C3.4477 8 3 7.6269 3 7.1667V5H0.83333C0.3731 5 0 4.5523 0 4C0 3.4477 0.3731 3 0.83333 3H3z" fill="#758CA3"></path></g></svg>
        },
      
        {
            label: "ACP",
            icon: "pi-circle-fill",
        },
    ];
    return (
        <div className="menubar-styling"> 
              
            <Menubar model={items}  end={()=>{ 
                 return( 
                    <span
                    className=" text-white p-3 cursor-pointer  spanstyle"
                    style={{
                        borderRadius: "10px",
                        backgroundColor: `${cpData?.status === "active" ? "rgba(21, 119, 11, 1)" : cpData?.status === "inactive"  ? "rgba(174, 0, 0, 1)" : cpData?.status === "suspended" || cpData?.status === "Suspended" ? "rgba(255, 191, 0, 1)" : cpData?.status === "prospected" || cpData?.status === "prospect" ? "rgba(120, 4, 89, 0.82)" :cpData?.status === "unfitProspect" || cpData?.status === "UnfitProspect" ? "rgba(0, 0, 0, 1)":"orangered"}`,
                    }}  
                    onClick={async ()=>{   
                       
                      setChangeCustomerStatus(true)
                    }}
                >
                     {cpData?.status === "prospect" || cpData?.status === "prospected" ? "Prospect":cpData?.status}
                </span>
                 )
            }} className="mt-4 card border-none menubar text-xl font-semibold mx-0 bg-white mx-0 p-4" /> 
         

        </div>
    );
};

export default BillingNavbar;
