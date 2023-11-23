import React from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from "primereact/card";
import DeactivateMdnData from "./deactivate_mdn_report";
import { carrierdisconnect, disconnectreasons, makeabbchildasparent, nlad, vcaredisconnect } from "../asset";
import { Dropdown } from "primereact/dropdown";
export default function ClearMdn({ setPage }) {
    function handleDeactivateMdnSubmit() {
        console.log("form will submit here");
    }
    const formik = useFormik({
        initialValues: {
            mdn: "", 
            disconnectreason:"", 
             vcaredisconnect:"",   
             carrierdisconnect:"",
             nlad:"", 
             abbacpchildtoparent:''
        },
    });
    return (
        <Card>
            <div className=" flex justify-content-around flex-wrap">
                <h4 className="card" style={{ width: "100%" }}>
                    Deactivate MDN
                </h4>

                <div className="card" style={{ width: "28em", marginBottom: "20px", marginTop: "33px" }}>
                    <h6> Type - 1 </h6>             
                    <h6>Disconnect Reason</h6>
                    <Dropdown className="w-full" options={disconnectreasons} placeholder="Select An Option" value={formik.values.disconnectreason} onChange={(e)=>{ formik.setFieldValue("disconnectreason",e.value)}}/>  
                    <h6>Vcare Disconnect</h6>
                    <Dropdown className="w-full" options={vcaredisconnect} placeholder="Select An Option" value={formik.values.vcaredisconnect} onChange={(e)=>{ formik.setFieldValue("vcaredisconnect",e.value)}}/>  
                    <h6>Carrier Disconnect</h6>
                    <Dropdown className="w-full" options={carrierdisconnect} placeholder="Select An Option" value={formik.values.carrierdisconnect} onChange={(e)=>{ formik.setFieldValue("carrierdisconnect",e.value)}}/>  
                    <h6>Carrier Disconnect</h6>
                    <Dropdown className="w-full" options={carrierdisconnect} placeholder="Select An Option" value={formik.values.carrierdisconnect} onChange={(e)=>{ formik.setFieldValue("carrierdisconnect",e.value)}}/>  
                    <h6>NLAD (De-Enroll Type)</h6>
                    <Dropdown className="w-full" options={nlad} placeholder="Select An Option" value={formik.values.nlad} onChange={(e)=>{ formik.setFieldValue("nlad",e.value)}}/>  
                    <h6>Make EBB/ACP Child As Parent</h6>
                    <Dropdown className="w-full" options={makeabbchildasparent} placeholder="Select An Option" value={formik.values.makeabbchildasparent} onChange={(e)=>{ formik.setFieldValue("makeabbchildasparent",e.value)}}/>  
                    
                    
                      
                      <h6>MDN</h6>
                    <div>
                        <InputTextarea type="text" value={formik.values.mdn} onChange={formik.handleChange} name="mdn" className="w-full md:w-100%" placeholder="MDN" />
                        <p>
                            Please Enter MDN By New Line <br />
                            Ex:  <br/> 9850000000 <br/>8820000000
                        </p>
                    </div>
                    <form
                        style={{ marginTop: "45px" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Button onClick={handleDeactivateMdnSubmit} label="Submit" style={{ marginTop: "15px", marginLeft: "50%", transform: "translate(-50%)" }} />
                    </form>
                </div>
                <div className="card " style={{ width: "28em", marginBottom: "20px", marginTop: "33px" }}>
                    <h6> Type - 2 </h6>
                    <div className="flex justify-content-left" style={{ marginTop: "42px" }}>
                        <FileUpload mode="basic" name="Choose " url="" accept="image/*" maxFileSize={1000000} />
                    </div>

                    <div>
                        <h6 style={{ marginTop: "33px" }}>
                            <strong>Header :</strong> MDN, <span style={{ color: "royalblue" }}>Disconnect Reason ID(Numeric)</span>,Vcare Disconnect(Y/N),Carrier Disconnect(Y/N), <span style={{ color: "royalblue" }}>NLAD De-Enroll Type</span>,Make EBB/ACP Child As Parent{" "}
                            <strong>(Download Sample File)</strong>
                        </h6>
                    </div>
                </div>
            </div>
            <DeactivateMdnData setPage={setPage} />
        </Card>
    );
}
