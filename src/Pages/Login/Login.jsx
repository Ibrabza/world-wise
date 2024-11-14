import {useEffect, useState} from "react";

import styles from "./Login.module.css";
import {useAuth} from "../../Contexts/UserAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button.jsx";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  const {isAuthenticated,login} = useAuth();

  useEffect(function ()  {
    if(isAuthenticated){
      navigate("/app")
    }
  }, [isAuthenticated,navigate]);

  function handleOnLogin(e){
    e.preventDefault();
    login(email,password);
    console.log('i am here')
  }


  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={(e) => handleOnLogin(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary' onClick={(e) => handleOnLogin(e)}>Login</Button>
        </div>
      </form>
    </main>
  );
}
