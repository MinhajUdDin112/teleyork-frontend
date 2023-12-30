import React,{useEffect,useState} from "react" 
import Axios from "axios"
export default function AllEnrollmentsStat({userid,BASE_URL}){  
    const  [allenrollments,setAllEnrollments]=useState(0)
     useEffect(()=>{ 
             Axios.get(`${BASE_URL}/api/web/dashboard/EnrollmentApprovedBySingleUser?userId=${userid}`).then((response)=>{ 
                  
                   setAllEnrollments(response.data.data)  
         }).catch(err=>{ 

             })
     })
     return(  
         <h1 className="text-center">{allenrollments}</h1>  
     )
}