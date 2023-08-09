import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import AddGuest from "../components/AddGuest";
import AddFood from "../components/AddFood";
import GuestCard from "../components/GuestCard";
import FoodCard from "../components/FoodCard";

import eventsService from "../services/events.service";

function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className="EventDetails">
      {event && (
        <>
          <h1>{formattedDate}</h1>
          <h1>{event.time}</h1>
          <h1>{event.location}</h1>
          <h1>{event.description}</h1>
        </>
      )}

      <AddGuest refreshEvent={getEvent} eventId={eventId} />          

      { event && event.guests.map((guest) => <GuestCard key={guest._id} {...guest} /> )} 

      <AddFood refreshEvent={getEvent} eventId={eventId} />          

      { event && event.food.map((food) => <FoodCard key={food._id} {...food} /> )} 

      <Link to={`/events/edit/${eventId}`}>
        <button>Edit Event</button>
      </Link>
      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default EventDetailsPage;
