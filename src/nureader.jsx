import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMoon, FaSun, FaPlus, FaMinus, FaCode } from "react-icons/fa";
import Cookies from 'js-cookie';
import "./app.css";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { motion } from "framer-motion";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDocs  } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import TodayContainer from "./title";
import Controls from "./controls";

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);




function FadeInWhenVisible({ children }) {
	return (
	  <motion.div
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true }}
		transition={{ duration: 2 }}
		variants={{
		  visible: { opacity: 1, scale: 1 },
		  hidden: { opacity: 0, scale: 1 }
		}}
	  >
		{children}
	  </motion.div>
	);
  }

  const ThemeToggleIcon = (props) => {
    const themeIcon = props.theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />;
    return (
      <div style={{ marginRight: "0", cursor: "pointer" }} onClick={props.changeTheme}>
        {themeIcon}
      </div>
    );
  };
  const Header = () => {
    return (
      <div className="header-container">
        <h2>NuReader</h2>
      </div>
    );
  };
  
  
const NuReaderApp = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [theme, setTheme] = useState(props.theme);
  return (
    <div className={`container`}>
      <div className="header-and-title">
        <TodayContainer />
        <FadeInWhenVisible>
          <Header />
        </FadeInWhenVisible>
        <div className="button-container">
          <ThemeToggleIcon theme={props.theme} changeTheme={props.changeTheme} />
        </div>
      </div>
      <Controls />
    </div>
  );
};

export default NuReaderApp;