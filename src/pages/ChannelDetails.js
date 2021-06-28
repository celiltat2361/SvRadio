import { useContext, useEffect, useState } from 'react';
import { ChannelContext } from '../contexts/ChannelContext';
import { UserContext } from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';

import styles from '../css/ChannelDetails.module.css';


const ChannelDetails = (props) => {
    const { getChannelById, channelById  } = useContext(ChannelContext);
    const { loggedUser, addFavToDB, addFavToUser} = useContext(UserContext)
    const { channelId } = props.match.params;
    const [ showAddMsg, setShowAddMsg] = useState(false);
    const [ addMsg, setAddMsg] = useState("");
    const [ addingErrMsg , setAddingErrMsg] = useState("");
    const history = useHistory();
    
    

    useEffect(() => {
        getChannelById(channelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendFavToDB = async () => {
        let newFav = {
            favId: channelId,
            class: "Channel",
            name: channelById.name,
            imageURL : channelById.image
        };
        await addFavToDB(newFav);
        let result = await addFavToUser(loggedUser.userID, {name: channelById.name});
        if (result.success) {
            setAddMsg(result.success);
            setShowAddMsg(true);
            setTimeout(()=>{
                setShowAddMsg(false);
            }, 2500);
            return;
        }
        if (result.error){
            setAddingErrMsg(result.error);
            setShowAddMsg(true);
            setTimeout(()=>{
                setShowAddMsg(false);
            }, 2500);
            return;
        }
       
    }

    

    let bgColorObj =  {};
    let textColorObj = {};

    if(channelById) {
        bgColorObj = {
            background : `#${channelById.color}`
        }
        textColorObj = {
            color : `#${channelById.color}`
        }
    }
 
    return (
        <div className={styles.channelContainer}>
             <span className={styles.back} onClick={()=> history.goBack()}> Back </span>
            {channelById && (
            
            <div className={styles.card, styles.bgColor} >
                <img className={styles.image} src={channelById.image} alt={channelById.name}/>
                <div className= {styles.container}>
                    <h3><b>Channel Name: {channelById.name}</b></h3>
                    <p>Channel Type : {channelById.channeltype}</p>
                </div>
               
                <div><button style ={textColorObj} onClick={sendFavToDB}>Add to Fav +</button></div>
            </div>
            )}
            {showAddMsg && (
                <div>
                    { !addingErrMsg ? <p className={styles.registerMsg}>{addMsg}</p> : <p className={styles.errorMessage}>{addingErrMsg}</p>}
                </div>
                
            )}
            

            {channelById && (
                    <div className={styles.channelInfo} style={textColorObj}>
                        
                        <div className={styles.btn}>
                            <a href={channelById.siteurl} target="_blank" style = {bgColorObj} rel="noopener noreferrer" > Channel Website</a>
                            <Link to={`/channels/schedule/${channelId}`} style = {bgColorObj}>Schedule</Link>
                            <Link to={`/channels/programs/${channelId}`} style = {bgColorObj} >Programs</Link>
                        </div>
                    </div>
                    
                )}
                
        </div>
        
    );
}
 
export default ChannelDetails;