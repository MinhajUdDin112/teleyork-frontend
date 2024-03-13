import React, { useEffect } from "react"  
import RejectedEnrollments from "./components/RejectedEnrollments";
import IncompleteEnrollments from "./components/IncompleteEnrollments";
import ApprovedEnrollments from "./components/ApprovedEnrollments";
import AllEnrollments from "./components/AllEnrollments";
import CompletedEnrollments from "./components/CompletedEnrollments";
import ProvisioningQueue from "./components/ProvisioningQueue";  
import DateRangeEnrollmentStatChart from "./daterange_enrollment_stats_chart/daterange_enrollment_stat_chart";
import ActiveEnrollments from "./components/ActiveEnrollments";
export default function DateRangeStats({role,startDate,endDate,permittedRoutes,selectedModule}){   
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes); 
    const userid = parseLoginRes._id;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const obj = {
        rejectedenrollments: { label: "Rejected", component: RejectedEnrollments },
        incompleteenrollments: { label: "Incomplete", component: IncompleteEnrollments },
        approvedEnrollments: {
            label: "Approved",
            component: ApprovedEnrollments,
        },
        allenrollments: {
            label: "All",
            component: AllEnrollments,
        },
        completedenrollments: {
            label: "Completed",
            component: CompletedEnrollments,
        },
        provisioningqueue: {
            label: "Provisioning",
            component: ProvisioningQueue,
        },

    };
    if (permittedRoutes !== undefined) {

        if (!permittedRoutes.includes("/approved-enrollments")) {
            delete obj.approvedEnrollments;
        }
        if (!permittedRoutes.includes("/rejectedenrollments")) {
            delete obj.rejectedenrollments;
        }
        if (!permittedRoutes.includes("/incompleteenrollments")) {
            delete obj.incompleteenrollments;
        }
        if (!permittedRoutes.includes("/all-enrollments")) {
            delete obj.incompleteenrollments;
        }
        if (!permittedRoutes.includes("/provisioning-queue")) {
            delete obj.provisioningqueue;
        }
        if (!permittedRoutes.includes("/completedenrollments")) {
            delete obj.completedenrollments;
        } 
        if(role === "TEAM LEAD" || role === "CSR"){ 
            obj.activeenrollments={ 
                 label:"Active", 
                 component:ActiveEnrollments
             }
         } 
    }  
     return(    
        <div>
            <h1 className="daterange p-4 ml-4">Date Range Enrollments </h1>
            <div className="flex flex-wrap justify-content-around">
                {Object.keys(obj).map((item) => {
                    const Component = obj[item].component; // Assign the component to a variable
                    return (
                        <div key={item} className="card info">
                            <Component selectedModule={selectedModule} role={role} userid={userid} BASE_URL={BASE_URL} startDate={startDate} endDate={endDate} /> {/* Render the component dynamically */}
                            <p className="w-full text-center">{obj[item].label}</p>
                        </div>
                    );
                })}
            </div>  
              <DateRangeEnrollmentStatChart BASE_URL={BASE_URL} userid={userid} permittedRoutes={permittedRoutes} startDate={startDate} endDate={endDate}/>
            <hr />
        </div>
     )
}