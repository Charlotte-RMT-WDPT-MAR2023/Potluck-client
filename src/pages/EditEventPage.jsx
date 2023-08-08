import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventsService from "../services/events.service";

function EditEventPage(props) {
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
    <div className="EditEventPage">
      <h3>Edit the Event</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time:</label>
        <textarea
          type="text"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <label>Location:</label>
        <textarea
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Event</button>
      </form>

      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default EditEventPage;
