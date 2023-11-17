import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import React from "react" 
import { Button } from "primereact/button"
export default function ClearEsnData({setPage}){ 
    let tabledata= [
          {
            "id": 1,
            "batchname": "23233111",
            "uploadedon": "2022-09-16 13:32:23",
            "uploadedby": "Yogendra Pundir", 
            "totalrecords":"14", 
            "uploadedsuccess":"14", 
            "uploadedfailure":"0"
          },
          {
            "id": 2,
            "batchname": "288233111",
            "uploadedon": "2022-03-16 13:32:23",
            "uploadedby": "Hammad", 
            "totalrecords":"11", 
            "uploadedsuccess":"11", 
            "uploadedfailure":"1"
          },
          {
            "id": 3,
            "batchname": "298233111",
            "uploadedon": "2022-04-16 13:32:23",
            "uploadedby": "Ali", 
            "totalrecords":"1", 
            "uploadedsuccess":"1", 
            "uploadedfailure":"1"
          }, 
 

          // Add more data objects as needed
        ]
      return( <div className="card">     
          <div className=" mt-4 flex flex-wrap justify-content-between"> 
            <div>   
                <h5 style={{position:"absolute",marginTop:"15px"}}> 
                    Search Result : {tabledata.length} 
                    </h5>  
                </div> 
                <div>   
                <Button
                     label="Clear ESN/SIM Report " onClick={()=>{ 
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
        </DataTable> 
        </div>
      )

}