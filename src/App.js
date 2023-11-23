import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";
import { Route, Routes, useNavigate } from "react-router-dom";
import ClearDeviceReportFlowPage from "./app/features/screens/inventory_management/bulk_processes/clear_device_report/clear_esn_report_flow_page";
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
import AcpProgramsFlowPage from "./app/features/screens/company_acp_programs/acp_programs_flow_page"
import ServiceAvailablityPage from "./app/features/screens/eligiblityForEnrollment/pages/service_availblity_page";
import EnrollmentFlowPage from "./app/features/screens/eligiblityForEnrollment/pages/enrollment_flow_page";
import InvoicePage from "./app/features/screens/billing_and_invoices/pages/InvoicePage";
import AllEnrollments from "./app/features/screens/lifeline_orders/AllEnrollments";
import ManageRolesAndRights from "./app/features/screens/roles_and_permissions/ManageRolesAndRights";
import Manage_inventory from "./app/features/screens/inventory_management/manage-inventory/manage_inventory";
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
import DropshipOrdersFlowPage from "./app/features/screens/inventory_management/dropship_orders/dropship_orders_flow_page";
import RecentSearches from "./app/features/screens/customer_services/RecentSearches";
import PaymentSearchTool from "./app/features/screens/customer_services/PaymentSearchTool";
import AgentStoreLocator from "./app/features/screens/customer_services/AgentStoreLocator";
import DeactivatEsn from "./app/features/screens/customer_services/DeactivatEsn";
import EligibilityProofUpload from "./app/features/screens/customer_services/EligibilityProofUpload";
import DealerWallet from "./app/features/screens/customer_services/DealerWallet";
import PurchaseHistory from "./app/features/screens/customer_services/PurchaseHistory";
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
import Dashboard from "./app/features/screens/dashboard/Dashboard";
import LoginScreen from "./app/features/screens/auth/login_screen";
import { menuNavigation } from "./navigation";
import CreateRole from "./app/features/screens/roles_and_permissions/CreateRole";
import CreateUser from "./app/features/screens/user_management/CreateUser";
import ManageUser from "./app/features/screens/user_management/ManageUser";
import EditUser from "./app/features/screens/user_management/EditUser";
import Manage_Department from "./app/features/screens/user_management/Manage_Department";
import CreateDepartment from "./app/features/screens/user_management/CreateDepartment";
import EditDepartment from "./app/features/screens/user_management/EditDepartment";
import NotFound from "./app/features/screens/not_found/NotFound";
import Tickets from "./app/features/screens/customer_services/Tickets";
import OrderHistory from "./app/features/screens/customer_services/OrderHistory";
import ClearEsnReportFlowPage from "./app/features/screens/inventory_management/bulk_processes/clear_esn_report/clear_esn_report_flow_page";
import DeactivateMdnFlowPage from "./app/features/screens/inventory_management/bulk_processes/deactivate_mdn_report/clear_mdn_report_flow_page";
import SwapEsnReportFlowPage from "./app/features/screens/inventory_management/bulk_processes/swap_esn_report/swap_esn_report_flow_page";
import ImeiDrawer from "./app/features/screens/inventory_management/imei-drawer/imei-drawer";
import EsnSimDrawer from "./app/features/screens/inventory_management/esn_sim_drawer/esn_sim_drawer";
import InventoryReport from "./app/features/screens/inventory_management/inventory_report.js/inventory_report";
import CustomerProfile from "./app/features/screens/customer_profile/pages/CustomerProfile";


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
    const navigate = useNavigate();
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

        const url = window.location.hash

        if (url.startsWith('#/selfenrollment')) { return }
        if (token) {
            if (protectedRoute === false) {
                navigate("/");
                localStorage.setItem("protectedRoute", JSON.stringify(true));
            } else {
                return;
            }
        } else {
            navigate("/login");
        }
    }, [token]);

    const loginPerms = localStorage.getItem("permissions")
    const parsedLoginPerms = JSON.parse(loginPerms)

    console.log('parsedLoginPerms', parsedLoginPerms)

    const [dynamicMenu, setDynamicMenu] = useState([{

        // Initial state
        items: [
            {
                label: "Dashboard",
                icon: "pi pi-fw pi-home",
                to: "/",
            }
        ],

    }])

    const getPermissions = () => {
        if (localStorage.getItem('permissions') === null) {
            return;
        }
        else {
            console.log("here")
            let modules = parsedLoginPerms.map((node) => {
                return {
                    label: node?.module,
                    icon: "",
                    items: node.subModule.map((child) => {
                        return {
                            label: child?.name,
                            icon: child?.icon,
                            to: child?.route
                        }
                    })
                }
            })
            modules = modules.filter((item) => item.items.length > 0)
            setDynamicMenu((prev) => {
                return [...prev, {
                    items: modules
                }]
            });
        }
    }

    useEffect(() => {
        getPermissions()
    }, [window.localStorage.permissions]);

    return (
        <>
            {protectedRoute === true ? (
                <div className={wrapperClass} onClick={onWrapperClick}>
                    <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

                    <div className="layout-sidebar" onClick={onSidebarClick}>
                        <AppMenu model={dynamicMenu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                    </div>

                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Routes>
                                <Route path="*" element={<NotFound />} />
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/bulkprocesses/bulk-clear-esn" element={<ClearEsnReportFlowPage />} />

                                <Route path="/bulkprocesses/bulk-clear-device" element={<ClearDeviceReportFlowPage />} />
                                <Route path="/bulkprocesses/bulk-deactivate-mdn" element={< DeactivateMdnFlowPage />} />
                                <Route path="/bulkprocesses/bulk-swap-esn" element={< SwapEsnReportFlowPage />} />
                                <Route path="/emei-drawer" element={<ImeiDrawer />} />
                                <Route path="/esn-sim-drawer" element={<EsnSimDrawer />} />
                                <Route path="/inventory-report" element={<InventoryReport />} />
                                <Route path="/companyacpprograms" element={<AcpProgramsFlowPage />} />
                                <Route path="/newenrolment" element={<ServiceAvailablityPage />} />
                                <Route path="/enrollment" element={<EnrollmentFlowPage />} />
                                <Route path="/managerolesandrights/*" element={<ManageRolesAndRights />} />
                                <Route path="/invoice" element={<InvoicePage />} />
                                <Route path="/all-enrollments" element={<AllEnrollments />} />
                                <Route path="/completedenrollments" element={<CompletedEnrollments />} />
                                <Route path="/incompleteenrollments" element={<InCompletedEnrollments />} />
                                <Route path="/rejectedenrollments" element={<RejectedEnrollments />} />
                                <Route path="/nladresolutionstatus" element={<NLADResolutionStatus />} />
                                <Route path="/handovereventorder" element={<HandoverEventOrder />} />
                                <Route path="/pendingeventorder" element={<PendingEventOrder />} />
                                <Route path="/withoutproofenrollments" element={<WithoutProofEnrollments />} />
                                <Route path="/withproofenrollments" element={<WithProofEnrollments />} />
                                <Route path="/incomplete" element={<IncompleteEnrollments />} />
                                <Route path="/completeenrollments" element={<CompleteEnrollments />} />
                                <Route path="/bulkportin" element={<BulkPortin />} />
                                <Route path="/allenrollmentorders" element={<Allenrollments />} />
                                <Route path="/recentsearches" element={<RecentSearches />} />
                                <Route path="/paymentsearchtool" element={<PaymentSearchTool />} />
                                <Route path="/purchasehistory" element={<PurchaseHistory />} />
                                <Route path="/agentstorelocator" element={<AgentStoreLocator />} />
                                <Route path="/deactivateesn" element={<DeactivatEsn />} />
                                <Route path="/tickets" element={<Tickets />} />
                                <Route path="/eligibilityproofupload" element={<EligibilityProofUpload />} />
                                <Route path="/dealerwallet" element={<DealerWallet />} />
                                <Route path="/orderhistory" element={<OrderHistory />} />
                                <Route path="/manageinventory" element={<Manage_inventory />} />
                                <Route path="/smsnotification" element={<Upload />} />
                                <Route path="/sent" element={<Sent />} />
                                <Route path="/draft" element={<Draft />} />
                                <Route path="/draftall/:id" element={<ShowDraftAll />} />
                                <Route path="/sentall/:id" element={<ShowSentAll />} />
                                <Route path="/selfenrollment" element={<VerifyZip />} />
                                <Route path="/selfenrollment/personalinfo/:id" element={<PersonalInfo />} />
                                <Route path="/selfenrollment/address/:id" element={<Address />} />
                                <Route path="/selfenrollment/eligibile/:id" element={<Eligibility />} />
                                <Route path="/selfenrollment/nationalverifier/:id" element={<NationalVerifier />} />
                                <Route path="/selfenrollment/resumeapplication" element={<ResumeApplication />} />
                                <Route path="/createtemplate" element={<CreateTemplate />} />
                                <Route path="/managetemplate/*" element={<ManageTemplate />} />
                                <Route path="/createrole" element={<CreateRole />} />
                                <Route path="/dropshiporders" element={<DropshipOrdersFlowPage />} />
                                <Route path="/manage-user" element={<ManageUser />} />
                                <Route path="/create-user" element={<CreateUser />} />
                                <Route path="/edit-user" element={<EditUser />} />
                                <Route path="/manage-department" element={<Manage_Department />} />
                                <Route path="/edit-department" element={<EditDepartment />} />
                                <Route path="/create-department" element={<CreateDepartment />} />
                                <Route path="/customer-profile" element={<CustomerProfile />} />
                            </Routes>
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
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/selfenrollment" element={<VerifyZip />} />
                    <Route path="/selfenrollment/personalinfo/:id" element={<PersonalInfo />} />
                    <Route path="/selfenrollment/address/:id" element={<Address />} />
                    <Route path="/selfenrollment/eligibile/:id" element={<Eligibility />} />
                    <Route path="/selfenrollment/nationalverifier/:id" element={<NationalVerifier />} />
                    <Route path="/selfenrollment/resumeapplication" element={<ResumeApplication />} />

                </Routes>
            )
            }
        </>
    );
};

export default App;
