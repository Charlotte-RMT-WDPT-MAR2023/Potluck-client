import axios from "axios";

class GuestsService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/guests
  createGuest = (requestBody) => {
    return this.api.post("/api/guests", requestBody);
  };

  // GET /api/guests/:id
  getGuest = (id) => {
    return this.api.get(`/api/guests/${id}`);
  };

  // PUT /api/guests/:id
  updateGuest = (id, requestBody) => {
    return this.api.put(`/api/guests/${id}`, requestBody);
  };

  // DELETE /api/guests/:id
  deleteGuest = (id) => {
    return this.api.delete(`/api/guests/${id}`);
  };
}

// Create one instance (object) of the service
const guestsService = new GuestsService();

export default guestsService;
