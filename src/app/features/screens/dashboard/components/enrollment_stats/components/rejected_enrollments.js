import React from "react"  
import Axios from "axios"
import { useEffect,useState } from "react"
export default function RejectedEnrollmentsStat({userid,BASE_URL}){   
      const  [rejectedenrollments,setRejectedEnrollments]=useState(0)    
    
     useEffect(()=>{ 
             Axios.get(`${BASE_URL}/api/web/dashboard/rejectedSingleEnrollmentUserList?userId=${userid}`).then((response)=>{ 
                   console.log(response)  
                    
                   setRejectedEnrollments(response.data.data)  

             })
     })
     return(  
         <h1 className="text-center">{rejectedenrollments}</h1>  
     )
}