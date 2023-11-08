const vendor = [
    { label: "QUICKTEL", value: "quicktel" },
    { label: "QUICKTEL SOLUTIONS", value: "quicktelsolutions" },
    { label: "talkdaily", value: "talkdaily" },
];
const carrier = [
    { label: "TMB", value: "TMB" },
    { label: "TELGOOATT", value: "TELGOOATT" },
    { label: "ATTDUMMY", value: "ATTDUMMY" },
];
const model = [
    { label: "Samsung TAB", value: "samsungtab" },
    { label: "SIM SIM", value: "simsim" },
    { label: "Test Phone 4G", value: "testphone4g" },
];
const BYOD = [
    { label: "N", value: "no" },
    { label: "Y", value: "yes" },
];   
const feature=[{
  label:"ESN/SIM",
  value:"esnsim"
},{ 
  label:"DEVICE", 
  value:"device"
}] 
const type=[{ 
    label:"Single Unit", 
    value:"single"
},{ 
    label:"Bulk Upload", 
    value:"bulk"
}]  
const shipperid=[{
label:"Arya Phoenix", 
value:"aryaphoenix"
},{  
    label:"Devteam", 
    value:"devteam"
},{ 
  label:"Lisa Braden", 
  value:"lisabraden"
}]
export {feature,type,shipperid,vendor,carrier,BYOD,model}