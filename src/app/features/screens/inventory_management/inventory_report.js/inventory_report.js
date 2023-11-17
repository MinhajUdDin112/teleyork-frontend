import { Card } from "primereact/card";
import React from "react"; 
export default function InventoryReport() 
{ 
     
     return (   
          <Card>
         <div className="flex flex-wrap justify-content-around " style={{width:'100%'}}>  
               <div className="card " style={{width:'420px'}}> 
                  <h6 >ICCID Inventory Reports</h6>
               </div>  
               <div className="card w-100rem" style={{width:'420px'}}> 
               <h6>IMEI Inventory Reports</h6> 
               </div>
         </div> 
         </Card>
     )
}