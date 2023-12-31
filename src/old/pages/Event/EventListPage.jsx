import { useState, useEffect } from "react";
import EventCard from "../../components/Event/EventCard";
import eventsService from "../../services/events.service";

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

  const handleEventDeleted = (deletedEventId) => {
    setEvents(events.filter((event) => event._id !== deletedEventId));
  };

  return (
    <div className="EventListPage">
      {events.map((event) => (
        <EventCard
          key={event._id}
          {...event}
          onEventDeleted={handleEventDeleted}
        />
      ))}
    </div>
  );
}

export default EventListPage;
