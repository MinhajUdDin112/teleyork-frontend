import React from "react";
import { InfoForUsersAddAndAssignNonActivatedProvision, InfoForUserAddPreActivatedProvision, InfoForUsersAddAndActivate, InfoForUsersReprovision } from "./info_for_users_assets";
export default function InfoForUsers({ ProvisionType }) {
    return (
        <>
            {" "}
            {ProvisionType !== "Reprovision" ? (
                <>
                    <p className="mt-4">
                        <strong>Notes:</strong>
                        ESN, Model ID , MSL/PUK,PUK2, PO#, BOX #, Wholesale Price, Selling Price, UICCID, Zipcode, Activation Fee , BYOD(Y/N),Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Device Retail Price
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the sample file
                    </p>
                </>
            ) : (
                <div>
                    <span className="mt-8">
                        <strong>Note:</strong>
                    </span>
                    <ul className="mt-4 ml-4">
                        <li className="mt-2">If MDN is found active in inventory it will be disconnected; reassigned and reactivated. If already disconnected it will be directly activated, in both cases with the zip codes that is uploaded in the file.</li>
                        <li className="mt-2">Carrier can only be ; for TMB, once a SIM is used it cannot be re-provisioning.</li>
                        <li className="mt-2"> Box and tracking numbers are auto generated by the system, however they can be edited.</li>
                        <li className="mt-2">The system assumes that the ESN that will be uploaded will exist in inventory and not be associated with any active customer account. If the ESN is not inventory it can be added from Manage inventory => Add units => Add stock .</li>
                        <li>Please do not upload the same ESN for re-provisioning in less than 5 minutes.</li>
                    </ul>
                </div>
            )}
            <>
                {ProvisionType === "AddStock" || ProvisionType === "AddAndAssignNonActivate"
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
                    : ProvisionType === "Reprovision"
                    ? InfoForUsersReprovision.map((infoitem) => (
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
