import React from "react"
import { Button } from "primereact/button";
import { Card } from "primereact/card";     
import CellPhoneCompletedStockReport from "./complete_stock/cell_phone_report";
import TabletCompleteStockReport from "./complete_stock/tablet_report";
import SIMCompleteStockReport from "./complete_stock/sim_report"; 
import TabletProvisionedStockReport from "./provisioned_stock/tablet_report"; 
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
              <div className="flex justify-content-around flex-wrap card">    
               
                  <div className="w-20rem mt-4 card"> 
                   <TabletCompleteStockReport/>
                  </div> 
                  <div className="w-20rem mt-4 card"> 
                    <SIMCompleteStockReport/>
                  </div> 
                  <div className="w-20rem mt-4 card"> 
                  <CellPhoneCompletedStockReport/>
                  </div>
              </div>
              <h5 className="mt-4 w-full card">Provisioned Stock Report </h5>   
              <div className="flex justify-content-around flex-wrap card" >    
               
                  <div className="w-20rem mt-2 card"> 
                   <TabletProvisionedStockReport/>
                  </div> 
                  <div className="w-20rem mt-2 card"> 
                    <SIMProvisionedStockReport/>
                  </div> 
              </div>
            </Card>
    )
}