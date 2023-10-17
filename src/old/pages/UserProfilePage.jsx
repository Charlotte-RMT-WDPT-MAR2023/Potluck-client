import { useState, useEffect } from "react";
import AddEvent from "../components/Event/AddEvent";
import EventTopline from "../components/Event/EventTopline";
import eventsService from "../services/events.service";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function UserProfilePage() {
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 50%)" }}>
        {events.map((event) => (
          <EventTopline key={event._id} {...event} />
        ))}
      </div>
      <AddEvent refreshEvents={getAllEvents} />
    </div>
  );
}

export default UserProfilePage;
