import React, { createContext, useState } from "react";
import "./app.css";
import NuReaderApp from "./nureader";


export const ThemeContext = createContext(null);

export const App = () => {
	const [theme, setTheme] = useState("dark");
	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	}
	return (
		<div className="app" id={theme}>
      		<NuReaderApp theme={theme} changeTheme={toggleTheme} />
    	</div>
	);
};


export default App;