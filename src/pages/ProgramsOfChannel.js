import { useEffect, useContext, useState} from 'react';
import { ChannelContext } from '../contexts/ChannelContext';
import { Link, useHistory } from 'react-router-dom';
import styles from '../css/ProgramsOfChannel.module.css';


const ProgramsOfChannel = (props) => {
    const { programsByChannel , getChannelsPrograms} = useContext(ChannelContext);
    const { channelId } = props.match.params;
    const [ showPrograms, setShowPrograms ] = useState([]);
    const [ number , setNumber] = useState(10);
    const history = useHistory();

    useEffect(()=>{
        getChannelsPrograms(channelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=> {
        if (programsByChannel) {
            const showing = programsByChannel.slice(0, number);
            setShowPrograms(showing);
        }
    },[number, programsByChannel])

    const handleClick = () => {
        setNumber(number + 10);
    };

    return ( 
        <div>
            <h2 className={styles.programTitle}>Programs</h2>
            <span className={styles.back} onClick={()=> history.goBack()}> Back </span>
            <div className={styles.programs}>
                {programsByChannel && showPrograms.map( program => (
                    <div className={styles.program} key={program.id}>
                        <Link to={`/programs/${program.id}`} key={program.id} >
                    <img src={program.programimage} alt={program.name} /></Link>
                    <p>{program.name}</p>
                    </div>
                ))}
            </div>
            <div className={styles.button}>
            {programsByChannel && showPrograms.length < programsByChannel.length && (
                        <button  onClick={handleClick}>Show More</button>
                    )
                }
            </div>
        </div>
         );
}
 
export default ProgramsOfChannel;