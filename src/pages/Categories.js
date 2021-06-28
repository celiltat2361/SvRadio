/* eslint-disable react-hooks/exhaustive-deps */
import {useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProgramContext } from '../contexts/ProgramContext';
import styles from '../css/Categories.module.css';




const Categories = () => {
    const { categories } = useContext(ProgramContext);
    
    return ( 
    <div className={styles.container}>
       
        <h1>All Categories</h1>
        <div className={styles.categoryWrapper}>
            {categories && categories.map(category => (
                <Link to={`/categories/programs/${category.id}`} key={category.id} className={styles.category}>
                    <p><b>{category.name}</b></p>
                </Link>
            ))}
        </div>
        
    </div>  
    );
}
 
export default Categories;