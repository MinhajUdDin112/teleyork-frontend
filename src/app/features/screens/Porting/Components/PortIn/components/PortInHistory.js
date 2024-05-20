import React, { useEffect, useState } from "react";  
import Axios from "axios"; 
import "./css/PortInHistory.css"
export default function PortInHistory({currentSelected}){       
    const [portInData,setPortInData]=useState([])
const BASE_URL = process.env.REACT_APP_BASE_URL;   
       useEffect(()=>{ 
        Axios.get(`${BASE_URL}/api/user/getMdnHistory?customerId=${currentSelected?._id}`).then(res=>{ 
          console.log(res)
     }).catch(err=>{  
     })
       },[]) 
     return( 
          <div> 
             <table className="tablebody"> 
               <thead> 
                 <tr>      
                 <td>Primary Number</td>
                     <td>Account ID</td>
                     <td>Status</td>
                     <td>Actions</td>
                 </tr>
               </thead> 
                  <tbody>
                  <tr>      
                 <td>  </td>
                     <td>  </td>
                     <td></td>
                     <td>...</td>
                 </tr>    
                 <tr>      
                 <td>   </td>
                     <td> </td>
                     <td></td>
                     <td>...</td>
                 </tr>   
                  </tbody>
               </table> 
              
          </div>
     )
}