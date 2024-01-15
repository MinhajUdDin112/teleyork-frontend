import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import BillingNavbar from '../customer_profile/modals/BillingNavbar'
import moment from "moment/moment";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const OrderHistory = () => {

    const [isLoading, setIsLoading] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);

    const validationSchema = Yup.object().shape({
        reportType: Yup.string().required("Please select Report Type"),     
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            reportType: "",
            startDate: "",
            endDate: "",
        },
        onSubmit: async (values, actions) => {

            const selectedStartDate = formik.values.startDate;  
            const selectedendDate = formik.values.endDate;  
            const formattedStartDate = selectedStartDate ? moment(selectedStartDate).format('YYYY-MM-DD') : '';
            const formattedEndDate = selectedendDate ? moment(selectedendDate).format('YYYY-MM-DD') : '';

            setIsSearch(true);
            const dataToSend = {
                UserId:parseselectedid,
                reportType: formik.values.reportType,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
            };
            console.log("data to send is", dataToSend);
            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/customerHistory`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    setHistoryData(response?.data?.data);
                    console.log("Data is",response?.data?.data)
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }

        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const options = [
        { label: "Select Type", value: "" },
        { label: "Purchase History", value: "purchaseHistory" },
        { label: "Order History", value: "orderHistory" },
        { label: "Shipment History", value: "shipmentHistory" },
        { label: "A/C Status History", value: "acStatusHistory" },
        { label: "ESN History", value: "esnHistory" },
        { label: "MDN History", value: "MDN History" },
        { label: "Address History", value: "addressHistory" },
        { label: "Plan History", value: "Plan History" },
        { label: "NLAD History", value: "nladHistory" },
        { label: "A/C Search History", value: "acSearchHistory" },
       
    ];
    return (
        <>
            <div>
           
                <form onSubmit={formik.handleSubmit}>
                    <div className="card">
                    <BillingNavbar/>
                       
                        <div className="card flex flex-column justify-content-center mx-5 border-noround">
                        <h2 className="font-bold"> Customer History</h2>
                            <div className="flex flex-wrap mx-3 my-3">
                                <div className="mb-3 mr-3">
                                    <p className="m-0 pb-1 text-md font-semibold ">Date From:</p>
                                    <Calendar id="startDate" value={formik.values.startDate} onChange={formik.handleChange} showIcon style={{ width: "21rem" }} />
                                </div>
                                <div className="mb-3 mr-3">
                                    <p className="m-0 pb-1 text-md font-semibold ">Date To:</p>
                                    <Calendar id="endDate" value={formik.values.endDate} onChange={formik.handleChange} showIcon style={{ width: "21rem" }} />
                                </div>
                                <div className="mt-1 mr-3 ">
                                    <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Report</label>
                                    <Dropdown
                                        className="w-21rem"
                                        id="reportType"
                                        options={options}
                                        value={formik.values.reportType}
                                        onChange={(e) => {
                                            formik.setFieldValue("reportType", e.value);
                                            formik.handleChange(e);
                                            setIsSearch(false)
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                      {formik.touched.reportType && formik.errors.reportType ? (
                            <p className="mt-2 ml-2" style={{ color: "red" }}>
                                {formik.errors.reportType}
                            </p>
                        ) : null}
                                </div>
                                <div>
                                    <Button
                                        label="Search"
                                        type="submit"
                                        className="mt-4 text-lg bg-green-400 border-none w-7rem pt-3 pb-2 text-center"
                                    
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {formik.values.reportType == "purchaseHistory" && isSearch ? (
                        <div className=" card">
                            <h3 className="font-bold">Purchase History</h3>
                            <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit" >
                                <Column header="ID" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="PLAN ID" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="PLAN" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="STATUS" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="ACTIVATION" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="EXPIRATION" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="NEXT RENEWAL" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="MINUTES" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="SMS" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="DATA" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                            </DataTable>
                            
                        </div>
                    ) : formik.values.reportType == "shipmentHistory" && isSearch ? (
                        <div className=" card">
                             <h3 className="font-bold">Shipment History</h3>
                            <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                                <Column header="Account Number" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Tracking Number" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="IMEI/SIM" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Order Number" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Phone Model" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="DPP Aggrement" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Requested DateTime" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Sales Order Submission" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Sales Order Response" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Ship Advice DateTime" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Ship Advice XML" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                            </DataTable>
                            
                        </div>
                    ) : formik.values.reportType == "orderHistory" && isSearch ? (
                        <div className="card">
                             <h3 className="font-bold">Order History</h3>
                             <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                                <Column header="Stage" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Order By" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Order DateTime" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Status" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />     
                            </DataTable> 
                        </div>
                        
                    ) : formik.values.reportType == "acStatusHistory" && isSearch ? (
                        <div className="card">
                             <h3 className="font-bold">A/C Status History</h3>
                             <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Status" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Posted By" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                        <Column header="DateTime" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} /> 
                    </DataTable>
                        </div>
                       
                    ):formik.values.reportType == "esnHistory" && isSearch?
                    ( 
                    <div className="card">
                         <h3 className="font-bold">ESN History</h3>
                         <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="SIM/ICCID" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="HexESN" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="MDN" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                    <Column header="Created Date" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Disconnect Date" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />  
                    <Column header="Changed By" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />    
                </DataTable>
                        </div>

                    ):formik.values.reportType == "MDN History" && isSearch?
                    ( 
                        <div className="card">
                        <h3 className="font-bold">MDN History</h3>
                        <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Old MDN" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="New MDN" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Source" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                    <Column header="Created Date" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                </DataTable>
                </div>

                    ):formik.values.reportType == "addressHistory" && isSearch?
                    (
                        <div className="card">
                        <h3 className="font-bold">Address History</h3>
                         <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Service Address" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Mailling Address" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Updated By" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                    <Column header="Updated Date Time" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                </DataTable></div>

                    ):formik.values.reportType == "Plan History" && isSearch?
                    (
                        
                        <div className="card">
                        <h3 className="font-bold">Plan History</h3> <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Original Plan" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Change Plan	" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Updated By" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                    <Column header="Updated Date Time" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                </DataTable>
                </div>

                    ):formik.values.reportType == "nladHistory" && isSearch?
                    ( 
                        <div className="card">
                        <h3 className="font-bold">NLAD History</h3>\
                        <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Action" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Result" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="API Response" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                    <Column header="Comment	Date Time" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />   
                    <Column header="Date Time" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} /> 
                </DataTable>
                </div>

                    ):formik.values.reportType == "acSearchHistory" && isSearch?
                    (
                        
                        <div className="card">
                        <h3 className="font-bold">AC Search History</h3> <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="User" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="DateTime" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                </DataTable>
                </div>

                    ):""
                }
                </form>
            </div>
        </>
    );
};

export default OrderHistory;
