import React,{useEffect,useState} from "react" 
import Axios from "axios"
export default function ProvisioningQueue({userid,BASE_URL}){  
    const  [provisionedenrollments,setProvisionedEnrollments]=useState(0) 
  
     
     useEffect(()=>{   
             Axios.get(`${BASE_URL}/api/web/dashboard/provisionedSingleEnrollmentUserList?userId=${userid}`).then((response)=>{ 
                 
                   setProvisionedEnrollments(response.data.data) 
            }).catch(err=>{ 

             })   
        
            
     })
     return(  
         <h1 className="text-center">{provisionedenrollments}</h1>  
     )
}