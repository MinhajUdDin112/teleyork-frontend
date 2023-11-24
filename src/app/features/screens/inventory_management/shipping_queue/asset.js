const queuename = [
    {
        label: "All",
        value: "All",
    },
    {
        label: "Free Phone With Data",
        value: "Free Phone With Data",
    },
    {
        label: "Free Phone Without Data",
        value: "Free Phone Without Data",
    },
    {
        label: "Paid Phone",
        value: "Paid Phone",
    },
    {
        label: "Paid PhoneNonLL",
        value: "Paid PhoneNonLL",
    },
    {
        label: "PostPaid PhoneNonLL",
        value: "PostPaid PhoneNonLL",
    },
    {
        label: "Sim Only",
        value: "Sim Only",
    },
    {
        label: "Fast Track",
        value: "Fast Track",
    },
    {
        label: "Split Orders",
        value: "Split Orders",
    },
    {
        label: "BYOD Orders",
        value: "BYOD Orders",
    },
    {
        label: "Family Plan",
        value: "Family Plan",
    },
    {
        label: "Tribal Orders",
        value: "Tribal orders",
    },
    {
        label: "Non Tribal Orders",
        value: "Non Tribal Orders",
    },
    {
        label: "Overnight",
        value: "Overnight Shipping Orders",
    },
    {
        label: "ACP Order",
        value: "ACP Order",
    },
    {
        label: "ACP BYOD Order",
        value: "ACP BYOD Order",
    },
    {
        label: "ACP SIM Order",
        value: "ACP SIM Order",
    },
    {
        label: "ACP Phone Order",
        value: "ACP Phone Order",
    },
    {
        label: "ACP Hotspot Order",
        value: "ACP Hotspot Order",
    },
    {
        label: "Prepaid Order",
        value: "Prepaid Order",
    },
];
const masteragent = [
    { label: "ALL", value: "ALL" },
    { label: "CORPORATE MASTER", value: "CORPORATE MASTER " },
];
const distributor = [
    { label: "ALL", value: "ALL" },
    { label: "CORPORATE DISTRIBUTOR", value: "CORPORATE DISTRIBUTOR " },
];
const retailer = [
    { label: "ALL", value: "ALL" },
    { label: "CORPORATE RETAILER", value: "CORPORATE RETAILER" },
];   
const status=[{ 
     label:'ALL',
     value:"ALL"
},{ 
  label:"New", 
  value:"New"
},{ 
  label:"Shipped", 
  value:"Shipped"
},{ 
   label:"Assigned", 
   value:"Assigned"
},{ 
     label:"Print Label Pending" 
     ,value:"Print Label Pending"
},{ 
  label:"Provision Fail", 
  value:"Provision Fail"   
},{ 
    label:"Nlad Fail", 
    value:"Nlad Fail"   
  }, { 
    label:"Cancel", 
    value:"Cancel"   
  }]
const emptymaster = [];
const emptyretailer = [];   
const emptydistributor = []; 
const emptyemployee=[] 
const employee=[{label:"Usman Liaquat",value:"Usman Liaquat"}]   
const paymentcompleted=[{label:"YES","":"YES"},{label:"NO",value:"NO"}]
export { queuename, status,masteragent,employee,paymentcompleted,emptyemployee, emptydistributor, emptymaster, emptyretailer, distributor, retailer };
