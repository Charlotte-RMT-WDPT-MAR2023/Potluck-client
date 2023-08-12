import "./assets/css/bootstrap.min.css";
import "./assets/css/now-ui-kit.css";
//import "./assets/css/now-ui-kit.min.css";
//import "./assets/css/now-ui-kit.css.map";
import "./assets/css/demo.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventListPage from "./pages/EventListPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEventPage from "./pages/EditEventPage";
import UserProfilePage from "./pages/UserProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Settings from "./pages/Settings";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
  
  <Navbar />
      <Routes>      
        <Route path="/" element={<HomePage />} />

        <Route
          path="/userProfile"
          element={ <IsPrivate> <UserProfilePage /> </IsPrivate> } 
        />

        <Route
          path="/events"
          element={ <IsPrivate> <EventListPage /> </IsPrivate> } 
        />

        <Route
          path="/events/:eventId"
          element={ <IsPrivate> <EventDetailsPage /> </IsPrivate> }
        />

        <Route
          path="/events/edit/:eventId"
          element={ <IsPrivate> <EditEventPage /> </IsPrivate> } 
        />

<Route
          path="/settings"
          element={ <IsPrivate> <Settings /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
