import React, { useState } from "react" 
import PortIn from "./Components/PortIn/PortIn" 
import "./Components/PortIn/css/Porting.css"
import EnrollmentsData from "./Components/Enrollment_Data/Enrollments"
export default function Porting(){ 
      const [portIn,setPortIn]=useState(true)   
      const [currentSelected,setCurrentSelected]=useState()
      const [showAllEnrollments,setShowAllEnrollments]=useState(true)
     return(   
         <div className="card">   
             {   
             !showAllEnrollments ? <>
              <div className="flex flex-wrap  flex-row justify-left" > 
              <button className="submit-buttonmsisdn"type="submit">  
                 Port In
              </button> 
              <button className="submit-buttonmsisdn ml-2"type="submit">  
                 Port Out
              </button>
              </div>
            { 
            portIn ? <PortIn currentSelected={currentSelected} />:""
          }  
           </> : <> 
              <EnrollmentsData setCurrentSelected={setCurrentSelected} setShowAllEnrollments={setShowAllEnrollments}/>
            </>
        }
          </div>
     )
}