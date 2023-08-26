import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Address = () => {
    const [tribal, setTribal] = useState(false);
    const [billingaddress, setBillingaddress] = useState(false);
    const history = useHistory();
    const handleBack = () => {
        history.push("/personalinfo");
    };
    const handleNext = () => {
        history.push("/eligibile");
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
                            <p className="text-2xl font-bold">Address</p>
                            <p className="mt-0 text-xl">We'll also need some information about your location.</p>
                            <p className="text-lg">The service address is the address where your ACP service will be located at. The billing address is where you'll recieve your bills.</p>
                        </div>
                        <div className="col-6">
                            <p className="text-2xl font-bold">Service Address</p>
                            <div className="flex flex-column">
                                <InputText className="mb-3" placeholder="Street Address" />
                                <InputText className="mb-3" placeholder="Unit, Apartment, Suite, etc." />
                                <InputText className="mb-3" placeholder="City" />
                                <InputText className="mb-3" placeholder="Tennessee" />
                                <InputText className="mb-3" placeholder="38109" />
                                <div className="mb-2 flex justify-content-center">
                                    <Checkbox inputId="binary" checked={tribal} onChange={(e) => setTribal(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Is this tribal territory?
                                    </label>
                                </div>
                                <div className="mb-2 flex justify-content-center">
                                    <Checkbox inputId="binary" checked={billingaddress} onChange={(e) => setBillingaddress(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Is your billing address different?
                                    </label>
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

export default Address;
