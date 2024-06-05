import { useState } from 'react';
import axios from 'axios';
import styles from './AddUser.module.css';
import BackToMainPageButton from "../BackToMainPageButton/BackToMainPageButton";


function AddUser() {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [ratingPosition, setRatingPosition] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullNamePattern = /^[^\s]+ [^\s]+ [^\s]+$/;
    if (!fullName.match(fullNamePattern)) {
      alert('Пожалуйста, введите полное имя (Имя Фамилия Отчество).');
      return;
    }
    if (!birthDate) {
      alert('Пожалуйста, введите дату рождения.');
      return;
    }
    const currentDate = new Date().toISOString().split('T')[0];
    if (birthDate > currentDate) {
      alert('Введите корректную дату рождения.');
      return;
    }
    const phonePattern = /^\+?[\d\s\-()]{10,}$/;
    if (!phone.match(phonePattern)) {
      alert('Пожалуйста, введите корректный номер телефона.');
      return;
    }
    if (!department) {
      alert('Пожалуйста, введите отдел.');
      return;
    }
    const rating = parseInt(ratingPosition, 10);
    if (isNaN(rating) || rating <= 0) {
      alert('Пожалуйста, введите корректный рейтинг.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users/add', {
        full_name: fullName,
        birth_date: birthDate,
        phone: phone,
        department: department,
        rating_position: ratingPosition,
      });
      setFullName('');
      setBirthDate('');
      setPhone('');
      setDepartment('');
      setRatingPosition('');
      alert('Пользователь успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
      alert('Ошибка при добавлении пользователя.');
    }
  };

  return (
    <div>
         
    <div className={styles.addUserForm}>
    <div className={styles.flexContainer}>
      <BackToMainPageButton />
      <h2>НОВЫЙ ПОЛЬЗОВАТЕЛЬ</h2>
      </div>
      <form onSubmit={handleSubmit}>
      
        <div className={styles.flexContainer}>
          <label>
            Ф.И.О:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <label>
            Отдел:
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </label>
        </div>
        <label>
          Дата рождения:
          <input
            type="date"
            value={birthDate}
            className={styles.birthDateInput}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </label>
        <label>
          Телефон:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Рейтинг:
          <input
            type="number"
            value={ratingPosition}
            onChange={(e) => setRatingPosition(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles.add}>Добавить пользователя</button>
      </form>
     
    </div>
    </div>
  );
}

export default AddUser;
