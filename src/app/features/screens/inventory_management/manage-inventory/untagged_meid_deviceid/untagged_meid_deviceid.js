import React from "react";
import Untagged_MEID_DEVICEID_Report from "./untagged_meid_deviceid_report";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
export default function Untagged_MEID_DEVICEID({ setActiveComponent }) {
    function handleUntagged_MEID_DEVICEID_Submit() {
        console.log("form will submit here");
    }
    const formik = useFormik({
        initialValues: {
        
            meiddeviceid: "",
          
        },
    });
    return (
        <Card>
            <Button className="card"  
             
                label="Back"
                style={{background:"royalblue", position: "absolute", padding:"15px",paddingTop:"10px",paddingBottom:"10px",marginLeft: "25px", fontSize: "16px", marginTop: "5px" }}
                onClick={() => {
                    setActiveComponent("");
                }}
            />

            <div className=" flex justify-content-around flex-wrap">
                <h4 className="card" style={{ width: "100%", marginTop: "90px" }}>
                    Untagged Device
                </h4>   
             
                <div className="card"  style={{ width: "28em", marginBottom: "20px", marginTop: "33px" }}>
                    <h6> Type - 1 </h6>
                    <h6>Device/EMEI</h6>
                    <div>
                        <InputTextarea type="text" value={formik.values.meiddeviceid} onChange={formik.handleChange} name="meiddeviceid" className="w-full md:w-100%" placeholder="Device" />
                        <p>
                        Please Enter Device By New Line, Use standard DEVICE format <br />
                            Ex: 98700000 or 2684354601010480000000000{" "}
                        </p>
                    </div>
                    <form
                        style={{ marginTop: "45px" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Button onClick={handleUntagged_MEID_DEVICEID_Submit} label="Submit" style={{ marginTop: "15px", marginLeft: "50%", transform: "translate(-50%)" }} />
                    </form>
                </div>
                <div className="card" style={{ width: "28em", marginBottom: "20px", marginTop: "33px" }}>
                    <h6> Type - 2 </h6>
                    <div className="flex justify-content-left" style={{ marginTop: "42px" }}>
                        <FileUpload mode="basic" name="Choose " url="" accept="image/*" maxFileSize={1000000} />
                    </div>

                    <div>
                        <h6 style={{ marginTop: "33px" }}>
                            <strong>Header :</strong> Device ID <strong>(Download Sample File)</strong>
                        </h6>
                    </div>
                </div> 
               
            </div>   
            <Untagged_MEID_DEVICEID_Report/>
        </Card>
    );
}
