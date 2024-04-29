import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Preview_Final_component = ({ enrollment_id }) => {
    const navigate = useNavigate();
    const zipRes = localStorage.getItem("prepaidzipData");
    const movePage = () => {
        navigate("/");
        localStorage.removeItem("prepaidbasicData");
        localStorage.removeItem("prepaidaddress");
        localStorage.removeItem("prepaidzipData");
        localStorage.removeItem("prepaidagreeData");
        localStorage.removeItem("prepaidprogrammeId");
        localStorage.removeItem("paymentmethod");
        localStorage.removeItem("paymentdetails");
        localStorage.removeItem("comingfromincomplete");
        localStorage.removeItem("comingforedit");
        localStorage.removeItem("paymentmethod");
        localStorage.removeItem("paymentdetails");
        localStorage.removeItem("inventoryType");
        //Payment Status
        localStorage.removeItem("paymentstatus");
        localStorage.removeItem("stripeId");
        //Device local
        localStorage.removeItem("deviceadditional");
        localStorage.removeItem("deviceadditionaltotal");
        localStorage.removeItem("deviceadditionalfeaturearray");
        localStorage.removeItem("totaldevicediscount");
        localStorage.removeItem("devicediscountobjectarray");
        localStorage.removeItem("deviceplan");
        localStorage.removeItem("devicepricing");
        //SIM Local
        localStorage.removeItem("simadditional");
        localStorage.removeItem("simadditionaltotal");
        localStorage.removeItem("simadditionalfeaturearray");
        localStorage.removeItem("totalsimdiscount");
        localStorage.removeItem("simdiscountobjectarray");
        localStorage.removeItem("simplan");
        localStorage.removeItem("simpricing");
        localStorage.removeItem("devicediscount");
        localStorage.removeItem("simPaymentMethod");
        localStorage.removeItem("deviceadditionalfeaturearraytotal");
        localStorage.removeItem("simadditionalfeaturearraytotal");
        localStorage.removeItem("devicediscountobjectarraytotal");
        localStorage.removeItem("simdiscountobjectarraytotal");
        localStorage.removeItem("simdiscount");
        localStorage.removeItem("planprices");
        localStorage.removeItem("devicePaymentMethod");
        localStorage.removeItem("product");
        localStorage.removeItem("paymentscreendetails");
        localStorage.removeItem("datasendforinvoice"); 
        localStorage.removeItem("zip")     
        localStorage.removeItem("initialInformation")
        localStorage.removeItem("homeAddress")
        localStorage.removeItem("invoiceData");  
         localStorage.removeItem("selfinventoryselect") 
          localStorage.removeItem("selfplanselect")
    };
    const movepageToAll = () => {
        localStorage.removeItem("prepaidbasicData");
        localStorage.removeItem("prepaidaddress");
        localStorage.removeItem("prepaidzipData");
        localStorage.removeItem("prepaidagreeData");
        localStorage.removeItem("prepaidprogrammeId");
        localStorage.removeItem("paymentmethod");
        localStorage.removeItem("paymentdetails");
        localStorage.removeItem("comingfromincomplete");
        localStorage.removeItem("comingforedit");
        localStorage.removeItem("paymentmethod");
        localStorage.removeItem("paymentdetails");
        localStorage.removeItem("inventoryType");
        //Payment Status
        localStorage.removeItem("paymentstatus");

        localStorage.removeItem("stripeId");
        //Device local
        localStorage.removeItem("deviceadditional");
        localStorage.removeItem("deviceadditionaltotal");
        localStorage.removeItem("deviceadditionalfeaturearray");
        localStorage.removeItem("totaldevicediscount");
        localStorage.removeItem("devicediscountobjectarray");
        localStorage.removeItem("deviceplan");
        localStorage.removeItem("devicepricing");
        //SIM Local
        localStorage.removeItem("simadditional");
        localStorage.removeItem("simadditionaltotal");
        localStorage.removeItem("simadditionalfeaturearray");
        localStorage.removeItem("totalsimdiscount");
        localStorage.removeItem("simdiscountobjectarray");
        localStorage.removeItem("simplan");
        localStorage.removeItem("simpricing");
        localStorage.removeItem("devicediscount")
        localStorage.removeItem("simPaymentMethod");
        localStorage.removeItem("deviceadditionalfeaturearraytotal");
        localStorage.removeItem("simadditionalfeaturearraytotal");
        localStorage.removeItem("devicediscountobjectarraytotal");
        localStorage.removeItem("simdiscountobjectarraytotal");
        localStorage.removeItem("simdiscount");
        localStorage.removeItem("planprices");
        localStorage.removeItem("devicePaymentMethod");
        localStorage.removeItem("datasendforinvoice");
        localStorage.removeItem("invoiceData"); 
        localStorage.removeItem("zip")    
        localStorage.removeItem("initialInformation")
        localStorage.removeItem("homeAddress")   
        localStorage.removeItem("selfinventoryselect") 
        localStorage.removeItem("selfplanselect")
        navigate("/all-selfenrollment");
    };

    const handleNavigate = () => {
        const parseData = JSON.parse(localStorage.getItem("initialInformation"));
        navigate("/customer-profile", { state: { selectedId: parseData?.data?._id } });
        localStorage.setItem("selectedId", JSON.stringify(parseData?.data?._id));
    };
    return (
        <>
            <div className="card final-pre">
                <h3>
                    Enrollement is successfully saved against Enrollment ID:{" "}
                    <span onClick={handleNavigate} style={{ cursor: "pointer" }} className="steric">
                        {enrollment_id}
                    </span>
                </h3>
                <Button label="OK" onClick={zipRes ? movePage : movepageToAll} className="final-btn" />
            </div>
        </>
    );
};

export default Preview_Final_component;
