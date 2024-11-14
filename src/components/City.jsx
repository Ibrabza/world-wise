import styles from "./City.module.css";
import {useParams, useSearchParams} from "react-router-dom";
import {useCity} from "../Contexts/CityContext.jsx";
import {useEffect} from "react";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import ButtonBack from "./ButtonBack.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
    const {id} = useParams();
    // console.log(id)
    const {state , getCity, isLoading, isError} = useCity();
    // console.log(currentCity);

    useEffect(function(){
        getCity(id)
    },[id,getCity])

    // console.log(currentCity)


      if(isLoading) return <Spinner/>
      if(isError) return <Message>{isError}</Message>;
    const { cityName, emoji, date, notes } = state.currentCity;


      return (
        <div className={styles.city}>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{emoji}</span> {cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
          </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
          <ButtonBack/>
      </div>
    </div>
  );
}

export default City;


// const [searchParams, setSearchParams] = useSearchParams();
// const lat = searchParams.get('lat');
// const lng = searchParams.get('lng');
// console.log(searchParams, lat, lng);
// console.log(id);
//
// return (
//     <div className={styles.city}>
//         CITY : {id}
//         <br/>
//         lat {lat} lng {lng}
//     </div>
// )