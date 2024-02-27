import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";  
import "./css/inventory_dashboard.css"
const BASE_URL=process.env.REACT_APP_BASE_URL
export default function SIMCompleteStockReport({unitType,billingModel}) {
    const loginRes = localStorage.getItem("userData"); 
    const parseLoginRes = JSON.parse(loginRes);
  const [freeInventory,setFreeInventory]=useState(0) 
  const [completeFreeInventory,setCompleteFreeInventory]=useState([])  
  const [usedInventory,setUsedInventory]=useState(0) 
  const [completeUsedInventory,setCompleteUsedInventory]=useState([])  
 const [completeUsedInventoryVisiblity,setCompleteUsedInventoryVisibility]=useState(false) 
 
 const [completeFreeInventoryVisiblity,setCompleteFreeInventoryVisibility]=useState(false)
    useEffect(() => {
       
             
                Axios.get(`${BASE_URL}/api/web/simInventory/getByBillModel?serviceProvider=${parseLoginRes.company}&UnitType=${unitType}&billingModel=${billingModel}&status=available`)
                    .then((resfree) => { 
                      
                        setFreeInventory(resfree.data.result.length) 
                        setCompleteFreeInventory(resfree.data.result)  
                          
                        
                    })
                    .catch((error) => {});
            
    },[unitType,billingModel]);  
     useEffect(()=>{
    Axios.get(`${BASE_URL}/api/web/simInventory/getByBillModel?serviceProvider=${parseLoginRes.company}&UnitType=${unitType}&billingModel=${billingModel}&status=inUse`)
    .then((resinuse) => {     
        setUsedInventory(resinuse.data.result.length) 
        setCompleteUsedInventory(resinuse.data.result) 
    })
    .catch((error) => {}); 
},[unitType,billingModel])
    return (
        <>
               <div className="flex flex-wrap flex-row maininventory  w-full justify-content-evenly"> 
                   <div className="inventory_module card" onClick={()=>{setCompleteFreeInventoryVisibility(prev=>!prev)}}> 
                       <h1>Free</h1> 
                        <p>{freeInventory}</p>
                   </div> 
                   <div className="inventory_module card" onClick={()=>{setCompleteUsedInventoryVisibility(prev=>!prev)}}> 
                       <h1>In Use</h1> 
                        <p>{usedInventory}</p>
                   </div> 
                   <div className="inventory_module card"> 
                       <h1>Stock</h1> 
                        <p>{usedInventory+freeInventory}</p>
                   </div>
                </div>  
            <Dialog 
              draggable={false}
                header="Free Inventories"
                visible={completeFreeInventoryVisiblity}
                onHide={() => {
                    setCompleteFreeInventoryVisibility(false);
                }}
                style={{ overflowX: "auto" }}
            >
                <DataTable  tableStyle={{ minWidth: "60rem" }} value={completeFreeInventory} stripedRows>
                    <Column field="SimNumber" header="SimNumber" />

                    <Column field="box" header="Box" />

                    <Column field="Model" header="Model" />
                </DataTable>
            </Dialog>   
            <Dialog 
              draggable={false}
                header="Used Inventories"
                visible={completeUsedInventoryVisiblity}
                onHide={() => {
                    setCompleteUsedInventoryVisibility(false);
                }}
                style={{ overflowX: "auto" }}
            >
                <DataTable  tableStyle={{ minWidth: "60rem" }} value={completeUsedInventory} stripedRows>
                    <Column field="SimNumber" header="SimNumber" />

                    <Column field="box" header="Box" />

                    <Column field="Model" header="Model" />
                </DataTable>
            </Dialog>  
        </>
    );
}
