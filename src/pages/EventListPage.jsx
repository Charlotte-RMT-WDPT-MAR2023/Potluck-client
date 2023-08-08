import { useState, useEffect } from "react";
import AddEvent from "../components/AddEvent";
import EventCard from "../components/EventCard";
import eventsService from "../services/events.service";


function EventListPage() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
  
    eventsService
      .getAllEvents()
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  
 useEffect(() => {
 getAllEvents();
  }, []);

  return (
    <div className="EventListPage">
      <AddEvent refreshEvents={getAllEvents} />

      {events.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}

export default EventListPage;
