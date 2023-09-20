import React, { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";

const Eligibility = () => {
    const [tribal, setTribal] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/address");
    };
    const handleNext = () => {
        navigate("/nationalverifier");
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // Adjust the height to your preference
                }}
            >
                <div className="col-7">
                    <div className="col-12">
                        <p className="text-4xl font-semibold">IJ Wireless</p>
                    </div>
                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">Eligibility</p>
                            <p className="mt-0 text-xl">Eligibility can be determined by your participation in a government program or by your income.</p>
                            <p className="text-lg">If you are eligibile for a government program, you may be eligibile for a discount on your ACP service. If you are not eligibile for a government program you may still be eligibile for a discount based on your income.</p>
                            <p>Additionally, you might qualify for ACP through another person, such as parent or guardian, your ACP service. This person is known as the Benefit Qualifying Person (BQP).</p>
                        </div>
                        <div className="col-6">
                            <p className="text-xl font-bold">Are you participating in one of these government programs?</p>
                            <div className="flex flex-column">
                                <div className="mb-2 flex">
                                    <Checkbox inputId="binary" checked={tribal} onChange={(e) => setTribal(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Income Requirements - 200% of Federal Poverty Level
                                    </label>
                                </div>
                                <div className="mb-2 flex">
                                    <Checkbox inputId="binary" checked={tribal} onChange={(e) => setTribal(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Supplemental Security Income(SSL)
                                    </label>
                                </div>
                                <div className="mb-2 flex">
                                    <Checkbox inputId="binary" checked={tribal} onChange={(e) => setTribal(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Veterans Pension or Survivors Pension
                                    </label>
                                </div>
                                <div className="mb-2 flex">
                                    <Checkbox inputId="binary" checked={tribal} onChange={(e) => setTribal(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Food Stamps (SNAP)
                                    </label>
                                </div>
                                <div className="mb-2 flex">
                                    <Checkbox inputId="binary" checked={tribal} onChange={(e) => setTribal(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Medical Assistance (Medicaid)
                                    </label>
                                </div>
                                <div>
                                    <p className="m-0">Other</p>
                                    <Dropdown placeholder="Select from other eligibility programs" className="w-12 mb-2" />
                                </div>
                                <Button label="Next" className="mb-3" onClick={handleNext} />
                                <Button label="Back" onClick={handleBack} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Eligibility;
