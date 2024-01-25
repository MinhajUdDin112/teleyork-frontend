import React from "react";
import RejectedEnrollments from "./components/RejectedEnrollments.js";
import IncompleteEnrollments from "./components/IncompleteEnrollments.js";
import ApprovedEnrollments from "./components/ApprovedEnrollments.js";
import AllEnrollments from "./components/AllEnrollments.js";
import CompletedEnrollments from "./components/CompletedEnrollments.js";
import ProvisioningQueue from "./components/ProvisioningQueue.js";    
import Last24EnrollmentStatChart from "./last24_enrollment_stats_chart/last24_enrollment_stat_chart.js";
import ActiveEnrollments from "./components/Activesales.js";
export default function Last24HoursAgentEnrollments({role, agentid, permittedRoutes }) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const obj = {
        rejectedenrollments: { label: "Rejected", component: RejectedEnrollments },
        incompleteenrollments: { label: "Incomplete", component: IncompleteEnrollments },
        approvedEnrollments: {
            label: "Approved ",
            component: ApprovedEnrollments,
        },
        allenrollments: {
            label: "All",
            component: AllEnrollments,
        },
        completedenrollments: {
            label: "Completed ",
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
        if(permittedRoutes.includes("/incompleteenrollments")){ 
            if(role === "TEAM LEAD"){ 
                delete obj.incompleteenrollments
            }
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
    return (
        <div>
            <h1 className=" p-4 ml-4 last24">Last 24 Hours Enrollments </h1>
            <div className="flex flex-wrap justify-content-around">
                {Object.keys(obj).map((item) => {
                    const Component = obj[item].component; // Assign the component to a variable
                    return (
                        <div key={item} className="card info">
                            <Component role={role} userid={agentid} BASE_URL={BASE_URL} /> {/* Render the component dynamically */}
                            <p className="w-full text-center">{obj[item].label}</p>
                        </div>
                    );
                })}
            </div>
            <Last24EnrollmentStatChart role={role} BASE_URL={BASE_URL} userid={agentid} permittedRoutes={permittedRoutes} />
            <hr />
        </div>
    );
}
