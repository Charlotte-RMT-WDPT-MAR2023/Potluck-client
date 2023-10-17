
function GuestCard({ name, plusOne, email, rsvp, allergyInfo, dietaryInfo }) {
  return (
    <div className="GuestCard card">
      <h3>{name}</h3>
      <p>{plusOne}</p>
      <p>{email}</p>
      <p>{rsvp}</p>
      <p>{allergyInfo}</p>
      <p>{dietaryInfo}</p>
    </div>
  );
}

export default GuestCard;

