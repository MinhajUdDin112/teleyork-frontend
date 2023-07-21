import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const VerifyZip = () => {
    const history = useHistory();

    const handleClick = () => {
        // Navigate to a different route
        history.push("/personalinfo");
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh", // Adjust the height to your preference
                }}
            >
                <div className="col-7">
                    <div className="col-12">
                        <p className="text-4xl font-semibold">IJ Wireless</p>
                    </div>
                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">ACP Enrollment</p>
                            <p className="mt-0 text-xl">What is the ACP Benefit?</p>
                            <p className="text-lg">The FCC's Affordable Connectivity Program (ACP) is a new federal government program committed to bringing connectivity to low-income Americans.</p>
                        </div>
                        <div className="col-6">
                            <p className="text-2xl font-bold">Let's see if you are eligible for this benefit</p>
                            <div className="flex flex-column">
                                <InputText className="mb-3" placeholder="ZIP Code" />
                                <InputText className="mb-3" placeholder="Email" />
                                <Button label="Next" onClick={handleClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyZip;
