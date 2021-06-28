import fetch from 'node-fetch';
import { useState, createContext, useEffect } from 'react' ;

export const UserContext = createContext();

const UserProvider = ( props ) => {
    
    const [ loggedUser,  setLoggedUser ] = useState(null);
    const [favList, setFavList] = useState(null);
    const [ showPopUp, setShowPopUp ] = useState(false);

    useEffect(()=>{
        whoami();
    }, []);

    const whoami = async () => {
        let user = await fetch("/api/v1/users/whoami");
        user = await user.json();
        setLoggedUser(user);
    }
    const registerUser = async (newUser) => {
        let result = await fetch("/api/v1/users/register",{
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser), 
        });
        result = await result.json();
        return result;
    };

    const loginUser = async (userToLogin) => {
        let result = await fetch("/api/v1/users/login",{
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userToLogin), 
        });
        result = await result.json();
        await whoami();
        return result;
    };

    const editUser = async (userID, user) => {
        let result = await fetch(`/api/v1/users/edit/${userID}` ,{
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        result = await result.json();
        return result;
    }

    const logoutUser = async () => {
        let result = await fetch("/api/v1/users/logout");
        await result.json();
        setFavList(null);
        await whoami();
    }

    const getUserFavoritesById = async (userID) => {
        let favorites = await fetch(`/api/v1/users/fav/${userID}`);
        favorites = await favorites.json();
        setFavList(favorites);
    };

    const addFavToDB = async (favorite) => {
        let result = await fetch(`/api/v1/users/fav`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(favorite)
        });
        result = await result.json();
        return result;
    };

    const addFavToUser = async (userID, fav) => {
        let result = await fetch(`/api/v1/users/fav/${userID}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(fav)
        });
        result = await result.json();
        return result;
    };

    const deleteFavFromUser = async (userID, favID) => {
        let result = await fetch(`/api/v1/users/fav/${userID}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(favID)
        });
        result = result.json();
        return result;
    };


    const values = { 
        loggedUser,
        registerUser, 
        loginUser,
        whoami,
        editUser,
        logoutUser,
        showPopUp,
        setShowPopUp,

        favList,
        getUserFavoritesById,
        addFavToDB,
        addFavToUser,
        deleteFavFromUser
    } ;

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
