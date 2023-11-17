import React from "react"; 
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import ClearEsnData from "./clear_esn_sim_report";
export default function ClearEsnSim({setPage}) {      
    function handleClearEsnSimSubmit() {
        console.log("form will submit here");
    }
    const formik = useFormik({
        initialValues: {
        
            esnsimid: "",
          
        },
    });
    return (
        <Card>
        

            <div className=" flex justify-content-around flex-wrap">
                <h4 className="card" style={{ width: "100%" }}>
                Clear ESN/SIM
                </h4>   
             
                <div className="card"  style={{ width: "28em", marginBottom: "20px", marginTop: "33px" }}>
                    <h6> Type - 1 </h6>
                    <h6>ESN/SIM</h6>
                    <div>
                        <InputTextarea type="text" value={formik.values.esnsimid} onChange={formik.handleChange} name="esnsimid" className="w-full md:w-100%" placeholder="ESN/SIM" />
                        <p>
                        Please Enter ESN/SIM By New Line, Use standard ESN/SIM format <br />
                            Ex: 98700000 or 2684354601010480000000000{" "}
                        </p>
                    </div>
                    <form
                        style={{ marginTop: "45px" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Button onClick={handleClearEsnSimSubmit} label="Submit" style={{ marginTop: "15px", marginLeft: "50%", transform: "translate(-50%)" }} />
                    </form>
                </div>
                <div className="card" style={{ width: "28em", marginBottom: "20px", marginTop: "33px" }}>
                    <h6> Type - 2 </h6>
                    <div className="flex justify-content-left" style={{ marginTop: "42px" }}>
                        <FileUpload mode="basic" name="Choose " url="" accept="image/*" maxFileSize={1000000} />
                    </div>

                    <div>
                        <h6 style={{ marginTop: "33px" }}>
                            <strong>Header :</strong> ESN/SIM <strong>(Download Sample File)</strong>
                        </h6>
                    </div>
                </div> 
               
            </div>   
            <ClearEsnData setPage={setPage}/>
        </Card>
    );
}
