// server/src/app.js
const express = require("express"); // Express provides a minimalist framework for building web APIs.
const cors = require("cors"); // CORS middleware enables cross-origin requests, which is needed for communication between your front end and back end.

const app = express();

// Enable CORS so our client (e.g., Next.js front end) can communicate with this API without cross-origin issues.
app.use(cors());

// Parse incoming JSON payloads (in case we have endpoints expecting JSON data).
app.use(express.json());

// Start the server on a configurable port (defaulting to 5000 if not set in environment variables).
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
