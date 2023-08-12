import { useState } from "react";
import guestsService from "../services/guests.service";
import { Card, CardBody, Button, FormGroup, Input } from "reactstrap";


function AddGuest(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const { eventId } = props;

    const requestBody = {
      name,
      plusOne,
      email,
      eventId,
    };

    guestsService
      .createGuest(requestBody)
      .then((response) => {
        // Clear input fields and error message on successful submission
        setName("");
        setPlusOne("");
        setEmail("");
        setErrorMessage("");
        props.refreshEvent();
      })
      .catch((error) => {
        // Set error message on failed submission
        setErrorMessage("An error occurred. Please try again.");
        console.log(error);
      });
  };

  return (
    <Card className="text-center">
      <CardBody>
        <div className="AddGuest">
          <h3>Add New Guest</h3>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="plusOne">Allowed to bring guests?</label>
              <Input
                type="text"
                id="plusOne"
                name="plusOne"
                value={plusOne}
                onChange={(e) => setPlusOne(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="email">Email address</label>
              <p className="text-muted">
                Provide an email address for your guests to send an invite directly through Eatogetherly
              </p>
              <Input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            {/* Display error message */}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button type="submit" color="info">
              Add Guest
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}

export default AddGuest;
