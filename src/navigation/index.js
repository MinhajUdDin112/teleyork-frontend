export const menuNavigation = [
    {
        items: [
            {
                label: "Dashboard",
                icon: "pi pi-fw pi-home",
                to: "/",
            },
            {
                label: "Acp Programs",
                icon: "pi pi-fw pi-dollar",
                to: "/companyacpprograms",
            },
        ],
    },
    {
        items: [
            {
                label: "Lifeline Orders",
                icon: "pi pi-fw pi-bookmark",
                items: [
                    { label: "New Enrollment", icon: "", to: "/newenrolment" },
                    { label: "Self Enrollment", icon: "", to: "/selfenrollment" },
                    { label: "All Enrollments", icon: "", to: "/all-enrollments" },
                    {label:  "Provisioning Queue", icon: "", to: "/provisioning-queue" },
                    { label: "Bulk Upload", icon: "", to: "/bulk-upload"},
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
                        to: "/customer-profile",
                    },
                    {
                        label: "Billing and Invoice",
                        icon: "",
                        to: "/invoice",
                    },
                    {
                        label: "Order History",
                        icon: "",
                        to: "/orderhistory",
                    },

                    {
                        label: "Purchase history",
                        icon: "",
                        to: "/purchasehistory",
                    },
                    {
                        label: "Tickets",
                        icon: "",
                        to: "/tickets",
                    },
                    {
                        label: "Customer history",
                        icon: "",
                        to: "/customerhistory",
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
                        label: "Deactivate ESN",
                        icon: "",
                        to: "/deactivateesn",
                    },

                    {
                        label: "Agent Store Locator",
                        icon: "",
                        to: "/agentstorelocator",
                    },
                    {
                        label: "Dealer Wallet",
                        icon: "",
                        to: "/dealerwallet",
                    },
                    {
                        label: "Eligibility Proof Upload",
                        icon: "",
                        to: "/eligibilityproofupload",
                    },
                ],
            },
        ],
    },
    {
        items: [
            {
                label: "Prepaid/Postpaid Orders",
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
                label: "Inventory ",
                items: [
                    {
                        label: "Manage Inventory",
                        icon: "",
                        to: "/manageinventory",
                    },
                    {
                        label: "Drop Ship Orders",
                        icon: "",
                        to: "/dropshiporders",
                    },    
                    { 
                       label:"Shipping Queues",  
                        icon:"", 
                        to:"/shipping-queues"
                    }  
                   ,
                    {
                        label: "EMEI Drawer",
                        icon: "",
                        to: "/emei-drawer",
                    },
                    {
                        label: "ESN/SIM Drawer",
                        icon: "",
                        to: "/esn-sim-drawer",
                    },
                    {
                        label: "Inventory Report",
                        icon: "",
                        to: "/inventory-report",
                    },  
                    {
                        label: "Manage Model",
                        icon: "",
                        to: "/manage-model",
                    },

                    {
                        label: "Bulk Processess",
                        items: [
                            {
                                label: "Bulk Clear ESN",
                                icon: "",
                                to: "/bulkprocesses/bulk-clear-esn",
                            },
                            {
                                label: "Bulk Clear Device",
                                icon: "",
                                to: "/bulkprocesses/bulk-clear-device",
                            },
                            {
                                label: "Bulk Deactivate MDN",
                                icon: "",
                                to: "/bulkprocesses/bulk-deactivate-mdn",
                            },
                    
                            {
                                label: "Bulk Swap ESN/SIM",
                                icon: "",
                                to: "/bulkprocesses/bulk-swap-esn",
                            },
                        ],
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
                        label: "Create Role",
                        to: "/createrole",
                    },
                    {
                        label: "Manage User",
                        to: "/manage-user",
                    },
                    {
                        label: "Manage Roles and Rights",
                        to: "/managerolesandrights",
                    },

                    {
                        label: "Manage Department",
                        to: "/manage-department",
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
                        label: "Create Template",
                        to: "/createtemplate",
                    },
                    {
                        label: "Manage Templates",
                        to: "/managetemplate",
                    },
                    {
                        label: "Upload Template",
                        to: "/smsnotification",
                    },
                    {
                        label: "Draft",
                        to: "/draft",
                    },
                    {
                        label: "Sent",
                        to: "/sent",
                    },
                ],
            },
        ],
    },
];
