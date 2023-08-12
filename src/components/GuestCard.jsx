// We are deconstructing the props object directly in the parentheses of the function
function GuestCard({ name, plusOne, email, allergyInfo, dietaryInfo }) {
  return (
    <div className="GuestCard card">
      <h3>{name}</h3>
      <p>{plusOne}</p>
      <p>{email}</p>
      <p>{allergyInfo}</p>
      <p>{dietaryInfo}</p>
    </div>
  );
}

export default GuestCard;

