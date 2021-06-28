
import { NavLink} from 'react-router-dom' ;
import { useContext, useState, useRef } from "react" ;
import { useHistory } from 'react-router-dom';
import OutsideClick from './OutsideClick';
import styles from '../css/Navbar.module.css' ;
import { UserContext } from '../contexts/UserContext';
import {MenuOutlined,CloseCircleOutlined} from '@ant-design/icons';


const Navbar = () => {
    
    const { loggedUser, logoutUser } = useContext(UserContext);
    const [ showDropdown, setShowDropdown] = useState(false);
    const navRef = useRef();
    const history = useHistory();

    const handleLogout = () => {
        logoutUser();
        setShowDropdown(false);
        history.push("/");
    }
    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLinkClick = () => {
        setShowDropdown(false);
    }
    const handleClickOutside = () => {
        setShowDropdown(false);
    };
    
    OutsideClick(handleClickOutside, navRef);


    
    return ( 

        
            <nav className={`${styles.navbar} ${showDropdown && styles.dropstatus}`} ref={navRef}>
                { !showDropdown && (
                    <div className = {styles.logoLink}>
                    <NavLink to="/"> { <img className={styles.logoImg} 
                        src="https://1.bp.blogspot.com/-skOjK8WGB_o/TYVH8yLNvyI/AAAAAAAAArw/d6PZfhaUKLs/w1200-h630-p-k-no-nu/Sveriges+Radio+logo+2011.png" 
                        alt="logo" />}</NavLink>
                </div>
                )}
                
                
                <div className = {styles.menu}>
                    <NavLink className = {styles.navItem} to="/"> Home</NavLink>
                    <NavLink className = {styles.navItem} to="/channels">Channels</NavLink>
                    <NavLink className = {styles.navItem} to="/programs">Programs</NavLink>
                    <NavLink className = {styles.navItem} to="/categories">Categories</NavLink>
                    <NavLink className = {styles.navItem} to="/users/mypage">My Page</NavLink>
                    { loggedUser ? ( 
                        <span>
                            <NavLink className = {styles.navItem} to="/" onClick={handleLogout}>Logout </NavLink>
                        </span>
                    
                    ) : (
                    <span>
                        <NavLink className = {styles.navItem} to="/login">Login</NavLink>
                    </span>
                    )}
                </div>
                {!showDropdown && <MenuOutlined onClick={handleClick} className={`${styles.baricon}  ${showDropdown && styles.menubar}` }/>}
                {showDropdown && (
                    <div className = {styles.dropMenu}>
                        <CloseCircleOutlined onClick={handleClick} className={styles.closeIcon} />
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/"> Home </NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/channels"> Channels </NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/programs"> Programs  </NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/categories"> Categories </NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/users/mypage"> My Page</NavLink>
                    { loggedUser ? ( 
                        <span>
                            <NavLink className = {styles.navItem} to="/" onClick={handleLogout}> Logout </NavLink>
                        </span>
                    
                    ) : (
                    <span>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/login"> Login </NavLink>
                    </span>
                    )}
                </div>
                )}
            </nav>
           
      
    );
}
 
export default Navbar;