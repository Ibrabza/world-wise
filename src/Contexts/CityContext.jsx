import {createContext, useCallback, useContext, useEffect, useReducer, useState} from "react";


const CityContext = createContext();

const BASE_URL = 'http://localhost:8000';

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
}

function reducer(state,action){
    switch (action.type){
        case 'loadingInProgress':
            return {...state, isLoading: true};
        case 'cities/loaded':
            return {...state,cities: action.payload, isLoading: false}
        case 'city/loaded':
            return {...state, currentCity: action.payload, isLoading: false};
        case 'city/created':
            return {...state, cities: [...state.cities, action.payload],  currentCity: action.payload, isLoading: false,};
        case 'city/deleted':
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: state.currentCity.id === action.payload ? {} : state.currentCity,
                isLoading: false,
            };
        default:
            throw new Error("Unknown action type");
    }
}

// eslint-disable-next-line react/prop-types
function CityProvider({ children }) {
    const [state, dispatch] = useReducer(reducer,initialState);
    const [isError, setIsError] = useState(false);

    useEffect(function(){
        async function loadCities (){
            dispatch({type: 'loadingInProgress'})
            try {
                const response  = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();
                dispatch({type: 'cities/loaded', payload:data})
            }catch (err){
                console.log(err);
                setIsError(err.message);
            }
        }
        loadCities();
    },[])

    const getCity = useCallback(async function getCity(id){
        console.log("i am here" + id)
        dispatch({type: 'loadingInProgress'})
        try{
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            // console.log(data);
            dispatch({type:'city/loaded', payload: data})
        }catch (err){
            console.log(err);
        }
    }, [])

    async function createNewCity(newCity){
        dispatch({type: 'loadingInProgress'})
        try {
            await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            dispatch({type: 'city/created', payload: newCity})
        }catch (err){
            console.log(err);
        }
    }


    async function deleteCity(id){
        dispatch({type: 'loadingInProgress'})
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            dispatch({type:'city/deleted', payload: id })
        }catch (err){
            console.log(err);
        }
    }


    return (
        <CityContext.Provider value={
            {
                state,
                isError,
                getCity,
                createNewCity,
                deleteCity,
            }
        }>
            {children}
        </CityContext.Provider>
    )
}


function useCity(){
    const context = useContext(CityContext);
    if(context === undefined){
        throw new Error('useCity was used out of provider, balbes chekay normalno')
    }
    return context;
}







export {CityProvider, useCity};