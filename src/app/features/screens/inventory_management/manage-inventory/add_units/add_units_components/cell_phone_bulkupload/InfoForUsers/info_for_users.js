import React from "react";
import { InfoForUsersGsmBulkUpload } from "./info_for_users_assets";

export default function InfoForUsers() {
    return (
        <>
            <p className="mt-8">
                <strong>Header:</strong>
                Device ID, Model ID, Device Retail Price, Wholesale Price, Activation Fee, PO#,BYOD(Y/N),#BOX , ACP Co-Pay Amount, ACP Device Reimbursement Amount (Download Sample File)
            </p>
            {InfoForUsersGsmBulkUpload.map((infoitem) => (
                <div className="flex flex-wrap justify-content-around mt-8">
                    <div style={{ width: "20%" }}>
                        <span>
                            {" "}
                            <strong>{infoitem.label}:</strong>
                        </span>
                    </div>
                    <div style={{ width: "60%" }} className="flex">
                        {" "}
                        <p>{infoitem.value}</p>
                    </div>
                </div>
            ))}
        </>
    );
}
