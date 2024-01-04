import React,{useEffect,useState} from "react" 
import Axios from "axios"
export default function NvsEnrollmentsStat({userid,BASE_URL}){  
    const  [nvsenrollments,setNvsEnrollments]=useState(0)
     useEffect(()=>{  
             
             Axios.get(`${BASE_URL}/api/web/dashboard/getNVSuccessLength?userId=${userid}`).then((response)=>{ 
                    if(response.data.data !== undefined){
                   setNvsEnrollments(response.data.data)   
                    }
           })
     })
     return(  
         <h1 className="text-center">{nvsenrollments}</h1>  
     )
}