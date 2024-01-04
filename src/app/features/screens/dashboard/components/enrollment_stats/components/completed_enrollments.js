import React,{useEffect,useState} from "react" 
import Axios from "axios"
export default function ActivatedEnrollments({userid,BASE_URL}){  
    const  [activatedenrollments,setActivatedEnrollments]=useState(0)
     useEffect(()=>{ 
             Axios.get(`${BASE_URL}/api/web/dashboard/completeSingleEnrollmentUserList?userId=${userid}`).then((response)=>{ 
                     if(response.data.data !== undefined){
                   setActivatedEnrollments(response.data.data)   
                     }
           })
     })
     return(  
         <h1 className="text-center">{activatedenrollments}</h1>  
     )
}