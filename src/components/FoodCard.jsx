import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function FoodCard({ meal, dietaryInfo, allergyInfo, _id}) {
  return (
    <Card className="text-center">
      <CardBody>
      <CardTitle tag={Link} to={`/events/${_id}`}>
          <h3>{meal}</h3>
        </CardTitle>
        <CardText>
          <h5>Dietary Info: {dietaryInfo} </h5>
          <h5>Allergy Info: {allergyInfo} </h5>
        </CardText>
        </CardBody>
    </Card>
  );
}

export default FoodCard;
