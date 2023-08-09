import React, { useState } from "react";
import foodsService from "../services/foods.service";
import { diet } from "../utils/diet";
import { allergies } from "../utils/allergies";

function AddFood(props) {
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
    <div className="AddFood">
      <h3>What will you be bringing?</h3>
      <form onSubmit={handleSubmit}>
        <label>Meal:</label>
        <input
          type="text"
          name="meal"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
        />

      <label>Allergies:</label>
      <div className="checkbox-grid">
        <ul>
          {allergies.map((name) => (
            <li key={name} className="chekbox-item">
              <div className="allergy-item">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${name}`}
                  name={name}
                  value={name}
                  checked={allergyInfo.includes(name)}
                  onChange={handleAllergyChange}
                />
                <label htmlFor={`custom-checkbox-${name}`}>{name}</label>
              </div>
            </li>
          ))}
        </ul>
        </div>

        <label>Dietary Restrictions:</label>
        <div className="checkbox-grid">
        <ul>
          {diet.map((name) => (
            <li key={name} className="chekbox-item">
              <div className="diet-item">
                <input
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
          </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddFood;
