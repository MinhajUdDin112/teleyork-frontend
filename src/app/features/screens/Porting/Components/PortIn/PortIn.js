import React, { useState } from "react" 
import "./css/PortIn.css"
import { Dialog } from "primereact/dialog"
import ChangeMSISDN from "./dialogs/ChangeMSISDN"
import PortInHistory from "./components/PortInHistory"
export default function PortIn({currentSelected}){ 
    const[changeMSISDNDialogVisibility,setChangeMSISDNDialogVisibility] =useState(false)
    return ( 
        <div className="mt-4">
        <h1 className="portin-header">Port In</h1> 
          <div className="flex flex-wrap flex-row justify-content-end">  
          <button className="submit-buttonmsisdn ml-2" onClick={()=>{ 
                setChangeMSISDNDialogVisibility(prev=>!prev)
               }} >  
                Change MSISDIN
              </button>
            

          </div> 
           <Dialog  className="msisdndialog" header="Change MSISDN" visible={changeMSISDNDialogVisibility} onHide={()=>{ 
            setChangeMSISDNDialogVisibility(prev=>!prev)
           }}  > 
             <ChangeMSISDN currentSelected={currentSelected} setChangeMSISDNDialogVisibility={setChangeMSISDNDialogVisibility}/>
           </Dialog>        
              <PortInHistory currentSelected={currentSelected}/>
          </div>
    )
}