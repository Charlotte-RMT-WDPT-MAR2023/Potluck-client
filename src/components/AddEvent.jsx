import { useState } from "react";
import eventsService from "../services/events.service";
import { useNavigate  } from "react-router-dom";


function AddEvent(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate ();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { date, time, location, description };

    eventsService
      .createEvent(requestBody)
      .then((response) => {
        setDate("");
        setTime("");
        setLocation("");
        setDescription("");
        props.refreshEvents();

        navigate(`/events/${response.data._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddEvent">
      <h3>Add Event</h3>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddEvent;
