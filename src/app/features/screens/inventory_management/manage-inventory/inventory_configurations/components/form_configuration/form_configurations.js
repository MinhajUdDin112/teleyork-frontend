import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import AddNewField from "./components/add_new_field"; 
import { Button } from "primereact/button";       
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column"; 
let objforfields=[]
export default function FormConfigure(){    
     console.log("Obj For Fields",objforfields)
    
   const [showAddNewField,setShowAddNewField]=useState(false)  
   const [refresh,setRefresh]=useState(false)   
    useEffect(()=>{ 
        return ()=>{ 
            objforfields=[]
        }
    },[])
    return( 
      <div>   
          <div className="flex flex-wrap flex-row  mt-4 justify-content-around"> 
              
             <div>  
                 
                  <Button onClick={()=>{setShowAddNewField(prev=>!prev) }}> 
                      Add Fields
                      <i     style={{fontSize:"16px",marginLeft:"10px"}} className="pi text-[orangered] w-[55px] h-[55px] cursor-pointer pi-plus"/>
                    </Button>
              </div>
          </div>      
              <Dialog  visible={showAddNewField}   style={{width:"80vw"}} onHide={()=>{setShowAddNewField(prev=>!prev);setRefresh(prev=>!prev)}} > 
                 <AddNewField objforfields={objforfields}/>
              </Dialog>  
              <DataTable value={objforfields} size="small" stripedRows resizableColumns emptyMessage="No Plan found." style={{ marginTop: "44px",width:"100%" }}>
                 <Column header="Label" field="label"/>
                <Column header="Field Type" field="type" />  
                <Column header="Required" field="type" body={(rowData)=>{ 
                     return (    
                         <> 
                          { 
                           rowData?.required === true ? "Required": "Not Required" 
                           }
                           </>
                     )
                 }} />  
                <Column header="DropDown Type" field="static" body={(rowData)=>{    
                    return(
                       <p>{rowData?.static === true ? "Static" :rowData?.static === false ? "Not Static":""}</p>
                    )
                    }}/>

                    <Column  header="DropDown Fields" body={(rowData)=>{ 
                       return ( 
                        <> 
                           {rowData?.fields?.map(item=>(<><p> 
                                 {item?.label}: {item?.value},
                             </p> 
                              
                              </>))}
                        </>
                       )
                    }} /> 
                    <Column header="Api Endpoint" field="apiendpoint"/>
                  </DataTable>
         </div>
    )
}