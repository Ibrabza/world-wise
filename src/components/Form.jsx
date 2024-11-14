// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import ButtonBack from "./ButtonBack.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import {useCity} from "../Contexts/CityContext.jsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");
    const [isCityLoading, setIsCityLoading] = useState(false);

    const {createNewCity} = useCity()

    const [searchParams] = useSearchParams();

    const mapLat = searchParams.get('lat')
    const mapLng = searchParams.get('lng')

    useEffect(function (){
        async function fetchNewCity(){
            try {
                setIsCityLoading(true)
                const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
                const data = await res.json();
                console.log(data);
                setCityName(data.city);
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode))
            }catch (err){
                console.log(err);
            }finally {
                setIsCityLoading(false);
            }
        }
        fetchNewCity();
    }, [mapLat, mapLng])

     async function handleCreateNewCity(e){
        e.preventDefault();
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {
                lat: mapLat,
                lng: mapLng,
            }
        }
        await createNewCity(newCity);
        navigate("/app")

    }


    if(isCityLoading) return <Spinner />
    // if(country) return <Message message="Click somewhere else on the map!" />;

    return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
          <Button type={"primary"} onClick={(e) => handleCreateNewCity(e)}>Add</Button>
          <ButtonBack />
      </div>
    </form>
    );
}

export default Form;
