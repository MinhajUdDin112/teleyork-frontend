import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import React,{useState} from "react"  
export default function CheckEsnCompatibility(){  
    const [esn,setEsn]=useState(null)
     return( 
         <div className="card "  > 
             <div className="card " style={{ marginTop:"65px"}}> 
             Check ESN Compatibility
             </div>    

             <Card> 
             <div className="mt-2"> 
             Check the compatibility of your device
             </div>       
             <div className="flex flex-wrap justify-content-center mt-6">   
               <div> 
                     <label style={{display:"block"}}>Enter your ESN below <span style={{color:"red"}}>* </span> </label>
                       <InputText value={esn} onChange={(e)=>{setEsn(e.value)}} className="w-20rem mt-2" />   
                       </div>
                 </div>   
                 <div  className="flex flex-wrap justify-content-center mt-6"> 
                    <Button label="Check"/>
                 </div>
             </Card>
         </div>
     )
}