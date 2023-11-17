import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export default function SwapEsnReport({setPage}) {
    const oneMonthAgo = new Date();
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
            date: formatedenddate + "-" + formattedstartDate,
            batchnumber: "",
        },
    });
    return (
        <div className="card">
            <div className="card flex flex-wrap justify-content-between">
                <h5 style={{ paddingTop: "8px" }}>Clear Esn Report</h5>
                <Button label="Previous Page" onClick={()=>{ 
                    setPage(0)
                }} />
            </div>  
            <div className="card">
            <div className=" flex flex-wrap justify-content-around">
                <div className="mt-4 w-20rem">
                    <span className="p-input-icon-left">
                        <i className="pi pi-calendar"></i>
                        <InputText
                            className="w-full w-20rem"
                            onClick={() => {
                                setShowCalendar(true);
                            }}
                            value={formik.values.date}
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
               
                <div>   
                <label  style={{display:"block"}}>Batch#</label>
                   
                  <InputText className="mt-4 w-20rem"/>
                  </div>  

           </div>  
           <div className="flex justify-content-center">    
           <Button label="submit " className="mt-4"/> 
             </div>   
             <div style={{overflowY:"auto"}}>
              <DataTable className="mt-4" style={{minWidth:"900px"}}>  
                  <Column header="#"/> 
                  <Column header="Batch #"/>   
                  <Column header="Uploaded File Name"/> 
                  <Column header="Total Uploaded ESN"/> 
                  <Column header="Total Swapped ESN"/>   
                  <Column header="Total Failure ESN"/>  
                  <Column header="Uploaded DateTime"/>
                  <Column header="Uploaded By"/> 
                  <Column header="Status"/>
                  </DataTable> 
                  </div>
            </div>  
        </div>
    );
}
