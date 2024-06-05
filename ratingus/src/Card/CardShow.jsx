import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CardShow.module.css';
import RatingFilter from '../Filters/Filters';
import styless from '../UserCount/UserCount.module.css';

Modal.setAppElement('#root');

function CardShow() {
    const [users, setUsers] = useState([]);
    const [menuUserId, setMenuUserId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userCount, setUserCount] = useState(0);
    const [departments, setDepartments] = useState([]);
    
    const [editUser, setEditUser] = useState({
        id: '',
        full_name: '',
        birth_date: '',
        phone: '',
        department: '',
        rating_position: ''
    });

    useEffect(() => {
        fetchUsers();
        fetchDepartments();
        fetchUserCount();
    }, []);

    const fetchUsers = async (minRating, maxRating, departments, startDate, endDate) => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                params: {
                    minRating: minRating || undefined,
                    maxRating: maxRating || undefined,
                    departments,
                    startDate,
                    endDate 
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/count');
            setUserCount(response.data.count);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleFilterChange = (minRating, maxRating, departments, startDate, endDate) => {
        fetchUsers(minRating, maxRating, departments, startDate, endDate);
    };

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm('Вы уверены что хотите удалить пользователя?');
            if (confirmed) {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                setUsers(users.filter(user => user.id !== id));
                fetchDepartments();
                fetchUserCount();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const openModal = (user) => {
        const formattedDate = formatDateForInput(user.birth_date);
        setEditUser({ ...user, birth_date: formattedDate });
        setModalIsOpen(true);
    };

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const { id, full_name, birth_date, phone, department, rating_position } = editUser;
            const response = await axios.put(`http://localhost:5000/api/users/${id}`, {
                full_name, birth_date, phone, department, rating_position
            });
            const updatedUser = response.data;
            const index = users.findIndex(user => user.id === updatedUser.id);
    
            setUsers(prevUsers => {
                const newUsers = [...prevUsers];
                newUsers.splice(index, 1); 
                let newIndex = newUsers.findIndex(user => user.rating_position < updatedUser.rating_position);
                if (newIndex === -1) newIndex = newUsers.length; 
                newUsers.splice(newIndex, 0, updatedUser); 
                return newUsers;
            });
            closeModal();
            fetchDepartments(); 
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCloseMenu = () => {
        setMenuUserId(null);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const calculateFontSize = (text) => {
        if (text.length < 10) return '35px';
        if (text.length < 20) return '35px';
        if (text.length < 30) return '30px';
        return '30px';
    };

    const style = {
        display: "flex",
        gap: "100px",
    };

    const getTop5Users = (users) => {
        return [...users]
            .sort((a, b) => b.rating_position - a.rating_position)
            .slice(0, 5)
            .map(user => user.id);
    };

    const top5UserIds = getTop5Users(users);

    return (
        <div>
            <div className={styless.flex}>
                <div className={styless.divv}>Кол-во. пользователей: 
                    <br />
                    <span className={styless.spaaa}>{userCount}</span>
                </div>
            </div> 
            <div className={styles.App}>
                <RatingFilter onFilter={handleFilterChange} departments={departments} />
                <br/>
                <div className={styles.userCards}>
                    <AnimatePresence>
                        {users.map(user => (
                            <motion.div
                                key={user.id}
                                className={`${styles.userCard} ${top5UserIds.includes(user.id) ? styles.top5 : ''}`}
                                initial={{ y: 50, scale: 0.5, opacity: 0 }}
                                animate={{ y: 0, scale: 1, opacity: 1 }}
                                exit={{ y: 50, scale: 0.5, opacity: 0 }}>
                            {menuUserId === user.id ? (
                                <div className={styles.mod}>
                                    <button onClick={handleCloseMenu}>X</button>
                                    <button onClick={() => openModal(user)}>Редактировать</button>
                                    <button onClick={() => handleDelete(user.id)} className={styles.delete}>Удалить</button>
                                </div>
                                ) : (
                                    <button onClick={() => setMenuUserId(user.id)} className={styles.hiddenMenu}>...</button>
                                )}
                                <div style={style} className={styles.namedep}>
                                    <h2>{user.full_name}</h2>
                                    <h2 style={{ fontSize: calculateFontSize(user.department) }}>{user.department}</h2>
                                </div>
                                <p>Дата рождения: {formatDate(user.birth_date)}</p>
                                <p>Телефон: {user.phone}</p>
                                <p className={styles.ratingpos}>Рейтинг: <span >{user.rating_position}</span></p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit User">
                    <div>
                        <div className={styles.addUserForm}>
                            <div className={styles.flexContainer}>
                                <button type="button" onClick={closeModal} className={styles.biba} >Отмена</button>
                                <h2>РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ</h2>
                            </div>
                            <form>
                                <div className={styles.flexContainer}>
                                    <label>
                                        Ф.И.О:
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={editUser.full_name}
                                            onChange={handleChange}/>
                                    </label>
                                    <label>
                                        Отдел:
                                        <input
                                            type="text"
                                            name="department"
                                            value={editUser.department}
                                            onChange={handleChange}/>
                                    </label>
                                </div>
                                <label>
                                    Дата рождения:
                                    <input
                                        type="date"
                                        name="birth_date"
                                        value={editUser.birth_date} 
                                        onChange={handleChange}
                                        className={styles.birthDateInput}
                                    />
                                </label>
                                <label>
                                    Телефон:
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editUser.phone}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Рейтинг:
                                    <input
                                        type="number"
                                        name="rating_position"
                                        value={editUser.rating_position}
                                        onChange={handleChange}
                                    />
                                </label>
                                <button type="button" onClick={handleUpdate} className={styles.add}>Обновить</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default CardShow;
