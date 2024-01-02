import React,{useState} from "react"     
import "./css/enrollment_stats.css"   
import EnrollmentStatChart from "./enrollment_stats_chart/enrollment_stat_chart";
import ApprovedEnrollmentsStat from "./components/approved_enrollments";
import IncompleteEnrollmentsStat from "./components/incomplete_enrollments";
import RejectedEnrollmentsStat from "./components/rejected_enrollments";
import AllEnrollmentsStat from "./components/all_enrollments";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function EnrollmentByStates({permittedRoutes}){                
      
       const obj={   
          
           rejectedenrollments:{label:"Rejected Enrollments", 
         component:RejectedEnrollmentsStat}, 
         incompleteenrollments:{label:"Incomplete Enrollments", 
         component:IncompleteEnrollmentsStat}, 
          approvedEnrollments:{
            label:"Approved Enrollments", 
            component:ApprovedEnrollmentsStat
          }, 
          allenrollments:{ 
            label:"All Enrollments", 
            component:AllEnrollmentsStat
          }
       }   
        if(permittedRoutes !== undefined){  
         console.log("not null")  
        
       if(!permittedRoutes.includes("/approved-enrollments")){ 
         delete obj.approvedEnrollments
       } 
       if(!permittedRoutes.includes("/rejectedenrollments")){ 
         delete obj.rejectedenrollments
       } 
       if(!permittedRoutes.includes("/incompleteenrollments")){ 
         delete obj.incompleteenrollments
       } 
     
      
      }
   console.log(permittedRoutes)    
   const loginRes = localStorage.getItem("userData");
   const parseLoginRes = JSON.parse(loginRes);  
   const userid=parseLoginRes._id     
   
     
     return( <>  
      <h1 className="font-semibold p-4 ml-4">Complete Enrollments Stats</h1>
     <div className="flex flex-wrap justify-content-around">      
       
     {Object.keys(obj).map(item => {
        const Component = obj[item].component; // Assign the component to a variable
        return (
          <div key={item} className="card info">
            <Component userid={userid} BASE_URL={BASE_URL} /> {/* Render the component dynamically */}
            <h5 className="w-full text-center">{obj[item].label}</h5>
          </div>
        );
      })}
          
      
        
     </div>  
        <EnrollmentStatChart BASE_URL={BASE_URL} userid={userid} permittedRoutes={permittedRoutes} />  

        </>
     )
}   
