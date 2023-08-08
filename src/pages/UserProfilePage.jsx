import { useState, useEffect } from "react";
import AddEvent from "../components/AddEvent";
import EventCard from "../components/EventCard";
import eventsService from "../services/events.service";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


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

  const { user } = useContext(AuthContext);

  return (
    <div className="EventListPage">
    <span> Welcome {user && user.name}</span>
    <br></br>
    <br></br>
    {events.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}

      <AddEvent refreshEvents={getAllEvents} />

      
    </div>
  );
}

export default EventListPage;
