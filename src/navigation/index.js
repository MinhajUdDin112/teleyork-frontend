export const menuNavigation = [
    {
        label: "Home",
        items: [
            {
                label: "Dashboard",
                icon: "pi pi-fw pi-home",
                to: "/",
            },
        ],
    },
    {
        label: "",
        icon: "pi pi-fw pi-search",
        items: [
            {
                label: "Lifeline Orders",
                icon: "pi pi-fw pi-bookmark",
                items: [
                    { label: "New Enrollment", icon: "", to: "/newenrolment" },
                    { label: "Self Enrollment", icon: "", to: "/selfenrollment" },
                    { label: "All Enrollments", icon: "", to: "/allenrollments" },
                    { label: "With Proof Enrollments", icon: "", to: "/withproofenrollments" },
                    { label: "Without Proof Enrollments", icon: "", to: "/withoutproofenrollments" },
                    { label: "Completed Enrollments", icon: "", to: "/completedenrollments" },
                    { label: "Incomplete Enrollments", icon: "", to: "/incompleteenrollments" },
                    { label: "Rejected Enrollments", icon: "", to: "/rejectedenrollments" },
                    { label: "NLAD Resolution Status", icon: "", to: "/nladresolutionstatus" },
                    { label: "Handover Event Order", icon: "", to: "/handovereventorder" },
                    { label: "Pending Event Order", icon: "", to: "/pendingeventorder" },
                ],
            },
        ],
    },
    {
        items: [
            {
                label: "Customer Service",
                items: [
                    {
                        label: "Customer Profile",
                        icon: "",
                        to: "",
                    },
                    {
                        label: "Billing and Invoice",
                        icon: "",
                        to: "/invoice",
                    },
                    {
                        label: "Order History",
                        icon: "",
                        to: "",
                    },
                    {
                        label: "Recent Searches",
                        icon: "",
                        to: "/recentsearches",
                    },
                    {
                        label: "Payment Search Tool",
                        icon: "",
                        to: "/paymentsearchtool",
                    },
                    {
                        label: "Agent Store Locator",
                        icon: "",
                        to: "/agentstorelocator",
                    },
                    {
                        label: "Eligibility Proof Upload",
                        icon: "",
                        to: "/eligibilityproofupload",
                    },
                    {
                        label: "Dealer Wallet",
                        icon: "",
                        to: "/dealerwallet",
                    },
                ],
            },
        ],
    },
    {
        items: [
            {
                label: "Prepaid/Postpaid Oredrs",
                items: [
                    {
                        label: "New Enrollments",
                        icon: "",
                        to: "",
                    },
                    {
                        label: "All Enrollments",
                        icon: "",
                        to: "/allenrollmentorders",
                    },
                    {
                        label: "Bulk Portin Report",
                        icon: "",
                        to: "/bulkportin",
                    },
                    {
                        label: "Completed Enrollments",
                        icon: "",
                        to: "/completeenrollments",
                    },
                    {
                        label: "Incomplete Enrolments",
                        icon: "",
                        to: "/incomplete",
                    },
                ],
            },
        ],
    },
    {
        items: [
            {
                label: "User Management",
                items: [
                    {
                        label: "Manage User",
                        to: "/manage-user",
                    },
                    // {
                    //     label: "Create User",
                    //     to: "/create-user",
                    // },
                ],
            },
        ],
    },
    {
        items: [
            {
                label: "Roles and Rights",
                items: [
                    {
                        label: "Manage Roles and Rights",
                        to: "/managerolesandrights",
                    },
                    {
                        label: "Create Role",
                        to: "/createrole",
                    },
                ],
            },
        ],
    },
    {
        items: [
            {
                label: "Notifications",
                items: [
                    {
                        label: "Manage Templates",
                        to: "/managetemplate",
                    },
                    {
                        label: "Create Template",
                        to: "/createtemplate",
                    },
                    {
                        label: "Upload Template",
                        to: "/smsnotification",
                    },
                    {
                        label: "Sent",
                        to: "/sent",
                    },
                    {
                        label: "Draft",
                        to: "/draft",
                    },
                ],
            },
        ],
    },
];
