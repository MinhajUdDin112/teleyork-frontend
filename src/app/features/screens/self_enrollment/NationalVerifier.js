import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../../config";

const NationalVerifier = () => {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const {id}=useParams()

    const handleNext =async () => {
        const data ={
            userId:id
        }
        try {
            const res = await axios.post(`${BASE_URL}/api/enrollment/termsAndConditions`, data);
            const responseData = res.data; // Assuming the API response contains the data you need
            navigate("/resumeapplication", { state: { responseData } });
        } catch (error) {
            // Handle any errors here
            console.error("Error:", error);
        }
    };
    const handleBack = () => {
        // Navigate to a different route
        navigate("/eligibility");
    };
    return (
        <>
            <div
                 style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Changed height to minHeight
                }}
            >
                <div className="col-7">
                    {/* <div className="col-12">
                        <p className="text-4xl font-semibold">IJ Wireless</p>
                    </div> */}
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
                            <Button label="Next" className="mb-3" onClick={()=>handleNext()} />
                            <Button label="Back" onClick={handleBack} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NationalVerifier;
