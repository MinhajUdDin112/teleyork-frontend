import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import MainPrepaidOrders from "./app/features/screens/prepaid_postpaid_orders/prepaid_orders/prepaid_orders_main";
import ShippingQueue from "./app/features/screens/inventory_management/shipping_queue/shipping_queue";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";
import { Route, Routes, useNavigate } from "react-router-dom";
import ClearDeviceReportFlowPage from "./app/features/screens/inventory_management/bulk_processes/clear_device_report/clear_esn_report_flow_page";
import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import AdvanceSearch from "./app/features/screens/search_customer/advance_search/advance_search";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import AcpProgramsFlowPage from "./app/features/screens/company_acp_programs/acp_programs_flow_page";
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
// import IncompleteEnrollments from "./app/features/screens/prepaid_postpaid_orders/IncompleteEnrollments";
// import CompleteEnrollments from "./app/features/screens/prepaid_postpaid_orders/CompleteEnrollments";

import DropshipOrdersFlowPage from "./app/features/screens/inventory_management/dropship_orders/dropship_orders_flow_page";
import RecentSearches from "./app/features/screens/customer_services/RecentSearches";
import PaymentSearchTool from "./app/features/screens/customer_services/PaymentSearchTool";
import AgentStoreLocator from "./app/features/screens/customer_services/AgentStoreLocator";
import DeactivatEsn from "./app/features/screens/customer_services/DeactivatEsn";
import EligibilityProofUpload from "./app/features/screens/customer_services/EligibilityProofUpload";
import DealerWallet from "./app/features/screens/customer_services/DealerWallet";
import PurchaseHistory from "./app/features/screens/customer_services/PurchaseHistory";
import CustomerHistory from "./app/features/screens/customer_services/CustomerHistory";
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
import CustomerProfile from "./app/features/screens/customer_profile/CustomerProfile";
import ManageModelFlowPage from "./app/features/screens/inventory_management/manage_model/model_list";
import UploadBulk from "./app/features/screens/lifeline_orders/UploadBulk";
import Provisioning_queue from "./app/features/screens/lifeline_orders/Provisioning_queue";
import Approved_Enrollments from "./app/features/screens/lifeline_orders/Approved_Enrollments";
import ViewFiles from "./app/features/screens/customer_services/ViewFiles";
import Searchall from "./app/features/screens/search_customer/search_all/search_all";
import BillingConfiguration from "./app/features/screens/inventory_management/BillingConfiguration";
import CustomerUsage from "./app/features/screens/customer_services/CustomerUsage" 
import PrepaidInCompleteEnrollments from "./app/features/screens/prepaid_postpaid_orders/prepaid_orders/components/incomplete_enrollments.js/incomplete";
import InvenotorySearch from "./app/features/screens/search_customer/advance_search/inventory_search/inventory_search";
import PrepaidAllEnrollments from "./app/features/screens/prepaid_postpaid_orders/prepaid_orders/components/all_enrollments.js/all_enrollment";
import PaymentScreen from "./app/features/screens/customer_services/components/PaymentScreen";
import Post_service_availbilty from "./app/features/screens/PostPaid-order/Pages/Post_Service_availbilty";
import Post_enrollment_Flow from "./app/features/screens/PostPaid-order/Pages/post_enrollment_flow";
import Completed_Enrollments from"./app/features/screens/PostPaid-order/PostOrder-Screens/Completed_enrollment";
import All_Enrollments from "./app/features/screens/PostPaid-order/PostOrder-Screens/All_Enrollments"
import Incompleted_Enrollment from "./app/features/screens/PostPaid-order/PostOrder-Screens/Incomplete_ENrollment"
import Rejected_Enrollments from "./app/features/screens/PostPaid-order/PostOrder-Screens/Rejected_Enrollment"
import ApprovedEnrollments from "./app/features/screens/PostPaid-order/PostOrder-Screens/Approved_Enrollment";
import Provisioningqueue from "./app/features/screens/PostPaid-order/PostOrder-Screens/Provising_Queue";
import Upload_Bulk from "./app/features/screens/PostPaid-order/PostOrder-Screens/Bulk_Upload";
import PostPersonalInfo from "./app/features/screens/PostPaid-order/PersonalInfo_com/PersonalInfo";
import Post_Dispatch_Insight from "./app/features/screens/PostPaid-order/PostOrder-Screens/Post_Dispatch_Insights";
const App = () => {
    const loginPerms = localStorage.getItem("permissions");
    const parsedLoginPerms = JSON.parse(loginPerms);
    const [dynamicMenu, setDynamicMenu] = useState([]);
    //CallSearchApi when click on Search
    const [callSearchApi, setCallSearchApi] = useState(false);
    const [searchByValueClick, setSearchByValueClick] = useState(false);
    let token = JSON.parse(localStorage.getItem("accessToken"));
    let protectedRoute = JSON.parse(localStorage.getItem("protectedRoute")) ?? false;
    const [searchBy, setSearchBy] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const [permittedRoutes, setPermittedRoutes] = useState([]);
    const copyTooltipRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    PrimeReact.ripple = true;
    let menuClick = false;
    let mobileTopbarMenuClick = false;
    const { user } = useSelector((state) => state.login);
    //MobileMenu When ACTIVE
    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);
    //TOOLTIP When Change
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
        event.stopPropagation();
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
        event.stopPropagation();
        mobileTopbarMenuClick = true;
        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        event.stopPropagation();
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };
    const onMenuItemClick = (event) => {
        if (event.item.items !== undefined) {
        } else {
            setSearchBy(null);
            setSearchByValueClick(false);
        }
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
    useEffect(() => {
        getPermissions();
    }, [window.localStorage.permissions]);
    useEffect(() => {
        const url = window.location.hash;
        if (url.startsWith("#/selfenrollment")) {
            return;
        }
        if (token) {
            if (protectedRoute === false) {
                localStorage.setItem("protectedRoute", JSON.stringify(true));
                navigate("/");
            } else {
                return;
            }
        } else {
            navigate("/login");
        }
    }, [token]);
    const getPermissions = () => {
        const storedPermissions = localStorage.getItem("permissions");
        if (!storedPermissions) {
            return;
        }
        const permittedRoutes = [];
        const modules = parsedLoginPerms
            .map((node) => {
                if (node.subModule.some((subNode) => subNode?.actions?.some((action) => action?.name === "view"))) {
                    const moduleRoutes = node.subModule
                        .filter((subNode) => subNode?.actions?.some((action) => action?.name === "view"))
                        .map((child) => {
                            permittedRoutes.push(child.route);
                            return {
                                label: child.name,
                                icon: child.icon,
                                to: child.route,
                            };
                        });

                    return {
                        label: node.module,
                        icon: "",
                        items: moduleRoutes,
                    };
                }
                return null;
            })
            .filter((item) => item && item.items.length > 0);

        setDynamicMenu(() => [
            {
                items: modules,
            },
        ]);

        setPermittedRoutes(permittedRoutes);
    };
    const isPermitted = (route) => {
        let permedRoutes = permittedRoutes;
        return permedRoutes.includes(route);
    };

    return (
        <>
            {protectedRoute === true ? (
                <div className={wrapperClass} onClick={onWrapperClick}>
                    <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
                    <AppTopbar
                        searchBy={searchBy}
                        searchValue={searchValue}
                        setSearchBy={setSearchBy}
                        setSearchByValueClick={setSearchByValueClick}
                        setSearchValue={setSearchValue}    
                        searchByValueClick={searchByValueClick} 
                        setCallSearchApi={setCallSearchApi}
                        onToggleMenuClick={onToggleMenuClick}
                        layoutColorMode={layoutColorMode}
                        mobileTopbarMenuActive={mobileTopbarMenuActive}
                        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
                        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
                    />
                    <div className="layout-sidebar">
                        <AppMenu model={dynamicMenu} onMenuItemClick={onMenuItemClick} setCallSearchApi={setCallSearchApi} searchByValueClick={searchByValueClick} onSidebarClick={onSidebarClick} layoutColorMode={layoutColorMode} />
                    </div>
                    <div className="layout-main-container ">
                        <div className="layout-main">
                            {searchBy !== null || searchByValueClick ? (
                                searchByValueClick ? (
                                    <Searchall setSearchByValueClick={setSearchByValueClick} callSearchApi={callSearchApi} searchValue={searchValue} setSearchBy={setSearchBy} />
                                ) : searchBy.code === "advance search" ? (
                                    <AdvanceSearch setSearchBy={setSearchBy} />
                                ) :searchBy.code === "inventorysearch" ? (<h1> 
                                     <InvenotorySearch/>
                                </h1>):(
                                    <div className="card searchby flex flex-row flex-wrap justify-content-around align-items-center">
                                        <div>
                                            <h1 className="text-center w-full ">{searchBy.name}</h1>
                                            <h5 className="text-center w-full mt-4 ">Get Ready! We are working on something really cool.</h5>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <Routes>
                                    <Route path="*" element={<NotFound />} />
                                    {permittedRoutes.length !== 0 ? <Route path="/" element={<Dashboard permittedRoutes={permittedRoutes} />} /> : undefined}
                                    <Route path="/shipping-queues" element={isPermitted("/shipping-queues") ? <ShippingQueue /> : <Dashboard />} />
                                    <Route path="/bulkprocesses/bulk-clear-device" element={isPermitted("/bulkprocesses") ? <ClearDeviceReportFlowPage /> : <Dashboard />} />
                                    <Route path="/bulkprocesses/bulk-clear-esn" element={isPermitted("/bulkprocesses") ? <ClearEsnReportFlowPage /> : <Dashboard />} />
                                     <Route path="/prepaid-newenrollment" element={isPermitted("/prepaid-newenrollment") ? <MainPrepaidOrders /> : <Dashboard />}/>
                                    <Route path="/bulkprocesses/bulk-deactivate-mdn" element={isPermitted("/bulkprocesses") ? <DeactivateMdnFlowPage /> : <Dashboard />} />
                                    <Route path="/bulkprocesses/bulk-swap-esn" element={isPermitted("/bulkprocesses") ? <SwapEsnReportFlowPage /> : <Dashboard />} />
                                    <Route path="/emei-drawer" element={isPermitted("/emei-drawer") ? <ImeiDrawer /> : <Dashboard />} />
                                    <Route path="/manage-model" element={isPermitted("/manage-model") ? <ManageModelFlowPage /> : <Dashboard />} />
                                    <Route path="/manageinventory" element={isPermitted("/manageinventory") ? <Manage_inventory /> : <Dashboard />} />
                                    <Route path="/esn-sim-drawer" element={isPermitted("/esn-sim-drawer") ? <EsnSimDrawer /> : <Dashboard />} />
                                    <Route path="/dropshiporders" element={isPermitted("/dropshiporders") ? <DropshipOrdersFlowPage /> : <Dashboard />} />
                                    <Route path="/inventory-report" element={isPermitted("/inventory-report") ? <InventoryReport /> : <Dashboard />} />
                                    <Route path="/companyacpprograms" element={isPermitted("/companyacpprograms") ? <AcpProgramsFlowPage /> : <Dashboard />} />
                                    <Route path="/newenrolment" element={isPermitted("/newenrolment") ? <ServiceAvailablityPage /> : <Dashboard />} />
                                    {/* <Route path="/enrollment" element={isPermitted("/enrollment") ? <EnrollmentFlowPage /> : <Dashboard />} /> */}
                                    <Route path="/enrollment" element={<EnrollmentFlowPage />} />
                                    <Route path="/post-enrollment" element={<Post_enrollment_Flow />} />
                                    <Route path="/managerolesandrights/*" element={isPermitted("/managerolesandrights") ? <ManageRolesAndRights /> : <Dashboard />} />
                                    <Route path="/invoice" element={isPermitted("/invoice") ? <InvoicePage /> : <Dashboard />} />
                                    <Route path="/all-enrollments" element={isPermitted("/all-enrollments") ? <AllEnrollments /> : <Dashboard />} />
                                    <Route path="/bulk-upload" element={isPermitted("/bulk-upload") ? <UploadBulk /> : <Dashboard />} />
                                    <Route path="/completedenrollments" element={isPermitted("/completedenrollments") ? <CompletedEnrollments /> : <Dashboard />} />
                                    <Route path="/incompleteenrollments" element={isPermitted("/incompleteenrollments") ? <InCompletedEnrollments /> : <Dashboard />} />
                                    <Route path="/rejectedenrollments" element={isPermitted("/rejectedenrollments") ? <RejectedEnrollments /> : <Dashboard />} />
                                    <Route path="/prepaid-incompleteenrollment" element={isPermitted("/prepaid-incompleteenrollment") ? <PrepaidInCompleteEnrollments /> : <Dashboard />} />
                                    <Route path="/nladresolutionstatus" element={isPermitted("/nladresolutionstatus") ? <NLADResolutionStatus /> : <Dashboard />} />
                                    <Route path="/handovereventorder" element={isPermitted("/handovereventorder") ? <HandoverEventOrder /> : <Dashboard />} />
                                    <Route path="/pendingeventorder" element={isPermitted("/pendingeventorder") ? <PendingEventOrder /> : <Dashboard />} />
                                    <Route path="/withoutproofenrollments" element={isPermitted("/withoutproofenrollments") ? <WithoutProofEnrollments /> : <Dashboard />} />
                                    <Route path="/withproofenrollments" element={isPermitted("/withproofenrollments") ? <WithProofEnrollments /> : <Dashboard />} />
                                   
                                  
                                  
                                    <Route path="/recentsearches" element={isPermitted("/recentsearches") ? <RecentSearches /> : <Dashboard />} />
                                   <Route path="/usage" element={isPermitted("/usage") ? <CustomerUsage /> : <Dashboard />} />
                                    <Route path="/purchasehistory" element={isPermitted("/purchasehistory") ? <PurchaseHistory /> : <Dashboard />} />
                                    <Route path="/customerhistory" element={isPermitted("/customerhistory") ? <CustomerHistory /> : <Dashboard />} />
                                    <Route path="/agentstorelocator" element={isPermitted("/agentstorelocator") ? <AgentStoreLocator /> : <Dashboard />} />
                                    <Route path="/deactivateesn" element={isPermitted("/deactivateesn") ? <DeactivatEsn /> : <Dashboard />} />
                                    <Route path="/tickets" element={isPermitted("/tickets") ? <Tickets /> : <Dashboard />} />
                                    <Route path="/eligibilityproofupload" element={isPermitted("/eligibilityproofupload") ? <EligibilityProofUpload /> : <Dashboard />} />
                                    <Route path="/dealerwallet" element={isPermitted("/dealerwallet") ? <DealerWallet /> : <Dashboard />} />
                                    <Route path="/orderhistory" element={isPermitted("/orderhistory") ? <OrderHistory /> : <Dashboard />} />
                                    <Route path="/viewfile" element={isPermitted("/viewfile") ? <ViewFiles /> : <Dashboard />} />
                                    <Route path="/prepaid-allenrollment" element={isPermitted("/prepaid-allenrollment") ? <PrepaidAllEnrollments /> : <Dashboard />} />

                                    <Route path="/smsnotification" element={isPermitted("/smsnotification") ? <Upload /> : <Dashboard />} />
                                    <Route path="/sent" element={isPermitted("/sent") ? <Sent /> : <Dashboard />} />
                                    <Route path="/draft" element={isPermitted("/draft") ? <Draft /> : <Dashboard />} />
                                    <Route path="/provisioning-queue" element={isPermitted("/provisioning-queue") ? <Provisioning_queue /> : <Dashboard />} />

                                    <Route path="/approved-enrollments" element={isPermitted("/approved-enrollments") ? <Approved_Enrollments /> : <Dashboard />} />

                                    {/* <Route path="/draftall/:id" element={isPermitted("/draftall") ? <ShowDraftAll /> : <Dashboard />} />
                                <Route path="/sentall/:id" element={isPermitted("/sentall") ? <ShowSentAll /> : <Dashboard />} /> */}

                                    <Route path="/draftall/:id" element={<ShowDraftAll />} />
                                    <Route path="/sentall/:id" element={<ShowSentAll />} />
                                    <Route path="/selfenrollment" element={isPermitted("/selfenrollment") ? <VerifyZip /> : <Dashboard />} />
                                    <Route path="/personalinfo" element={isPermitted("/selfenrollment") ? <PersonalInfo /> : <Dashboard />} />
                                    <Route path="/selfaddress" element={isPermitted("/selfenrollment") ? <Address /> : <Dashboard />} />
                                    <Route path="/selfeligibile" element={isPermitted("/selfenrollment") ? <Eligibility /> : <Dashboard />} />
                                    <Route path="/nationalverifier" element={isPermitted("/selfenrollment") ? <NationalVerifier /> : <Dashboard />} />
                                    <Route path="/resumeapplication" element={isPermitted("/selfenrollment") ? <ResumeApplication /> : <Dashboard />} />

                                    <Route path="/createtemplate" element={isPermitted("/createtemplate") ? <CreateTemplate /> : <Dashboard />} />
                                    <Route path="/managetemplate/*" element={isPermitted("/managetemplate") ? <ManageTemplate /> : <Dashboard />} />
                                    <Route path="/createrole" element={isPermitted("/createrole") ? <CreateRole /> : <Dashboard />} />
                                    <Route path="/manage-user" element={isPermitted("/manage-user") ? <ManageUser /> : <Dashboard />} />
                                    {/* <Route path="/create-user" element={isPermitted("/create-user") ? <CreateUser /> : <Dashboard />} /> */}
                                    <Route path="/create-user" element={<CreateUser />} />
                                    <Route path="/edit-user" element={isPermitted("/edit-user") ? <EditUser /> : <Dashboard />} />
                                    <Route path="/manage-department" element={isPermitted("/manage-department") ? <Manage_Department /> : <Dashboard />} />
                                    <Route path="/edit-department" element={isPermitted("/edit-department") ? <EditDepartment /> : <Dashboard />} />
                                    <Route path="/create-department" element={isPermitted("/create-department") ? <CreateDepartment /> : <Dashboard />} />
                                    {/* <Route exact path="/customer-profile" element={isPermitted("/customer-profile") ? <CustomerProfile /> : <Dashboard />} /> */}
                                     <Route exact path="/customer-profile" element={ <CustomerProfile /> } />

                                    <Route exact path="/billingconfiguration" element={isPermitted("/billingconfiguration") ? <BillingConfiguration /> : <Dashboard />} />

                                    {/* PostPaid Order Route */}
                                    <Route exact path="postpaid-newenrollment" element={isPermitted("/postpaid-newenrollment") ? <Post_service_availbilty /> : <Dashboard />} />
                                    <Route exact path="postpaid-complete" element={isPermitted("/postpaid-complete") ? <Completed_Enrollments /> : <Dashboard />} />
                                    <Route exact path="postpaid-allenrollment" element={isPermitted("/postpaid-allenrollment") ? <All_Enrollments /> : <Dashboard />} />
                                    <Route exact path="postpaid-incomplete" element={isPermitted("/postpaid-incomplete") ? <Incompleted_Enrollment /> : <Dashboard />} />
                                    <Route exact path="postpaid-rejectedenrollment" element={isPermitted("/postpaid-rejectedenrollment") ? <Rejected_Enrollments /> : <Dashboard />} />
                                    <Route exact path="postpaid-approvedenrollment" element={isPermitted("/postpaid-approvedenrollment") ? <ApprovedEnrollments/> : <Dashboard />} />
                                    <Route exact path="postpaid-dispatchinsight" element={isPermitted("/postpaid-dispatchinsight") ? <Post_Dispatch_Insight/> : <Dashboard />} />
                                    <Route path="/Postpersonalinfo" element={<PostPersonalInfo/>} />

                                </Routes>
                            )}
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
                    <Route path="/personalinfo" element={<PersonalInfo />} />
                    <Route path="/selfaddress" element={<Address />} />
                    <Route path="/selfeligibile" element={<Eligibility />} />
                    <Route path="/nationalverifier" element={<NationalVerifier />} />
                    <Route path="/resumeapplication" element={<ResumeApplication />} />
                </Routes>
            )}
        </>
    );
};

export default App;
