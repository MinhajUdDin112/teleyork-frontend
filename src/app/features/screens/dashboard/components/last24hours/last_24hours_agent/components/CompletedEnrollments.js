import React ,{useState,useEffect} from "react";  
 import Axios from "axios" 
export default function CompletedEnrollments({BASE_URL,userid}){ 
     const [completedenrollments,setCompletedEnrollments]=useState(0)     
     useEffect(()=>{   
        Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`).then(response=>{ 
         console.log(response)  
         const currentTime = new Date().getTime();

// Set the time for 24 hours ago
const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

// Filter the enrollments based on the end timestamp
const enrollmentsInLast24Hours = response.data.data.filter(enrollment => {
 const enrollmentEndTime = new Date(enrollment.activatedAt).getTime();
 return enrollmentEndTime >= twentyFourHoursAgo && enrollmentEndTime <= currentTime;
});   
setCompletedEnrollments(enrollmentsInLast24Hours.length)
        }).catch(err=>{ 

        })

    },[])  
    return ( 
        <h1 className="text-center">{completedenrollments}</h1>
    )
}