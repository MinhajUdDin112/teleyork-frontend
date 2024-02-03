import React, { useEffect, useState } from "react"    
import ServiceAvailabilityPage from "./components/eligiblityForEnrollment/pages/service_availblity_page"
import PersonalInfoPage from "./components/eligiblityForEnrollment/pages/personal_info_page"
import EnrollmentFlowPage from "./components/eligiblityForEnrollment/pages/enrollment_flow_page"
export default function MainPrepaidOrders(){      
    
     const [zipVerified,setZipVerified]=useState(false)
      useEffect(()=>{ 
      let  fromIncomplete=localStorage.getItem("comingfromincomplete")
         if(fromIncomplete || localStorage.getItem("comingforedit")){ 
          setZipVerified(true)
          
         } 
         return ()=>{    
          localStorage.removeItem("comingforedit")
          localStorage.removeItem("comingfromincomplete") 
          localStorage.removeItem("paymentallinfo")
          localStorage.removeItem("prepaidbasicData");
          localStorage.removeItem("prepaidaddress"); 
          localStorage.removeItem("simpricing")
          localStorage.removeItem("devicepricing")
          localStorage.removeItem("prepaidcheckEligibility");
          localStorage.removeItem("prepaidagreeData");
          localStorage.removeItem("prepaidprogrammeId");
          localStorage.removeItem("comingfromincomplete");
          localStorage.removeItem("paymentmethod");
          localStorage.removeItem("paymentdetails");  
          localStorage.removeItem("inventoryType");  
          //Payment Status 
          localStorage.removeItem("paymentstatus")  

          localStorage.removeItem("stripeId")
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
      },[]) 
      
     return (   
    <>  
    { 
        !zipVerified? <ServiceAvailabilityPage setZipVerified={setZipVerified}/> :<EnrollmentFlowPage/>
    } 
    </>
  )
}