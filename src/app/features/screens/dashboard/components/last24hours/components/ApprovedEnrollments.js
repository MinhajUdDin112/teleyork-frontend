import React ,{useState,useEffect} from "react";  
import Axios from "axios" 
export default function ApprovedEnrollments({BASE_URL,userid}){     

     const [approvedenrollments,setApprovedEnrollments]=useState(0)
     useEffect(()=>{   
        Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`).then(response=>{ 
        
         const currentTime = new Date().getTime();

// Set the time for 24 hours ago
const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

// Filter the enrollments based on the end timestamp
const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
 const enrollmentEndTime = new Date(enrollment.approvedAt).getTime();
 return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
});   
setApprovedEnrollments(enrollmentsInLast24Hours.length) 

        }).catch(err=>{ 

        })

    },[])   
     return ( 
        <h1  className="text-center">{approvedenrollments}</h1>
    )
}