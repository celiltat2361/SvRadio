
import { useContext } from "react";
import styles from '../css/Programs.module.css';
import { ProgramContext } from '../contexts/ProgramContext';

const Programs = () => {
    const { programsOfCategory } = useContext(ProgramContext)
    console.log(programsOfCategory);
    return ( 
        <div className={styles.programContainer}>
          
            <div className={styles.allProgram}>
            {programsOfCategory && programsOfCategory.map((programs) => (
                <div>{programs.name}</div>
            ))}
            </div>
            
    </div> );
}
 
export default Programs;