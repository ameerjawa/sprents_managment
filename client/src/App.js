// client/src/App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./views/HomePage"
import MainPage from "./views/MainPage"
import {BrowserRouter, Routes ,Route, Navigate  } from 'react-router-dom';



function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userSession, setUserSession] = useState(user);
  useEffect(() => {
    if (user) {
      setUserSession({userLogedIn: true});
    }
    }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path="*" element={ userSession?.userLogedIn ? <Navigate  to="/workspace"/> : <Navigate to="/homepage"/>} />
           
           
           <Route exact path="/workspace" element={
            userSession?.userLogedIn ? <MainPage setUserSession = {setUserSession}/> : <Navigate to="/homepage"/>
           } />
           <Route exact path="/homepage" element={
            userSession?.userLogedIn ? <Navigate  to="/workspace"/> : <HomePage setUserSession = {setUserSession}/>
           } />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
