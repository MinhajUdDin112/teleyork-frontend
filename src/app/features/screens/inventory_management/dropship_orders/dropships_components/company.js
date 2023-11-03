import React,{useState} from "react"; 
import { Dropdown } from 'primereact/dropdown';
export default function Company(){  
  const [selectedCompany,setSelectedCompany]=useState("")   
  const companyOption=[{label:"ijwireless",value:"ijjwireless"},{label:"ijwireless2nd",value:"ijwireless2nd"}]
     return( 
        <Dropdown value={selectedCompany} onChange={(e) => setSelectedCompany(e.value)} options={companyOption} optionLabel="label" 
    placeholder="Select a Company" className="w-full" />
     )
}