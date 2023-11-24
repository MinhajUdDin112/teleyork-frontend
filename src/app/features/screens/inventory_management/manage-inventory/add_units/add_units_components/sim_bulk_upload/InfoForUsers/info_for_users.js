import React from "react";
import { InfoForUsersAddAndAssignNonActivatedProvision, InfoForUserAddPreActivatedProvision, InfoForUsersAddAndActivate } from "./info_for_users_assets";

export default function InfoForUsers({ ProvisionType }) {
    console.log(InfoForUsersAddAndAssignNonActivatedProvision);
    return (
        <>
            {" "}
            {ProvisionType === "AddAndActivate" ? (
                <>
                    <p className="mt-4">
                        <strong>Notes:</strong>
                        SIM, MDN, Model ID (STANDARD/MICRO/NANO), MSL/PUK,Puk2, PO#,BOX#, Wholesale/Cost Price for SIM, Selling/Retail Price for SIM, UICCID, Zipcode, Activation Fee , MSID,Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Device Retail Price
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the sample file
                    </p>
                </>
            ) : ProvisionType === "AddStock" ? (
                <>
                    <p className="mt-4">
                        <strong>Notes:</strong>
                        SIM, UICCID, Box #, MSL/PUK, PUK2, Model ID (STANDARD/MICRO/NANO), Selling/Retail Price for SIM, Wholesale/Cost Price for SIM, Activation Fee, PO , Byod Portin Reserved,Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Selling/Retail Price for Device
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the sample file
                    </p>
                </>
            ) : ProvisionType === "AddPreActivated" ? (
                <>
                    <p className="mt-4">
                        <strong>Notes:</strong>
                        SIM, MDN, Model ID (STANDARD/MICRO/NANO), MSL/PUK,Puk2, PO#,BOX#, Wholesale/Cost Price for SIM, Selling/Retail Price for SIM, UICCID, Zipcode, Activation Fee , MSID,Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Device Retail Price
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the sample file
                    </p>
                </>
            ) :  ProvisionType === "AddAndAssignNonActive" ? (
                <>
                   
                </>
            ) :(
                <>
                    <p className="mt-4">
                        <strong>Notes:</strong>
                        SIM,Model ID (STANDARD/MICRO/NANO), MSL/PUK, PUK2, PO#, BOX#, Wholesale/Cost Price for SIM, Selling/Retail Price for SIM, UICCID, Activation Fee,Credit Amount , Byod Portin Reserved,Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Selling/Retail Price for
                        Device
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the sample file
                    </p>
                </>
            )}
            <>
                {ProvisionType === "AddStock" || ProvisionType === "AddAndAssignNonActive"
                    ? InfoForUsersAddAndAssignNonActivatedProvision.map((infoitem) => (
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
                      ))
                    : ProvisionType === "AddPreActivated"
                    ? InfoForUserAddPreActivatedProvision.map((infoitem) => (
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
                      ))
                    : ProvisionType === "AddAndActivate"
                    ? InfoForUsersAddAndActivate.map((infoitem) => (
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
                      ))
                    : undefined}
            </>
        </>
    );
}
