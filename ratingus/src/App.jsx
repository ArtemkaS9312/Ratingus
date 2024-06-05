import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from "./Header/Header";
import CardShow from "./Card/CardShow";
import AddUserButton from "./AddUser/AddUserButton";
import AddUser from "./AddUser/AddUser"; 
import './App.css'; 

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const location = useLocation();
  const showAddUserButton = location.pathname !== "/add-user";
  return (
    <>
      <Header />
      {showAddUserButton && <AddUserButton />}
      <AnimatePresence>
        <Routes location={location}>
          <Route path="/" element={<CardShow />} />
          <Route path="/add-user" element={<AddUser />} /> 
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
