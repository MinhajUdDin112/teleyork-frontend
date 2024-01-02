import Axios from "axios";
import React,{useState,useEffect} from "react";     
export default function AllEnrollments({BASE_URL,userid}){     
     useEffect(()=>{   
         Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`).then(response=>{ 
          console.log(response)  
          const currentTime = new Date().getTime();

// Set the time for 24 hours ago
const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

// Filter the enrollments based on the end timestamp
const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
  const enrollmentEndTime = new Date(enrollment.createdAt).getTime();
  return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
});   
setAllEnrollments(enrollmentsInLast24Hours.length)
         }).catch(err=>{ 

         })

     },[])   
          const [allEnrollments,setAllEnrollments]=useState(0)    

    return ( 
     <h1 className="text-center"> 
         {allEnrollments}
     </h1>
    )
}