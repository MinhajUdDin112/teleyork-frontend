import React, { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import ServiceAvailabilityPage from "./components/eligiblityForEnrollment/pages/service_availblity_page";
import EnrollmentFlowPage from "./components/eligiblityForEnrollment/pages/enrollment_flow_page";
export default function MainPrepaidOrders() {  
      const location=useLocation()   
      const [counter,setcounter]=useState(0)
    let fromIncomplete = localStorage.getItem("comingfromincomplete");
    const [zipVerified, setZipVerified] = useState(fromIncomplete || localStorage.getItem("comingforedit")  ? true :false);
    useEffect(() => {
     
        return () => {
            cleanLocalStorage();
        };
    }, []);     
    useEffect(() => {
      const handleRouteChange = (newLocation) => {  
          if (newLocation.pathname === '/prepaid-newenrollment') {   
              if(counter === 0){
              } 
              else{ 
             setZipVerified(false) 
              } 
              setcounter(prev=>prev=prev+1)
          }
        };
        handleRouteChange(location);
        window.addEventListener('popstate', handleRouteChange);
        return () => {
          window.removeEventListener('popstate', handleRouteChange);  
        };  
      }, [location]);  

    return <>{!zipVerified ? <ServiceAvailabilityPage setZipVerified={setZipVerified} /> : <EnrollmentFlowPage />}</>;
    // return (
    //     <>
    //         {/*!zipVerified ? <ServiceAvailabilityPage setZipVerified={setZipVerified} /> :*/} <EnrollmentFlowPage />
    //     </>
    // );
}
function cleanLocalStorage() {
    localStorage.removeItem("comingforedit");
    localStorage.removeItem("comingfromincomplete");
    localStorage.removeItem("paymentallinfo");
    localStorage.removeItem("prepaidbasicData");
    localStorage.removeItem("prepaidaddress");
    localStorage.removeItem("simpricing");
    localStorage.removeItem("devicepricing");
    localStorage.removeItem("prepaidcheckEligibility");
    localStorage.removeItem("prepaidagreeData");
    localStorage.removeItem("prepaidprogrammeId");
    localStorage.removeItem("comingfromincomplete");
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
}
