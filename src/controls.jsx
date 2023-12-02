import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from "react";
import StoryTable from "./storytable";

const Controls = () => {
  const [responseData, setResponseData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [defaultType, setDefaultType] = useState('all');
  const handleStart = async () => {
    try {
      console.log('requesting');
      const response = await fetch(`http://localhost:8091/start_fetch?type=${defaultType}`);
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseData(null);
    }
  };
  const handleChangeType = (event) => {
    setDefaultType(event.target.value);
  };
  const handleKeyDownType = (event) => {
    if (event.key === 'Enter') {
      handleStart(defaultType);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };
  const handleSearch = async () => {
    try {
      console.log('requesting');
      const response = await fetch(`http://localhost:8091/search_stories?search_term=${searchTerm}`);
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseData(null);
    }
  };

  const handleAnalyze = () => {
    // Add logic for Analyze button
  };

  const handleAudiate = () => {
    // Add logic for Audiate button
  };

  return (
    <>
    {responseData && 
      <div className='display-container'>
        <StoryTable res={responseData} />
      </div>
    }
    <div className="controls-container">
      <input type="text" 
        placeholder="Types"
        value={defaultType}
        onChange={handleChangeType}
        onKeyDown={handleKeyDownType}/>
      <input type="text" 
        placeholder="Terms"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}/>
      <button onClick={handleAnalyze}>Analyze</button>
      <button onClick={handleAudiate}>Audiate</button>
    </div>
    </>
  );
};

export default Controls;
