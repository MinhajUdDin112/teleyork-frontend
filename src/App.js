import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Switch, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";
import { Route } from "react-router-dom";

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import ServiceAvailablityPage from "./app/features/screens/eligiblity/pages/service_availblity_page";
import EnrollmentFlowPage from "./app/features/screens/eligiblity/pages/enrollment_flow_page";
import InvoicePage from "./app/features/screens/billing_and_invoices/pages/InvoicePage";
import AllEnrollments from "./app/features/screens/lifeline_orders/AllEnrollments";
import CompletedEnrollments from "./app/features/screens/lifeline_orders/CompletedEnrollments";
import InCompletedEnrollments from "./app/features/screens/lifeline_orders/InCompleteEnrollments";
import RejectedEnrollments from "./app/features/screens/lifeline_orders/RejectedEnrolments";
import NLADResolutionStatus from "./app/features/screens/lifeline_orders/NLADResolutionStatus";
import HandoverEventOrder from "./app/features/screens/lifeline_orders/HandoverEventOrder";
import PendingEventOrder from "./app/features/screens/lifeline_orders/PendingEventOrder";
import WithProofEnrollments from "./app/features/screens/lifeline_orders/WithProofEnrollments";
import WithoutProofEnrollments from "./app/features/screens/lifeline_orders/WithoutProofEnrollments";
import IncompleteEnrollments from "./app/features/screens/prepaid_postpaid_orders/IncompleteEnrollments";
import CompleteEnrollments from "./app/features/screens/prepaid_postpaid_orders/CompleteEnrollments";
import BulkPortin from "./app/features/screens/prepaid_postpaid_orders/BulkPortin";
import Allenrollments from "./app/features/screens/prepaid_postpaid_orders/AllEnrollments_PP";
import RecentSearches from "./app/features/screens/customer_services/RecentSearches";
import PaymentSearchTool from "./app/features/screens/customer_services/PaymentSearchTool";
import AgentStoreLocator from "./app/features/screens/customer_services/AgentStoreLocator";
import EligibilityProofUpload from "./app/features/screens/customer_services/EligibilityProofUpload";
import DealerWallet from "./app/features/screens/customer_services/DealerWallet";
import SmsNotification from "./app/features/screens/sms_notification/Upload";
import Upload from "./app/features/screens/sms_notification/Upload";
import Sent from "./app/features/screens/sms_notification/Sent";
import Draft from "./app/features/screens/sms_notification/Draft";
import VerifyZip from "./app/features/screens/self_enrollment/VerifyZip";
import PersonalInfo from "./app/features/screens/self_enrollment/PersonalInfo";
import Address from "./app/features/screens/self_enrollment/Address";
import Eligibility from "./app/features/screens/self_enrollment/Eligibility";
import NationalVerifier from "./app/features/screens/self_enrollment/NationalVerifier";
import ResumeApplication from "./app/features/screens/self_enrollment/ResumeApplication";
import { useSelector } from "react-redux";
import LoginScreen from "./app/features/screens/auth/pages/login_screen";
import CreateTemplate from "./app/features/screens/sms_notification/CreateTemplate";
import ManageTemplate from "./app/features/screens/sms_notification/ManageTemplate";
import ShowDraftAll from "./app/features/screens/sms_notification/ShowDraftAll";
import ShowSentAll from "./app/features/screens/sms_notification/ShowSentAll";

