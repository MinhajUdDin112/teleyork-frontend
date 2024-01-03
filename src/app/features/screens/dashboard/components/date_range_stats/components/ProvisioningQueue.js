import React,{useState,useEffect} from "react";   
import Axios from "axios"; 
export default function ProvisioningQueue({BASE_URL,userid,startDate,endDate}){   
    const [provisioningqueueenrollments,setProvisioningQueueEnrollments]=useState(0)     
    useEffect(()=>{   
        Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`).then(response=>{ 
            const enrollmentsInDateRange = response.data.data.filter(enrollment => {
   
                return enrollment.createdAt >= startDate && enrollment.createdAt <= endDate;
              });     
setProvisioningQueueEnrollments(enrollmentsInDateRange.length)
        }).catch(err=>{ 

        })

    },[startDate,endDate])  
    return ( 
        <h1 className="text-center">{provisioningqueueenrollments}</h1>
    )
}