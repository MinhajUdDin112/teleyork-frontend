import React from "react";
import RejectedEnrollments from "./components/RejectedEnrollments";
import IncompleteEnrollments from "./components/IncompleteEnrollments";
import ApprovedEnrollments from "./components/ApprovedEnrollments";
import AllEnrollments from "./components/AllEnrollments";
import CompletedEnrollments from "./components/CompletedEnrollments";
import ProvisioningQueue from "./components/ProvisioningQueue";  
import Last24EnrollmentStatChart from "./last24_enrollment_stats_chart/last24_enrollment_stat_chart.js"

export default function Last24HoursEnrollments({ permittedRoutes }) {    

    const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
const userid = parseLoginRes?._id;
const BASE_URL = process.env.REACT_APP_BASE_URL;
    const obj = {
        rejectedenrollments: { label: "Rejected Enrollments", component: RejectedEnrollments },
        incompleteenrollments: { label: "Incomplete Enrollments", component: IncompleteEnrollments },
        approvedEnrollments: {
            label: "Approved Enrollments",
            component: ApprovedEnrollments,
        },
        allenrollments: {
            label: "All Enrollments",
            component: AllEnrollments,
        },
        completedenrollments: {
            label: "Completed Enrollments",
            component: CompletedEnrollments,
        },
        provisioningqueue: {
            label: "Provisioning Queue",
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
    }
    return (
        <div>
            <h1 className=" p-4 ml-4 last24">Last 24 Hours Enrollments </h1>
            <div className="flex flex-wrap justify-content-around">
                {Object.keys(obj).map((item) => {
                    const Component = obj[item].component; // Assign the component to a variable
                    return (
                        <div key={item} className="card info">
                            <Component userid={userid} BASE_URL={BASE_URL} /> {/* Render the component dynamically */}
                            <h5 className="w-full text-center">{obj[item].label}</h5>
                        </div>
                    );
                })}
            </div>  
              <Last24EnrollmentStatChart BASE_URL={BASE_URL} userid={userid} permittedRoutes={permittedRoutes}/>
            <hr />
        </div>
    );
}
