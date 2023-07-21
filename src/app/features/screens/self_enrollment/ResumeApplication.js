import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

const ResumeApplication = () => {
    const [date, setDate] = useState(null);
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
                            <p className="text-2xl font-bold">Resume Application</p>
                            <p className="mt-0 text-xl">We have matching information on file</p>
                            <p className="text-lg">Please verify your identity to resume application process.</p>
                        </div>
                        <div className="col-6">
                            <div className="flex flex-column">
                                <InputText className="mb-3" placeholder="hammadullahfit@gmail.com" />
                                <InputText className="mb-3" placeholder="22010" />
                                <InputText className="mb-3" placeholder="Last Name" />
                                <Calendar className="mb-3" id="icon" value={date} onChange={(e) => setDate(e.value)} showIcon />
                                <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" />
                                <Button label="Next" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeApplication;
