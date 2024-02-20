import React from "react"; 
export default function CDMACompleteStockReport(){ 
    const completedcdmareport={"Device Stock":0,"Device Used":0,"Device Free":0} 
    const colors = {
      "Device Stock": "#0073b7",
      "Device Used": "#00c0ef",
      "Device Free": " #00a65a",
    };
    return( 
        <>    <img src={require('../assets/images/cdma.jpg')} alt="img" style={{display:"inline-block",width:"50px",height:"auto"}}/>  
             
            <h5 style={{display:"inline-block",position:"absolute",marginTop:"12px"}}>CDMA Service</h5>
          {  Object.keys(completedcdmareport).map(item=>( 
                <div className="mt-2 flex flex-wrap justify-content-between"> 
                     <div> 
                       <span>{item}</span> 
                     </div> 
                     <div className="flex justify-content-center align-items-center" style={{background:`${colors[item]}`,borderRadius:"25px",width:"25px",height:"25px"}}> 
                       <span >{completedcdmareport[item]}</span>
                     </div>
                 </div>
             ))  
             }
        </>
    )
}