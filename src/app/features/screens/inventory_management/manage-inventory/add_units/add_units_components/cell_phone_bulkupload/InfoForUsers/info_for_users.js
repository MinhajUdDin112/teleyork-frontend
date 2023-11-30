import React from "react";
import { InfoForUsersGsmBulkUpload } from "./info_for_users_assets";

export default function InfoForUsers() {
    return (
        <>
           
            {InfoForUsersGsmBulkUpload.map((infoitem) => (
                <div className="flex flex-wrap justify-content-around mt-8 card">
                    <div style={{ width: "20%" }}>
                        <span>
                            {" "}
                            <strong>{infoitem.label}:</strong>
                        </span>
                    </div>
                    <div style={{ width: "60%" }} className="flex card">
                        {" "}
                        <p>{infoitem.value}</p>
                    </div>
                </div>
            ))}
        </>
    );
}
