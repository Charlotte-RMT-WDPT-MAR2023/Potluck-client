import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Navbar,
  NavLink,
  Container,
} from "reactstrap";

function NavBar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (    
    <Navbar className="bg-info" expand="lg">
      <Container>

      
        <NavLink tag={Link} to="/events">
          <i aria-hidden={true} className="now-ui-icons ui-1_calendar-60"></i>
        </NavLink>

        <NavLink tag={Link} to="/userProfile">
          <i aria-hidden={true} className="now-ui-icons users_single-02"></i>
        </NavLink>

        <NavLink tag={Link} to="/Settings">
          <i
            aria-hidden={true}
            className="now-ui-icons ui-1_settings-gear-63"
          ></i>
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink
              alt="logout"
              className="now-ui-icons arrows-1_minimal-right"
              onClick={logOutUser}
            />
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
      </Container>
    </Navbar>
  );
}

export default NavBar;
