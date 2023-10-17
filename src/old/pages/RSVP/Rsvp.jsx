import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import RsvpGuest from "../../components/RsvpGuest";
import RsvpFood from "../../components/RsvpFood";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import eventsService from "../../services/events.service";

function Rsvp() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showRsvpGuest, setShowRsvpGuest] = useState(false);
  const [showRsvpFood, setShowRsvpFood] = useState(false);

  const getEvent = () => {
    eventsService
      .getEvent(eventId)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (!event) {
    return null;
  }

  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.getMonth() + 1;
  const year = eventDate.getFullYear() % 100;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  const toggleShowRsvpGuest = () => {
    setShowRsvpGuest(!showRsvpGuest);
  };

  const toggleShowRsvpFood = () => {
    setShowRsvpFood(!showRsvpFood);
  };

  return (
    <div className="EventDetails">
      {event && (
        <Card className="text-center">
          <CardBody>
            <CardTitle tag={Link} to={`/events/${event._id}`}>
              <h3>{event.title}</h3>
            </CardTitle>
            <CardText>
              <h5>Date: {formattedDate} </h5>
              <h5> Time: {event.time} </h5>
              <h5> Location: {event.location}</h5>
              <p>{event.description}</p>
            </CardText>

            <Button color="info" onClick={toggleShowRsvpGuest}>
              {showRsvpGuest ? "Hide Guest Form" : "Add Guest"}
            </Button>

            <Button color="info" onClick={toggleShowRsvpFood}>
              {showRsvpFood ? "Hide Food Form" : "Add Food"}
            </Button>

            {showRsvpGuest && (
              <RsvpGuest refreshEvent={getEvent} eventId={eventId} />
            )}
            {showRsvpFood && (
              <RsvpFood refreshEvent={getEvent} eventId={eventId} />
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Rsvp;
