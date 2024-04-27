import React, { useEffect, useState } from "react";
import InvoiceTable from "../components/InvoiceTable";
import AdHocModal from "../components/modals/AdHocModal";
import BillingNavbar from "../components/BillingNavbar";
import Axios from "axios";
import { Card } from "primereact/card";
import { useLocation } from "react-router-dom";
import ChangeCustomerStatus from "../../customer_profile/change_customer_status/change_customer_status";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { createContext } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const onAPISuccess = createContext();
const InvoicePage = () => {
    const [refresh, setRefresh] = useState(false);
    const [accountType, setAccountType] = useState("");
    const [invoices, setInvoices] = useState([]);
    const [changeCustomerStatusDialog, setChangeCustomerStatus] = useState(false);
    const [adHocInvoiceModal, setAdHocInvoiceModal] = useState(false);
    const [currentPlan, setCurrentPlan] = useState([]);
    const [userDetails, setUserDetails] = useState();
    const [cpData, setCpData] = useState([]);
    const location = useLocation();
    const selectedId = location?.state && location?.state?.selectedId;

    const handleAPISuccess = (responseData) => {
        window.location.reload();
    };
    const getUserDetail = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${selectedId}`);
            if (response?.status == "200" || response?.status == "201") {
                setCpData(response?.data?.data || []);
                setUserDetails(response?.data?.data);
                setAccountType(response?.data?.data?.accountType);
            }
        } catch (error) {}
    };

    const getInvoice = async () => {
        const resp = await Axios.get(`${BASE_URL}/api/web/invoices/getinvoicebycustomerid?customerid=${selectedId}`);
        if (resp?.status == "200" || resp?.status == "201") {
            setCurrentPlan(resp?.data?.data);
            setInvoices(resp?.data?.data);
            localStorage.setItem("invoiceData", JSON.stringify(resp?.data?.data));
        }
    };
    useEffect(() => {
        getUserDetail();
        getInvoice();
    }, [selectedId, refresh]);

    return (
        <>
            <onAPISuccess.Provider value={{ handleAPISuccess }}>
                <Card>
                    <BillingNavbar refresh={refresh}  setRefresh={setRefresh} setChangeCustomerStatus={setChangeCustomerStatus} changeCustomerStatusDialog={changeCustomerStatusDialog} />
                    <Dialog draggable={false} visible={changeCustomerStatusDialog} header={`Change Customer Status`} style={{ width: "70vw" }} onHide={() => setChangeCustomerStatus((prev) => !prev)}>
                        <ChangeCustomerStatus cpData={cpData} setChangeCustomerStatus={setChangeCustomerStatus} />
                    </Dialog>
                    <Dialog draggable={false} visible={adHocInvoiceModal} header={`Add Adhoc Invoice`} style={{ width: "50vw" }} onHide={() => setAdHocInvoiceModal((prev) => !prev)}>
                        <AdHocModal setRefresh={setRefresh} cpData={cpData} onAPISuccess={handleAPISuccess} adHocInvoiceModal={adHocInvoiceModal} setAdHocInvoiceModal={setAdHocInvoiceModal} />
                    </Dialog>

                    <div className="mt-5 mb-5 ml-5">
                        <Button
                            label="AD HOC Invoice"
                            text
                            raised
                            onClick={() => {
                                setAdHocInvoiceModal(true);
                            }}
                        />
                    </div>
                    <div className=" p-0 m-3 card">
                        <div className="mx-4">
                            <p className="m-0 text-lg font-bold " style={{ color: "red" }}>
                                •Rows in red color are Unpaid Invoices
                            </p>
                            <p className="text-lg mt-2 font-bold text-blue-400">•Rows in blue color are Paid Invoices</p>
                            <p style={{ color: "rgba(250, 129, 22,1)" }} className="text-lg mt-2 font-bold">
                                •Rows in orange color are partially Paid Invoices
                            </p>
                        </div>
                        <InvoiceTable setRefresh={setRefresh} refresh={refresh}  userDetails={userDetails} className="mb-3" invoiceData={invoices} />
                    </div>
                </Card>
            </onAPISuccess.Provider>
        </>
    );
};

export default InvoicePage;
export { onAPISuccess };
