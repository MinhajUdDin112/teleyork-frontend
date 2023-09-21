import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import BASE_URL from "../../../../../config";
import { Image } from "primereact/image";
import placHolderImage from "../../../../../assets/images/placeholder_image.jpg"

const Select = ({ handleNext, handleBack }) => {

    const [acpPrograms, setAcpPrograms] = useState([])
    const [selectedAcpProgramId, setSelectedAcpProgramId] = useState(null); // Track the selected program ID

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)

    const getAcpPrograms = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${parseLoginRes?.compony}`);
            console.log('res?.data?.data', res?.data?.data)
            setAcpPrograms(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };

    const handleAcpSelection = (acpId) => {
        if (selectedAcpProgramId === acpId) {
            // If the same program is clicked again, deselect it
            setSelectedAcpProgramId(null);
        } else {
            // Otherwise, select the clicked program
            setSelectedAcpProgramId(acpId);
        }
    };

    useEffect(() => {
        getAcpPrograms()
    }, []);

    return (
        <>
            <div>
                <div className="flex flex-row justify-content-between align-items-center mb-2">
                    <Button label="Back" type="submit" onClick={handleBack} />
                    <div>
                        {/* <Button label="Clear Selection" onClick={clearSelection} /> */}
                        <Button label="Continue" type="submit" />
                    </div>
                </div>
                <div>
                    <h6>Enrollment ID: ETC175698</h6>
                </div>
                <br />
                <div>
                    <h2>Qualify for the Affordable Connectivity Program</h2>
                    <p>
                        Select the applicable program from below to show that you, your dependent or someone in your household qualifies for Affordable Connectivity Program. You can qualify through some government assistance program or through your income (you don't need to qualify through both){" "}
                    </p>
                    <p>Note: You can only select one from the programs listed below</p>
                </div>
            </div>
            <div>
                <div className="surface-section acp_programs">
                    <div className="flex flex-wrap">
                        {acpPrograms &&
                            acpPrograms.map((item) => {
                                return (
                                    <div className="w-full lg:w-6 xl:w-3 p-5" key={item?._id}>
                                        <Image src={placHolderImage} alt="Image" className="w-full" />
                                        <div className="mt-3 mb-2 font-medium text-900 text-xl">{item?.name}</div>
                                        <span className="text-700 line-height-3">{item?.description}</span>
                                        <a tabIndex="0" className="text-blue-500 font-medium flex align-items-center mt-2">
                                            <Button
                                                label={selectedAcpProgramId === item?._id ? "Deselect" : "Select"}
                                                iconPos="right"
                                                onClick={() => handleAcpSelection(item?._id)}
                                                disabled={selectedAcpProgramId !== null && selectedAcpProgramId !== item?._id}
                                            />
                                        </a>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

        </>
    );
};
export default Select;



