import { useContext, useEffect, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { ProgramContext } from '../contexts/ProgramContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../css/ProgramDetails.module.css';
import { FacebookFilled, TwitterSquareFilled, InstagramFilled  } from '@ant-design/icons';



const ProgramDetails = (props) => {
    const { getProgramById, programById  } = useContext(ProgramContext);
    const { loggedUser, addFavToDB, addFavToUser} = useContext(UserContext)
    const { programId } = props.match.params;
    const [ showAddMsg, setShowAddMsg] = useState(false);
    const [ addMsg, setAddMsg] = useState("");
    const [ addingErrMsg , setAddingErrMsg] = useState("");
    const history = useHistory();
    
    useEffect(() => {
        getProgramById(programId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    const addFavorites = async () => {
        let newFav = {
            favID: programId,
            class: "Program",
            name: programById.name,
            imageURL: programById.programimage
        };
        await addFavToDB(newFav);
        let result =await addFavToUser(loggedUser.userID, { name: programById.name });
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
    };

    const renderProgram = () => {
       if(programById) {
        return ( 
            <div className={styles.progDetails}>
                <span className={styles.back} onClick={()=> history.goBack()}> Back </span>
                <div className={styles.sections}>
               
                    <div className={styles.sectionA}>
                        <img src={programById.programimage} alt={programById.name} className={styles.programImage}/>
                        <h2>{programById.name}</h2>
                        <p className={styles.description}><b>Program Details :</b>{programById.description}</p>
                        <div className={styles.addButton}><button onClick={addFavorites}>Add to Fav+</button></div> 
            
                    </div>
                    
                    <div className={styles.sectionB}>
                        
                    <a className={styles.url} href={programById.programurl} target="_blank" rel="noopener noreferrer" > Program Website</a>
                        <div className={styles.socialMediaIcons}>
                                        {programById.socialmediaplatforms && programById.socialmediaplatforms.map((platform, i) => (
                                            <a key={i} href={platform.platformurl}>
                                                {platform.platform === "Facebook" ? (
                                                   <FacebookFilled />
                                                ) : platform.platform === "Twitter" ? (
                                                    <TwitterSquareFilled />
                                                ) : (
                                                    <InstagramFilled />
                                                )}
                                            </a>
                                        ))}
                        </div>
                        
                        <h4>Contact</h4>
                        <p><b>Responsible Editor :</b>{programById.responsibleeditor}</p>
                        {programById.email ? <p><b>E-mail :</b>{programById.email}</p> : <div></div>}
                    </div>
                
                </div>

                {showAddMsg && (
                        <div>
                            { !addingErrMsg ? <p className={styles.registerMsg}>{addMsg}</p> : <p className={styles.errorMessage}>{addingErrMsg}</p>}
                        </div>
                
                )}
                
            </div>
        );
       }  
    }; 

    return (
        programById ? renderProgram() : <div></div>
    );
}
 
export default ProgramDetails;