import fetch from 'node-fetch';
import { useState, createContext, useEffect } from 'react' ;

export const ProgramContext = createContext();

const ProgramProvider = (props) => {

   const [programs, setPrograms ] = useState(null) ;
   const [ categories, setCategories] = useState(null);
   const [ category, setCategory] = useState(null);

   const [ programById, setProgramById ] = useState(null);
   const [ programsOfCategory, setProgramsOfCategory ] = useState(null);
   const [ selectedCategory, setSelectedCategory] = useState(null);
   const [ categoryId, setCategoryId] = useState(null);
   

    useEffect( ()=>{
        getAllPrograms();
        getCategories();
    },[]);
    


    const getAllPrograms = async () => {
        
        let data = await fetch("/api/v1/programs");
        data = await data.json();
        setPrograms(data.programs);
    }
    
    const getCategories = async () => {
       let data = await fetch("/api/v1/categories");
       data = await data.json();
       setCategories(data.programcategories);
    }


    const getProgramById = async (programId) => {
        let data = await fetch(`/api/v1/programs/${programId}`);
        data = await data.json();
        setProgramById(data.program);
    }


    const getProgramsOfCategory = async (categoryId) => {
        let data = await fetch(`/api/v1/categories/programs/${categoryId}`);
        data = await data.json();
        setProgramsOfCategory(data);
    }

    const getCategoryById = async (categoryId) => {
        let category = await fetch(`/api/v1/categories/${categoryId}`);
        category = await category.json();
        setCategory(category);
    };
  

   const values = {
       programs , 
       categories,
       category, 
       getAllPrograms, 
       getProgramById, 
       programById, 
       getCategories,
       getCategoryById,
       selectedCategory,
       setSelectedCategory,
       getProgramsOfCategory,
       programsOfCategory,
       categoryId,
       setCategoryId
    }

   return (
    <ProgramContext.Provider value={values}>
        {props.children}
    </ProgramContext.Provider>
    );

};

export default ProgramProvider ;