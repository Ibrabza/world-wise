import styles from './CityList.module.css';
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import {useCity} from "../Contexts/CityContext.jsx";
import {useState} from "react";


export default function CityList() {
    const { isError, state} = useCity();
    if(state.isLoading) return <Spinner />;
    if (state.cities.length === 0) return <Message>{isError}</Message>;

    return (
        <ul className={styles.cityList}>
            {state.cities.map((city) => {return(
                <li key={city.id + Math.floor(Math.random() * 1000)}>
                    <CityItem city={city}/>
                </li>)}
            )}
        </ul>
    )
}