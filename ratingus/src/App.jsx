import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from "./Header/Header";
import CardShow from "./Card/CardShow";
import AddUserButton from "./AddUser/AddUserButton";
import AddUser from "./AddUser/AddUser"; 
import LoginForm from "./components/LoginForm";
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // Проверяем наличие токена доступа в локальном хранилище
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

export default App;
