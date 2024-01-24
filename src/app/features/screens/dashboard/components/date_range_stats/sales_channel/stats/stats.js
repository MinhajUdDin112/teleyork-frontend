import Axios from "axios"
import { DateTime } from "luxon"
import React,{useEffect,useState} from "react" 
export default function DateRangeSalesChannel({BASE_URL,roleId,startDate,endDate}){  
    const [webConsent,setWebConsent]=useState(0) 
    const [oldFacebook,setOldFacebook]=useState(0) 
    const [newFacebook,setNewFacebook]=useState(0) 
     
    const [SMM,setSMM]=useState(0)  
     
    const [email,setEmail]=useState(0)  
     
    const [auto,setAuto]=useState(0) 

   useEffect(()=>{  
     Axios.get(`${BASE_URL}/api/web/dashboard/salesStatsByChannel?userId=${roleId}`).then((response)=>{ 
        
      if(response.data.data !== undefined){  
         console.log("it is not undefiend")
         let endDateEnrollment = endDate;
                if (startDate !== null) {
                    if (endDate === null) {
                         endDateEnrollment = DateTime.local()
                        .setZone("America/New_York", { keepLocalTime: false })
                        .set({ hour: 23, minute: 59, second: 0 })
                        .toFormat("d LLL yyyy, hh:mm a");
                    
                    endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                      
                    }  
                }  
            response.data.data.enrollments.map(enrollment=>{   
               if((DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate) && (DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <=endDateEnrollment)) { 
                 
                  if(enrollment.salesChannel === "Auto"){  
                     setAuto(prev=>prev+1)
                   }  
                   else if(enrollment.salesChannel === "Web Consent"){ 
                      setWebConsent(prev=>prev+1)
                   } 
                   else if(enrollment.salesChannel === "New Facebook"){ 
                      setNewFacebook(prev=>prev+1) 

                   } 
                   else if(enrollment.salesChannel === "Old Facebook"){ 
                     setOldFacebook(prev=>prev+1)
                   }   
                   else if(enrollment.salesChannel === "SMM"){ 
                     setSMM(prev=>prev+1) 
                   } 
                   else if(enrollment.salesChannel === "Email"){ 
                       setEmail(prev=>prev+1)
                   }
               }
            })
       }  
       else{ 

       }
          

     }).catch(error=>{ 

     })
     return ()=>{ 
      setWebConsent(0) 
      setAuto(0) 
      setOldFacebook(0) 
      setNewFacebook(0) 
      setSMM(0) 
      setEmail(0)
     }
   },[startDate,endDate,roleId])
    return( 
        <div className="flex flex-wrap justify-content-around flex-row">  
        <div className=" card info">    
           <h2 className="w-full text-center">{webConsent}</h2>
            <p className="w-full text-center"> 
             Web Consent
            </p>
         </div> 
         <div className="card info">   
         <h2 className="w-full text-center">{oldFacebook}</h2>
            <p className="w-full text-center"> 
             Old Facebook
            </p>
         </div> 
         <div className="card info">   
         <h2 className="w-full text-center">{newFacebook}</h2>
            <p className="w-full text-center"> 
             New Facebook
            </p>
         </div> 
         <div className="card info">   
         <h2 className="w-full text-center">{SMM}</h2>
            <p className="w-full text-center"> 
             SMM
            </p>
         </div> 
         <div className="card info">   
         <h2 className="w-full text-center">{email}</h2>
            <p className="w-full text-center"> 
             Email
            </p>
         </div> 
         <div className="card info">   
         <h2 className="w-full text-center">{auto}</h2>
            <p className="w-full text-center"> 
             Auto
            </p>
         </div>
 </div>
    )
}