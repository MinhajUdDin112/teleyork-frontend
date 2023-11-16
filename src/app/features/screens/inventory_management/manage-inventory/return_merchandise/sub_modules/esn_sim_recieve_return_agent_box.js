import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react"; 
export default function EsnSimReceiveReturnAgentBox(){ 
        const data=[{ }]
     return ( 
       <DataTable> 
         <Column header="Box ID"/>    
         <Column header="Tracking Number"/>  
         <Column header="BOX Created By"/>  
         <Column header="Box Received By"/>  
         <Column header="Tracking Date"/>  
         <Column header="Box Size"/>  
         <Column header="Received Phone"/>    
         <Column header="Box  Status"/> 
       </DataTable>
     )
}