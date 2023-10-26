import React ,{useState} from "react"  
import { Button } from "primereact/button";
import SingleDeviceRe_Assign from "./single_device_reassign";
import SingleInventoryRe_Assign from "./single_inventory_reassign";
export default function AdjustmentFlowPage(){ 
    let [showMain,setShowMain]=useState(true)     
    let [showDeviceRe_Assign,setShowDeviceRe_Assign]=useState(false)
    let [showInventoryRe_Assign,setShowInventoryRe_Assign]=useState(false)
        return (       
            <div>  
               { showMain ? 
            <div className="flex justify-content-around flex-wrap">       
                <h6 style={{width:"100%"}}>Adjustments</h6>      
                   <Button label="Single Inventory Re-Assign" onClick={()=>{setShowMain(false);setShowInventoryRe_Assign(true);setShowDeviceRe_Assign(false)}} style={{width:"25rem",marginTop:"33px"}}/>    
                   <Button label="Single Device Re-Assign" onClick={()=>{setShowMain(false);setShowDeviceRe_Assign(true);setShowInventoryRe_Assign(false)}} style={{width:"25rem",marginTop:"33px"}}/>
           
            </div>   :showDeviceRe_Assign ? <SingleDeviceRe_Assign setShowInventoryRe_Assign={setShowInventoryRe_Assign} setShowDeviceRe_Assign={setShowDeviceRe_Assign} setShowMain={setShowMain}/> :<SingleInventoryRe_Assign setShowInventoryRe_Assign={setShowInventoryRe_Assign} setShowDeviceRe_Assign={setShowDeviceRe_Assign} setShowMain={setShowMain}/>
            }    
            </div>
        )
}