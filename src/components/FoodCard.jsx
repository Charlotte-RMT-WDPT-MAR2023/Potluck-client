function FoodCard({ meal, dietaryInfo, allergyInfo}) {
  return (
    <div className="FoodCard card">
      <h3>{meal}</h3>
      <p>{dietaryInfo}</p>
      <p>{allergyInfo}</p>
    </div>
  );
}

export default FoodCard;
