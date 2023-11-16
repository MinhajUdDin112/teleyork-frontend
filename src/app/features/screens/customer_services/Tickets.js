import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from "../../../../config";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Tickets = () => {
const [isLoading, setIsLoading] = useState(false)
    
    const validationSchema = Yup.object().shape({
        dateFrom: Yup.string().required("This is Required"),
        dateTo: Yup.string().required("This is Required"),
        ticketNum: Yup.string().required("This is Required"),
    });
    const formik = useFormik({
     validationSchema : validationSchema,
     initialValues:{
        dateFrom:"",
        dateTo:"",
        ticketNum:"",
     },
     onSubmit: async (values, actions) => {
      
        const dataToSend = { ...values };
        setIsLoading(true);
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`, dataToSend);
            if (response?.status === 200 || response?.status === 201) {
                toast.success("Deactivate Successfully");
            }
        } catch (error) {
         toast.error("APi is required");
            setIsLoading(false);
        }
    },

})

const tabledata = [
    {
        Ticket_Number: "1",
        Title: "",
        Description: "",
        AssignedTo: "",
        status: "",
        CreatedBy: "",
        CreatedDate: "",
        
    },
];

const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
};

    return (
        <>
        <ToastContainer/>
       
            <div className="card bg-pink-50">
                <div className="card">
                    <h3>Tickets</h3>                
                </div>
                <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid formgrid grid ml-5 mt-5">
                <div className="field col-12 md:col-3">
                        <label className="field_label">
                            Date From:<span className="steric">*</span>
                        </label>
                        <Calendar id="fromTo" value={formik.values.fromTo} onChange={formik.handleChange} onBlur={formik.handleBlur} showIcon className={classNames({ "p-invalid": isFormFieldValid("fromTo") }, "input_text")} />
                        {getFormErrorMessage("fromTo")}
                    </div>

                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                         Date To:<span className="steric">*</span>
                        </label>
                        <Calendar id="dateTo" value={formik.values.dateTo} onChange={formik.handleChange} onBlur={formik.handleBlur} showIcon className={classNames({ "p-invalid": isFormFieldValid("dateTo") }, "input_text")} />
                        {getFormErrorMessage("dateTo")}
                    </div>
                    <div className="field col-12 md:col-3">
                        <label className="field_label">
                       Ticket Number<span className="steric">*</span>
                        </label>
                        <InputText id="ticketNum" value={formik.values.ticketNum} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ "p-invalid": isFormFieldValid("ticketNum") }, "input_text")}  />
                        {getFormErrorMessage("ticketNum")}
                    </div>
                </div>
                <Button label="Search" className="p-button-primart ml-5 mt-5" type="submit"/>
                
                </form>
                <h4 className="ml-5 mt-5">Customer Note Report</h4>                <div className="card mx-5 p-0 border-noround">
           
                <div className="mt-3">
                    <DataTable value={tabledata} showGridlines resizableColumns columnResizeMode="fit" >
                        <Column header="#" field="Sno" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Zip Code" field="Zip" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Account" field="Account" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Store Type" field="StoreType" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large"}} />
                        <Column header="Contact Phone" field="Contact" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                    </DataTable>
                </div>
            </div>
            </div>

          
        </>
    );
};

export default Tickets;
