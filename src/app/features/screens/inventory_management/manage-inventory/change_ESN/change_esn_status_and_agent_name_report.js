import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import React from "react" 
import { Button } from "primereact/button"
export default function Change_Esn_Status_And_Agent_Name_report(){ 
    let tabledata= [
          {
            "id": 1,
            "batch#": "2882113111",
            "uploadeddatetime": "2022-07-16 13:32:23",    
            "uploadedfilename":"Reassign_12332454.csv",
            "uploadedby": "Hamza", 
            "totalesns":"1", 
            "totalsuccessesns":"1", 
            "totalfailureesns":"1"
          },
          {
            "id": 2,
            "batch#": "288233111",
            "uploadeddatetime": "2022-06-16 13:32:23",    
            "uploadedfilename":"Reassign_12332434.csv",
            "uploadedby": "Hammad", 
            "totalesns":"11", 
            "totalsuccessesns":"10", 
            "totalfailureesns":"1"
          },
          {
            "id": 3,
            "batch#": "2882333111",
            "uploadeddatetime": "2022-05-16 13:32:23",    
            "uploadedfilename":"Reassign_12332437.csv",
            "uploadedby": "Hammad Ali", 
            "totalesns":"5", 
            "totalsuccessesns":"4", 
            "totalfailureesns":"1"
          }, 
 

          // Add more data objects as needed
        ]
      return( <div className="card">     
          <div className="flex flex-wrap justify-content-between"> 
            <div>   
                <h5 style={{position:"absolute",marginTop:"15px"}}> 
                    Search Result : {tabledata.length} 
                    </h5>  
                </div> 
                <div>   
                <Button
                     label="Change Esn Status And Agent Name Report "/>  
                </div> 
          </div>
        <DataTable className="mt-4" value={tabledata} tableStyle={{ minWidth: "1200px"}}  >
            <Column field="id" header="#"/>   
            <Column  field="batch#" header="Batch #"/>  
            <Column  field="uploadeddatetime" header="Uploaded Date Time"/>  
            <Column  field="uploadedfilename" header="Uploaded File Name"/>  
            <Column  field="uploadedby" header="Uploaded By"/>    
            <Column  field="totalesns" header="Total Esns"/>     
            <Column  field="totalsuccessesns" header="Total Success Esns"/>  
            <Column  field="totalfailureesns" header="Total Failure Esns"/> 
        </DataTable> 
        </div>
      )

}