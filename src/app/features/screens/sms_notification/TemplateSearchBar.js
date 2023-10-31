import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext'; 
import { Button } from 'primereact/button';
function TemplateSearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <InputText
        type="text"
        placeholder="Search by name or ID" 
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input font-semibold" 
        style={{fontSize:"14px"}}
      />
      <Button type="submit" label="Search"  className="search-button font-bold" />
    </form>
  );
  }
export default TemplateSearchBar;
