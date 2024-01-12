import React, { useState } from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import 'primeicons/primeicons.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const BillingConfiguration = () => {

    const [newDiscount, setNewDiscount] = useState(false)
    // const validationSchema = Yup.object().shape({
    //     fileType: Yup.string().required("Please select File Type"),
    // });
    const formik = useFormik({
        // validationSchema: validationSchema,
        initialValues: {
            billingModel: "",
            inventoryType: "",
            oneTimeCharge: "",
            monthlyCharge: "",
            dueDate: "",
            paymentMethod: "",
            discount:"",
            discountName:"",
            discountPrice:""
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                billingModel: formik.values.billingModel,
                inventoryType: formik.values.inventoryType,
                oneTimeCharge: formik.values.oneTimeCharge,
                monthlyCharge: formik.values.monthlyCharge,
                dueDate: formik.values.dueDate,
                paymentMethod: formik.values.paymentMethod,
            };
            try {
                const response = await Axios.post(`${BASE_URL}`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    // setFileData(response?.data?.data);
                    console.log("Data is", response?.data?.data);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        },
    });

    const optionsForBillingmodel = [
        { label: "Select Billing Model", value: "" },
        { label: "Prepaid", value: "Prepaid" },
        { label: "Postpaid", value: "Postpaid" },
        { label: "ACP", value: "Acp" },
    ];
    const optionsForInventoryType = [
        { label: "Select Inventory Type", value: "" },
        { label: "Sim Card", value: "sim" },
        { label: "Tablet", value: "tablet" },
        { label: "Cell Phone", value: "cell" },
    ];
    const optionsForMonthlyPlan = [
        { label: "Select Plan", value: "" },
        { label: "Plan 1", value: "sim2" },
        { label: "Plan 2", value: "tablet2" },
        { label: "Plan 3", value: "cell2" },
        { label: "Plan 4", value: "sim1" },
        { label: "Plan 5", value: "tablet1" },
        { label: "Plan 6", value: "cell1" },
    ];
    const optionsForPayment = [
        { label: "Select Payment Method", value: "" },
        { label: "Cash", value: "Cash" },
        { label: "Credit Card", value: "Credit" },
        { label: "Money Order", value: "Money" },
        { label: "E-Check", value: "Check2" },
        { label: "Skip Payment", value: "Skip" },
    ];

     function addDiscount  () {
        setNewDiscount(true);
    }

    return (
        <>
            <div className="card">
                <h3 className="font-bold mb-3">Billing Configuration</h3>
                <div className=" card flex flex-column " >
                <div className=" p-fluid formgrid grid flex ">
                   
                   <div className="mt-3 field col-12 md:col-3 ">
                       <label className="field_label mb-2 text-md">Billing Model</label>
                       <Dropdown
                           className="w-21rem"
                           id="billingModel"
                           options={optionsForBillingmodel}
                           value={formik.values.billingModel}
                           onChange={(e) => {
                               formik.setFieldValue("billingModel", e.value);
                               formik.handleChange(e);
                           }}
                           onBlur={formik.handleBlur}
                       />
                       {formik.touched.billingModel && formik.errors.billingModel ? (
                           <p className="mt-2 ml-2" style={{ color: "red" }}>
                               {formik.errors.billingModel}
                           </p>
                       ) : null}
                   </div>

                   <div className="mt-3 field col-12 md:col-3  ">
                       <label className="field_label mb-2 text-md">Inventory Type</label>
                       <Dropdown
                           className="w-21rem"
                           id="inventoryType"
                           options={optionsForInventoryType}
                           value={formik.values.inventoryType}
                           onChange={(e) => {
                               formik.setFieldValue("inventoryType", e.value);
                               formik.handleChange(e);
                           }}
                           onBlur={formik.handleBlur}
                       />
                       {formik.touched.inventoryType && formik.errors.inventoryType ? (
                           <p className="mt-2 ml-2" style={{ color: "red" }}>
                               {formik.errors.inventoryType}
                           </p>
                       ) : null}
                   </div>
                  
               <div className="field col-12 md:col-3 mt-3">
                   <label className="field_label text-md">One Time Charges</label>
                   <InputText id="oneTimeCharge" placeholder="Enter One Time Charges" value={formik.values.oneTimeCharge} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
               </div>

               <div className="mt-3 field col-12 md:col-3  ">
                       <label className="field_label mb-2 text-md">Monthly Charges</label>
                       <Dropdown
                           className="w-21rem"
                           id="monthlyCharge"
                           options={optionsForMonthlyPlan}
                           value={formik.values.monthlyCharge}
                           onChange={(e) => {
                               formik.setFieldValue("monthlyCharge", e.value);
                               formik.handleChange(e);
                           }}
                           onBlur={formik.handleBlur}
                       />
                       {formik.touched.monthlyCharge && formik.errors.monthlyCharge ? (
                           <p className="mt-2 ml-2" style={{ color: "red" }}>
                               {formik.errors.monthlyCharge}
                           </p>
                       ) : null}
                   </div>

                   <div className="field col-12 md:col-3 mt-3">
                   <label className="field_label text-md">Due days</label>
                   <InputText id="dueDate" placeholder="Ennter No of days" value={formik.values.dueDate} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
               </div>

               <div className="mt-3 field col-12 md:col-3  ">
                       <label className="field_label mb-2 text-md">Payment Method</label>
                       <Dropdown
                           className="w-21rem"
                           id="paymentMethod"
                           options={optionsForPayment}
                           value={formik.values.paymentMethod}
                           onChange={(e) => {
                               formik.setFieldValue("paymentMethod", e.value);
                               formik.handleChange(e);
                           }}
                           onBlur={formik.handleBlur}
                       />
                       {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                           <p className="mt-2 ml-2" style={{ color: "red" }}>
                               {formik.errors.paymentMethod}
                           </p>
                       ) : null}
                   </div>
                   <div className="mt-3 field col-12 md:col-3  ">
                       <label className="field_label mb-2 text-md">Select Discount OR <span onClick={addDiscount} style={{color:'blue',cursor:'pointer'}}>Add Discount</span> </label>
                       <Dropdown
                           className="w-21rem"
                           id="discount"
                           options={optionsForPayment}
                           value={formik.values.discount}
                           onChange={(e) => {
                               formik.setFieldValue("discount", e.value);
                               formik.handleChange(e);
                           }}
                           onBlur={formik.handleBlur}
                       />
                   </div>

                 

               </div>
               {
                newDiscount ? <>
               <div className="  mt-2 font-bold text-lg">Discount:</div>
                   <div className="p-fluid formgrid grid mt-3" style={{alignItems:'center'}}>
                       <div className="field col-12 md:col-3">
                           <label className="field_label mb-2 text-lg">
                               Nmae 
                           </label>
                           <InputText id="discountName" value={formik.values.discountName} onChange={formik.handleChange}  />
                          
                       </div>
                       <div className="field col-12 md:col-3">
                           <label className="field_label mb-2 text-lg"> Amount </label>
                           <InputText id="discountAmount" value={formik.values.discountAmount} onChange={formik.handleChange}  />
                       </div>
                       <i className="pi pi-check ml-2" style={{ color: 'green', fontSize:'24px' }}></i>
                       </div>
                </>
                :""
               }
              
                </div>
              
                </div>
           
        </>
    );
};

export default BillingConfiguration;
