import React,{useEffect,useState} from "react" 
import Axios from "axios"
export default function TransferOutEnrollmentsStat({userid,BASE_URL}){  
    const  [transferoutenrollments,setTransferOutEnrollments]=useState(0)
     useEffect(()=>{  
             
             Axios.get(`${BASE_URL}/api/web/dashboard/showTransferOutEnrollments?userId=${userid}`).then((response)=>{ 
                    if(response.data.data !== undefined){
                   setTransferOutEnrollments(response.data.data)   
                    }
           })
     })
     return(  
         <h1 className="text-center">{transferoutenrollments}</h1>  
     )
}