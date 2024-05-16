import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import Axios from "axios";
import DialogeForWallet from "./dialogs/DialogeForWallet";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ChargeWallet from "./ChargeWallet";
const BillingNavbar = ({ refresh,setRefresh, setChangeCustomerStatus }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [cpData, setCpData] = useState([]);
    const [openDialogeForWallet, setOpenDialogeForWallet] = useState(false);
    const [accountType, setAccountType] = useState(null);

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);  
    // Get user data from localStorage
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const capitalCompanyName = parseLoginRes?.companyName?.toUpperCase();

    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${parseselectedid}`);
            setCpData(res?.data?.data || []);
            setAccountType(res?.data?.data?.accountType);
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        getCustomerProfileData();
    }, [refresh]);

    function handleWalletClick() {
        setOpenDialogeForWallet(true);
    }

    var items;
    if (accountType === null) {
        // Render loading or placeholder if accountType is not available yet
        return <div>Loading...</div>;
    } else {
        items = [
            {
                label: `${cpData?.firstName} ${cpData?.lastName} (Account ID: ${cpData?.accountId})`,
                icon: (
                    <svg className="custom-icon-user" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <circle cx="12" cy="6" r="4" fill="#1C274C"></circle>
                            <path opacity="0.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="#1C274C"></path>
                        </g>
                    </svg>
                ),
                command: () => {
                    navigate("/customer-profile", { state: { selectedId: parseselectedid } });
                },
            },
            {
                label: `MDN:${cpData?.phoneNumber === undefined ? "NIL" : cpData?.phoneNumber}`,
            },

            {
                label:`Wallet:  ${cpData?.wallet !== undefined ? parseFloat(cpData?.wallet).toFixed(2) : "0"}`,
                icon: (
                    <svg className="custom-icon-plus" viewBox="0 0 8 8" id="meteor-icon-kit__regular-plus-xxs" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                fill-rule="evenodd" 
                                clip-rule="evenodd"
                                d="M3 3V0.83333C3 0.3731 3.4477 0 4 0C4.5523 0 5 0.3731 5 0.83333V3H7.1667C7.6269 3 8 3.4477 8 4C8 4.5523 7.6269 5 7.1667 5H5V7.1667C5 7.6269 4.5523 8 4 8C3.4477 8 3 7.6269 3 7.1667V5H0.83333C0.3731 5 0 4.5523 0 4C0 3.4477 0.3731 3 0.83333 3H3z"
                                fill="#758CA3"
                            ></path>
                        </g>
                    </svg>
                ),
                command: () => { handleWalletClick() 
            },
            },
            {
                label: accountType === "ACP" ? "ACP" : accountType === "Postpaid" ? "Post Paid" : accountType === "Prepaid" ? "Pre Paid" : "",
                icon: "pi-circle-fill",
            },
        ];
    }
    const handleGenerateInvoice = async () => {
        const dataToSend = {
            customerId: cpData?._id,
            planId: cpData?.plan?._id,
            // stripeId: cpData?.stripeId,
            accountId: cpData?.accountId,
            invoiceType: "SignUp",
            planCharges: cpData?.currentPlan?.planCharges,
            additionalCharges: cpData?.currentPlan?.additionalCharges,
            discount: cpData?.currentPlan?.discount,
            totalAmount: cpData?.totalAmount,
            amountPaid: "0",
            invoiceDueDate: cpData?.activeBillingConfiguration?.dueDate,
            billingPeriod: cpData?.currentPlan?.billingPeriod,
            invoiceStatus: "Pending",
            invoicePaymentMethod: "Credit/Debit Card",
            invoiceOneTimeCharges: cpData?.activeBillingConfiguration?.oneTimeCharge,
            lateFee: cpData?.activeBillingConfiguration?.applyLateFee,
            planName: cpData?.plan?.name,
            //*********************//
            chargingType: "Monthly",
            printSetting: cpData?.currentPlan?.printSetting,
            paymentChannel: "Stripe",
            isInvoice: true,
            // isAutopay: true,
            selectProduct: cpData?.billId,
            // autopayChargeDate: "",
            // stripeTokenId: cpData?.currentPlan?.stripeTokenId,
            // stripeCustomerId: cpData?.currentPlan?.stripeCustomerId,
        };

        try {
            const response = await Axios.post(`${BASE_URL}/api/web/invoices/prepaidgenerateInvoice`, dataToSend);
            if (response?.status === 200 || response?.status === 201) {
                toast.success(response?.data?.message);   
                 setRefresh(prev=>!prev)
                 
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    return (
        <div className="menubar-styling">
            <ToastContainer />
            <Dialog header={"Add Wallet"} visible={openDialogeForWallet} style={{ width: "60vw" }} onHide={() => setOpenDialogeForWallet(false)}>
                   { 
                   (capitalCompanyName.includes("IJ")) ?   <ChargeWallet customerId={cpData?._id} setRefresh={setRefresh} setOpenDialogeForWallet={setOpenDialogeForWallet} />      
                   :
                   <DialogeForWallet customerId={cpData?._id} setRefresh={setRefresh} setOpenDialogeForWallet={setOpenDialogeForWallet} />      
                   }
                   </Dialog>
            <Menubar
                model={items}
                end={() => {
                    return (
                        <span
                        className="text-white p-3 cursor-pointer spanstyle"
                        style={{
                            borderRadius: "10px",
                            backgroundColor: `${
                                cpData?.status === "active"
                                    ? "rgb(60, 179, 113)"
                                    : cpData?.status === "inactive"
                                    ? "rgba(174, 0, 0, 1)"
                                    : cpData?.status === "suspended"
                                    ? "rgba(255, 191, 0, 1)"
                                    : cpData?.status === "prospected"
                                    ? "rgba(120, 4, 89, 0.82)"
                                    : cpData?.status === "rejected"
                                    ? "rgba(0, 0, 0, 1)"
                                    : "orangered"
                            }`,
                        }}
                        /*onClick={async () => {
            setChangeCustomerStatus(true);
          }}*/
                    >
                        {cpData?.status}
                    </span>
                    );
                }}
                className="m-1  card border-none menubar border-noround  text-xl font-semibold mx-0 bg-white mx-0 pt-4 pb-4"
            />  
            { 
            cpData?.invoice?.length === 0 && cpData?.accountType==="Prepaid" ?
            <Button onClick={handleGenerateInvoice} style={{ marginTop: "1rem" }} label="Generate Invoice" /> :undefined
}
        </div>
    );
};

export default BillingNavbar;
