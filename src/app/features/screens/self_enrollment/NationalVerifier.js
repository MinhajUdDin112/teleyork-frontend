import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NationalVerifier = () => {
    const [checked, setChecked] = useState(false);
    const history = useHistory();

    const handleNext = () => {
        // Navigate to a different route
        history.push("/resumeapplication");
    };
    const handleBack = () => {
        // Navigate to a different route
        history.push("/eligibility");
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
                    <div className="card p-8 col-12 mx-0">
                        <p className="text-4xl font-bold flex justify-content-center">National Verifier Disclosure</p>
                        <p className="mt-0 text-xl">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                            including versions of Lorem Ipsum.
                        </p>
                        <div className="mb-2 flex">
                            <Checkbox inputId="binary" checked={checked} onChange={(e) => setChecked(e.checked)} />
                            <label htmlFor="binary" className="text-2xl flex align-items-center  ml-2">
                                By entering my initials here, I agree to terms provided
                            </label>
                        </div>
                        <div className="flex flex-column mt-4">
                            <Button label="Next" className="mb-3" onClick={handleNext} />
                            <Button label="Back" onClick={handleBack} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NationalVerifier;
