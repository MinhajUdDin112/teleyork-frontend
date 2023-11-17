const disconnectreasons=[{ 
   label:"Amount Overdue", 
   value:"Amount Overdue "
},{ 
   label:"California denial Disconnection" 
   ,  
   value:"California Denial Disconnection"
}, {
    label:"Cancel Portin" 
   ,  
   value:"Cancel Portin"
}  
, {
    label:"Cannot Afford" 
   ,  
   value:"Cannot Afford"
}  
,{ 
    label:"Carrier Disconnection", 
    value:"Carrier Disconnection"
},{ 
    label:"Carrier Rejection", 
    value:"carrier rejection"
},{ 
    label:"Coverage Issue", 
    value:"coverage issue"
},{ 
    label:"De-Enroll Production Dupl", 
    value:"De-Enroll Production Dupl"
},{ 
    label:"Deceased", 
    value:"Deceased"
},{ 
    label:"Dispatched For More Than", 
    value:"Dispatched For More Than"
},{ 
    label:"Do Not Want/Need", 
    value:"Do Not Want/Need"
},{ 
    label:"Dup MDN", 
    value:"Dup MDN"
}


  
] 
const vcaredisconnect=[{ label:"Y",value:"Yes"},{   
   label:"N",value:"No"  
}]  
const carrierdisconnect=[{ label:"Y",value:"Yes"},{   
    label:"N",value:"No"  
 }] 
 const nlad=[ 
    { label:"deEnrollNonUsage",value:"eEnrollNonUsag"},{   
        label:"deEnrollLeaving",value:"deEnrollLeaving"  
     },  
     { 
        label:"deEnrollFailedReCertification", 
        value:"deEnrollFailedReCertification"
     },   
     { 
     label:"deEnrollDeceased", 
     value:"deEnrollDeceased"
     },
      { 
        label:"deEnrollFailedReVerification", 
        value:"deEnrollFailedReVerification"
      }
  
    ]  
    const makeabbchildasparent= [{ label:"Y",value:"Yes"},{   
        label:"N",value:"No"  
     }] 

export {disconnectreasons,vcaredisconnect,carrierdisconnect,nlad,makeabbchildasparent}