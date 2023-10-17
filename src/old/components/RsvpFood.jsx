import React, { useState } from "react";
import foodsService from "../services/foods.service";
import { diet } from "../utils/diet";
import { allergies } from "../utils/allergies";
import { Card, CardBody, Button, FormGroup, Input } from "reactstrap";

function RsvpFood(props) {
  const [meal, setMeal] = useState("");
  const [allergyInfo, setAllergyInfo] = useState([]);
  const [dietaryInfo, setDietaryInfo] = useState([]);

  const handleDietaryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDietaryInfo((prevDietary) => [...prevDietary, value]);
    } else {
      setDietaryInfo((prevDietary) =>
        prevDietary.filter((item) => item !== value)
      );
    }
  };

  const handleAllergyChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAllergyInfo((prevAllergies) => [...prevAllergies, value]);
    } else {
      setAllergyInfo((prevAllergies) =>
        prevAllergies.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { eventId } = props;

    const requestBody = {
      meal,
      allergyInfo,
      dietaryInfo,
      eventId,
    };

    foodsService
      .createFood(requestBody)
      .then((response) => {
        setMeal("");
        setAllergyInfo([]);
        setDietaryInfo([]);

        props.refreshEvent();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card className="text-center">
      <CardBody>
        <div className="AddFood">
          <h3>What will you be bringing?</h3>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Meal:</label>
              <Input
                type="text"
                name="meal"
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label>Allergies:</label>
              <div className="checkbox-grid">
                <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, 30%)" }}>
                  {allergies.map((name) => (
                    <div className="chekbox-item">
                      <div className="allergy-item">
                        <Input
                          type="checkbox"
                          id={`custom-checkbox-${name}`}
                          name={name}
                          value={name}
                          checked={allergyInfo.includes(name)}
                          onChange={handleAllergyChange}
                        />
                        <label htmlFor={`custom-checkbox-${name}`}>
                          {name}
                        </label>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </FormGroup>

            <FormGroup>
              <label>Dietary Restrictions:</label>
              <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, 30%)" }}>
                {diet.map((name) => (
                  <li key={name} className="chekbox-item">
                    <div className="diet-item">
                      <Input
                        type="checkbox"
                        id={`custom-checkbox-${name}`}
                        name={name}
                        value={name}
                        checked={dietaryInfo.includes(name)}
                        onChange={handleDietaryChange}
                      />
                      <label htmlFor={`custom-checkbox-${name}`}>{name}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </FormGroup>
            <Button type="submit" color="info">
              Submit
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}

export default RsvpFood;
