import axios from "axios";

class FoodsService {
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

  // POST /api/foods
  createFood = (requestBody) => {
    return this.api.post("/api/foods", requestBody);
  };

  // GET /api/foods/:id
  getFood = (id) => {
    return this.api.get(`/api/foods/${id}`);
  };

  // PUT /api/foods/:id
  updateFood = (id, requestBody) => {
    return this.api.put(`/api/foods/${id}`, requestBody);
  };

  // DELETE /api/foods/:id
  deleteFood = (id) => {
    return this.api.delete(`/api/foods/${id}`);
  };
}

// Create one instance (object) of the service
const foodsService = new FoodsService();

export default foodsService;
