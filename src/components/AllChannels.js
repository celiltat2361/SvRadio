
import { useContext} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import styles from '../css/AllChannels.module.css';

const AllChannels = (prop) => {
    const { loggedUser, setShowPopUp } = useContext(UserContext);
    
    const history = useHistory();
    
    
    const goChannelDetails = () => {
        if(loggedUser){
            history.push(`/channels/${prop.channel.id}`);
            return;
        }
        setShowPopUp(true);
        setTimeout(() =>{
            setShowPopUp(false);
        }, 2500); 
    }

    return (
        <div className={styles.card} onClick={goChannelDetails} >
            {prop.channel.image ? (
                <img className={styles.image} src={prop.channel.image} alt={prop.channel.name}/>
            ) : (
                <img src="https://static-cdn.sr.se/images/4866/92556cd3-3254-4424-91bb-6ba511f60f4c.jpg?preset=api-default-square" alt={prop.channel.name} />
            )}
            
            <div className= {styles.container}>
                <h4>{prop.channel.name}</h4>
                <p>{prop.channel.channeltype}</p>
            </div>
        </div>
    );
};

 
export default AllChannels;
