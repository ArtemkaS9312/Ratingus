import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import styles from './Cards.module.css';

const ItemType = {
    CARD: 'card',
};

function Card({ user, index, moveCard }) {
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemType.CARD,
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType.CARD,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const opacity = isDragging ? 1 : 1;

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
            data-handler-id={handlerId}
        >
            <h2>{user.full_name}</h2>
            <p>Дата рождения: {user.birth_date}</p>
            <p>Телефон: {user.phone}</p>
            <p className={styles.rating}>Рейтинг: <span>{user.rating_position}</span></p>
        </div>
    );
}

Card.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        full_name: PropTypes.string.isRequired,
        birth_date: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        rating_position: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
};

function Cards() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
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

    const moveCard = (fromIndex, toIndex) => {
        const updatedUsers = [...users];
        const [movedUser] = updatedUsers.splice(fromIndex, 1);
        updatedUsers.splice(toIndex, 0, movedUser);
        setUsers(updatedUsers);
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.App}>
                <div className={styles.userCards}>
                    {users.map((user, index) => (
                        <Card
                            key={user.id}
                            index={index}
                            user={user}
                            moveCard={moveCard}
                        />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
}

export default Cards;
