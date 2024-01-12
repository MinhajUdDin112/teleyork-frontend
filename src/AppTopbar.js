import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup } from "primereact/confirmpopup";
import { logout } from "./app/store/auth/AuthSlice";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
export const AppTopbar = (props) => {     
      useEffect(()=>{ 
        document.addEventListener("click",docOnClick,false)
      })
    const [visibleSearch, setVisibleSearch] = useState(false);
    function docOnClick(e){   
     setVisibleSearch(false)
    }  
    //Dialogues for Advance Search
    const countries = [
        { name: "Inventory Search", code: "inventorysearch" },
    // { name: "Payment Search", code: "paymentsearch" },
        { name: "Recent Searches", code: "recentsearches" },
        { name: "Advance Search", code: "advance search"},
    ];
    const countryTemplate = (option) => {
        return (
            <div className="flex align-items-center"  >
                {option.name === "Payment Search" ? (
                    <img src="/images/Dashboard-Search/payment-search.png" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : option.name === "Recent Searches" ? (
                    <img src="/images/Dashboard-Search/recent-search.png" style={{ width: "1.25rem", marginRight: ".5rem" }} />
                ) : option.name === "Advance Search" ? (
                    <img  src="/images/Dashboard-Search/advance-search.png" style={{ width: "1.25rem", marginRight: ".5rem" }} />
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
        props.setSearchByValueClick(false) 
        props.setSearchBy(null)
        dispatch(logout());
        navigate("/login");
    };
    const CustomMessage = () => (
        <div className="flex flex-column w-15rem" onClick={(e)=>{ e.stopPropagation() }}>
            <i  className="pi pi-user p-mr-2 text-center" style={{ fontSize: "2rem" }}></i>
            <p className="text-center mt-2" style={{ fontSize: "1.5rem" }}>
                {parseLoginRes?.userName ? parseLoginRes?.userName.toUpperCase() : ""}
            </p>
        </div>
    );
    function capitalizeEveryWord(sentence) {
        // Split the sentence into an array of words
        var words = sentence.split(' ');
      
        // Capitalize the first letter of each word
        var capitalizedWords = words.map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
      
        // Join the words back into a sentence
        var capitalizedSentence = capitalizedWords.join(' ');
      
        return capitalizedSentence;
      }
    return (

        <div >
            
            <div className="logodisplay "  onClick={(e)=>{  
                     e.stopPropagation()
                 props.setSearchBy(null)    
                 props.setSearchByValueClick(false)
                 }} >
                <Link to="/" className="layout-topbar-logo flex flex-wrap  flex-row justify-content-center">
                    <img className="w-13rem h-8rem" src={process.env.PUBLIC_URL + "/companyLogo1.png"} alt="Logo" />
                    <span>{capitalizeEveryWord(parseLoginRes?.companyName)}</span>
                </Link>
            </div>
            <div className="layout-topbar"  onClick={(e)=>{   
                
               setVisibleSearch(false)
               e.stopPropagation()
            }}>  
                <Link to="/" className="layout-topbar-logo insidetopbarlogo"   onClick={(e)=>{  
                     e.stopPropagation()
                 props.setSearchBy(null)    
                 
                 props.setSearchByValueClick(false)
                 }}>
                    <img className="w-13rem h-8rem" src={process.env.PUBLIC_URL + "/companyLogo1.png"} alt="Logo" />
                    <span>{capitalizeEveryWord(parseLoginRes?.companyName)}</span>
                </Link>

                <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                    <i className="pi pi-bars" />
                </button>

                <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={(e)=>{ 
                       e.stopPropagation()
                     props.onMobileTopbarMenuClick(e)} }>
                    <i className="pi pi-ellipsis-v" />
                </button> 
                 <div className="search-customer">
                <InputText 
                    className=""
                    onChange={(e) => {
                        props.setSearchValue(e.target.value);
                    }}
                    value={props.searchValue}
                    onClick={(e) => {    
                        e.stopPropagation()
                        setVisibleSearch(true);
                    }}
                    placeholder="Search Customer"
                />    
                  <i className="pi pi-search search-toggle" onClick={(e)=>{ 
                     e.stopPropagation()
                     setVisibleSearch(false)   
                      props.setSearchBy(null)
                     props.setSearchByValueClick(true)  
                      if(props.searchByValueClick === true){ 
                         console.log(true)
                        props.setCallSearchApi(prev=>!prev) 
                      }
                      
                  }} />
                 </div>
                
                <div  onClick={(e)=>{
                            e.stopPropagation()
                         }} className={classNames({ card: visibleSearch }, "flex justify-content-center listbox")}>
                    <ListBox   
                        value={props.searchBy}
                        style={{ display: `${visibleSearch === true ? "block" : "none"}` }}
                        onChange={(e) => {     
                            if(e.value !== null){  
                                props.setSearchByValueClick(false)
                            props.setSearchBy(e.value);  
                            }
                             
                        }}
                        options={countries}
                        optionLabel="name"   
                          onClick={(e)=>{  
                            e.stopPropagation()
                             if(e.target.textContent === "Advance Search"){ 
                                
                             }   
                             
                          }}
                        itemTemplate={countryTemplate}
                        className="w-full card"
                        listStyle={{ maxHeight: "250px" }}
                    />
                </div>
                <ConfirmPopup target={document.getElementById("li")}  visible={visible}  onHide={() => setVisible(false)} message={<CustomMessage />} acceptLabel="Logout" accept={handleLogout} />
                <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                    <div className="flex  ">
                        <p className="mr-7 mt-2" style={{ fontSize: "1.3rem" }}>
                            {parseLoginRes?.role?.role}
                        </p>

                        <div className="flex" onClick={(e)=>{e.stopPropagation()}}>
                            <li >
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
