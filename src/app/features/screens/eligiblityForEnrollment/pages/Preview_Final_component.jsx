import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Preview_Final_component = ({ enrollment_id }) => {
    const navigate = useNavigate();

    const movePage = () => {
        navigate("/");
    };

    return (
        <>
            <div className="card final-pre">
                <h3>Enrollement is successfully saved against enrollment id: <span className="steric">{enrollment_id}</span> </h3>
                <Button label="OK" onClick={movePage} className="final-btn" />
            </div>
        </>
    );
};

export default Preview_Final_component;
