import { Link } from "react-router-dom";
import Image from '../assets/homepage.jpg';

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
            <button>Sign Up</button>{" "}
          </Link>
          <br></br>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
         
        
    </div>
  );
}

export default HomePage;