import React, { useEffect ,useState} from "react";  
import BASE_URL from "../../../../../../../config";
import Axios from "axios"; 
export default function SIMCompleteStockReport(){   
  const loginRes = localStorage.getItem("userData");
  const parseLoginRes = JSON.parse(loginRes);
    const [completedsimreport,setCompletedSimReport]=useState({"Stock":0,"Used":0,"Free":0}) 
    const colors = {
        "Stock": "#0073b7",
        "Used": "#00c0ef",
        "Free": " #00a65a",
      };  
      useEffect(()=>{ 
         Axios.get(`${BASE_URL}/api/web/simInventory?serviceProvider=${parseLoginRes.compony}`).then(resstock=>{ 
           let obj={ 
              "Stock":resstock.data.data.length, 
            }
           Axios.get(`${BASE_URL}/api/web/simInventory/available?serviceProvider=${parseLoginRes.compony}`).then(resfree=>{ 
              obj.Free=resfree.data.data.length   
              Axios.get(`${BASE_URL}/api/web/simInventory/inUse?serviceProvider=${parseLoginRes.compony}`).then(resinuse=>{ 
                     obj.Used=resinuse.data.data.length
                setCompletedSimReport(obj)
              }).catch(error=>{ 
      
              })
          }).catch(error=>{ 
  
          }) 
         
          }).catch(error=>{ 

         })  
       
      },[])
    return( 
        <>  
           <img src="/images/inventory_dashboard/sim.svg" style={{display:"inline-block",width:"50px",height:"auto"}}/>  
             
            <h5 style={{width:"50px",display:"inline-block",position:"absolute",marginTop:"12px"}}>SIMService</h5>  
            {  Object.keys(completedsimreport).map(item=>( 
                <div className="mt-2 flex flex-wrap justify-content-between"> 
                     <div> 
                       <span>{item}</span> 
                     </div> 
                     <div className="flex justify-content-center align-items-center" style={{cursor:"pointer",background:`${colors[item]}`,borderRadius:"25px",width:"25px",height:"25px"}}> 
                       <span style={{color:"white"}}>{completedsimreport[item]}</span>
                     </div>
                 </div>
             ))  
             }
            </>
    )
}