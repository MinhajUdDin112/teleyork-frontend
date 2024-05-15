import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { Ripple } from "primereact/ripple";
import { Badge } from "primereact/badge";
const AppSubmenu = (props) => {
    const [activeIndex, setActiveIndex] = useState();
    useEffect(() => {
        setActiveIndex(props.activeTab);
    }, [props.activeTab]);
    const onMenuItemClick = (event, item, index) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }
        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (index === activeIndex) setActiveIndex(null);
        else setActiveIndex(index);
    };

    const onKeyDown = (event) => {
        if (event.code === "Enter" || event.code === "Space") {
            event.preventDefault();
            event.target.click();
        }
    };

    const renderLinkContent = (item) => {
        let submenuIcon = item.items && <i style={{ color: "#C68301", marginTop: "13px" }} className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
        let badge = item.badge && <Badge value={item.badge} />;

        return (
            <React.Fragment>
                <i className={item.icon}></i>
                <span
                    style={{
                        color: "#777777",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontWeight: "500",
                        marginTop: "10px",
                    }}
                >
                    {item.label}
                </span>
                {submenuIcon}
                {badge}
                <Ripple />
            </React.Fragment>
        );
    };

    const renderLink = (item, i) => {
        let content = renderLinkContent(item);

        if (item.to) {
            return (
                <NavLink aria-label={item.label} onKeyDown={onKeyDown} role="menuitem" className="p-ripple" activeclassname="  router-link-active router-link-exact-active" to={item.to} onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
                    {content}
                </NavLink>
            );
        } else {
            return (
                <a tabIndex="0" aria-label={item.label} onKeyDown={onKeyDown} role="menuitem" href={item.url} className="p-ripple" onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
                    {content}
                </a>
            );
        }
    };

    let items =
        props.items &&
        props.items.map((item, i) => {
            let active = activeIndex === i;
            let styleClass = classNames(item.badgeStyleClass, { "layout-menuitem-category": props.root, "active-menuitem": active && !item.to });

            if (props.root) {
                return (
                    <li className={styleClass} key={i} role="none">
                        {props.root === true && (
                            <React.Fragment>
                                <div className="layout-menuitem-root-text" aria-label={item.label}>
                                    {item.label}
                                </div>
                                <AppSubmenu items={item.items} activeTab={props.activeTab} />
                            </React.Fragment>
                        )}
                    </li>
                );
            } else {
                return (
                    <li className={styleClass} key={i} role="none">
                        {renderLink(item, i)}
                        <CSSTransition classNames="layout-submenu-wrapper " timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                            <AppSubmenu items={item.items} activeTab={props.activeTab} />
                        </CSSTransition>
                    </li>
                );
            }
        });

    return items ? (
        <ul className={props.className} role="menu">
            {items}
        </ul>
    ) : null;
};

export const AppMenu = (props) => {
    return (
        <div className="layout-menu-container ">
            <AppSubmenu items={props.model} activeTab={props.activeTab} className="layout-menu" root={true} role="menu" />

            {/* <a href="https://www.primefaces.org/primeblocks-react" className="block mt-3">
                <img alt="primeblocks" className="w-full"
                     src={props.layoutColorMode === 'light' ? 'assets/layout/images/banner-primeblocks.png' : 'assets/layout/images/banner-primeblocks-dark.png'}/>
            </a> */}
        </div>
    );
};
