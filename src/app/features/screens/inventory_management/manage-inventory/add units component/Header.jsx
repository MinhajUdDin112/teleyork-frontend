import React from 'react'
import { Card } from 'primereact/card'

const Header = () => {
  return (
    <>
     <p className="card font-semibold" style={{ fontSize: "1.5rem", color: "black" }}>
                Add Units
            </p>
            <div>
                <Card
                    style={{
                        width: "70em",
                        height: "17em",
                        backgroundColor: "#aae5e9",
                        marginBottom: "20px",
                        marginLeft: "80px",
                        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div className="flex">
                        <div>
                            <i className="pi pi-info-circle custom-icon"></i>
                        </div>
                        <div className="ml-3 ">
                            <p>1. if you are adding only sim card to the inventory select "sim" as the unit type when uploading SIMs.</p>
                            <p>2.if you are adding only IMEIs/Phone/Devices/Tables to the inventory select "GSM Device" as the unit type.</p>
                            <p>3. if you are adding sim card that are tagged with devices/tables to the inventory select "SIM "as the unit type when uploading SIMs with tagged Devices.</p>
                            <p>4. A tagged device reffer to a situation where a sim card is inserted into a device , and they are paired together.</p>
                        </div>
                    </div>
                    </Card>
                    </div>

    
    </>
  )
}

export default Header