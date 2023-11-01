import { Card } from "primereact/card"
import React from "react"   
import { Button } from "primereact/button";
import AcpOrders from "./acp_orders"; 
let ComponentData=[{ 
    title:"", 
    component:"",
},{ 

}, { 

}]   
function Evaluatecomponent(nameOfComponent){ 
    let Component=eval(nameOfComponent)  
    return <Component/>
}
export default function DropshipOrdersFlowPage({setActiveComponent}){   
    return( 
        <Card>    
              <Button
                label="Back"
                style={{ marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                onClick={() => {
                    setActiveComponent("");
                }}
            />   
            <Card className="mt-4"> 
                    <h1 style={{fontSize:"16px"}} className="font-semi-bold">Pending Orders</h1> 
                  
            </Card>        
            <div> 
               { 
                 ComponentData.map(component=>( 
                     <h1>{component.title}</h1> 
                 ))
                }
             </div>  
            
            </Card>
    ) 

}