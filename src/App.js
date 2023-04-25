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
                        { label: "New Enrollments", icon: "", to: "/eligibility" },
                        { label: "All Enrollments", icon: "", to: "/allenrollments" },
                        { label: "With Proof Enrollments", icon: "", to: "/withproofenrollments" },
                        { label: "Without Proof Enrollments", icon: "", to: "/withoutproofenrollments" },
                        { label: "Completed Enrollments", icon: "", to: "/completedenrollments" },
                        { label: "Incomplete Enrollments", icon: "", to: "/incompleteenrollments" },
                        { label: "Rejected Enrollments", icon: "", to: "/rejectedenrollments" },
                        { label: "NLAD Resolution Status (PC244)", icon: "", to: "/nladresolutionstatus" },
                        { label: "Handover Event Order (PC261)", icon: "", to: "/handovereventorder" },
                        { label: "Pending Event Order (PC262)", icon: "", to: "/pendingeventorder" },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: "Customer Service  (PC400)",
                    items: [
                        {
                            label: "Customer Profile (PC56)",
                            icon: "",
                            to: "",
                        },
                        {
                            label: "Billing and Invoice (PC75)",
                            icon: "",
                            to: "/invoice",
                        },
                        {
                            label: "Order History (PC76)",
                            icon: "",
                            to: "",
                        },
                    ],
                },
            ],
        },
        {
            items: [
                {
                    label: "Prepaid/Postpaid Oredrs (PC109)",
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
                        <Route exact path="/eligibility" component={ServiceAvailablityPage} />
                        <Route exact path="/enrollment" component={EnrollmentFlowPage} />
                        <Route exact path="/invoice" component={InvoicePage} />
                        <Route exact path="/allenrollments" component={AllEnrollments} />
                        <Route exact path="/completedenrollments" component={CompletedEnrollments} />
                        <Route exact path="/incompleteenrollments" component={InCompletedEnrollments} />
                        <Route exact path="/rejectedenrollments" component={RejectedEnrollments} />
                        <Route exact path="/nladresolutionstatus" component={NLADResolutionStatus} />
                        <Route exact path="/handovereventorder" component={HandoverEventOrder} />
                        <Route exact path="/pendingeventorder" component={PendingEventOrder} />
                        <Route exact path="/withoutproofenrollments" component={WithoutProofEnrollments} />
                        <Route exact path="/withproofenrollments" component={WithProofEnrollments} />
                        <Route exact path="/incomplete" component={IncompleteEnrollments} />
                        <Route exact path="/completeenrollments" component={CompleteEnrollments} />
                        <Route exact path="/bulkportin" component={BulkPortin} />
                        <Route exact path="/allenrollmentorders" component={Allenrollments} />
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
    );
};

export default App;
