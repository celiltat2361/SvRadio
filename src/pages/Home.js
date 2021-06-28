import { useContext, useEffect , useState} from "react";
import { Link } from 'react-router-dom';
import AllChannels from "../components/AllChannels";
import Program from '../components/Program';
import PopUp from '../components/PopUp';



import { ChannelContext } from "../contexts/ChannelContext";
import { ProgramContext } from "../contexts/ProgramContext";
import { UserContext } from "../contexts/UserContext";
import styles from '../css/Home.module.css';

const Home = () => {
    const { loggedUser, showPopUp } = useContext(UserContext);
    const { channels } = useContext(ChannelContext);
    const { programs, categories } = useContext(ProgramContext)
    const [showChannels, setShowChannels] = useState([]);
    const [showPrograms, setShowPrograms] = useState([]);
    const [showCategories, setShowCategories] = useState([]);
    
    

    useEffect(() => {
        if (channels) {
            const showChannel = channels.slice(0, 4);
            setShowChannels(showChannel);
        }
    }, [channels]);

    useEffect(() => {
        if (programs) {
            const showPrograms = programs.slice(84, 96);
            setShowPrograms(showPrograms);
        }
    }, [programs]);

    useEffect(() => {
        if (categories) {
            const showCategories = categories.slice(6, 12);
            setShowCategories(showCategories);
        }
    }, [categories]);


    return ( 
        <div>
            { showPopUp ? <PopUp/> : <div></div>}
            <div className= {styles.topChannels}>
                
                { loggedUser ? <p className={styles.greeting}>{loggedUser.username}s konto</p> : <></>}
                <h2>Populer Channels</h2>
                <div className= {styles.channelCard}>
                    
                    {channels && showChannels.map((channel) => (
                        <AllChannels key={channel.id} channel= {channel}/>  
                    ))}
                </div>
                
                <Link to={"/channels"}><div className={styles.button}>Show All Cahnnels</div></Link>
                
            </div>
            <hr />
            <div className={styles.programWrapper}>
                <div className= {styles.topPrograms}>
                    <h2>Populer Programs</h2>
                    <div className= {styles.channelCard}>
                        {programs && showPrograms.map((program) => (
                            <Program key={program.id} program= {program}/>  
                        ))}
                    </div>
                    <Link to={"/programs"}><div className={styles.button}>
                    Show All Programs</div></Link>    
                </div>
            </div>
            
            <hr />
            <div className = {styles.topCategories}>
                <h2>Populer Categories</h2>
                <div className={styles.categoryWrapper}>
                    {categories && showCategories.map(category => (
                        <Link to={`/categories/programs/${category.id}`} key={category.id} className={styles.category}>
                            <p><b>{category.name}</b></p>
                        </Link>
                    ))}
                </div>
                <Link to={"/categories"}><div className={styles.button}>
                Show All Categories</div></Link>
            </div>
        </div> 
        );
}
 
export default Home;