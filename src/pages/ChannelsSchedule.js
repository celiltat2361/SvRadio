import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { ChannelContext } from '../contexts/ChannelContext';
import styles from '../css/ChannelsSchedule.module.css'

const ChannelsSchedule = (props) => {
    const { schedule, getChannelsSchedule } = useContext(ChannelContext)
    const {channelId} = props.match.params;
    const history = useHistory();

    useEffect(()=>{
        getChannelsSchedule(channelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ( <div className={styles.scheduleContainer}>
        <span className={styles.back} onClick={()=> history.goBack()}> Back </span>
        
        <h2>Schedule</h2>
        
        {schedule && schedule.map((part, i)=> (
            <div className={styles.table} key={i}>
                <h4>{part.starttimeutc}</h4>
                <p className={styles.title}>{part.title}</p>
            </div>
    ))}
        
    </div> );
}
  
export default ChannelsSchedule;