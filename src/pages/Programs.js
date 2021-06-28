import Program from '../components/Program' ;
import { useContext, useState, useEffect } from "react";
import { ProgramContext } from '../contexts/ProgramContext';
import { UserContext } from "../contexts/UserContext";
import PopUp from '../components/PopUp';
import styles from '../css/Programs.module.css';

const Programs = () => {
    const { programs } = useContext(ProgramContext);
    const {  showPopUp } = useContext(UserContext);
    const [showPrograms, setShowPrograms] = useState([]);
    const [number, setNumber] = useState(8);

    useEffect(() => {
        if (programs) {
            const showing = programs.slice(0, number);
            setShowPrograms(showing);
        }
    }, [number, programs]);

    const handleClick = () => {
        setNumber(number + 8);
    };


    return ( 
        <div className={styles.programsWrapper}>
            { showPopUp ? <PopUp/> : <div></div>}
            <div className={styles.programContainer}>
            
           
                <h1>All Programs</h1>
            
                <div className={styles.allProgram}>
                {programs && showPrograms.map((program) => (
                    <Program key={program.id} program = {program}/>
                ))}
                </div>
                <div className={styles.button}>
                {programs && showPrograms.length < programs.length && (
                            <button  onClick={handleClick}>Show More</button>
                        )
                    }
                </div>
            
            </div> 
        </div>
    );
}
 
export default Programs;