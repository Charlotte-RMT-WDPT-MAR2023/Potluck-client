import { useState } from "react";
import guestsService from "../services/guests.service";
import { diet } from "../utils/diet";
import { allergies } from "../utils/allergies";

function AddGuest(props) {
  const [name, setName] = useState("");
  const [plusOne, setPlusOne] = useState("");
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
      name,
      plusOne,
      allergyInfo,
      dietaryInfo,
      eventId,
    };

    guestsService
      .createGuest(requestBody)
      .then((response) => {
        setName("");
        setPlusOne("");
        setAllergyInfo([]); // Clear the allergyInfo array
        setDietaryInfo([]);

        props.refreshEvent();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddGuest">
      <h3>Add New Guest</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Plus One:</label>
        <textarea
          type="text"
          name="plusOne"
          value={plusOne}
          onChange={(e) => setPlusOne(e.target.value)}
        />

        <label>Allergies:</label>
        <ul>
          {allergies.map((name) => (
            <li key={name}>
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

        <label>Dietary Restrictions:</label>
        <ul>
          {diet.map((name) => (
            <li key={name}>
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

        <button type="submit">Add Guest</button>
      </form>
    </div>
  );
}

export default AddGuest;
