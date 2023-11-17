const masteragent=[{
    label:"CORPORATE MASTER",value:"corporatemaster"
}]    
const distributor=[{
  label:"CORPORATE DISTRIBUTOR", 
  value:"corporatedistributor"
}] 
const phonetype=[{ 
  label:"Free", 
  value:"free"
},{ 
  label:"Paid", 
  value:"paid"
}] 
const emptydistributor=[] 
const retailer=[{
    label:"CORPORATE RETAILER", 
    value:"corporateretailer"
  }]    
  const emptyretailer=[]   
  const ordershippingmode=[{ 
     label:"All", 
     value:"all"
  },{ 
    label:"Pick Up", 
    value:"pickup"
  },{ 
    label:"Ship", 
    value:"ship"
  }]    
  const currentstatus=[{ 
    label:"All", 
    value:"all"
 },{ 
   label:"New", 
   value:"new"
 },{ 
   label:"On Hold", 
   value:"onhold"
 }, { 
    label:"Denied", 
    value:"denied"
  },{ 
    label:"Closed", 
    value:"closed"
  }]    
  const carrier=[{ 
    label:"ATTDUMMY", 
    value:"attdummy"
 },{ 
   label:"TELGOOATT", 
   value:"telgooatt"
 },{ 
   label:"TMB", 
   value:"tmb"
 }]        
 const status=[{  
  label:"Active", 
  value:"active"
 },{ 
  label:"InActive", 
  value:"InActive"
 }]
 export {phonetype,status,masteragent,emptydistributor,emptyretailer,carrier,retailer,distributor,currentstatus,ordershippingmode}