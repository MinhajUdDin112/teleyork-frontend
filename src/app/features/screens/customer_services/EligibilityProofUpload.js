import React from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const EligibilityProofUpload = () => {
    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Eligibility Proof Upload</h3>
            </div>

            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="mb-3 mx-3">
                    <p className="m-0 pb-1 text-md font-semibold ">Enrollment ID</p>
                    <InputText placeholder="Enter Enrollment ID" style={{ width: "23rem" }} />
                </div>
                <div className="flex justify-content-center">
                    <p className="text-3xl font-semibold">OR</p>
                </div>
                <div className=" flex flex-wrap p-0 my-4">
                    <div className="mb-3 mx-3">
                        <p className="m-0 pb-1 text-md font-semibold ">State</p>
                        <Dropdown placeholder="Select state" style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mx-3">
                        <p className="m-0 pb-1 text-md font-semibold ">First Name</p>
                        <InputText placeholder="Enter First Name" style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mx-3">
                        <p className="m-0 pb-1 text-md font-semibold ">SSN</p>
                        <InputText placeholder="Enter SSN (last 4)" style={{ width: "23rem" }} />
                    </div>
                </div>
                <div className="mb-3 mx-3 flex justify-content-end ">
                    <Button label="Proceed" className="w-10rem  text-sm bg-green-200 border-none" />
                </div>
            </div>
        </div>
    );
};

export default EligibilityProofUpload;
