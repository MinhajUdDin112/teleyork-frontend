import Axios from "axios";
import React,{useState,useEffect} from "react";     
export default function AllEnrollments({BASE_URL,userid,startDate,endDate}){    
      let endDateEnrollment=endDate; 
      if(startDate !== null){ 
         if(endDate === null){ 
            endDateEnrollment=new Date().toISOString()
         }
      }   
     useEffect(()=>{   
         Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`).then(response=>{ 
          

// Filter the enrollments based on the end timestamp
const enrollmentsInDateRange = response.data.data.filter(enrollment => {
   
  return enrollment.createdAt >= startDate && enrollment.createdAt <= endDateEnrollment;
});     
setAllEnrollments(enrollmentsInDateRange.length)
         }).catch(err=>{ 

         })

     },[startDate,endDateEnrollment])   
          const [allEnrollments,setAllEnrollments]=useState(0)    

    return ( 
     <h1 className="text-center"> 
         {allEnrollments}
     </h1>
    )
}