import React, { useContext, useState } from "react";
import { Context } from "../main"; 

const LoginForm = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    const handleLogin = async () => {
        await store.login(email, password);
        setIsLoggedIn(true); 
    };

    const handleRegistration = async () => {
        await store.registration(email, password);
        setIsLoggedIn(true); 
    };

    return (
        <div>
            <input 
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text" 
                placeholder="Email" 
            />

            <input 
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder="Пароль" 
            />

            <button onClick={handleLogin}>Логин</button>
            <button onClick={handleRegistration}>Регистрация</button> 
        </div>
    );
};

export default LoginForm;
