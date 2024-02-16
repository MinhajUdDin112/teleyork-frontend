import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; 
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./app.css";
import store from "./app/store/store"

const root = ReactDOM.createRoot(document.getElementById("root"));
cleanLocalStorage()
root.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
);
function cleanLocalStorage() {
    localStorage.removeItem("comingforedit");
    localStorage.removeItem("comingfromincomplete");
    localStorage.removeItem("paymentallinfo");
    localStorage.removeItem("prepaidbasicData");
    localStorage.removeItem("prepaidaddress");
    localStorage.removeItem("simpricing");
    localStorage.removeItem("devicepricing");
    localStorage.removeItem("prepaidcheckEligibility");
    localStorage.removeItem("prepaidagreeData");
    localStorage.removeItem("prepaidprogrammeId");
    localStorage.removeItem("comingfromincomplete");
    localStorage.removeItem("paymentmethod");
    localStorage.removeItem("paymentdetails");
    localStorage.removeItem("inventoryType");
    //Payment Status
    localStorage.removeItem("paymentstatus");

    localStorage.removeItem("stripeId");
    //Device local
    localStorage.removeItem("deviceadditional");
    localStorage.removeItem("deviceadditionaltotal");
    localStorage.removeItem("deviceadditionalfeaturearray");
    localStorage.removeItem("totaldevicediscount");
    localStorage.removeItem("devicediscountobjectarray");
    localStorage.removeItem("deviceplan");
    localStorage.removeItem("devicepricing");
    //SIM Local
    localStorage.removeItem("simadditional");
    localStorage.removeItem("simadditionaltotal");
    localStorage.removeItem("simadditionalfeaturearray");
    localStorage.removeItem("totalsimdiscount");
    localStorage.removeItem("simdiscountobjectarray");
    localStorage.removeItem("simplan");
    localStorage.removeItem("simpricing");
}