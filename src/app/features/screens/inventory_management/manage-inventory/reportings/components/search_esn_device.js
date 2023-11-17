import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext" 
import { Checkbox } from 'primereact/checkbox';
import React,{useState} from "react"  
export default function SearchEsnDevice(){  
    const [esndeviceid,setEsnDeviceId]=useState(null)  
    const [currentchecked,setCurrentChecked]=useState("") 
    const [checksearchesn,setCheckSearchEsn]=useState(false)  
    const [checksearchdeviceid,setCheckSearchDeviceId]=useState(false)
     return( 
         <div className="card "  > 
             <div className="card " style={{ marginTop:"65px"}}> 
             ESN/Device Search
             </div>    

             <Card> 
                
             <div className="flex flex-wrap justify-content-center mt-2">   
               <div> 
                     <label style={{display:"block"}}>
Enter ESN Or Device ID :</label>
                       <InputText value={esndeviceid} onChange={(e)=>{setEsnDeviceId(e.value)}} className="w-20rem mt-2" />   
                       </div>  
                       <div className="w-30rem mt-5 flex flex-wrap justify-content-around"> 
                          <div> <Checkbox checked={checksearchesn} onChange={ 
                              ()=>{ 
                                setCheckSearchEsn(true) 
                                setCheckSearchDeviceId(false) 
                                setCurrentChecked("esn")
                              }
                           } />      <label>Search on ESN</label>  
                           </div>  
                           <div>
                           <Checkbox checked={checksearchdeviceid} onChange={  
                              ()=>{ 
                                setCheckSearchEsn(false) 
                                setCheckSearchDeviceId(true) 
                                setCurrentChecked("deviceid")
                              }
                           } />    <label>Search on Device ID</label>   
                            </div>
                        </div>  
                 </div>   
                 
                 <div  className="flex flex-wrap justify-content-center mt-6"> 
                    <Button label="Search"/>
                 </div>
             </Card>
         </div>
     )
}