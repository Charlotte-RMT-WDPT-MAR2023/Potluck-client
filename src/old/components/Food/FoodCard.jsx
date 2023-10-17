import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { diet } from "../../utils/diet";

function FoodCard({ meal, dietaryInfo, allergyInfo, _id }) {
  const selectedDietName = dietaryInfo[0]; // Get the first element

  const selectedDiet = diet.find((item) => item.name === selectedDietName);

  return (
    <Card className="text-center">
      <CardBody>
        <CardTitle tag={Link} to={`/events/${_id}`}>
          <h3>{meal}</h3>
        </CardTitle>
        <CardText>
          <div>
            {selectedDiet && (
              <img
                src={selectedDiet.image}
                alt={selectedDiet.name}
                style={{ maxWidth: "50px", marginRight: "10px" }}
              />
            )}
            <h5>Dietary Info: {dietaryInfo}</h5>
            <h5>Allergy Info: {allergyInfo}</h5>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default FoodCard;
