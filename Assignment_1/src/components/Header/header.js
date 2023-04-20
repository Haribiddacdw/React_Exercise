import headerStyle from './header.module.css';
import { NavLink} from 'react-router-dom';
import Logo from "../../assets/images/logo.png";

function Header() {
    return (
        <>
         <header className={headerStyle["header"]}>
         <div className={headerStyle["logo"]}>
         <NavLink to='/'><img src={Logo} alt="logo" width="100%" /></NavLink>
          
         </div>
         <div className={headerStyle["navbar"]}>
            <NavLink to='#' className={headerStyle["navlink"]}>Hotels</NavLink>
            <NavLink to='#' className={headerStyle["navlink"]}>Bike Rental</NavLink>
            <NavLink to='#' className={headerStyle["navlink"]}>Restaurant</NavLink>
         </div>
         </header>
   </>
      
    );
  }
  
export default Header;

