const feature = [{ label: "Equipment & Accessories Request", value: "equipmentandaccessoriesrequest" }];
const action = [
    { label: "New Order Request", value: "neworderrequest" },
    { label: "Completed Order Request", value: "completedorderrequest" },
    { label: "Cancel Order Request", value: "cancelorderrequest" },
];    
const equipmenttype = [
    { label: "All Equipments & Accessories", value: "allequipment&accessories" },
    { label: "Phone Model", value: "phonemodel" }
];   
const processtype = [
    { label: "All Process Type", value: "allprocesstype" },
    { label: "Resend Phone", value: "resendphone" },
    { label: "Equipment Purchase", value: "equipmentpurchase" },
];   
const paymenttype = [ 
    {label:"All Payment Method",value:"allpaymentmethod"},
    { label: "Credit Card", value: "creditcard" },
    { label: "Cash", value: "cash" },
    { label: "Courtesy", value: "courtesy" }, 
    { label: "Free", value: "free" },
    { label: "Money Gram", value: "moneygram" },
    { label: "Money Order", value: "moneyorder" }, 
    { label: "Dealer Wallet", value: "dealerwallet" },
    { label: "Skip Payment", value: "skippayment" },
    { label: "Wallet", value: "wallet" },
];   


export { feature, action,equipmenttype,paymenttype,processtype };
