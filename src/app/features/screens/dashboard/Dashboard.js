import React from "react";
import EnrollmentByStates from "./components/enrollment_stats/enrollment_stats";
import Last24HoursEnrollments from "./components/last24hours/Last24HoursEnrollments";
const Dashboard = ({permittedRoutes}) => {
    return (
        <div className="card">
           <div>   
               <Last24HoursEnrollments permittedRoutes={permittedRoutes}/>
              <EnrollmentByStates permittedRoutes={permittedRoutes}/>
           </div>
        </div>
    );
};

export default Dashboard;
