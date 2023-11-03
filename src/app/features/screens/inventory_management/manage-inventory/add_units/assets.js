const carrier = [
    { label: "TMB", value: "TMB" },
    { label: "TELGOOATT", value: "TELGOOATT" },
    { label: "ATTDUMMY", value: "ATTDUMMY" },
];
const company = [
    { label: "TalkDailyInc", value: "talkdailyinc" },
];
const agent = [
    { label: "Master", value: "master" },
    { label: "Distributor", value: "distributor" },
    { label: "Retailer", value: "retailer" }, 
    {label:"Employee",value:"employee"}
];
const emptymaster = [
      
]; 
const master=[  
    {
    label:"CORPORATE MASTER(Corporate_Master)",value:"corporatemaster"} 
   , { 
    label:"FREE FLORIDA PHONE(FreeFloridaPhone)",value:"freefloridaphone", 
    } , {
    label:"QUICKTEL SOLUTION(QuickTel)",value:"quicktelsolution"
    }
]   
const retailer=[ {
    label:"CORPORATE RETAILER(Corporate_Retailer)",value:"corporateretailer"} 
   , { 
    label:"FREE FLORIDA PHONE(FreeFloridaPhone2)",value:"freefloridaphone1", 
    } , {
    label:"QUICKTEL SOLUTION(Quicktel3)",value:"quicktelsolution3"
    }] 
    const distributor=[ {
        label:"CORPORATE DISTRIBUTOR(Corporate_Retailer)",value:"corporateretailer"} 
       , { 
        label:"FREE FLORIDA PHONE(FreeFloridaPhone1)",value:"freefloridaphone1", 
        } , {
        label:"QUICKTEL SOLUTION(Quicktel2)",value:"quicktelsolution2"
        }]  
        const employee=[]
const model = [
    { label: "Samsung TAB", value: "samsungtab" },
    { label: "SIM SIM", value: "simsim" },
    { label: "Test Phone 4G", value: "testphone4g" },
];
const portin = [
    { label: "YES", value: "yes" },
    { label: "NO", value: "no" },
];
const plan = [
   
];
const BYOD = [
    { label: "N", value: "no" },
    { label: "Y", value: "yes" },
];    
const unit = [
    { label: "SIM", value: "SIM" },
    { label: "CDMA Device", value: "CDMA" },
    { label: "GSM Device", value: "GSM" },
];
const type = [
    { label: "Single Unit", value: "Single" },
    { label: "Bulk Upload", value: "Bulk" },
];
const provision = [
    { label: "Add Stocks", value: "add_stock" },
    { label: "Add Pre Activated", value: "add_pre_activated" },
    { label: "Add and  Activated", value: "add_and_activated" },
    { label: "Add and assign non Activated", value: "add_and_assign_non_activated" },
    { label: "Reprovision", value: "reprovision" },
];      
const simprovision=[
    { label: "Add Stocks", value: "add_stock" },
    { label: "Add Pre Activated", value: "add_pre_activated" },
    { label: "Add and  Activated", value: "add_and_activated" },
    { label: "Add and assign non Activated", value: "add_and_assign_non_activated" },
];       
 
const usergrouptype=[  
]   
const status=[]
export {BYOD,status,emptymaster,retailer,distributor,usergrouptype,employee,simprovision,plan,portin,model,master,agent,company,carrier,unit,type,provision}