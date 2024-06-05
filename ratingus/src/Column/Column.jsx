import styles from './Column.module.css';

function Column() {
    return (
        <div className={styles.display}>
            <div className={styles.block}>
                <h2 className={styles.text}>Ф.И.О</h2>
            </div>
            <div className={styles.block}>
                <h2 className={styles.text}>телефон</h2>
            </div>
            <div className={styles.block} >
                <h2 className={styles.text}>дата рождения</h2>
            </div>

            <div className={styles.block}>
                <h2 className={styles.text}>отдел</h2>
            </div>
        </div>
    );
}

export default Column;
