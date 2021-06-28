import { useState, useContext} from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import styles from '../css/Register.module.css' ;

const Login = () => {
    const history = useHistory();
    const { loginUser, islogin } = useContext(UserContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLoginError] = useState("");
    let [ showError, setShowError ] = useState(false);
  
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let userToLogin = { email, password, islogin} ;
        
        let result = await loginUser(userToLogin);

        if (result.success) {
            history.push("/");
            return;
        }
        if (result.error) {
            setLoginError("Wrong email or password!");
            setShowError(true);
            setTimeout(() =>{
                setShowError(false);
            }, 2500); 
            
        }
    };
    
   
    return ( 
        <form className = {styles.form}  onSubmit = {handleSubmit} >
            <h3>Login Form</h3>
             <div className ={styles.input}>
                <label>Email :</label>
                <input 
                    type="email"
                    onChange = {handleEmailChange}/>
            </div>
            <div className ={styles.input}>
                <label>Password :</label>
                <input 
                    type="password"
                    onChange = {handlePasswordChange}/>

            </div>
            
            <Link to="/register" className={styles.registerLink}>Not member? Register</Link>
            <div className={styles.loginButton}>
                <button>Login</button>
            </div>
            {showError && <p className={styles.errorMessage}>{loginError}</p>}
        </form>

    );
}
 
export default Login;