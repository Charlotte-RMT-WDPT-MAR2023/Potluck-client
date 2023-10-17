import axios from "axios";

class TemplatesService {
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

  // GET /api/Templates
  getAllTemplates = () => {
    return this.api.get(`/api/templates`);

}
}

// Create one instance (object) of the service
const templatesService = new TemplatesService();

export default templatesService;
