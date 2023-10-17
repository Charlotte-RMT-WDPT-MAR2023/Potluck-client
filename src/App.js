import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/LandingPage";

//Invitation
import InvitationTemplate from "./pages/Invitation/InvitationTeamplate";
import Invitation from "./pages/Invitation/Invitation";

//Event
import CreateEvent from "./pages/Event/CreateEvent";
import EditEvent from "./pages/Event/EditEvent";

//Food
import FoodDetails from "./pages/Event/Food/FoodDetails";
import FoodList from "./pages/Event/Food/FoodList";

//Guests
import GuestDetails from "./pages/Event/Guests/GuestDetails";
import EditGuest from "./pages/Event/Guests/EditGuest";
import GuestList from "./pages/Event/Guests/GuestList";

//Auth
import SignupPage from "./pages/authorisation/SignupPage";
import LoginPage from "./pages/authorisation/LoginPage";

//Middleware
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

//Settings
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/invitation" element={<Invitation />} />
        <Route path="/templates" element={<InvitationTemplate />} />

        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/event/edit/:eventId" element={<EditEvent />} />

        <Route path="/foods" element={<FoodList />} />
        <Route path="/foods/:foodId" element={<FoodDetails />} />

        <Route path="/guests" element={<GuestList />} />
        <Route path="/guests/:guestId" element={<GuestDetails />} />
        <Route path="/guest/edit/:guestId" element={<EditGuest />} />


        <Route path="/settings" element={<IsAnon> <Settings /> </IsAnon> } />
        <Route path="/signup" element={ <IsAnon> <SignupPage />  </IsAnon> }  />
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon>  } />

      </Routes>
    </div>
  );
}

export default App;
