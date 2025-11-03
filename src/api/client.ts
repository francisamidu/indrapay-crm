import ky from "ky";

const API_BASE_URL = "https://your-api-base-url.com"; // Replace with your API base URL

// Function to get auth token (customize as needed)
function getAuthToken(): string | null {
  // Example: get token from localStorage
  return localStorage.getItem("authToken");
}

const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getAuthToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export default apiClient;
