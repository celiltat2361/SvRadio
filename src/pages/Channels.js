import { useContext, useEffect , useState} from "react";
import AllChannels from "../components/AllChannels";
import PopUp from '../components/PopUp';
import styles from '../css/Channels.module.css';

import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";

const Channels = () => {

    const { channels } = useContext(ChannelContext);
    const {  showPopUp } = useContext(UserContext);
    const [showChannels, setShowChannels] = useState([]);
    const [number, setNumber] = useState(8);

    useEffect(() => {
        if (channels) {
            const showing = channels.slice(0, number);
            setShowChannels(showing);
        }
    }, [number, channels]);

    const handleClick = () => {
        setNumber(number + 8);
    };

    return ( 
        <div>
            { showPopUp ? <PopUp/> : <div></div>}
           
            <h1>All Channels</h1>
           
            
            <div className= {styles.channelCard}>
                
                {channels && showChannels.map((channel) => (
                    <AllChannels key={channel.id} channel= {channel}/>  
                ))}
            </div>
            <div className={styles.button}>
            {channels && showChannels.length < channels.length && (
                        <button  onClick={handleClick}>Show More</button>
                    )
                }
            </div>
        </div> 
        );
}
 
export default Channels;