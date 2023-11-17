import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import React from "react" 
import { Button } from "primereact/button"
export default function SwapEsnData({setPage}){ 
    let tabledata= [
         
          // Add more data objects as needed
        ]
      return( <div className="card">     
        {   tabledata.length !== 0 ? 
        <div>
          <div className=" mt-4 flex flex-wrap justify-content-between"> 
            <div>   
                <h5 style={{position:"absolute",marginTop:"15px"}}> 
                    Search Result : {tabledata.length} 
                    </h5>  
                </div> 
                <div>   
                <Button
                     label="Swap ESN/SIM Report " onClick={()=>{ 
                      setPage(1)
                     }}/>  
                </div> 
          </div>
        <DataTable className="mt-4" value={tabledata} tableStyle={{ minWidth: "1000px"}}  >
            <Column field="id" header="ID"/>   
            <Column  field="batchname" header="Batch Name"/>  
            <Column  field="uploadedon" header="Uploaded On"/>  
            <Column  field="uploadedby" header="Uploaded By"/>  
            <Column  field="totalrecords" header="Total Records"/>    
            <Column  field="uploadedsuccess" header="Uploaded Success"/>     
            <Column  field="uploadedfailure" header="Uploaded Failure"/> 
        </DataTable> </div>:undefined  
} 
        </div>
      )

}