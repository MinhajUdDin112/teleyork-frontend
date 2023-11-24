import { Card } from "primereact/card";
import React, { useState } from "react";  
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { paymentcompleted } from "./asset";  
import { DataTable } from 'primereact/datatable';  
import {Dialog} from "primereact/dialog" 
import {FileUpload} from "primereact/fileupload"
import { Column } from 'primereact/column';
import { useFormik } from "formik"; 
import { emptydistributor, employee, emptyemployee, emptyretailer, queuename, distributor, retailer, masteragent, status } from "./asset";
import { NewYorkStates } from "../../../../../Utils/new_york_states";
import { Button } from "primereact/button";
export default function ShippingQueue() {
    const oneMonthAgo = new Date();  
    function onUpload(){ 

    }
    const [searchresult,setSearchResult]=useState([])   
    const [visibledialog,setVisibleDialog]=useState(false)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth());
    const date = new Date();  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const monthstartdate = date.getMonth().toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");

    // Format the date to "MM-DD-YYYY" format
    const formattedstartDate = `${day}/${month}/${year}`;
    const formatedenddate = `${day}/${monthstartdate}/${year}`;
    const [startdate, setStartdate] = useState(new Date());
    const [enddate, setEnddate] = useState(new Date());
    const [showcalendar, setShowCalendar] = useState(false);

    const formik = useFormik({
        initialValues: {
            "Queue Name": "",
            State: "",
            "Master Agent": "",
            Distributor: "",
            Retailer: "",
            Employee: "",
            "Tracking Number": "",
            "Created Date Range": formatedenddate + "-" + formattedstartDate,
            Status: "",
            "Search Order": "",
            "payment Completed": "",
        },
    });
    return (
        <Card>
            <div className="card " style={{ height: "50px", paddingTop: "15px" }}>
                <h5 style={{ color: "grey" }}>Order FulFillment</h5>
            </div>
            <Card>
                <div className="flex flex-wrap justify-content-around ">
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Queue Name</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={queuename}
                            onChange={(e) => {
                                formik.setFieldValue("Queue Name", e.value);
                            }}
                            value={formik.values["Queue Name"]}
                        />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>State</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={NewYorkStates}
                            onChange={(e) => {
                                formik.setFieldValue("State", e.value);
                            }}
                            value={formik.values["State"]}
                        />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Master Agent</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={masteragent}
                            onChange={(e) => {
                                formik.setFieldValue("Master Agent", e.value);
                            }}
                            value={formik.values["Master Agent"]}
                        />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Distributor</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={formik.values["Master Agent"] !== "" ? distributor : emptydistributor}
                            onChange={(e) => {
                                formik.setFieldValue("Distributor", e.value);
                            }}
                            value={formik.values["Distributor"]}
                        />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Retailer</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={formik.values["Distributor"] !== "" ? retailer : emptyretailer}
                            onChange={(e) => {
                                formik.setFieldValue("Retailer", e.value);
                            }}
                            value={formik.values["Retailer"]}
                        />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Employee</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={formik.values["Retailer"] !== "" ? employee : emptyemployee}
                            onChange={(e) => {
                                formik.setFieldValue("Employee", e.value);
                            }}
                            value={formik.values["Employee"]}
                        />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Tracking Number</labels>
                        <InputText className="mt-2 w-20rem" name="Tracking Number" onChange={formik.handleChange} value={formik.values["Tracking Number"]} />
                    </div>
                    <div className="mt-4 w-20rem">
                        <labels style={{ display: "block" }}>Created Date Range</labels>
                        <span className="p-input-icon-left">
                            <i className="pi pi-calendar"></i>
                            <InputText
                                className="w-full mt-2 w-20rem"
                                onClick={() => {
                                    setShowCalendar(true);
                                }}
                                value={formik.values["Created Date Range"]}
                                name="date"
                                onChange={formik.handleChange}
                            />
                        </span>
                        <div
                            onMouseLeave={() => {
                                setShowCalendar(false);
                            }}
                            style={{ transform: "translate(-61%)", width: "720px", zIndex: "11154545545", position: "absolute", marginRight: "0px", display: `${showcalendar ? "block" : "none"}` }}
                            className="mt-4"
                        >
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
                                        formik.values["Created Date Range"] = formattedDate + "-" + formattedDate2;
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
                                        formik.values["Created Date Range"] = formattedDate2 + "-" + formattedDate;
                                        setEnddate(e.value);
                                    }}
                                    style={{ position: "absolute", right: "0px", marginTop: "0px" }}
                                    className="w-26rem"
                                    inline={true}
                                />
                            </div>
                        </div>{" "}
                    </div>

                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Status</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={status}
                            onChange={(e) => {
                                formik.setFieldValue("Status", e.value);
                            }}
                            value={formik.values["Status"]}
                        />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Search Order</labels>
                        <InputText className="mt-2 w-20rem" name="Search Order" onChange={formik.handleChange} value={formik.values["Search Order"]} />
                    </div>
                    <div className="mt-4">
                        <labels style={{ display: "block" }}>Payment Completed</labels>
                        <Dropdown
                            className="mt-2 w-20rem"
                            placeholder="Place Select An Option"
                            optionLabel="label"
                            options={paymentcompleted}
                            onChange={(e) => {
                                formik.setFieldValue("Payment Completed", e.value);
                            }}
                            value={formik.values["Payment Completed"]}
                        />
                    </div>        
                     
                </div>
                <div className="flex flex-wrap justify-content-center"> 
                          <Button className="mt-4" label="Search"/>
                      </div>    
                      <div className="mt-2 flex flex-wrap justify-content-center"> 
                          <Button className="mt-2" label="One By One" />  
                          <Button className="ml-4 mt-2 bg-transparent " onClick={()=>{setVisibleDialog(true)}}  style={{color:"grey"}} label="Bulk FulFillment"/> 
                      </div>  
                      <div > 
                          <Button  label="Shipper Batch Report"  style={{marginTop:"25px",position:"absolute",right:"80px"}}/>  
                      </div>             
                      <div style={{marginTop:"99px"}}>   
                         <h5>Search Result {searchresult.length}</h5>
                        <DataTable > 
                             </DataTable>   
                             </div>
                        <Dialog header="Order FulFillment" style={{width:"70vw"}} visible={visibledialog} onHide={()=>{ 
                            setVisibleDialog(false)
                        }}> 
                           <div >   
                                 <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />   
                                   <h5><strong>Header : </strong>ENROLL_ID, SIM, DEVICE(optional) <strong>(Download Sample File)</strong></h5>     
                            </div>  

                        </Dialog>
            </Card>    
             
        </Card>
    );
}
