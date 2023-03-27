import React from 'react'
import { Button } from 'primereact/button';

export default function CustomerProfileDetails({ title, value ,showEdit=false,secondValue,multiValue=false}) {
  return <div className='flex justify-content-between my-3 p-2 align-items-center align-content-center'>
    <div className='font-semibold flex align-items-center align-content-center'>
      {title}

{ showEdit&&     <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" aria-label="Submit" />
}

    </div>
  
    {
      multiValue?
      
        value.map((item)=>{
          return <div>{item}</div>
        })
      
      :<div>
      {value}
    </div>
    }
    
   {secondValue&& <div>
     
    {
      multiValue?
      
        secondValue.map((item)=>{
          return <div>{item}</div>
        })
      
      :<div>
      {secondValue}
    </div>
    }
  </div>}
  </div>
}
