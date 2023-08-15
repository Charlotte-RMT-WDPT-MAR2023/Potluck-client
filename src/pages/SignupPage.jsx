import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Card, CardBody, CardTitle, CardText, FormGroup, Input, Button } from "reactstrap";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Card className="text-center">
    <div className="SignupPage">

     <CardBody>
            <CardTitle>
              <h3>Sign Up</h3>
            </CardTitle>
            <CardText>
     

      <form onSubmit={handleSignupSubmit}>
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
        

        <label>Name:</label>
        <Input type="text" name="name" value={name} onChange={handleName} />
</FormGroup>
        <Button className="btn-round" color="info" type="submit">Sign Up</Button>
      </form>
</CardText>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>  <Link to={"/login"}> Login</Link>
      </CardBody>
    </div>
    </Card>
  );
}

export default SignupPage;
