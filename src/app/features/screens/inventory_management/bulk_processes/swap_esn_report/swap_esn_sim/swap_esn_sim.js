import React from "react"; 
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
import SwapEsnData from "./swap_esn_sim_report";
export default function SwapEsnSim({setPage}) {      
 
  
    return (
        <Card>
        

                <div className="card" style={{paddingBottom:"5px"}}><h5>Bulk Swap Esn</h5></div>
                  
                    <div className="flex flex-wrap justify-content-center align-items-center" style={{ marginTop: "42px" }}>
                        <FileUpload mode="basic" name="Choose " url="" accept="image/*" maxFileSize={1000000} />
                    </div>


                        <h6 style={{ marginTop: "33px" }}>
                            <strong>Header :</strong>  OLD ESN, New ESN,Store ID(Employee)<strong>(Download Sample File)</strong>
                        </h6>
                    
                 
                       <h5 style={{color:"red"}}><strong>Note:</strong> This is a two-step process. Once the file has been uploaded successfully, you will need to perform the second step by clicking on Swap ESN Batch Report  {`>`}{`>`} Send to Swap ESN.</h5>
            <SwapEsnData setPage={setPage}/>
        </Card>
    );
}
