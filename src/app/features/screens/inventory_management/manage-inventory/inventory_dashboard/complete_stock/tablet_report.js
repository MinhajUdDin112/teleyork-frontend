import React from "react"; 
export default function TabletCompleteStockReport(){ 
    const completedcdmareport={"Device Stock":0,"Device Used":0,"Device Free":0} 
    const colors = {
      "Device Stock": "#0073b7",
      "Device Used": "#00c0ef",
      "Device Free": " #00a65a",
    };
    return( 
        <div>    <img src="/images/inventory_dashboard/tablet.svg" style={{display:"inline-block",width:"35px",height:"auto"}}/>  
             
            <h5 style={{display:"inline-block",position:"absolute",marginTop:"7px"}}>Tablet Service</h5>
          {  Object.keys(completedcdmareport).map(item=>( 
                <div className="mt-2 flex flex-wrap justify-content-between"> 
                     <div> 
                       <span>{item}</span> 
                     </div> 
                     <div className="flex justify-content-center align-items-center" style={{cursor:"pointer",background:`${colors[item]}`,borderRadius:"25px",width:"25px",height:"25px"}}> 
                       <span >{completedcdmareport[item]}</span>
                     </div>
                 </div>
             ))  
             }
        </div>
    )
}