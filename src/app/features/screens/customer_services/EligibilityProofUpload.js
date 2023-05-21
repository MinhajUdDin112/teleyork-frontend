import React from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const EligibilityProofUpload = () => {
    return (
        <div className="card p-2 min-h-screen border-noround">
            <div className="card border-noround p-0">
                <div className="surface-100 p-3 my-3 border-y-1">
                    <p className="text-xl font-bold">Eligibility Proof Upload</p>
                </div>

                <div className="mb-3 mx-3">
                    <p className="m-0 pb-1 text-md font-semibold ">Enrollment ID</p>
                    <InputText placeholder="Enter Enrollment ID" style={{ width: "21rem" }} />
                </div>
                <div className="flex justify-content-center">
                    <p className="text-3xl font-semibold">OR</p>
                </div>
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">State</p>
                        <Dropdown placeholder="Select state" style={{ width: "21rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">First Name</p>
                        <InputText placeholder="Enter First Name" style={{ width: "21rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">SSN</p>
                        <InputText placeholder="Enter SSN (last 4)" style={{ width: "21rem" }} />
                    </div>
                    <div>
                        <Button label="Proceed" className="mt-5 text-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EligibilityProofUpload;
