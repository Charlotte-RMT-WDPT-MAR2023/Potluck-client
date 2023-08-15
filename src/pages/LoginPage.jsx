import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Card, CardBody, CardTitle, CardText, FormGroup, Input, Button } from "reactstrap";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // axios.post(`${API_URL}/auth/login`, requestBody

    authService
      .login(requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/userProfile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };


  
  return (
    <Card className="text-center">
    <div className="LoginPage">

    <CardBody>
            <CardTitle>
              <h3>Login</h3>
            </CardTitle>
            <CardText>

      

      <form onSubmit={handleLoginSubmit}>
      <FormGroup>
        <label>Email:</label>
        <Input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        </FormGroup>
        <Button className="btn-round" color="info" type="submit">Login</Button>
      </form>
      </CardText>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
      </CardBody>
    </div>
    </Card>
  );
}

export default LoginPage;
