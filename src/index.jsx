import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import "./app.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/nureader" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
