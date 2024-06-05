import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.css';

const RatingFilter = ({ onFilter, departments }) => {
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [showAllDepartments, setShowAllDepartments] = useState(false);

    const handleMinRatingChange = (e) => {
        const value = e.target.value;
        setMinRating(value);
        onFilter(value, maxRating, selectedDepartments.join(','), null, null);
    };

    const handleMaxRatingChange = (e) => {
        const value = e.target.value;
        setMaxRating(value);
        onFilter(minRating, value, selectedDepartments.join(','), null, null);
    };

    const handleDepartmentChange = (e) => {
        const value = e.target.value;
        const newSelectedDepartments = selectedDepartments.includes(value)
            ? selectedDepartments.filter(dept => dept !== value)
            : [...selectedDepartments, value];

        setSelectedDepartments(newSelectedDepartments);
        onFilter(minRating, maxRating, newSelectedDepartments.join(','), null, null);
    };

    const toggleShowAllDepartments = () => {
        setShowAllDepartments(!showAllDepartments);
    };

    const handleReset = () => {
        setMinRating('');
        setMaxRating('');
        setSelectedDepartments([]);
        setShowAllDepartments(false);
        onFilter('', '', '', null, null);
    };

    const sortedDepartments = [...departments].sort((a, b) => b.count - a.count);
const displayedDepartments = showAllDepartments ? sortedDepartments : sortedDepartments.slice(0, 5);

    return (
        <div className={styles.formContainer}>
            <div className={styles.filterRow}>
                <label className={styles.label}>
                    Рейтинг от:
                    <input
                        type="number"
                        value={minRating}
                        onChange={handleMinRatingChange}
                        className={styles.ratung}
                    />
                </label>
                <label className={styles.label}>
                    До:
                    <input
                        type="number"
                        value={maxRating}
                        onChange={handleMaxRatingChange}
                        className={styles.ratung}
                    />
                </label>
            </div>
            <div className={styles.checkboxContainer}>
                {displayedDepartments.map(({ department, count }) => (
                    <label key={department} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            value={department}
                            checked={selectedDepartments.includes(department)}
                            onChange={handleDepartmentChange}
                            className={styles.checkbox}
                        />
                        {department} ({count})
                    </label>
                ))}
            </div>
            <div className={styles.displayflex}>
                {departments.length > 5 && (
                    <button onClick={toggleShowAllDepartments} className={styles.toggleButton}>
                        {showAllDepartments ? 'Скрыть' : 'Показать все'}
                    </button>
                )}
                <button onClick={handleReset} className={styles.toggleButton}>Сбросить</button>
            </div>
        </div>
    );
};

RatingFilter.propTypes = {
    onFilter: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(
        PropTypes.shape({
            department: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired
        })
    ).isRequired,
};

export default RatingFilter;
