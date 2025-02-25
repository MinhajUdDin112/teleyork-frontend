import React, { useRef } from "react"; 
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";  
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Axios from "axios";
import { Toast } from "primereact/toast";
export default function DisplayAllHighPriorityNotes({setRefreshHighPriorityNotes,BASE_URL ,notes }) {  
     const toast=useRef() 
      const [globalFilterValue,setGlobalFilterValue]=useState(null) 
      const [noteFilterValue,setNoteFilterValue]=useState(null)
     
    //Filter for Notes
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
         note: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
         priority:{value:null,matchMode:FilterMatchMode.EQUALS}
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
     const [priorityFilterValue,setPriorityFilterValue]=useState(null)
    const onPriorityFilterValueChange=(e)=>{ 
        const value = e.value;
        let _filters = { ...filters };
        _filters["priority"].value = value;
        setFilters(_filters);
        setPriorityFilterValue(value); 
    }
    const header=()=>{ 
         return(   
             <div className="flex flex-wrap justify-content-center">
      
         <InputText
            value={noteFilterValue}
            onChange={
                onNoteFilterValueChange}
            className="w-15rem ml-4 mt-2"
            placeholder="Search By Note"
        />        
               
               <Dropdown value={priorityFilterValue}   className="w-15rem ml-4 mt-2"
               placeholder="Search By Priority"  options={[{label:"Highest",value:"highest"},{label:"High",value:"high"}]} onChange={onPriorityFilterValueChange}/>  
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
                     
                      return( <span>{rowIndex.rowIndex + 1}</span>) 
                      }} />
    
                <Column field="note" header="Notes" /> 
                <Column field="priority" header="Priority"/>
                <Column field="noteType" header="Note Type" />
                <Column field="user.name" header="Posted By" />
                <Column
                    field="createdAt"
                    body={(rowData) => {
                      
                        let createdAt = new Date(rowData.createdAt);
                      
                        return (
                            <span>{ChangeIsoDateToECT(rowData?.createdAt)}</span>
                        );
                    }}
                    header="Posted Date Time"
                />                 
                <Column  field="Actions" header="Actions"   body={(rowData)=>{ 
                    return( 
                         <div>
                        <Button
                        label="Resolve"
                        onClick={() => {
                                   Axios.post(`${BASE_URL}/api/web/notes/resolveNote`,{noteId:rowData?._id}).then(()=>{ 
                                    toast.current.show({ severity: "success", summary: "Info", detail: <p >Notes Resolved Successfully</p> });
                                    setRefreshHighPriorityNotes(prev=>!prev)
                                   }).catch(err=>{ 
                                    toast.current.show({ severity: "Error", summary: "Info", detail: <p>Notes Resolving Failed</p> });
                                   
                                   })
                        }}
                        className=" p-button-primary mr-2 ml-2 pt-1 pb-1"
                        text
                        raised
                    />  
                    </div>
                    )
                }} />
            </DataTable> 
             <Toast  ref={toast} />
        </div>
    );
}
function ChangeIsoDateToECT(date){ 
    // Given ISO formatted date/time
const isoDate = date;

// Convert ISO string to Date object
const utcDate = new Date(isoDate);

// Format the date according to Eastern Time Zone (EST/EDT)
const estTimeString = utcDate.toLocaleString("en-US", {
  timeZone: "America/New_York"
});
return(estTimeString)
}