 import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import React, { useState } from "react"
import InventorySearchResult from "./search_result/search_result"
import Axios from "axios" 
import { ProgressSpinner } from "primereact/progressspinner"
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function InvenotorySearch(){  
     const [searchInventoryBy,setSearchInventoryBy]=useState(null)  
     const [loading,setIsLoading]=useState(false)    
     const [searchData,setSearchData]=useState(null)
      
      function SearchInventory(){  
           setIsLoading(true)
          Axios.get(`${BASE_URL}/api/web/search/searchInventory/${searchInventoryBy}`).then(response=>{ 
            setSearchData(response.data.data)  
            setIsLoading(false)
          }).catch(err=>{ 
            setIsLoading(false)
          })
      }
       return (  
        <Card className="h-[100vh]"> 
               <h1 className="daterange p-4 ml-4">Invenotory Search</h1>     
                  <div className="mt-4 flex flex-wrap justify-content-around flex-row w-[100%]">  
                         <div >  
                             <label className="mb-4 block">Enter MDN or ESN Or Contact No </label>
                         <InputText  value={searchInventoryBy} onChange={(e)=>{ 
                            setSearchInventoryBy(e.value)
                         }} className="field-width"/>      
                         </div>  
                         <div className="mt-4" >  
                         <Button   onClick={SearchInventory} label="Search inventory" className="mt-3 field-width"/> 
                        
                         </div> 
                         
                  </div>      
                   {loading ?<ProgressSpinner className="justify-content-center flex mt-4"/>:
                    <InventorySearchResult/> 
                   }

                    </Card>
       )
}