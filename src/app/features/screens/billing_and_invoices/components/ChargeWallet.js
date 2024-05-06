import Axios from "axios"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import React, { useState } from "react"   
import { useRef } from "react"
 import { Toast } from "primereact/toast"  
 const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ChargeWallet({setRefresh,customerId,setOpenDialogeForWallet}) 
{   
     const toast=useRef()
    const [amount,setAmount]=useState()
    return( 
          <div className="flex flex-wrap flex-row justify-left">  
           <label>
             <InputText onChange={(e)=>{ 
                    setAmount(e.value)  
             }}/>   
             </label>    
             <div className="flex mt-4 flex-wrap  w-full flex-row justify-center">  
          
           <Button label="Submit"  onClick={()=>{ 
                          Axios.post(`${BASE_URL}/api/web/invoices/chargeWallet`,{    "customerId":customerId,
                          "amount":amount}).then(res=>{ 
                             setRefresh(prev=>!prev)        
                             
            toast.current.show({ severity: "success", summary: "Info", detail: res?.data?.msg });               
                              setTimeout(()=>{ 
                                    
                              setOpenDialogeForWallet(false) 
                              },500) 
                          }).catch(err=>{ 
                                 
            toast.current.show({ severity: "error", summary: "Info", detail:err?.response?.data?.msg });
                          })
           }}   
           
           /> 
              
                 
          </div> 
           <Toast  ref={toast}/>
                 
          </div>
    )  

}