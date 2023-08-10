import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { fetchUserLogin } from "./app/store/logInSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

export const AppTopbar = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const confirm1 = (event) => {
    //     confirmPopup({
    //         target: event.currentTarget,
    //         message: 'Are you sure you want to proceed?',
    //         icon: 'pi pi-exclamation-triangle',
    //     });
    // };

    // const logOut = ()=>{
    //     dispatch(fetchUserLogin(null));
    //     history.push("/");
    // }
    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === "light" ? "assets/layout/images/logo-dark.svg" : "assets/layout/images/logo-white.svg"} alt="logo" />
                <span>TeleYork</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                <i style={{ cursor:"pointer", fontSize: "1.5rem" }} className="pi pi-user mt-2"  />
                </li>
            </ul>
        </div>
    );
};
