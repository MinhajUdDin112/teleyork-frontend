import React,{useState} from "react"; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
export default function SimOnly(){  
    const [simOnly,setSimOnly]=useState([{stat:"1",count:5}])
    return( 
        <DataTable value={simOnly}>
        <Column field="stat" header="Stat"></Column>
        <Column field="count" header="Count"></Column>
    </DataTable>
    )
}