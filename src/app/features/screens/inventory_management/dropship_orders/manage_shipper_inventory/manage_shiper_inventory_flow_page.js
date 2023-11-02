import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import AcpSingleUpload from "./upload_type/single_upload";
import AcpBulkUpload from "./upload_type/bulk_upload";
export default function ManageShipperInventoryFlowPage() {
    const [esnsimType, setEsnsimType] = useState(null);
    const [selectedUpload, setSelectedUpload] = useState(null);
    const uploadoptions = [
        { label: "Single Unit", value: "singleunit" },
        { label: "Bulk Upload", value: "bulkupload" },
    ];
    const options2 = [
        { label: "Acp Order", value: "AcpOrder" },
        { label: "Acp Sim Order", value: "AcpSimOrder" },
        { label: "Acp Phone Order", value: "AcpPhoneOrder" },
        { label: "Acp Hotspot Order", value: "AcpHotspotOrder" },
    ];
    return (
        <div>
            <div className=" card flex flex-wrap justify-content-around">
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        ESN/SIM Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <Dropdown value={esnsimType} onChange={(e) => setEsnsimType(e.value)} options={options2} optionLabel="label" placeholder="--Select--" className="mt-4 w-full md:w-14rem" />
                </div>
                <div className="mt-8">
                    <label style={{ display: "block" }}>
                        Upload Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <Dropdown value={selectedUpload} onChange={(e) => setSelectedUpload(e.value)} options={uploadoptions} optionLabel="label" placeholder="--Select--" className="mt-4 w-full md:w-14rem" />
                </div>
                   { 
                       selectedUpload !== null && esnsimType !==null  
                       ?selectedUpload === "singleunit"?<AcpSingleUpload/>:<AcpBulkUpload/> :undefined 
                     
                     }
             </div>
        </div>
    );
}
