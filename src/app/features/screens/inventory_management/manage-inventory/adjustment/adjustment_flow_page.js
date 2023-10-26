import React ,{useState} from "react"  
import { Button } from "primereact/button";
import SingleDeviceRe_Assign from "./single_device_reassign";
import SingleInventoryRe_Assign from "./single_inventory_reassign";
export default function AdjustmentFlowPage({setActiveComponent}){ 
    let [showMain,setShowMain]=useState(true)     
    let [showDeviceRe_Assign,setShowDeviceRe_Assign]=useState(false)
    let [showInventoryRe_Assign,setShowInventoryRe_Assign]=useState(false)
        return (       
            <div >  
               { showMain ?    <div className="card">   
                 <Button label="Back" style={{position:"absolute",marginLeft:"25px",fontSize:"16px" ,marginTop:"0px"}} onClick={()=>{setActiveComponent("")}}/>
    
            <div className="flex justify-content-around flex-wrap" style={{marginTop:"90px"}}>       
                <h6 style={{width:"100%"}}>Adjustments</h6>      
                   <Button label="Single Inventory Re-Assign" onClick={()=>{setShowMain(false);setShowInventoryRe_Assign(true);setShowDeviceRe_Assign(false)}} style={{width:"25rem",marginTop:"33px"}}/>    
                   <Button label="Single Device Re-Assign" onClick={()=>{setShowMain(false);setShowDeviceRe_Assign(true);setShowInventoryRe_Assign(false)}} style={{width:"25rem",marginTop:"33px"}}/>
           
            </div>  </div> :showDeviceRe_Assign ? <SingleDeviceRe_Assign setShowInventoryRe_Assign={setShowInventoryRe_Assign} setShowDeviceRe_Assign={setShowDeviceRe_Assign} setShowMain={setShowMain}/> :<SingleInventoryRe_Assign setShowInventoryRe_Assign={setShowInventoryRe_Assign} setShowDeviceRe_Assign={setShowDeviceRe_Assign} setShowMain={setShowMain}/>
            }    
            </div>
        )
}