import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Preview_Final_component = ({ enrollment_id }) => {
    const navigate = useNavigate();

    const zipRes = localStorage.getItem("zipData");

    const movePage = () => {
        navigate("/postpaid-newenrollment");
        localStorage.removeItem("basicData");
        localStorage.removeItem("address");
        localStorage.removeItem("zipData");
        localStorage.removeItem("agreeData");
        localStorage.removeItem("programmeId");
    };
    const movepageToAll = () => {
        navigate("/postpaid-allenrollment");
        localStorage.removeItem("basicData");
        localStorage.removeItem("address");
        localStorage.removeItem("zipData");
        localStorage.removeItem("agreeData");
        localStorage.removeItem("programmeId");
    };
    const handleNavigate = () => {  
        const data = localStorage.getItem("basicData");
        const parseData = JSON.parse(data);
        navigate("/customer-profile", { state: { selectedId: parseData?.data?._id } });
        localStorage.setItem("selectedId", JSON.stringify(parseData?.data?._id));
       
    };
    return (
        <>
            <div className="card final-pre">
                <h3>
                    Enrollement is successfully saved against Enrollment ID:
                    <i className="steric" onClick={handleNavigate} style={{ cursor: "pointer" }}>
                        {enrollment_id}
                    </i>
                </h3>
                <Button label="OK" onClick={zipRes ? movePage : movepageToAll} className="final-btn" />
            </div>
        </>
    );
};

export default Preview_Final_component;
