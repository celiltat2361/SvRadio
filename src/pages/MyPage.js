import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import styles from '../css/MyPage.module.css';

function MyPage() {

    const { loggedUser, whoami, logoutUser } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        whoami();
        // eslint-disable-next-line
    }, []);

    const handleLogout = () => {
        logoutUser();
        history.push("/");
    };

    return (
        <div className="container">
            {loggedUser ? (
                <div id="content">
                    <div className={styles.infoContainer}>
                        <div className={styles.infoBox}>
                            <h3>My Personal Information</h3>
                            <div className={styles.contactInformation}>
                                <div className={styles.info}><h4>Username :</h4><div>{loggedUser.username}</div></div>
                                <div className={styles.info}><h4>Email :</h4><div>{loggedUser.email}</div></div>
                                <div className={styles.info}><h4>Password :</h4><div>********</div></div>  
                            </div>
                            <Link to={`/edit/${loggedUser.userID}`} className={styles.btnLink}>Edit</Link>
                        </div>
                        <div className={styles.links}>
                            <Link to={`/favs/${loggedUser.userID}`} className={styles.btnLink}>My favorite list</Link>
                            <Link onClick={handleLogout} to="/" className={styles.btnLink}>Logout</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loggedOutWrapper}>
                    <h2>You must login for access this page</h2>
                    <Link to="/login" className={styles.loginLink}>Login</Link>
                    <Link to="/register" className={styles.registerLink}>Not member? Register</Link>
                </div>
            )}
        </div>
    );
}

export default MyPage;