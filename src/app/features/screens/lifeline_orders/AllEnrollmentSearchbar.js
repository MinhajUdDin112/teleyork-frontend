import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
function AllEnrollmentSearchbar({ onSearch}) {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (e) => {  
        if(e.target.value === ""){ 
          setSearchTerm(e.target.value)
            onSearch(e.target.value)
        }
        setSearchTerm(e.target.value);       
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <InputText type="text" placeholder="Enter Enrollment ID or Name" value={searchTerm} onChange={handleSearchChange} className="search-input font-semibold" style={{ fontSize: "15px" }} />
            <Button type="submit" label="Search" className="search-button font-bold" />
        </form>
    );
}
export default AllEnrollmentSearchbar;
