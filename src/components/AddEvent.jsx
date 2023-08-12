import { useState } from "react";
import eventsService from "../services/events.service";
import { useNavigate } from "react-router-dom";
import { Card,
  CardBody, Button, FormGroup, Input, FormFeedback  } from "reactstrap";
const moment = require('moment');

function AddEvent(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timeError, setTimeError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValidTime = moment(time, "HH:mm", true).isValid();
    if (!isValidTime) {
      setTimeError("Invalid time format. Use hh:mm.");
      return;
    }
    setTimeError("");
    const formattedTime = moment(time, "HH:mm").format("h:mm A");

    const requestBody = { title, date, time: formattedTime, location, description };

    eventsService
      .createEvent(requestBody)
      .then((response) => {
        setTitle("");
        setDate("");
        setTime("");
        setLocation("");
        setDescription("");
        props.refreshEvents();

        navigate(`/events/${response.data._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card className="text-center">
      <CardBody>
    <div className="AddEvent">
      <h3>Add Event</h3>

      <form onSubmit={handleSubmit}>
      <FormGroup>
          <label>Event Title:</label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>Date:</label>
          <Input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>Time:</label>
          <Input
            type="text"
            name="time"
            placeholder="19:00"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            invalid={timeError !== ""}
          />
          {timeError && <FormFeedback>{timeError}</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <label>Location:</label>
          <Input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>Description:</label>
          <Input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <Button className="btn-round" color="info" type="submit">
          Submit
        </Button>
      </form>
    </div>
    </CardBody>
    </Card>
  );
}

export default AddEvent;
