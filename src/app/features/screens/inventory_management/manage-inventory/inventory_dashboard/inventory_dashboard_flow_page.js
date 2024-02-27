import React,{useState,useEffect} from "react";
import { Button } from "primereact/button"; 
import * as Yup from "yup"; 
import { useFormik } from "formik"; 
import Axios from "axios";
import { Dropdown } from "primereact/dropdown"; 
import CellPhoneCompletedStockReport from "./complete_stock/cell_phone_report";
import TabletCompleteStockReport from "./complete_stock/tablet_report";
import SIMCompleteStockReport from "./complete_stock/sim_report";
//import TabletProvisionedStockReport from "./provisioned_stock/tablet_report";
//import SIMProvisionedStockReport from "./provisioned_stock/sim_report";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
export default function InventoryDashboard({ setActiveComponent }) {
    const validationSchema = Yup.object().shape({
       
    });
    const formik = useFormik({
        initialValues: {
            unit: "",
            billingModel:""
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
           
        },
    });    
    const [unitOptions,setUnitOptions]=useState([])
    const [billingModelList,setBillingModelList]=useState([]) 
   
    useEffect(()=>{ 
        Axios.get(`${BASE_URL}/api/inventoryType/all?serviceProvider=${parseLoginRes?.company}`)
        .then((res) => {
            setUnitOptions(res?.data?.data)
        })
        .catch((err) => {});  
        Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`)
        .then((res) => {
            setBillingModelList(res?.data?.data);
        })
        .catch((err) => {});
     },[])
    return (
        <>
            <Button
                label="Back"
                style={{ marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                onClick={() => {
                    setActiveComponent("");
                }}
            />
          {/*  <h5 className="mt-4 w-full card">Complete Stock Report </h5>   */}         
          <div className="flex flex-wrap mb-3  justify-content-around">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0 ">
                            Inventory Type <span style={{ color: "red" }}>*</span>  
                             
                               
                                
                        </p>
                        <Dropdown optionLabel="inventoryType" optionValue="inventoryType" value={formik.values.unit} name="unit" options={unitOptions} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
                    </div>  
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Billing Model <span style={{ color: "red" }}>*</span>       

                        </p>
                        <Dropdown value={formik.values.billingModel} name="billingModel" optionLabel="billingModel" optionValue="billingModel" options={billingModelList} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
                    </div>  
                    </div>
            <div className="flex justify-content-around flex-wrap">
               
                    <SIMCompleteStockReport unitType={formik.values.unit} billingModel={formik.values.billingModel}  />
               
               
            </div>
            {/* <h5 className="mt-4 w-full card">Provisioned Stock Report </h5>   
              <div className="flex justify-content-around flex-wrap card" >    
               
                  <div className="w-20rem mt-2 card"> 
                   <TabletProvisionedStockReport/>
                  </div> 
                  <div className="w-20rem mt-2 card"> 
                    <SIMProvisionedStockReport/>
                  </div> 
              </div>      */}
        </>
    );
}
