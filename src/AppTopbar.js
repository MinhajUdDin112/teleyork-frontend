import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { logout } from "./app/store/auth/AuthSlice";

export const AppTopbar = (props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

      // Get user data from localStorage
  const loginRes = localStorage.getItem("userData");
  const parseLoginRes = JSON.parse(loginRes);



    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                
                <span>{parseLoginRes?.companyName}</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>
            <ConfirmPopup target={document.getElementById("li")} visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to logout?" acceptLabel="Logout" accept={handleLogout} />
            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <i id="li" style={{ cursor: "pointer", fontSize: "1.5rem" }} className="pi pi-user mt-2" onClick={() => setVisible(true)} />
                </li>
            </ul>
        </div>
    );
};
