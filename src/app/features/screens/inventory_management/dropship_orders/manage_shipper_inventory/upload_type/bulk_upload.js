import React,{useState} from "react" 
import { Dropdown } from "primereact/dropdown"; 
import { Button } from "primereact/button";
export default function BulkUpload({permissions}){       
    const [includeOrders, setIncludeOrders] = useState("");  
    const includeordersoption = [
        { label: "Home Delivery", value: "homedelivery" },
        { label: "Shipment", value: "shipment" },
        { label: "Retailer Location", value: "retailerlocation" },
        { label: "Event(Taken Away)", value: "event" },
    ];    
    function handleSubmit(){ 

    }
    return( 
       <> 
           <div className="mt-8">
                <label style={{ display: "block" }}>Include Orders <span style={{color:"red"}}>*</span></label>

                <Dropdown
                    value={includeOrders}
                    options={includeordersoption}
                    onChange={(e) => {
                        setIncludeOrders(e.value);
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-4 w-full md:w-14rem"
                />
            </div>         
            <div style={{width:"100vw"}} className="mt-8"> 
                <Button disabled={!(permissions.isCreate)} style={{marginLeft:"50%",transform:"translate(-50%)"}} label="Submit"   onClick={handleSubmit} />
              </div>
        </>
    )
}