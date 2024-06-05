import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackToMainPageButton.module.css'
function BackToMainPageButton() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/'); 
    };

    return (
        <button type='submit' onClick={handleBackToHome} className={styles.biba} >
            Вернуться на главную
        </button>
    );
}

export default BackToMainPageButton;
