import React,{useState} from "react"; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
export default function PostPaidPhoneNonLifeline(){  
    const [postPaidPhoneNonLifeline,setPostPaidPhoneNonLifeline]=useState([{stat:"1",count:5}])
    return( 
        <DataTable value={postPaidPhoneNonLifeline}>
        <Column field="stat" header="Stat"></Column>
        <Column field="count" header="Count"></Column>
    </DataTable>
    )
}