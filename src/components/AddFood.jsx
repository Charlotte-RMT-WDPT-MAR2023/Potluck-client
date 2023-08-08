import React, { useState } from "react";

function AddFood() {
  const [formData, setFormData] = useState({
    meal: "",
    mealAllergens: [],
    mealDietary: [],
  });

  const allergenOptions = [
    "Peanuts",
    "Tree Nuts",
    "Sesame",
    "Milk",
    "Shellfish",
    "Fish",
    "Eggs",
    "Soy",
    "Wheat",
  ];
  const dietaryOptions = [
    "Vegan",
    "Vegetarian",
    "Gluten Free",
    "Halal",
    "Keto",
    "Sugar Free",
  ];

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value], // Update the specific property based on name
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>What will you be bringing?</h3>
      <textarea
        type="text"
        name="meal"
        value={formData.meal}
        onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
      />

      <h3>Select Dietary Requirements</h3>
      {dietaryOptions.map((diet) => (
        <div key={diet}>
          <label>
            <input
              type="checkbox"
              name="mealDietary"
              value={diet}
              checked={formData.mealDietary.includes(diet)}
              onChange={handleCheckboxChange}
            />
            {diet}
          </label>
        </div>
      ))}

      <h3>Select Allergens</h3>
      {allergenOptions.map((allergen) => (
        <div key={allergen}>
          <label>
            <input
              type="checkbox"
              name="mealAllergens"
              value={allergen}
              checked={formData.mealAllergens.includes(allergen)}
              onChange={handleCheckboxChange}
            />
            {allergen}
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddFood;
