import styles from "../components/CountryList.module.css";
import CountryItem from "./CountryItem.jsx";
import {useCity} from "../Contexts/CityContext.jsx";

export default function CountryList() {
    const {state} = useCity();
    const countries = state.cities.reduce((countryList , city) => {
        if(!countryList.map(el=>el.country).includes(city.country)){
            return [...countryList, {country: city.country, emoji: city.emoji}];
        }else
            return countryList;
    }, [])
    return (
        <ul className={styles.countryList}>
            {countries.map(country => (<li key={country.country}><CountryItem country={country} /></li>))}
        </ul>
    )
}