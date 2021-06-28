import {Link } from 'react-router-dom';
import styles from '../css/PopUp.module.css';

const PopUp = () => {
    return ( 
        <div className= {styles.popUpContainer}>
            <h2>You must login for access this page</h2>
            <Link to="/login" className={styles.loginLink}>Login</Link>
            <Link to="/register" className={styles.registerLink}>Not member? Register</Link>
        </div> 
    );
}
 
export default PopUp;