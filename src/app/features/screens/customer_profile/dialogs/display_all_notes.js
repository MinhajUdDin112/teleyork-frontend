import React from "react"; 
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";  
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
export default function DisplayAllNotesDialog({ notes }) { 
      const [globalFilterValue,setGlobalFilterValue]=useState(null) 
      const [noteFilterValue,setNoteFilterValue]=useState(null)
    console.log("notes is ", notes);   
    //Filter for Notes
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
         note: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
   });   
    //Global Filter on Notes Data by Posted By
    const onGlobalFilterValueChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };    
    const onNoteFilterValueChange=(e)=>{ 
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["note"].value = value;
        setFilters(_filters);
        setNoteFilterValue(value);   
    }
    const header=()=>{ 
         return(   
             <div className="flex flex-wrap justify-content-center">
            <InputText
            value={globalFilterValue}
            onChange={
                onGlobalFilterValueChange}
            className="w-15rem ml-4 mt-2"
            placeholder="Search By Posted By"
        />    
         <InputText
            value={noteFilterValue}
            onChange={
                onNoteFilterValueChange}
            className="w-15rem ml-4 mt-2"
            placeholder="Search By Note"
        />            
        </div> 
         )
    }
    return (
        <div>
            <DataTable value={notes}   
             filters={filters}
               globalFilterFields={["user.name"]}
              tableStyle={{ minWidth: "50rem" }}  
                 header={header}  
                 emptyMessage="No Note found."  
                 paginator 
                 rows={10}
               >     
                 <Column header="#" body={(rowData, rowIndex) =>{ 
                     
                      return( <span>{rowIndex.rowIndex + 1}</span>)}} />
    
                <Column field="note" header="Notes" />
                <Column field="noteType" header="Note Type" />
                <Column field="user.name" header="Posted By" />
                <Column
                    field="createdAt"
                    body={(rowData) => {
                        console.log(rowData);
                        let createdAt = new Date(rowData.createdAt);
                        console.log(
                            `${(createdAt.getMonth() + 1).toString().padStart(2, "0")}-${createdAt.getDate().toString().padStart(2, "0")}-${createdAt.getFullYear()} ${createdAt.getHours().toString().padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}:${createdAt
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`
                        );
                        return (
                            <span>{`${(createdAt.getMonth() + 1).toString().padStart(2, "0")}-${createdAt.getDate().toString().padStart(2, "0")}-${createdAt.getFullYear()} ${createdAt.getHours().toString().padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}:${createdAt
                                .getSeconds()
                                .toString()
                                .padStart(2, "0")}`}</span>
                        );
                    }}
                    header="Posted Date Time"
                />
            </DataTable>
        </div>
    );
}
