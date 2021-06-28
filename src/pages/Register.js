import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';
import styles from '../css/Register.module.css' ;

const Register = () => {
    const history = useHistory();
    const { registerUser } = useContext(UserContext);

    const [ username , setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    let [ showRegisterMsg, setShowRegisterMsg] = useState(false);
    const [ registerMsg, setRegisterMsg] = useState("");
    const [ registerErrMsg, setRegisterErrMsg ] = useState("");
   

    const handleUsernameChange = (e) => { setUsername(e.target.value)};
    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            username,email,password
        };
        let result = await registerUser(newUser);
        if(result.success){
            setRegisterMsg(result.success)
            setShowRegisterMsg(true);

            setTimeout(()=>{
                setShowRegisterMsg(false);
                history.push("/login")
            }, 2500); 
            
            return;
        } 
        if( result.error) {
            setRegisterErrMsg(result.error)
            setShowRegisterMsg(true);

            setTimeout(()=>{
                setShowRegisterMsg(false);
            }, 2500)
            return;
        }
        
        
    };

    return ( 

        <form className = {styles.form} onSubmit = {handleSubmit} >
            <h3>Register Form</h3>
            <div className ={styles.input}>
                <label>Username :</label>
                <input 
                    type="text"
                    onChange = {handleUsernameChange}
                    required
                    />
            </div>
            <div className ={styles.input}>
                <label>Email :</label>
                <input 
                    type="email"
                    onChange = {handleEmailChange}
                    required/>
            </div>
            <div className ={styles.input}>
                <label>Password :</label>
                <input 
                    type="password"
                    onChange = {handlePasswordChange}
                    required/>

            </div>
            <Link to="/login" className={styles.loginLink}>Already registered? Login</Link>
            <div className={styles.registerButton}>
                <button>Register</button>
            </div>
            { showRegisterMsg && (
                <div>
                    {registerMsg ? <p className={styles.registerMsg}>{registerMsg}</p> : <p className={styles.errorMessage}>{registerErrMsg}</p>}
                </div>
            
            
            )}
            
            
        </form>

    );
}
 
export default Register;