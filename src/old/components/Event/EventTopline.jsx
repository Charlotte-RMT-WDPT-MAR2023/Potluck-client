import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function EventCard({ title, date, time, location, description, _id, onEventDeleted }) {
  
  
  //format date
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.getMonth() + 1;
  const year = eventDate.getFullYear() % 100;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;


  

  return (
    <Card className="text-center">
      <CardBody>
        <CardTitle tag={Link} to={`/events/${_id}`}>
          <h3>{title}</h3>
        </CardTitle>
        <CardText>
          <p>Date: {formattedDate} </p>
        </CardText>
        
      </CardBody>
    </Card>
  );
}

export default EventCard;
