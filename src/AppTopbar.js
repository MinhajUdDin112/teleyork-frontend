import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { logout } from "./app/store/auth/AuthSlice";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";

export const AppTopbar = (props) => {     
    console.log(props)
   
    const [visibleSearch, setVisibleSearch] = useState(false);
    
    const countries = [
        { name: "Inventory Search", code: "inventorysearch" },
        { name: "Payment Search", code: "paymentsearch" },
        { name: "Recent Searches", code: "recentsearches" },
        { name: "Advance Search", code: "advance search" },
    ];

    const countryTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                {option.name === "Payment Search" ? (
                    <img src="/images/Dashboard-Search/payment-search.png" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : option.name === "Recent Searches" ? (
                    <img src="/images/Dashboard-Search/recent-search.png" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : option.name === "Advance Search" ? (
                    <img src="/images/Dashboard-Search/advance-search.png" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : (
                    <img src="/images/Dashboard-Search/inventory-search.png" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                )}
                <div>{option.name}</div>
            </div>
        );
    };
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

    const CustomMessage = () => (
        <div className="flex flex-column w-15rem">
            <i className="pi pi-user p-mr-2 text-center" style={{ fontSize: "2rem" }}></i>
            <p className="text-center mt-2" style={{ fontSize: "1.5rem" }}>
                {parseLoginRes?.userName ? parseLoginRes?.userName.toUpperCase() : ""}
            </p>
        </div>
    );

    return (
        <div>
            <div className="logodisplay ">
                <Link to="/" className="layout-topbar-logo flex flex-wrap  flex-row justify-content-center">
                    <img className="w-13rem h-8rem" src={process.env.PUBLIC_URL + "/companyLogo1.png"} alt="Logo" />
                    <span>{parseLoginRes?.companyName}</span>
                </Link>
            </div>
            <div className="layout-topbar">
                <Link to="/" className="layout-topbar-logo insidetopbarlogo">
                    <img className="w-13rem h-8rem" src={process.env.PUBLIC_URL + "/companyLogo1.png"} alt="Logo" />
                    <span>{parseLoginRes?.companyName}</span>
                </Link>

                <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                    <i className="pi pi-bars" />
                </button>

                <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                    <i className="pi pi-ellipsis-v" />
                </button>
                <InputText
                    className="search-customer"
                    onChange={(e) => {
                        props.setSearchValue(e.target.value);
                    }}
                    value={props.searchValue}
                    onClick={() => {
                        setVisibleSearch(true);
                    }}
                    placeholder="Search Customer"
                />
                <div className={classNames({ card: visibleSearch }, "flex justify-content-center listbox")}>
                    <ListBox
                        value={props.searchBy}
                        style={{ display: `${visibleSearch === true ? "block" : "none"}` }}
                        onChange={(e) => {
                            props.setSearchBy(e.value);
                            setVisibleSearch(false);
                        }}
                        options={countries}
                        optionLabel="name"
                        itemTemplate={countryTemplate}
                        className="w-full"
                        listStyle={{ maxHeight: "250px" }}
                    />
                </div>
                <ConfirmPopup target={document.getElementById("li")} visible={visible} onHide={() => setVisible(false)} message={<CustomMessage />} acceptLabel="Logout" accept={handleLogout} />

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                    <div className="flex  ">
                        <p className="mr-7 mt-2" style={{ fontSize: "1.3rem" }}>
                            {parseLoginRes?.role?.role}
                        </p>

                        <div className="flex">
                            <li>
                                <i style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "5px" }} className="pi pi-user" onClick={() => setVisible(true)} />
                            </li>
                            <p className="" id="li" style={{ cursor: "pointer", fontSize: "1.5rem", marginLeft: "10px" }} onClick={() => setVisible(true)}>
                                {" "}
                                {parseLoginRes?.userName ? parseLoginRes?.userName.toUpperCase() : ""}{" "}
                            </p>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
};
