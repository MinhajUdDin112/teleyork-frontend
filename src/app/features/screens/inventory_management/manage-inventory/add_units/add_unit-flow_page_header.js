import React from 'react'
import { Card } from 'primereact/card'
const Header = ({unit}) => {
  return (
    <>
     <p className="card font-semibold" style={{ fontSize: "16px", color: "black" }}>
                Add Units
            </p>
            <div>
                <Card
                    style={{
                        width: "70%",
        
                        backgroundColor: "#aae5e9",
                        marginBottom: "20px",
                        marginLeft: "50%",   
                          transform:"translate(-50%)",
                        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                        boxSizing:"border-box"
                    }}
                >
                    <div className="flex">
                        <div>
                            <i className="pi pi-info-circle custom-icon"></i>
                        </div>   
                        {   
                        unit === "" ?
                        <div className="ml-3 " style={{width:"70%",textAlign:"justify"}}>
                            <p>1. if you are adding only sim card to the inventory select "sim" as the unit type when uploading SIMs.</p>
                            <p>2.if you are adding only IMEIs/Phone/Devices/Tables to the inventory select "GSM Device" as the unit type.</p>
                            <p>3. if you are adding sim card that are tagged with devices/tables to the inventory select "SIM "as the unit type when uploading SIMs with tagged Devices.</p>
                            <p>4. A tagged device reffer to a situation where a sim card is inserted into a device , and they are paired together.</p>
                        </div> :  unit === "SIM" || unit === "CDMA" ? <div className="ml-3 " style={{width:"70%",textAlign:"justify"}}>
                             <p>You are about to load the SIMs in the inventory.</p>
                            <p>1 Make sure starting digits of your SIM numbers are "8901"</p>
                            <p>2 Make sure your SIM numbers have 19 or more digits</p>
                         </div> :<div className="ml-3 " style={{width:"70%",textAlign:"justify"}}>
                             <p>You are about to load the Devices/ Tablets in the inventory.</p>
                            <p>1. Make sure your device numbers have 14 or 15 digits</p>
                         </div>}
                    </div>
                    </Card>
                    </div>

    
    </>
  )
}

export default Header