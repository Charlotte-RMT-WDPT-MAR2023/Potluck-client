import { Link } from "react-router-dom";

function EventCard({ date, time, location, description, _id }) {
  //format date
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.getMonth() + 1; 
  const year = eventDate.getFullYear() % 100; 
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  return (
    <div className="EventCard card">
      <Link to={`/events/${_id}`}>
        <h3>{description}</h3>
      </Link>
      <h3>{formattedDate} {time} {location}</h3>

    </div>
  );
}

export default EventCard;
