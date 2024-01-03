import React,{useEffect,useState} from "react" 
import Axios from "axios"
export default function ActivatedEnrollments({userid,BASE_URL}){  
    const  [incompleteenrollments,setIncompleteEnrollments]=useState(0)
     useEffect(()=>{ 
             Axios.get(`${BASE_URL}/api/web/dashboard/inCompleteSingleEnrollmentUserList?userId=${userid}`).then((response)=>{ 
                  
                   setIncompleteEnrollments(response.data.data) 
           })
     })
     return(  
         <h1 className="text-center">{incompleteenrollments}</h1>  
     )
}