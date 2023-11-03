import React from "react";
export default function InfoForUsers() {
    return (
        <>
            <p className="mt-4">
                <strong>Notes:</strong>
                ESN, Model ID , MSL/PUK,PUK2, PO#, BOX #, Wholesale Price, Selling Price, UICCID, Zipcode, Activation Fee , BYOD(Y/N),Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Device Retail Price
            </p>
            <p className="mt-4">
                <strong>Notes:-</strong>
                Please select carrier to download the sample file
            </p>
            <div className="flex flex-wrap justify-content-around">
                 <span className="w-15rem"> ESN/SIM</span>
                <p className="w-80rem">
                    ESN: Equipment Serial Number; uniquely identifies equipment and is embedded electronically by the manufacturer. SIM: Subscriber Identity Module; a ''smart'' card installed or inserted into a mobile device containing all subscriber-related data. This facilitates a phone call from
                    any valid mobile device since the subscriber data is used to complete the call rather than the telephone internal serial number. The SIM number is 15 digits. Motorola phones only have 14 digits so add the number 0 at the end.{" "}
                </p>  
            </div>
        </>
    );
}
