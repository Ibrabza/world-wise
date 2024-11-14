import {useAuth} from "../Contexts/UserAuthContext.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function ProtectRouter({children}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    console.log(isAuthenticated);

    useEffect(() => {
        if(!isAuthenticated)navigate("/")
    }, [isAuthenticated,navigate])

    return isAuthenticated ? children : null;
}