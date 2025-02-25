import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup } from "primereact/confirmpopup";
import { logout } from "./app/store/auth/AuthSlice";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "primereact/sidebar";
import "./app.css";
import { DropdownIcon, NotificationIcon } from "./utility";
import Axios from "axios";
//import io from "socket.io-client";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const AppTopbar = (props) => {
    const [visibleRight, setVisibleRight] = useState(false);
    const location = useLocation();
    const [counter, setCounter] = useState("");         
     const [currentLocation,setCurrentLocation]=useState(location.pathname)
    useEffect(() => {
        const handleRouteChange = (newLocation) => {  
            if (newLocation.pathname !== currentLocation ) {    
                  // if(props.searchByValueClick || props.searchBy){ 
                props.setSearchBy(null);
                props.setSearchByValueClick(false);  
                setCurrentLocation(newLocation.pathname) 
                 //  }
            }
          };
          handleRouteChange(location);
          window.addEventListener('popstate', handleRouteChange);
          return () => {
            window.removeEventListener('popstate', handleRouteChange);  
          };  
        }, [location]);  
    useEffect(() => {
        document.addEventListener("click", docOnClick, false);
    });
    /* const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
  
    useEffect(() => {
      // Connect to WebSocket server
      const newSocket = io(BASE_URL);
  
      // Set up event listeners
      newSocket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });
       newSocket.on("error",(err)=>{ 
         console.log(err) 

       })
      newSocket.on('message', (message) => {
        setReceivedMessage(message);
      });
  
      setSocket(newSocket);
  
      // Clean up the WebSocket connection when component unmounts
      return () => {
        newSocket.disconnect();
      };
    }, []);  
    const sendMessage = () => {
        if (socket) {
          socket.emit('message', message);
          setMessage('');
        }
      }; 
       */
    const [visibleSearch, setVisibleSearch] = useState(false);
    const [notification, setNotification] = useState([]);
    function docOnClick(e) {
        setVisibleSearch(false);
    }
    //Dialogues for Advance Search
    const countries = [
        { name: "Inventory Search", code: "inventorysearch" },
        // { name: "Payment Search", code: "paymentsearch" },
        { name: "Recent Searches", code: "recentsearches" },
        { name: "Advance Search", code: "advance search" },
    ];

    const countryTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                {option.name === "Payment Search" ? (
                    <img src="/images/Dashboard-Search/payment-search.png" alt="none" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : option.name === "Recent Searches" ? (
                    <img src="/images/Dashboard-Search/recent-search.png" alt="none" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : option.name === "Advance Search" ? (
                    <img src="/images/Dashboard-Search/advance-search.png" alt="none" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : (
                    <img src="/images/Dashboard-Search/inventory-search.png" alt="none" style={{ width: "1.25rem", marginRight: ".5rem" }} />
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
    const capitalCompanyName = parseLoginRes?.companyName?.toUpperCase();
    const handleLogout = () => {
        props.setSearchValue("");
        props.setSearchByValueClick(false);
        props.setSearchBy(null);
        dispatch(logout());
        navigate("/login");
    };
    const CustomMessage = () => (
        <div
            className="flex flex-column w-15rem"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <i className="pi pi-user p-mr-2 text-center" style={{ fontSize: "2rem" }}></i>
            <p className="text-center mt-2" style={{ fontSize: "1.5rem" }}>
                {parseLoginRes?.userName ? parseLoginRes?.userName.toUpperCase() : ""}
            </p>
            <p className="flex flex-wrap justify-content-center" style={{ fontSize: "1rem" }}>
                {parseLoginRes?.role?.role}
            </p>
        </div>
    );
    useEffect(() => {
        const getCounter = async () => {
            setInterval(async () => {
                try {
                    const response = await Axios.get(`${BASE_URL}/api/web/notes/notifications?userId=${parseLoginRes?._id}`);
                    const data = response?.data?.unreadCount;
                    const note = response?.data?.notifications;
                    setNotification(note);
                    setCounter(data);
                } catch (error) {
                    toast.error(error?.response?.data?.msg);
                }
            }, 5000);
        };
        getCounter();
    }, [props.refreshBell]);

    const handleReadNotification = async (notificationId) => {
        try {
            await Axios.put(`${BASE_URL}/api/web/notes/markReadnotifications?notificationId=${notificationId}&userId=${parseLoginRes?._id}`);
            // const response = await Axios.put(`${BASE_URL}/api/web/notes/markReadnotifications?notificationId=${notificationId}&userId=${parseLoginRes?._id}`);

            const res = await Axios.get(`${BASE_URL}/api/web/notes/notifications?userId=${parseLoginRes?._id}`);
            const { unreadCount, notifications } = res?.data;
            setNotification(notifications);
            setCounter(unreadCount);
        } catch (error) {
            toast(error?.response?.data?.msg);
        }
    };
    const handleNavigate = (customerId) => {
        if (customerId !== undefined) {
            localStorage.setItem("selectedId", JSON.stringify(customerId));
            navigate("/customer-profile", { state: { selectedId: customerId } });
            if (location.pathname === "/customer-profile") {
                props.setRefreshNotificationComponent((prev) => !prev);
            }
        }
    };
    return (
        <div>
            <ToastContainer />
            <div
                className="logodisplay "
                onClick={(e) => {
                    e.stopPropagation();
                    props.setSearchBy(null);
                    props.setSearchByValueClick(false);
                }}
            >
                {capitalCompanyName?.includes("IJ") ? (
                    <Link to="/" className="layout-topbar-logo flex flex-wrap  flex-row justify-content-center">
                        <img className="w-13rem h-8rem ml-4" src={process.env.PUBLIC_URL + "/companyLogo1.png"} alt="Logo" />
                    </Link>
                ) : capitalCompanyName.includes("ZISFONE") ? (
                    <Link
                        to="/"
                        className="layout-topbar-logo layoutzisfone flex flex-wrap  flex-row justify-content-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSearchBy(null);
                            props.setSearchByValueClick(false);
                        }}
                    >
                        <img className="w-8rem h-4rem" src={process.env.PUBLIC_URL + "/zisfonelogo.png"} alt="Logo" />
                    </Link>
                ) : undefined}
            </div>
            <div
                className="layout-topbar"
                onClick={(e) => {
                    setVisibleSearch(false);
                    e.stopPropagation();
                }}
            >
                {capitalCompanyName.includes("IJ") ? (
                    <Link
                        to="/"
                        className="layout-topbar-logo insidetopbarlogo"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSearchBy(null);
                            props.setSearchByValueClick(false);
                        }}
                    >
                        <img className="w-9rem h-4rem ml-4" src={process.env.PUBLIC_URL + "/companyLogo1.png"} alt="Logo" />
                    </Link>
                ) : capitalCompanyName.includes("ZISFONE") ? (
                    <Link
                        to="/"
                        className="layout-topbar-logo insidetopbarlogo"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSearchBy(null);
                            props.setSearchByValueClick(false);
                        }}
                    >
                        <img className="w-10rem h-4rem" src={process.env.PUBLIC_URL + "/zisfonelogo.png"} alt="Logo" />
                    </Link>
                ) : (
                    ""
                )}

                <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                    <i className="pi pi-bars" />
                </button>

                <button
                    type="button"
                    className="p-link layout-topbar-menu-button layout-topbar-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        props.onMobileTopbarMenuClick(e);
                    }}
                >
                    <i className="pi pi-ellipsis-v" />
                </button>
                <div className="search-customer" style={{ width: "30%" }}>
                    <InputText
                        onChange={(e) => {
                            props.setSearchValue(e.target.value);
                        }}
                        value={props.searchValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.stopPropagation();
                                if (props.searchValue !== "") {
                                    props.setSearchByValueClick(true);
                                    props.setCallSearchApi((prev) => !prev);
                                }
                                setVisibleSearch(false);
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (props.searchValue !== "") {
                                props.setSearchByValueClick(true);
                                props.setCallSearchApi((prev) => !prev);
                            }
                            setVisibleSearch(true);
                        }}
                        placeholder="Search Customer"
                    />
                    <i
                        className="pi pi-search search-toggle"
                        onClick={(e) => {
                            e.stopPropagation();
                            setVisibleSearch(false);
                            props.setSearchBy(null); 
                            props.setSearchByValueClick(true);
                            if (props.searchByValueClick === true) {
                                props.setCallSearchApi((prev) => !prev);
                            }
                        }}
                        style={{ border: "none" }}
                    />
                </div>

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className={classNames({ card: visibleSearch }, "flex justify-content-center listbox")}
                >
                    <ListBox
                        value={props.searchBy}
                        style={{ display: `${visibleSearch === true ? "block" : "none"}` }}
                        onChange={(e) => {
                            if (e.value !== null) {
                                props.setSearchByValueClick(false);
                                props.setSearchBy(e.value);
                                setVisibleSearch(false);
                            }
                        }}
                        options={countries}
                        optionLabel="name"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (e.target.textContent === "Advance Search") {
                            }
                        }}
                        itemTemplate={countryTemplate}
                        className="w-full card"
                        listStyle={{ maxHeight: "250px" }}
                    />
                </div>
                <ConfirmPopup target={document.getElementById("li")} visible={visible} onHide={() => setVisible(false)} message={<CustomMessage />} acceptLabel="Logout" accept={handleLogout} />
                <ul className={classNames("layout-topbar-menu   lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                    <div className="flex  ">
                        <div className="notificationbell" style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: "3rem", marginTop: "1rem" }} onClick={() => setVisibleRight(true)}>
                            <NotificationIcon />
                            <span
                                style={{
                                    fontFamily: "Inter",
                                    color: "white",
                                    fontSize: "0.8rem",
                                    marginLeft: "-0.3rem",
                                    paddingLeft: "3.7px",
                                    fontWeight: "300",
                                    marginTop: "-0.3rem",
                                    position: "absolute",
                                    width: "15px",
                                    height: "15px",
                                    backgroundColor: "#FF0000",
                                    borderRadius: "50%",
                                    border: "1px solid white",
                                }}
                            >
                                {" "}
                                {counter <= 9 ? counter : "9+"}
                            </span>
                        </div>
                        {/* <i className="pi pi-bell"></i> */}
                        <Sidebar className="notification" style={{ width: "35rem" }} visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                            <h3>Notifications</h3>
                            <hr />
                            {notification.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        handleNavigate(item?.customerId);
                                        setVisibleRight(false);
                                        handleReadNotification(item?._id);
                                        props.setHandleHighlight(item?.noteId);
                                    }}
                                >
                                    <h5>{item?.sender?.name}</h5>
                                    <p>{item.message}</p>

                                    <span style={{ cursor: "pointer" }}>
                                        <h5
                                            style={{ fontSize: "1rem", marginLeft: "24rem" }}
                                            onClick={() => {
                                                handleReadNotification(item?._id);
                                            }}
                                        >
                                            {item.read ? "" : "Mark as read"}
                                        </h5>
                                    </span>
                                    <hr />
                                </div>
                            ))}
                        </Sidebar>
                        {/* <p className="mr-7" style={{ fontSize: "1.3rem", marginLeft: "-2rem", marginTop: "10px" }}>
                            {parseLoginRes?.role?.role}
                        </p> */}
                        <div
                            className="flex"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <p className="" id="li" style={{ cursor: "pointer", fontSize: "1.2rem", marginTop: "14px", marginLeft: "-20px", fontFamily: "Almarai" }} onClick={() => setVisible(true)}>
                                {parseLoginRes?.userName ? parseLoginRes?.userName.toUpperCase() : ""}
                            </p>
                            <div style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "12px", marginLeft: "10px" }} onClick={() => setVisible(true)}>
                                <DropdownIcon />
                            </div>
                            {/* <li style={{ marginTop: "10px" }}>
                                <i style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "5px" }} className="pi pi-user" onClick={() => setVisible(true)} />
                            </li> */}
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
};
