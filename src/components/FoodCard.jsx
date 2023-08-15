import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function FoodCard({ meal, dietaryInfo, allergyInfo, _id }) {
  const inlineStyle = {
    display: "inline-block",
    marginRight: "10px", // Adjust the spacing as needed
  };

  return (
    <Card className="text-center">
      <CardBody>
        <CardTitle tag={Link} to={`/events/${_id}`}>
          <h3>{meal}</h3>
        </CardTitle>
        <CardText>
          <h5 style={inlineStyle}>Dietary Info: {dietaryInfo}</h5>
          <h5 style={inlineStyle}>Allergy Info: {allergyInfo}</h5>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default FoodCard;
