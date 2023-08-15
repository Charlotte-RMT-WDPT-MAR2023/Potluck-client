import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     console.log("it works");
  //   }
  // }, [isLoggedIn]);
  console.log(isLoggedIn, "is logged in");

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    // If the user is not logged in ❌
    return navigate("/login");
  } else {
    // If the user is logged in, allow to see the page ✅
    return children;
  }
}

export default IsPrivate;