import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import Header from "./Header/Header";
import CardShow from "./Card/CardShow";
import AddUserButton from "./AddUser/AddUserButton";
import AddUser from "./AddUser/AddUser"; 
import LoginForm from "./components/LoginForm"; 
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' || false); 

  return (
    <Router>
      <AppContent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> 
    </Router>
  );
}

import { AnimatePresence } from 'framer-motion';

function AppContent({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const showAddUserButton = location.pathname !== "/add-user";

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      {isLoggedIn ? null : <LoginForm setIsLoggedIn={setIsLoggedIn} />} 
      {isLoggedIn && showAddUserButton && <AddUserButton />} 
      {isLoggedIn && (
        <AnimatePresence>
          <Routes location={location}>
            <Route path="/" element={<CardShow />} />
            <Route path="/add-user" element={<AddUser />} /> 
          </Routes>
        </AnimatePresence>
      )}
    </>
  );
}

// Define prop types for AppContent
AppContent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default App;