const App = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;
    const { user } = useSelector((state) => state.login);

    console.log('user', user)

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
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
                        { label: "New Enrollment", icon: "", to: "/eligibility" },
                        { label: "Self Enrollment", icon: "", to: "/verifyzip" },
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

    // const menu1 = [
    //     {
    //         label: "Home",
    //         items: [
    //             {
    //                 label: "Dashboard",
    //                 icon: "pi pi-fw pi-home",
    //                 to: "/dashboard",
    //             },
    //         ],
    //     },
    //     {
    //         label: "UI Components",
    //         icon: "pi pi-fw pi-sitemap",
    //         items: [
    //             { label: "Form Layout", icon: "pi pi-fw pi-id-card", to: "/formlayout" },
    //             { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
    //             { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
    //             { label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate" },
    //             { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
    //             { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
    //             { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
    //             { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
    //             { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
    //             { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
    //             { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
    //             { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
    //             { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
    //             { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
    //             { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
    //             { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" },
    //         ],
    //     },
    //     {
    //         label: "Icons",
    //         items: [{ label: "PrimeIcons", icon: "pi pi-fw pi-prime", to: "/icons" }],
    //     },
    //     {
    //         label: "Pages",
    //         icon: "pi pi-fw pi-clone",
    //         items: [
    //             { label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
    //             { label: "Timeline", icon: "pi pi-fw pi-calendar", to: "/timeline" },
    //             { label: "Empty", icon: "pi pi-fw pi-circle-off", to: "/empty" },
    //         ],
    //     },

    //     // {
    //     //     label: "Get Started",
    //     //     items: [
    //     //         {
    //     //             label: "Documentation",
    //     //             icon: "pi pi-fw pi-question",
    //     //             command: () => {
    //     //                 window.location = "#/documentation";
    //     //             },
    //     //         },
    //     //         {
    //     //             label: "View Source",
    //     //             icon: "pi pi-fw pi-search",
    //     //             command: () => {
    //     //                 window.location = "https://github.com/primefaces/sakai-react";
    //     //             },
    //     //         },
    //     //     ],
    //     // },
    // ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    return (
        <>
            {Object.keys(user).length === 0 ? (
                <>
                    <Route exact path="/" component={LoginScreen} />
                </>
            ) : (
                <>
                    <Switch>
                        <Route exact path="/eligibile">
                            <eligibility_info_page />
                        </Route>
                    </Switch>
                    <div className={wrapperClass} onClick={onWrapperClick}>
                        <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                        <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

                        <div className="layout-sidebar" onClick={onSidebarClick}>
                            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                        </div>

                        <div className="layout-main-container">
                            <div className="layout-main">
                                <Switch>
                                    <Route exact path="/" component={ServiceAvailablityPage} />
                                    <Route path="/eligibility" component={ServiceAvailablityPage} />
                                    <Route path="/enrollment" component={EnrollmentFlowPage} />
                                    <Route path="/invoice" component={InvoicePage} />
                                    <Route path="/allenrollments" component={AllEnrollments} />
                                    <Route path="/completedenrollments" component={CompletedEnrollments} />
                                    <Route path="/incompleteenrollments" component={InCompletedEnrollments} />
                                    <Route path="/rejectedenrollments" component={RejectedEnrollments} />
                                    <Route path="/nladresolutionstatus" component={NLADResolutionStatus} />
                                    <Route path="/handovereventorder" component={HandoverEventOrder} />
                                    <Route path="/pendingeventorder" component={PendingEventOrder} />
                                    <Route path="/withoutproofenrollments" component={WithoutProofEnrollments} />
                                    <Route path="/withproofenrollments" component={WithProofEnrollments} />
                                    <Route path="/incomplete" component={IncompleteEnrollments} />
                                    <Route path="/completeenrollments" component={CompleteEnrollments} />
                                    <Route path="/bulkportin" component={BulkPortin} />
                                    <Route path="/allenrollmentorders" component={Allenrollments} />
                                    <Route path="/recentsearches" component={RecentSearches} />
                                    <Route path="/paymentsearchtool" component={PaymentSearchTool} />
                                    <Route path="/agentstorelocator" component={AgentStoreLocator} />
                                    <Route path="/eligibilityproofupload" component={EligibilityProofUpload} />
                                    <Route path="/dealerwallet" component={DealerWallet} />
                                    <Route path="/smsnotification" component={Upload} />
                                    <Route path="/sent" component={Sent} />
                                    <Route path="/draft" component={Draft} />
                                    <Route path="/draftall/:id" component={ShowDraftAll} />
                                    <Route path="/sentall/:id" component={ShowSentAll} />
                                    <Route path="/verifyzip" component={VerifyZip} />
                                    <Route path="/personalinfo" component={PersonalInfo} />
                                    <Route path="/address" component={Address} />
                                    <Route path="/eligibile" component={Eligibility} />
                                    <Route path="/nationalverifier" component={NationalVerifier} />
                                    <Route path="/resumeapplication" component={ResumeApplication} />
                                    <Route path="/createtemplate" component={CreateTemplate} />
                                    <Route path="/managetemplate" component={ManageTemplate} />
                                </Switch>
                                {/* <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} /> */}
                            </div>

                            <AppFooter layoutColorMode={layoutColorMode} />
                        </div>

                        <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

                        <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                            <div className="layout-mask p-component-overlay"></div>
                        </CSSTransition>
                    </div>
                </>
            )}
        </>
    );
};

export default App;
