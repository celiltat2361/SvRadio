import { useEffect, useContext, useState } from 'react';
import { ProgramContext } from '../contexts/ProgramContext';
import { useHistory } from 'react-router-dom';
import styles from '../css/ProgramsOfCategory.module.css';
import Program from '../components/Program';
import PopUp from '../components/PopUp';
import { UserContext } from "../contexts/UserContext";


const ProgramsOfCategory = (props) => {

    const { category, programsOfCategory, getCategoryById, getProgramsOfCategory } = useContext(ProgramContext);
    const { categoryId } = props.match.params;
    const {  showPopUp } = useContext(UserContext);
    const [showPrograms, setShowPrograms] = useState([]);
    const [number, setNumber] = useState(10);

    const history = useHistory();

    useEffect(() => {
        getCategoryById(categoryId);
        getProgramsOfCategory(categoryId);
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        if (programsOfCategory) {
            const showing = programsOfCategory.slice(0, number);
            setShowPrograms(showing);
        }
    }, [number, programsOfCategory]);

    const handleClick = () => {
        setNumber(number + 8);
    };
    
    return ( 
        <div className={styles.categoryContainer}>
            { showPopUp ? <PopUp/> : <div></div>}
            {category && (
                <div className={styles.allProgs}>
                    <span className={styles.back} onClick={()=> history.goBack()}> Back </span>
                    <h2>{category.name}</h2>
                    <div className={styles.programWrapper}>
                        {programsOfCategory && showPrograms.map(program => (
                            <Program key={program.id} program = {program}/>
                        ))}
                    </div>
                    <div className={styles.button}>
                    {programsOfCategory && showPrograms.length < programsOfCategory.length && (
                            <button onClick={handleClick}>Show More</button>
                        )}
                    </div>
                </div>
            )}
        </div> 
    );
}
 
export default ProgramsOfCategory;