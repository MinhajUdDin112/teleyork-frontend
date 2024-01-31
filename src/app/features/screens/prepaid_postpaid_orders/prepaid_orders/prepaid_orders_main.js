import React, { useEffect, useState } from "react"    
import ServiceAvailabilityPage from "./components/eligiblityForEnrollment/pages/service_availblity_page"
import PersonalInfoPage from "./components/eligiblityForEnrollment/pages/personal_info_page"
import EnrollmentFlowPage from "./components/eligiblityForEnrollment/pages/enrollment_flow_page"
export default function MainPrepaidOrders(){      
    
     const [zipVerified,setZipVerified]=useState(false)
      useEffect(()=>{ 
      let  fromIncomplete=localStorage().getItem("comingfromincomplete")
         if(fromIncomplete){ 
          setZipVerified(true)
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