import {createContext, useContext, useReducer} from "react";

const UserAuthContext = createContext();

const initalState = {
    user: null,
    isAuthenticated: false,
}

function reducer(state,action) {
    switch (action.type) {
        case 'login':
            return {...state, user: action.payload, isAuthenticated: true}
        case 'logout':
            return {...state, user: null, isAuthenticated: false}
        default:
            throw new Error("Unknown action type")
    }
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

// eslint-disable-next-line react/prop-types
function UserAuthProvider({ children }) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer,initalState);

    function login(email,password){
        if (email === FAKE_USER.email && password === FAKE_USER.password){
             dispatch({type:'login', payload: FAKE_USER})
        }
    }

    function logout(){
        dispatch({type:'logout'})
    }

    return (<UserAuthContext.Provider value={
        {
            user,
            isAuthenticated,
            login,
            logout,
        }
    }>
        {children}
    </UserAuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(UserAuthContext);
    if(context === undefined) throw new Error('useAuth was used out of provider');
    return context;
}

export {UserAuthProvider, useAuth};