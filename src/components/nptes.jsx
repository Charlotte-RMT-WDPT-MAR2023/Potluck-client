import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import eventsService from "../services/events.service";

function UserProfile() {
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    eventsService
      .getEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEventDeleted = (deletedEventId) => {
    setEvents(events.filter((event) => event._id !== deletedEventId));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={() => navigate("/addEvent")}>Add Event</button>
      <div>
        {events.map((event) => (
          <EventCard
            key={event._id}
            {...event}
            onEventDeleted={handleEventDeleted}
          />
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
