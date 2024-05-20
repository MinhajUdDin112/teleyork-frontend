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
        localStorage.removeItem("invoiceData");
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

        localStorage.removeItem("devicediscount");

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
        navigate("/prepaid-allenrollment");
    };

    const handleNavigate = () => {
        const data = localStorage.getItem("prepaidagreeData");
        const parseData = JSON.parse(data);
        navigate("/customer-profile", { state: { selectedId: parseData?.data?._id } });
        localStorage.setItem("selectedId", JSON.stringify(parseData?.data?._id));
    };
    return (
        <>
            <div className="final-pre" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3 style={{ fontSize: "18px", fontFamily: "Inter", fontWeight: "600" }}>
                    Enrollement is successfully saved against Enrollment ID:
                    <span onClick={handleNavigate} style={{ cursor: "pointer", color: "#0475B4", marginLeft: "10px" }} className="steric">
                        {enrollment_id}
                    </span>
                </h3>
                <Button style={{ alignItems: "center" }} label="OK" onClick={zipRes ? movePage : movepageToAll} className="btn" />
            </div>
        </>
    );
};

export default Preview_Final_component;
