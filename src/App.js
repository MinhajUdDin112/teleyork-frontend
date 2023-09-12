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
import CreateTemplate from "./app/features/screens/sms_notification/CreateTemplate";
import ManageTemplate from "./app/features/screens/sms_notification/ManageTemplate";
import ShowDraftAll from "./app/features/screens/sms_notification/ShowDraftAll";
import ShowSentAll from "./app/features/screens/sms_notification/ShowSentAll";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "./app/features/screens/dashboard/Dashboard";
import LoginScreen from "./app/features/screens/auth/login_screen";
import { menuNavigation } from "./navigation";
import AddRoles from "./app/features/screens/RolesAndRights/AddRoles";

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
    const history = useHistory();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;
    const { user } = useSelector((state) => state.login);

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

    let token = JSON.parse(localStorage.getItem("accessToken"));
    let protectedRoute = JSON.parse(localStorage.getItem("protectedRoute")) ?? false;

    useEffect(() => {
        if (token) {
            if (protectedRoute === false) {
                history.push("/");
                localStorage.setItem("protectedRoute", JSON.stringify(true));
            } else {
                return;
            }
        } else {
            history.push("/login");
        }
    }, [token]);

    return (
        <>
            {protectedRoute === true ? (
                <div className={wrapperClass} onClick={onWrapperClick}>
                    <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

                    <div className="layout-sidebar" onClick={onSidebarClick}>
                        <AppMenu model={menuNavigation} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                    </div>

                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Switch>
                                <Route exact path="/" component={Dashboard} />
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
                                <Route path="/selfenrollment" component={VerifyZip} />
                                <Route path="/personalinfo" component={PersonalInfo} />
                                <Route path="/address" component={Address} />
                                <Route path="/eligibile" component={Eligibility} />
                                <Route path="/nationalverifier" component={NationalVerifier} />
                                <Route path="/resumeapplication" component={ResumeApplication} />
                                <Route path="/createtemplate" component={CreateTemplate} />
                                <Route path="/managetemplate" component={ManageTemplate} />
                                <Route path="/createrole" component={AddRoles} />
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
            ) : (
                <Route path="/login" component={LoginScreen} />
            )}
        </>
    );
};

export default App;
