import { Link, useNavigate } from "react-router-dom";
import eventsService from "../services/events.service";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

function EventCard({ title, date, time, location, description, _id, onEventDeleted }) {
  const navigate = useNavigate();
  
  //format date
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.getMonth() + 1;
  const year = eventDate.getFullYear() % 100;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;


  const deleteEvent = (eventId) => {
    eventsService
      .deleteEvent(eventId)
      .then(() => {
        onEventDeleted(eventId);
        navigate("/events");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="text-center">
      <CardBody>
        <CardTitle tag={Link} to={`/events/${_id}`}>
          <h3>{title}</h3>
        </CardTitle>
        <CardText>
          <h5>Date: {formattedDate} </h5>
          <h5> Time: {time} </h5>
          <h5> Location: {location}</h5>
          <p>{description}</p>
        </CardText>
        <CardTitle tag={Link} to={`/rsvp/${_id}`}>
          <h3>RSVP</h3>
        </CardTitle>

        <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 50%)",
                placeItems: "center",
              }}
            >
         <Button 
          color="info"
          tag={Link} to={`/events/${_id}`}>
         Event Details
        </Button>

        <Button color="info"
          onClick={() => deleteEvent(_id)}>Delete Event</Button>
     </div>
      </CardBody>
    </Card>
  );
}

export default EventCard;
