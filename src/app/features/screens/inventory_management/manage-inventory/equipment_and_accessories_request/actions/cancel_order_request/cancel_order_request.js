import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import RenderOrderData from "./render_order_data";
import { paymenttype, equipmenttype, processtype } from "../../assets";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
export default function CancelOrderRequest() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);   
    const [showcalendar,setShowCalendar]=useState(false) 
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const monthstartdate = date.getMonth().toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");

    // Format the date to "MM-DD-YYYY" format
    const formattedstartDate = `${day}/${month}/${year}`;
    const formatedenddate = `${day}/${monthstartdate}/${year}`;
    const [startdate, setStartdate] = useState(oneMonthAgo);
    const [enddate, setEnddate] = useState(new Date());
    const formik = useFormik({
        initialValues: {
            equipmenttype: "allequipment&accessories",
            processtype: "allprocesstype",
            paymenttype: "allpaymentmethod",
            customerid: "",
            date: formatedenddate + "-" + formattedstartDate,
        },
    });
    return (
        <div>
            <h5 className="card">Cancel Order Request </h5>
            <div className="flex flex-wrap justify-content-around">
                <InputText name="customerid" value={formik.values.customerid} onChange={formik.handleChange} className=" mt-4 w-20rem" placeholder="Customer Id" />
                <Dropdown defaultValue="allequipment&accessories" value={formik.values.equipmenttype} options={equipmenttype} onChange={(e) => formik.setFieldValue("equipmenttype", e.value)} placeholder="Select an option" className="mt-4 w-20rem" />
                <Dropdown defaultValue="allprocesstype" value={formik.values.processtype} options={processtype} onChange={(e) => formik.setFieldValue("processtype", e.value)} placeholder="Select an option" className="mt-4 w-20rem" />
                <Dropdown defaultValue="allpaymentmethod" value={formik.values.paymenttype} options={paymenttype} onChange={(e) => formik.setFieldValue("paymenttype", e.value)} placeholder="Select an option" className="mt-4 w-20rem" />
                <div className="mt-4 w-20rem">
                    <span className="p-input-icon-left">
                        <i className="pi pi-calendar"></i>
                        <InputText className="w-full" onClick={()=>{setShowCalendar(true)}} value={formik.values.date} name="date" onChange={formik.handleChange} />
                    </span>
                    <div onMouseLeave={()=>{
                        setShowCalendar(false)
                    }}  
                
                     style={{ transform: "translate(-61%)", width: "720px", zIndex: "111", position: "absolute", marginRight: "0px", display: `${showcalendar ? "block":"none"}` }} className="mt-4">
                        <div>
                            <Calendar
                                dateFormat="dd/mm/yy"
                                defaultValue={oneMonthAgo}
                                value={startdate}
                                onChange={(e) => {
                                    const date = new Date(e.value);

                                    // Extract the year, month, and day components
                                    const year = date.getFullYear();
                                    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
                                    const day = date.getDate().toString().padStart(2, "0");

                                    // Format the date to "MM-DD-YYYY" format
                                    const formattedDate = `${day}/${month}/${year}`;   
                                     const date2 = new Date(enddate);

                                        // Extract the year, month, and day components
                                        const year2 = date2.getFullYear();
                                        const month2 = (date2.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
                                        const day2 = date2.getDate().toString().padStart(2, "0"); 
                                        const formattedDate2 = `${day2}/${month2}/${year2}`;   
                                        formik.values.date = formattedDate + "-" + formattedDate2; 
                                        setStartdate(e.value);
                                }}
                                className="w-26rem"
                                inline={true}
                            />
                            <Calendar
                                dateFormat="dd/mm/yy"
                                defaultValue={new Date()}
                                value={enddate}
                                onChange={(e) => {
                                    const date = new Date(e.value);

                                    // Extract the year, month, and day components
                                    const year = date.getFullYear();
                                    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
                                    const day = date.getDate().toString().padStart(2, "0");

                                    // Format the date to "MM-DD-YYYY" format
                                    const formattedDate = `${day}/${month}/${year}`;   
                                     const date2 = new Date(startdate);

                                        // Extract the year, month, and day components
                                        const year2 = date2.getFullYear();
                                        const month2 = (date2.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
                                        const day2 = date2.getDate().toString().padStart(2, "0"); 
                                        const formattedDate2 = `${day2}/${month2}/${year2}`;   
                                        formik.values.date = formattedDate2 + "-" + formattedDate; 
                                        setEnddate(e.value);
                                }}
                                style={{ position: "absolute", right: "0px", marginTop: "0px" }}
                                className="w-26rem"
                                inline={true}
                            />
                        </div>
                    </div>{" "}
                </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-content-center">
                <Button label="Submit" />
            </div>     
            <Card className="mt-8">
            <RenderOrderData/>   
            </Card>
        </div>
    );
}
