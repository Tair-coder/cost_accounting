import React from "react";
import styles from "./Login.module.css";
import Card from "../UI/Card";
function Login(props) {
  const singInWithGoogle = () => {
    const provider = new props.firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  };
  return (
    <Card className={styles.logIn}>
      <button className={styles.btn} onClick={singInWithGoogle}>
        Войти через Google
      </button>
    </Card>
  );
}

export default Login;
