import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserCount.module.css'

function UserCount() {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        fetchUserCount();
    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/count');
            setUserCount(response.data.count);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };

    return (
        <>
                <div className={styles.divv}><i>Кол-во. пользователей: {userCount}</i>
            
            </div> 
        </>
    );
}

export default UserCount;
