import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AddUserButton.module.css';

function AddUserButton() {
  return (
    <div className={styles.all}>
      <Link to="/add-user">
        <input type="submit" value="Добавить" className={styles.but} />
      </Link>
    </div>
  );
}

export default AddUserButton;
