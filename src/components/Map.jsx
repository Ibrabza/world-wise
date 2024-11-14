import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, TileLayer, useMap, Popup, Marker, useMapEvents} from 'react-leaflet'
import {useState, useEffect} from "react";
import {useCity} from "../Contexts/CityContext.jsx";


import styles from "./Map.module.css";
import {useGeolocation} from "../Contexts/UseGeolocation.js";
import Button from "./Button.jsx";

export default function Map(){
    const [searchParams] = useSearchParams();
    const {state } = useCity();
    const [mapPosition, setMapPosition] = useState([40,0]);

    const {isLoading: isLoadingGeolocation, position: mapGeoPosition, getPosition} = useGeolocation();


    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    // useEffect(() => {
    //     setMapPosition(mapGeoPosition);
    // }, [mapGeoPosition]);
    useEffect(function (){
        if(mapGeoPosition !== null){
            setMapPosition(mapGeoPosition)
        }
    },[mapGeoPosition])

    console.log(mapGeoPosition)

    useEffect(function (){
        if(mapLat && mapLng) setMapPosition([mapLat,mapLng])
    }, [mapLat,mapLng])

    return (
        <div className={styles.mapContainer}>
            <Button type='position' onClick={getPosition}>{isLoadingGeolocation ? "Loading..." : "USE MY GEOLOCATION"}</Button>
            <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {state.cities.map(city => {
                    return <Marker key={city.id + Date.now() + Math.floor(Math.random() * 1000)} position={[city.position.lat, city.position.lng]}>
                    <Popup>
                        <span>{city.emoji}</span><span>{city.cityName}</span>
                    </Popup>
                </Marker>
                    })}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}
//
// eslint-disable-next-line react/prop-types
function ChangeCenter({position}){
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}