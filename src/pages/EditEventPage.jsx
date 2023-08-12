import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card,
  CardBody, Button, FormGroup, Input } from "reactstrap";
import eventsService from "../services/events.service";

function EditEventPage(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    eventsService
      .getEvent(eventId)
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setDate(oneEvent.date);
        setTime(oneEvent.time);
        setLocation(oneEvent.location);
        setDescription(oneEvent.description);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { date, time, location, description };

    eventsService.updateEvent(eventId, requestBody).then((response) => {
      navigate(`/events/${eventId}`);
    });
  };

  const deleteEvent = () => {
    eventsService
      .deleteEvent(eventId)
      .then(() => navigate("/events"))
      .catch((err) => console.log(err));
  };

  return (
    <Card className="text-center">
      <CardBody>
      <div className="AddEvent">
        <h3>Edit the Event</h3>

        <form onSubmit={handleFormSubmit}>
          <FormGroup>
            <label>Event Title:</label>
            <Input
              type="title"
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
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
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

            
            <Button color="info" type="submit">
              Update Event
            </Button>
          

          <Button color="info" onClick={deleteEvent}>
          Delete Event
        </Button>
        
        </form>

        
        </div>
      </CardBody>
    </Card>
  );
}

export default EditEventPage;
