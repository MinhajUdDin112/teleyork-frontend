import React,{useState} from "react"     
import "./css/enrollment_stats.css"   
import EnrollmentStatChart from "./enrollment_stats_chart/enrollment_stat_chart";
import ApprovedEnrollmentsStat from "./components/approved_enrollments";
import IncompleteEnrollmentsStat from "./components/incomplete_enrollments";
import RejectedEnrollmentsStat from "./components/rejected_enrollments";
import AllEnrollmentsStat from "./components/all_enrollments";
import ProvisioningQueue from "./components/provisioning_queue";
import TransferOutEnrollmentsStat from "./components/transferout_enrollments";  
import ActivatedEnrollments from "./components/completed_enrollments";
import NvsEnrollmentsStat from "./components/nvs_enrollments";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function EnrollmentByStates({permittedRoutes}){                
  console.log(permittedRoutes)    
  const loginRes = localStorage.getItem("userData");
  const parseLoginRes = JSON.parse(loginRes);  
  const userid=parseLoginRes._id   
       const obj={   
          
           rejectedenrollments:{label:"Rejected Enrollments", 
         component:RejectedEnrollmentsStat}, 
         incompleteenrollments:{label:"Incomplete Enrollments", 
         component:IncompleteEnrollmentsStat}, 
          approvedEnrollments:{
            label:"Approved Enrollments", 
            component:ApprovedEnrollmentsStat
          },    
          provisionedenrollments:{ 
            label:"Provisioning Enrollments", 
            component:ProvisioningQueue
          }
          ,
          allenrollments:{ 
            label:"All Enrollments", 
            component:AllEnrollmentsStat
          },   
          activatedenrollments:{ 
            label:"Completed Enrollments" , 
            component:ActivatedEnrollments
          }, 
          nvsenrollments:{ 
            label:"Successfull NVS" , 
            component:NvsEnrollmentsStat
          },
          transferoutenrollments:{ 
             label:"Transfer Out Enrollments", 
             component:TransferOutEnrollmentsStat
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
       if(!permittedRoutes.includes("/provisioning-queue")){ 
            delete obj.provisionedenrollments
       }  
        if(parseLoginRes.role.role !== "PROVISION MANAGER" ) { 
           if(parseLoginRes.role.role !== "PROVISION AGENT"){ 
            delete obj.transferoutenrollments    
            delete obj.nvsenrollments;
           }
        }        
        if(!permittedRoutes.includes("/completedenrollments")){ 
          delete obj.activatedenrollments
        }
       
         
      }
    
   
     
     return( <>  
      <h1 className="completeenrollmentstat p-4 ml-4">Complete Enrollments Stats</h1>
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
