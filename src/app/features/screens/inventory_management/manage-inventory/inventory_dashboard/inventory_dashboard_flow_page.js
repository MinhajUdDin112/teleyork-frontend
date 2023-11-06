import React from "react"
import { Button } from "primereact/button";
import { Card } from "primereact/card";     
import GSMCompletedStockReport from "./complete_stock/gsm_report";
import CDMACompleteStockReport from "./complete_stock/cdma_report";
import SIMCompleteStockReport from "./complete_stock/sim_report"; 
import CDMAProvisionedStockReport from "./provisioned_stock/cdma_report"; 
import SIMProvisionedStockReport from "./provisioned_stock/sim_report";
export default function InventoryDashboard({setActiveComponent}){ 
    return ( 
        <Card>
            <Button
                label="Back"
                style={{ marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                onClick={() => {
                    setActiveComponent("");
                }}
            />                 
             <h5 className="mt-4 w-full card">Complete Stock Report </h5>   
              <div className="flex justify-content-around flex-wrap">    
               
                  <div className="w-16rem mt-4"> 
                   <CDMACompleteStockReport/>
                  </div> 
                  <div className="w-16rem mt-4"> 
                    <SIMCompleteStockReport/>
                  </div> 
                  <div className="w-16rem mt-4"> 
                  <GSMCompletedStockReport/>
                  </div>
              </div>
              <h5 className="mt-4 w-full card">Provisioned Stock Report </h5>   
              <div className="flex justify-content-around flex-wrap">    
               
                  <div className="w-16rem mt-2"> 
                   <CDMAProvisionedStockReport/>
                  </div> 
                  <div className="w-16rem mt-2"> 
                    <SIMProvisionedStockReport/>
                  </div> 
              </div>
            </Card>
    )
}