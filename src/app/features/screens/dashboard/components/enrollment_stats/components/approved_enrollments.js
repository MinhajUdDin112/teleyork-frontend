import React,{useEffect,useState} from "react" 
import Axios from "axios"
export default function ApprovedEnrollmentsStat({userid,BASE_URL}){  
    const  [approvedenrollments,setApprovedEnrollments]=useState(0) 
  
     
     useEffect(()=>{   
             Axios.get(`${BASE_URL}/api/web/dashboard/approvedSingleEnrollmentList?userId=${userid}`).then((response)=>{ 
                 
                   setApprovedEnrollments(response.data.data) 
            }).catch(err=>{ 

             })   
        
            
     })
     return(  
         <h1 className="text-center">{approvedenrollments}</h1>  
     )
}