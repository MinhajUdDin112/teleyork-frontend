import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react"; 
export default function DeviceReAssignReturnAgentBox(){ 
        const data=[{ }]
     return ( 
       <DataTable> 
         <Column header="Box ID"/>    
         <Column header="Tracking Number"/>  
         <Column header="BOX"/>  
         <Column header="Box Close Date"/>  
         <Column header="Tracking Date"/>  
         <Column header="Box Size"/>  
         <Column header="Box Re-Assign By"/>    
         <Column header="Box  Status"/> 
       </DataTable>
     )
}