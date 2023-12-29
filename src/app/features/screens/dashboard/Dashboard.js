import React from "react";
import EnrollmentByStates from "./components/enrollment_stats/enroolment_stats";
const Dashboard = ({permittedRoutes}) => {
    return (
        <div className="card">
           <div> 
              <EnrollmentByStates permittedRoutes={permittedRoutes}/>
           </div>
        </div>
    );
};

export default Dashboard;
