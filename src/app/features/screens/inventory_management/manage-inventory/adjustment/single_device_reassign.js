import React, { useState } from "react"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Checkbox } from "primereact/checkbox"
export default function SingleDeviceRe_Assign({ setShowMain, setShowDeviceRe_Assign, setShowInventoryRe_Assign }) {
   let [searchByBoxId, setSearchByBoxId] = useState(false)
   let [searchByBoxNumber, setSearchByBoxNumber] = useState(false)
   let [searchByDeviceId, setSearchByDeviceId] = useState(false)
   return (
      <div >

         <Button label="Back" onClick={() => {
            setShowMain(true)
            setShowInventoryRe_Assign(false)
            setShowDeviceRe_Assign(false)
         }} />
         <h6 style={{ width: "100%", marginTop: "33px" }}>Inventory Device Re_Assign</h6>
         <div className="flex justify-content-around flex-wrap">
            <div style={{ width: "25rem", marginTop: "33px" }}>
               <h6 >Enter Box ID or Device ID or Box Number</h6>
               <InputText className="w-full md:w-100%/" />
            </div>
            <div style={{ width: "25rem", marginTop: "33px" }}>

               <Checkbox style={{ width: "10rem", marginTop: "5px" }}
                  onChange={() => {

                     setSearchByBoxNumber(false)
                     setSearchByDeviceId(false)
                     setSearchByBoxId(true)
                  }} checked={searchByBoxId} />
               <label>search By Box ID</label>
               <Checkbox style={{ width: "10rem", marginTop: "5px" }}
                  onChange={() => {
                     setSearchByBoxNumber(false)
                     setSearchByDeviceId(true)
                     setSearchByBoxId(false)
                  }} checked={searchByDeviceId} />
               <label>Search By Device ID</label>
               <Checkbox style={{ width: "10rem", marginTop: "5px" }} onChange={() => {
                  setSearchByBoxNumber(true)
                  setSearchByDeviceId(false)
                  setSearchByBoxId(false)
               }} checked={searchByBoxNumber} />
               <label>Search By Box Number</label>

            </div>
            <div style={{ width: "25rem", marginTop: "33px" }}>
               <Button label="Search" style={{ marginLeft: "50%", transform: "translate(-50%)" }} />
            </div>
         </div>

      </div>
   )
}