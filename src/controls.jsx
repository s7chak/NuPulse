import React from 'react';
import './app.css';
import { useState, useEffect, useRef } from "react";
import StoryTable from "./storytable";

const Controls = () => {
  const [responseData, setResponseData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [defaultType, setDefaultType] = useState('all');
  const [wcFields, setWCFields] = useState('PTitle,PText');
  const [summary, setSummary] = useState(null);
  const [wordcloudImages, setWordcloudImages] = useState(null);
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
  const handleChangeWCFields = (event) => {
    setWCFields(event.target.value);
  };
  const handleKeyDownWCFields = (event) => {
    if (event.key === 'Enter') {
      handleAnalyze(wcFields);
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
  const handleAnalyze = async () => {
    try {
      const response = await fetch(`http://localhost:8091/word_clouds?fields=${wcFields}`);
      const data = await response.json();
      setWordcloudImages(data.wc);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWordcloudImages(null);
    }
  };
  const handleSummary = async () => {
    try {
      const response = await fetch(`http://localhost:8091/summary`);
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWordcloudImages(null);
    }
  };

  const handleAudiate = () => {
    // Add logic for Audiate button
  };

  return (
    <>
    {responseData && 
      <div className='display-container'>
        <SummaryComponent summary = {summary}/>
        <WordcloudComponent wordcloudImages = {wordcloudImages}/>
        <StoryTable res={responseData} />
      </div>
    }
    <div className="controls-container">
      {!!wordcloudImages && 
        <input type="text" 
        placeholder="WCFields"
        value={wcFields}
        onChange={handleChangeWCFields}
        onKeyDown={handleKeyDownWCFields}/>
      }
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
      <button onClick={handleAnalyze}>WordCloud</button>
      <button onClick={handleSummary}>Summary</button>
      {/* <button onClick={handleAudiate}>Audiate</button> */}
    </div>
    </>
  );
};
const SummaryComponent = ({ summary }) => {

  return (
    <>
      {!!summary && (
      <div className='sumcontainer'>
        <h4>Headlines</h4>
        <p className='summary'>{summary}</p>
      </div>
      )}
    </>
  )
};

const WordcloudComponent = ({ wordcloudImages }) => {
  const [expandedImageTitle, setExpandedImageTitle] = useState(null);
  const toggleImageSize = (title) => {
    setExpandedImageTitle(expandedImageTitle === title ? null : title);
  };

  return (
    <>
      {!!wordcloudImages && (
      <div className='wccontainer'>
        {Object.entries(wordcloudImages).map(([title, image]) => (
          <div className='wcimg'>
            <img
              key={title}
              src={`data:image/png;base64,${image}`}
              alt={title}
              className={expandedImageTitle === title ? 'expanded' : 'default'}
              onClick={() => toggleImageSize(title)}
            />
          <span className='wcimgt'>{title}</span>
          </div>
        ))}
      </div>
      )}
    </>
  )
};

export default Controls;
