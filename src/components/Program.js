import { useHistory } from "react-router-dom";
import { useContext} from "react";
import { UserContext } from "../contexts/UserContext";

import styles from '../css/Program.module.css' ;

const Program = (prop) => {
    const { loggedUser, setShowPopUp } = useContext(UserContext);

    const history = useHistory();

    const goProgramDetails = () => {
        if(loggedUser){
            history.push(`/programs/${prop.program.id}`);
            return;
        }
        setShowPopUp(true);
        setTimeout(() =>{
            setShowPopUp(false);
        }, 2500);  
    }
    
    return ( <div>
        <div className={styles.card} onClick ={goProgramDetails}>
            <img className={styles.image} src={prop.program.programimage} alt={prop.program.name}/>
            <div className={styles.container}>
                <h6>{prop.program.name}</h6> 
            </div>
        </div>
    </div> );
}
 
export default Program;

