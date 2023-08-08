import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import homeicon from '../assets/homeicon.png';
import logout from '../assets/logout.png';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/userProfile">
      <img src={homeicon} alt="home" className="nav-icon"/>
      </Link>
      

      {isLoggedIn && (
        <>
          
          <img src={logout} alt="logout" className="nav-icon" onClick={logOutUser}/>
          
        </>
      )}

      {/*!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )*/}
    </nav>
  );
}

export default Navbar;
