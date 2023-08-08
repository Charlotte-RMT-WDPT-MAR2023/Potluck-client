import { useState } from "react";
import guestsService from "../services/guests.service";

function AddGuest(props) {
  const [name, setName] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [allergyInfo, setAllergyInfo] = useState("");
  const [dietaryInfo, setDietaryInfo] = useState("");

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
        setAllergyInfo("");
        setDietaryInfo("");

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

        <label>Allergy Info:</label>
        <textarea
          type="text"
          name="allergyInfo"
          value={allergyInfo}
          onChange={(e) => setAllergyInfo(e.target.value)}
        />

        <label>Dietary Info:</label>
        <textarea
          type="text"
          name="dietaryInfo"
          value={dietaryInfo}
          onChange={(e) => setDietaryInfo(e.target.value)}
        />

        <button type="submit">Add Guest</button>
      </form>
    </div>
  );
}

export default AddGuest;
