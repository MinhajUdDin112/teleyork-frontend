import React, { useState } from 'react'
import BillingNavbar from '../customer_profile/modals/BillingNavbar'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import moment from "moment/moment";
import { Dropdown } from 'primereact/dropdown'
const BASE_URL = process.env.REACT_APP_BASE_URL;
const CustomerUsage = () => {

    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();
    const [isLoading, setIsLoading] = useState();
    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);

    const validationSchema = Yup.object().shape({
        startDate: Yup.string().required("Please select Date"), 
        endDate: Yup.string().required("Please select Date"),     
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
           
            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/customerHistory`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    setHistoryData(response?.data?.data);
                   
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }

        },
    });

    const options = [
        { label: "Select Type", value: "" },
        { label: "ALlIncomming Call", value: "purchaseHistory" },
        { label: "OutGoing Call", value: "orderHistory" },
        { label: "Text", value: "shipmentHistory" },
        { label: "Data", value: "acStatusHistory" },
       
       
    ];

  return (
    <>
    <BillingNavbar/>
<div className='card '>
<div><h3>Customer Usage
    </h3></div>
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
                                    <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Type</label>
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
                                
                                </div>
                                <div>
                                    <Button
                                        label="Search"
                                        type="submit"
                                        className="mt-4 mr-4 text-lg bg-green-400 border-none w-7rem pt-3 pb-2 text-center"
                                    
                                    />
                                </div>
        
    </div>

   

</div>

<div className=" card">
                            <h3 className="font-bold">Record </h3>
                            <DataTable value={historyData} showGridlines resizableColumns columnResizeMode="fit" >
                                <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="MDN" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Dialed Digit" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Call DateTime" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Redirecting Part" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Billable Unit" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Unit" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Call Type" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Free Type" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Usage Type" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Destination Class" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Plan COD" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Roaming" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="ThreeGPP Rate Type" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="Billing Code" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                            </DataTable>
                            
                        </div>
    </>
  )
}

export default CustomerUsage