import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import Axios from "axios"; 
import "./Navbar.css"
import DialogeForWallet from "../dialogs/DialogeForWallet";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import ChargeWallet from "../../billing_and_invoices/components/ChargeWallet";
import { ProgressSpinner } from "primereact/progressspinner";
const BillingNavbar = ({ refresh, setChangeCustomerStatus,refreshEsn, changeCustomerStatusDialog, refreshNotificationcomponent, setRefreshEsn }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const loginRes = localStorage.getItem("userData"); 
    const [showSpinnerConvertToPrepaid,setShowSpinnerConvertToPrepaid]=useState(false)
    const parseLoginRes = JSON.parse(loginRes);
    const capitalCompanyName = parseLoginRes?.companyName?.toUpperCase();
    const [cpData, setCpData] = useState([]);
    const [openDialogeForWallet, setOpenDialogeForWallet] = useState(false);
    const [accountType, setAccountType] = useState(null);
    const [visible, setVisible] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [assignType, setAssignType] = useState("");
    const [orderIdData, setOrderIdData] = useState("");
    const [refreshComponent, setRefreshComponent] = useState(false);
    const [refreshComp, setRefreshComp] = useState(false);
    const [refreshTrakingId, setRefreshTrakingId] = useState(false);
    const [assignLabel, setAssignLabel] = useState(false);
    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);
    const navigate = useNavigate();
    useEffect(() => {
        const data = {
            orderNumber: cpData?.enrollmentId,
        };
        const fetchData = async () => {
            try {
                const response = await Axios.post(`${BASE_URL}/api/web/order`, data);
                const res = response?.data?.data;
                setOrderIdData(res);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the asynchronous function
    }, [cpData?.enrollmentId, refreshComponent]);
    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${parseselectedid}`);
            setCpData(res?.data?.data || []);
            setAccountType(res?.data?.data?.accountType);
        } catch (error) {}
    };

    useEffect(() => {
        getCustomerProfileData();
    }, [changeCustomerStatusDialog, refreshNotificationcomponent, refresh, refreshComponent, refreshComp,refreshEsn]);

    function openPaymentScreen() {
        navigate("/invoice", { state: { selectedId: parseselectedid } });    
        //navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(parseselectedid));
    
    }
    const goToProfile = () => {
        navigate("/customer-profile", { state: { selectedId: parseselectedid } });
    };
    const handleWalletClick = () => {
        setOpenDialogeForWallet(true);
    };
    var items;
    if (accountType === null) {
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
                command: () => goToProfile(),
            },
            {
                label: `MDN:${cpData?.phoneNumber === undefined ? "NIL" : cpData?.phoneNumber}`,
            },
            {
                label: `Payments`,
                icon: (
                    <svg className="custom-icon-plus" viewBox="0 0 8 8" id="meteor-icon-kit__regular-plus-xxs" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                label: accountType === "ACP" ? "ACP" : accountType === "Postpaid" ? "Post Paid" : accountType === "Prepaid" ? "Pre Paid" : "",
                icon: "pi-circle-fill",
                className: "account-type-label",
            },

            {
                label: `Wallet: ${cpData?.wallet !== undefined ? parseFloat(cpData?.wallet).toFixed(2) : "0"}`,
                icon: (
                    <svg className="custom-icon-plus" viewBox="0 0 8 8" id="meteor-icon-kit__regular-plus-xxs" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                command: () => {
                    handleWalletClick();
                },
            },
        ];
    }
    const handleAssign = async () => {
        const loginRes = localStorage.getItem("userData");
        const parseLoginRes = JSON.parse(loginRes);
        const data = {
            csr: parseLoginRes?._id,
            userId: cpData?._id,
        };
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/esnAssingment`, data);
            toast.success(response?.data?.msg);
            setRefreshEsn((prev) => !prev);
            setAssignLabel(true);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
        setVisible(false);
        setRefreshComponent((prev) => !prev);
    };
    
    const handleLabel = async () => {
        const loginRes = localStorage.getItem("userData");
        const parseLoginRes = JSON.parse(loginRes);
        const data = {
            orderId: orderIdData?.orderId,
            userId: parseLoginRes?._id,
            testLabel: false,
        };
        try {
            const response = await Axios.post(`${BASE_URL}/api/web/order/createLable`, data);
            toast.success(response?.data?.msg);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
        setVisible(false);
        setRefreshComponent((prev) => !prev);
        setRefreshEsn((prev) => !prev);
    };
    const downloadLabel = () => {
        const path = cpData?.label;
        const trimmedPath = path.replace(/^uploads\//, "");
        const fileUrl = `${BASE_URL}/${trimmedPath}`;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("target", "_blank"); // Open in new tab
        link.setAttribute("download", ""); // Indicate that the file should be downloaded
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }; 
    const handleConvertToPrepaid = async () => {     
          setShowSpinnerConvertToPrepaid(true)
        try {
            const data = {
                accountType: "Prepaid",
            };
            const response = await Axios.patch(`${BASE_URL}/api/user/changeAccountStatus?userId=${cpData?._id}`, data);
            setVisible(false);
            setRefreshComp(true);
            setRefreshComponent(true);
            setRefreshEsn((prev) => !prev);
            toast.success(response?.data?.message);    
           setShowSpinnerConvertToPrepaid(false)
        } catch (error) {
            toast.error(error?.response?.data?.msg); 
            setShowSpinnerConvertToPrepaid(false)
        }
    };
    const handleTrackingPackage = async (customerId) => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/web/order/getTrackingNumber/?customerId=${customerId}`);
            const data = response?.data?.data;
            if (data) {
                const trackingId = data;
                const trackingUrl = `https://tools.usps.com/go/TrackConfirmAction?&tLabels=${trackingId}`;
                window.open(trackingUrl, "_blank");
            } else {
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    return (
        <div className="menubar-styling">
            <ToastContainer />
            <Dialog header={"Add Wallet"} visible={openDialogeForWallet} style={{ width: "50vw" }} onHide={() => setOpenDialogeForWallet(false)}>
                {capitalCompanyName.includes("IJ") ? (
                    <ChargeWallet userDetails={cpData} customerId={cpData?._id} setRefresh={setRefreshComponent} setOpenDialogeForWallet={setOpenDialogeForWallet} />
                ) : (
                    <DialogeForWallet userDetails={cpData} customerId={cpData?._id} setRefresh={setRefreshComponent} setOpenDialogeForWallet={setOpenDialogeForWallet} />
                )}
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
          onClick={async () => {
            if (cpData?.status !== "rejected") {
                setChangeCustomerStatus(true);
            }
        }}
                    >
                        {cpData?.status}
                    </span>
                    );
                }}
                className="mt-4 card border-none menubar text-xl font-semibold mx-0 bg-white mx-0 p-4"
            />
            {cpData?.esn === undefined && cpData?.isEnrollmentComplete && accountType === "Prepaid" && (
                <>
                    <Button
                        label="Assign ESN"
                        onClick={() => {
                            setConfirmationMessage("Are you sure you want to assign ESN?");
                            setVisible(true);
                            setAssignType("ESN");
                        }}
                    />
                    <span> </span>
                </>
            )}

            {cpData?.esn !== undefined && cpData?.label === undefined && cpData?.isEnrollmentComplete && cpData?.accountType === "Prepaid" && cpData?.accountType !== "ACP" && !cpData?.AcptoPrepaid && (
                <>
                    <Button
                        label="Assign Label"
                        onClick={() => {
                            setConfirmationMessage("Are you sure you want to assign label?");
                            setVisible(true);
                            setAssignType("Label");
                        }}
                    />
                    <span> </span>
                </>
            )}
            {cpData?.label ? (
                <>
                    <div className="ml-5">
                        <Button label="Download Label" onClick={downloadLabel} style={{ marginTop: "1rem", marginLeft: "-2rem" }} />
                        <Button label="Track Package" onClick={() => handleTrackingPackage(cpData?._id)} style={{ marginTop: "1rem", marginLeft: "2rem" }} />
                    </div>
                </>
            ) : (
                ""
            )}

            <Dialog
                visible={visible}
                style={{ width: "30rem" }}
                onHide={() => setVisible(false)}
                footer={
                    <div style={{ marginLeft: "-10rem" }}>
                        <Button label="Yes" onClick={() => handleAssign(assignType)} />
                        <Button label="No" onClick={() => setVisible(false)} />
                    </div>
                }
            >
                <p className="m-0">{confirmationMessage}</p>
            </Dialog>

            <Dialog
                visible={visible && assignType === "Label"} // Show only if assignType is Label
                style={{ width: "30rem" }}
                onHide={() => setVisible(false)}
                footer={
                    <div style={{ marginLeft: "-10rem" }}>
                        <Button label="Yes" onClick={handleLabel} />
                        <Button label="No" onClick={() => setVisible(false)} />
                    </div>
                }
            >
                <p className="m-0">{confirmationMessage}</p>
            </Dialog>
            {cpData.accountType === "ACP" && (
                <Button
                    label="Convert to Prepaid"
                    onClick={() => {
                        setConfirmationMessage("Are you sure you want to convert this customer to prepaid?");
                        setVisible(true);
                    }}
                />
            )}
            <Dialog
                visible={visible && cpData.accountType === "ACP"}   
                style={{ width: "30rem" }}
                onHide={() => setVisible(false)}
                footer={
                    <div style={{ marginLeft: "-10rem" }}>    
                          
                        <Button label="Yes" onClick={handleConvertToPrepaid} />
                        <Button label="No" onClick={() => setVisible(false)} />
                    </div>
                }
            >   
               {  
                showSpinnerConvertToPrepaid ? 
                 <div className="spinnercenter"> <ProgressSpinner/> 
                    </div>
                 : undefined
                 }
                  
                <p className="m-0">{confirmationMessage}</p>  
            </Dialog> 
    
        </div>
    );
};

export default BillingNavbar;
