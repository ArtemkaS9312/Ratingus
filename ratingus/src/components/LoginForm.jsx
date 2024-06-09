import React, { useContext, useState } from "react";
import { Context } from "../main";
import styles from "./LoginForm.module.css"; 

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
        <div className={styles.addUserForm}>
            <form>
                <input 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                />

                <input 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Пароль"
                    className={styles.input}
                />

                <button className={styles.add} onClick={handleLogin} type="button">Логин</button>
                <button className={styles.add} onClick={handleRegistration} type="button">Регистрация</button>
            </form>
        </div>
    );
};

export default LoginForm;
