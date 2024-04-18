import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import Axios from "axios";
import DialogeForWallet from "../dialogs/DialogeForWallet";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";

const BillingNavbar = ({refresh, setChangeCustomerStatus, changeCustomerStatusDialog }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [cpData, setCpData] = useState([]);
  const [openDialogeForWallet, setOpenDialogeForWallet] = useState(false);
  const [accountType, setAccountType] = useState(null);

  const selectedid = localStorage.getItem("selectedId");
  const parseselectedid = JSON.parse(selectedid);

const navigate = useNavigate();
  const getCustomerProfileData = async () => {
    try {
      const res = await Axios.get(
        `${BASE_URL}/api/user/userDetails?userId=${parseselectedid}`
      );
      setCpData(res?.data?.data || []);
      setAccountType(res?.data?.data?.accountType);
    } catch (error) {
     
    }
  };
  useEffect(() => {
    getCustomerProfileData();
  }, [changeCustomerStatusDialog,refresh]);

  function openPaymentScreen() {
   
    navigate("/invoice", { state: { selectedId: parseselectedid} });
  }
  const goToProfile =()=>{
   
    navigate("/customer-profile", { state: { selectedId: parseselectedid } });

  }
  const handleWalletClick =()=>{
    setOpenDialogeForWallet(true)

  }
  var items;
  if (accountType === null) {
   
    return <div>Loading...</div>;
  } else {
    items = [
      {
        label: `${cpData?.firstName} ${cpData?.lastName} (Account ID: ${cpData?.accountId})`,
        icon: (
          <svg
            className="custom-icon-user"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <circle cx="12" cy="6" r="4" fill="#1C274C"></circle>
              <path
                opacity="0.5"
                d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                fill="#1C274C"
              ></path>
            </g>
          </svg>
        ),
        command: () => goToProfile(),
      },
      {
        label: `MDN:${cpData?.phoneNumber === undefined ? "NIL" : cpData?.phoneNumber}`,
      },
      {
        label: `Payments`,
        icon: (
          <svg
            className="custom-icon-plus"
            viewBox="0 0 8 8"
            id="meteor-icon-kit__regular-plus-xxs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 3V0.83333C3 0.3731 3.4477 0 4 0C4.5523 0 5 0.3731 5 0.83333V3H7.1667C7.6269 3 8 3.4477 8 4C8 4.5523 7.6269 5 7.1667 5H5V7.1667C5 7.6269 4.5523 8 4 8C3.4477 8 3 7.6269 3 7.1667V5H0.83333C0.3731 5 0 4.5523 0 4C0 3.4477 0.3731 3 0.83333 3H3z"
                fill="#758CA3"
              ></path>
            </g>
          </svg>
        ),
        command: () => openPaymentScreen(),
      },
      {
        label:
          accountType === "ACP"
            ? "ACP"
            : accountType === "Postpaid"
            ? "Post Paid"
            : accountType === "Prepaid"
            ? "Pre Paid"
            : "",
        icon: "pi-circle-fill",
        className: "account-type-label",
      },
      
    {
        label:`Wallet: ${cpData?.wallet !== undefined ? parseFloat(cpData?.wallet).toFixed(2) : "0"}`,
        icon: (
          <svg
            className="custom-icon-plus"
            viewBox="0 0 8 8"
            id="meteor-icon-kit__regular-plus-xxs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 3V0.83333C3 0.3731 3.4477 0 4 0C4.5523 0 5 0.3731 5 0.83333V3H7.1667C7.6269 3 8 3.4477 8 4C8 4.5523 7.6269 5 7.1667 5H5V7.1667C5 7.6269 4.5523 8 4 8C3.4477 8 3 7.6269 3 7.1667V5H0.83333C0.3731 5 0 4.5523 0 4C0 3.4477 0.3731 3 0.83333 3H3z"
                fill="#758CA3"
              ></path>
            </g>
          </svg>
        ),
        command: () => handleWalletClick(),
      }
    ];
  }
  

  return (
    <div className="menubar-styling">
      <Dialog
        header={"Add Wallet"}
        visible={openDialogeForWallet}
        style={{ width: "50vw" }}
        onHide={() => setOpenDialogeForWallet(false)}
      >
        <DialogeForWallet userDetails={cpData} setOpenDialogeForWallet={setOpenDialogeForWallet} />
      </Dialog>
      <Menubar
        model={items}
        end={() => {
          return (
            <span
            className={`text-white p-3 cursor-pointer spanstyle }`}
            style={{
              borderRadius: "10px",
              backgroundColor: `${
                cpData?.status === "prospected" || cpData?.status === "prospect"
                  ? "rgba(120, 4, 89, 0.82)"
                  : "orangered"
              }`,
             
             
            }}
            onClick={async () => {
              if (cpData?.status !== "rejected") {
                setChangeCustomerStatus(true);
              }
            }}
          >
            { cpData?.status}
          </span>
          
          );
        }}
        className="mt-4 card border-none menubar text-xl font-semibold mx-0 bg-white mx-0 p-4"
      />
    </div>
  );
};

export default BillingNavbar;
