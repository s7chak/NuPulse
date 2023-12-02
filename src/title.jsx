import React, { useState, useEffect } from 'react';
import './app.css';

const TodayContainer = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', optionsDate);
      const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = now.toLocaleTimeString('en-US', optionsTime);

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateDateTime, 60000);
    updateDateTime();
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="today-container">
      <div className="date">{currentDate}</div>
      <div className="time">{currentTime}</div>
    </div>
  );
};

export default TodayContainer;
