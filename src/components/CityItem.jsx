/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom';

import styles from './CityItem.module.css';

import {useCity} from "../Contexts/CityContext.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

export default function CityItem({ city}){
    const {state, deleteCity} = useCity();
    const {emoji, cityName,date, id, position} = city;


     function handleDeleteCity(e){
        e.preventDefault();
         deleteCity(id);
    }

    return (
        <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}
              className={`${styles.cityItem} ${state.currentCity.id === id ? styles['cityItem--active']: ""}`} >
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.name}>{cityName}</span>
            <span className={styles.date}>{formatDate(date)}</span>
            <button className={styles.deleteBtn} onClick={(e)=>{handleDeleteCity(e)}}>&times;</button>
        </Link>
)
}
