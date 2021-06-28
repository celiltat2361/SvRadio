import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import styles from '../css/Favorites.module.css';

function Favorites(props) {

    const { favList, getUserFavoritesById, deleteFavFromUser } = useContext(UserContext);
    const { userID } = props.match.params;

    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        getUserFavoritesById(userID);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (favList) {
            setShowFavorites(true);
        };
    }, [favList]);

    const handleClick = async (e) => {
        if (favList.length > 1) {
            await deleteFavFromUser(userID, { favID: e.target.id });
            getUserFavoritesById(userID);
        } else {
            await deleteFavFromUser(userID, { favID: e.target.id });
            setShowFavorites(false);
        };
    };

    const goChannelDetails = () => {

    }

    return (
        <div className="container">
                <div>
                    <h2>My Favorite List</h2>
                    {showFavorites ? (
                        <div className={styles.loggedInWrapper}>
                            <div className={styles.contentWrappers}>
                                <h3>Channels</h3>
                                <div className={styles.favoriteObjects}>
                                    {favList.filter(favorite => favorite.class === "Channel").map(favorite => (
                                        <div key={favorite.favID}  className={styles.favoriteObject}>
                                            <Link to={`/channels/${favorite.favID}`}>
                                                <img src={favorite.imageURL} alt={favorite.name} onClick={goChannelDetails}/>
                                            </Link>
                                            <p>{favorite.name}</p>
                                            
                                            <button onClick={handleClick} id={favorite.favID}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.contentWrappers}>
                                <h3>Programs</h3>
                                <div className={styles.favoriteObjects}>
                                    {favList.filter(favorite => favorite.class === "Program").map(favorite => (
                                        <div key={favorite.favID}  className={styles.favoriteObject}>
                                            <Link to={`/programs/${favorite.favID}`}>
                                                <img src={favorite.imageURL} alt={favorite.name} />
                                            </Link>
                                            <p>{favorite.name}</p>
                                            
                                            <button onClick={handleClick} id={favorite.favID}  >Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className={styles.noFavorites}>You have not a favorite channel or program yet.</p>
                    )}
                </div> 
        </div>
    );
}

export default Favorites;