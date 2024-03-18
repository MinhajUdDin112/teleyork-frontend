import React,{useEffect,useState} from "react";
import { Button } from "primereact/button";
import { masteragent,retailer,distributor,emptyretailer,emptydistributor,currentstatus,ordershippingmode,carrier } from "../assets"; 
import { Dropdown } from "primereact/dropdown"; 
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { useFormik } from "formik";
import { Column } from "primereact/column";
export default function ManageStandingOrder({setHideBackInventoryButton, setActivePhoneRequestComponent }) {
    setHideBackInventoryButton(true)  
    const [onsearchdata, setOnSearchData] = useState([]);  
    function handleSearch() {
        //Api call goes here
    }   
    const formik = useFormik({
        initialValues: {
            masteragent: "",
            retailer: "",
            distributor: "",
            carrier: "",
            currentstatus: "all",
            ordershippingmode: "all",
            purchaseorderno: "",
        },
    });
    useEffect(()=>{ 
     return ()=>{ 
       setHideBackInventoryButton(false)
     }
    },[]) 
    return ( 
        <div>
        <div className="card">
            <Button
                label="Back"
                onClick={() => {
                    setActivePhoneRequestComponent("");
                }}
                style={{ padding: "10px", paddingLeft: "15px", paddingRight: "15px" }}
            />
            <p className="mt-4" style={{ fontSize: "16px" }}>
              Manage Standing Order
            </p>
        </div>   
           
          <div>
                    <div className="card mt-4 p-4">
                        <p>Approve Phone Request</p>
                    </div>
                    <div className="card ">
                        <div className="flex flex-wrap justify-content-around">
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Master Agent:
                                </label>
                                <Dropdown value={formik.values.masteragent} options={masteragent} onChange={(e) => formik.setFieldValue("masteragent", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>

                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Distributor:
                                </label>
                                <Dropdown value={formik.values.distributor} options={formik.values.masteragent !== "" ? distributor : emptydistributor} onChange={(e) => formik.setFieldValue("distributor", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Retailer:
                                </label>
                                <Dropdown value={formik.values.retailer} options={formik.values.distributor !== "" ? retailer : emptyretailer} onChange={(e) => formik.setFieldValue("retailer", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Order Shipping Mode:
                                </label>
                                <Dropdown defaultValue="all" value={formik.values.ordershippingmode} options={ordershippingmode} onChange={(e) => formik.setFieldValue("ordershippingmode", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Current Status:
                                </label>
                                <Dropdown defaultValue="all" value={formik.values.currentstatus} options={currentstatus} onChange={(e) => formik.setFieldValue("currentstatus", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Search By Purchase Order No:
                                </label>
                                <InputText value={formik.values.purchaseorderno} onChange={(e) => formik.setFieldValue("purchaseorderno", e.value)} className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Carrier:
                                </label>
                                <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-content-center">
                            <Button label="Submit" onClick={handleSearch} />
                        </div>
                        <div className="flex flex-wrap justify-content-between">
                        <h5 className="mt-4"> Total Record: {onsearchdata.length}</h5>  
                        <h5 style={{color:"royalblue",cursor:"pointer"}} onClick={()=>{ 
                                 setActivePhoneRequestComponent("AddStandingOrder")
                        }}>Add Standing Order</h5>
                        </div>    
                         <div style={{overflowX:"auto"}}>
                        <DataTable className="mt-4" style={{minWidth:"3200px"}}>  
                        <Column header="SNo#"/> 
                        <Column header="Master Agent"/>  
                        <Column header="Distributor Agent"/>   
                        <Column header="Retailer Name"/>   
                        <Column header="Purchase Order Number"/>  
                        <Column header="Phone Type"/>   
                        <Column header="Carrier"/>   
                        <Column header="Phone Request Quantity"/>  
                        <Column header="Phone Request Date"/>   
                        <Column header="Phone Approval Quantity"/>   
                        <Column header="Phone Approval Date"/>   
                        <Column header="Tracking Number"/>   
                        <Column header="Mailing Address"/>   
                        <Column header="Order Shipping Mode"/>    
                        <Column header="Order Shipping Mode"/>    
                        <Column header="Option"/>  
                         </DataTable>      
                             </div>
                    </div>
                </div>
                  
        </div>
    )  
   
}
