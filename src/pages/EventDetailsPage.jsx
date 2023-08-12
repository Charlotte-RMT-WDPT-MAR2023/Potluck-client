import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import AddGuest from "../components/AddGuest";
import AddFood from "../components/AddFood";
import GuestCard from "../components/GuestCard";
import FoodCard from "../components/FoodCard";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import eventsService from "../services/events.service";

function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [showAddFood, setShowAddFood] = useState(false);

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

  const deleteEvent = () => {
    eventsService
      .deleteEvent(eventId)
      .then(() => navigate("/userProfile"))
      .catch((err) => console.log(err));
  };

  const toggleShowAddGuest = () => {
    setShowAddGuest(!showAddGuest);
  };

  const toggleShowAddFood = () => {
    setShowAddFood(!showAddFood);
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

            <Button color="info" onClick={toggleShowAddGuest}>
              {showAddGuest ? "Hide Guest Form" : "Add Guest"}
            </Button>

            <Button color="info" onClick={toggleShowAddFood}>
              {showAddFood ? "Hide Food Form" : "Add Food"}
            </Button>

            <Button
              color="info"
              onClick={() => navigate(`/events/edit/${eventId}`)}
            >
              Edit Event Details
            </Button>

            <Button color="info" onClick={deleteEvent}>
              Delete Event
            </Button>
          </CardBody>
        </Card>
      )}

      {showAddGuest && <AddGuest refreshEvent={getEvent} eventId={eventId} />}

      {event &&
        event.guests.map((guest) => <GuestCard key={guest._id} {...guest} />)}

      {showAddFood && <AddFood refreshEvent={getEvent} eventId={eventId} />}

      {event && event.food.map((food) => <FoodCard key={food._id} {...food} />)}
    </div>
  );
}

export default EventDetailsPage;
