
import styles from './Sidebar.module.css';
import AppNav from "./AppNav.jsx";
import Logo from "./Logo.jsx";
import {Outlet} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet/>
        </div>
    )
}