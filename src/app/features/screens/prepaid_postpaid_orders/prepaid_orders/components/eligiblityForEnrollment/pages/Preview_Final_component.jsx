import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Preview_Final_component = ({ enrollment_id }) => {
    const navigate = useNavigate();

    const zipRes = localStorage.getItem("prepaidzipData");
    const basicRes = localStorage.getItem("prepaidbasicData");
    const movePage = () => {
        navigate("/");
        localStorage.removeItem("prepaidbasicData");
        localStorage.removeItem("prepaidaddress");
        localStorage.removeItem("prepaidzipData");
        localStorage.removeItem("prepaidagreeData");
        localStorage.removeItem("prepaidprogrammeId");
        localStorage.removeItem("paymentmethod");
        localStorage.removeItem("paymentdetails"); 
        localStorage.removeItem("comingfromincomplete") 
        localStorage.removeItem("comingforedit")
    };
    const movepageToAll = () => { 
        localStorage.removeItem("prepaidbasicData");
        localStorage.removeItem("prepaidaddress");
        localStorage.removeItem("prepaidzipData");
        localStorage.removeItem("prepaidagreeData");
        localStorage.removeItem("prepaidprogrammeId");
        localStorage.removeItem("paymentmethod");
        localStorage.removeItem("paymentdetails"); 
        localStorage.removeItem("comingfromincomplete")  
        localStorage.removeItem("comingforedit")
        navigate("/prepaid-allenrollment");
        
    };
    return (
        <>
            <div className="card final-pre">
                <h3>
                    Enrollement is successfully saved against Enrollment ID: <span className="steric">{enrollment_id}</span>{" "}
                </h3>
                <Button label="OK" onClick={zipRes ? movePage : movepageToAll} className="final-btn" />
            </div>
        </>
    );
};

export default Preview_Final_component;
