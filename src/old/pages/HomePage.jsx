import { Link } from "react-router-dom";
import Image from '../assets/homepage.jpg';
import { Button } from "reactstrap";

function HomePage() {
  return (
    <div>
    <div className="image-container">
    <img src={Image} alt="eat together" className="responsive-image"/>
    </div>

      <h3>Plan Your Potluck Dinner</h3>

      <p>Eatogetherly lets you plan your event, manage your guest list and coordinate the food all in one simple space</p>

      
      
          <Link to="/signup">
            {" "}
            <Button color="info">Sign Up</Button>{" "}
          </Link>
          <br></br>
          <Link to="/login">
            {" "}
            <Button color="info">Login</Button>{" "}
          </Link>
         
        
    </div>
  );
}

export default HomePage;