import { useState } from "react";
import guestsService from "../services/guests.service";
import { Card, CardBody, Button, FormGroup, Input } from "reactstrap";

function AddGuest(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plusOne, setPlusOne] = useState("");


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
        setName("");
        setPlusOne("");
        setEmail(""); 
        props.refreshEvent();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card className="text-center">
      <CardBody>
        <div className="AddGuest">
          <h3>Add New Guest</h3>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Name</label>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>Allowed to bring guests?</label>
              <Input
                type="text"
                name="plusOne"
                value={plusOne}
                onChange={(e) => setPlusOne(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>Email address</label>
              <p className="text-muted">Provide an email address for your guests to send an invite directly through Eatogetherly</p>
              <Input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

    

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
