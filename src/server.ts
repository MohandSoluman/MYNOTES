import app from "./app";
import { initializeDatabase } from "./config/database";
require("dotenv").config();
const environment = process.env.NODE_ENV;

const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} on ${environment} env...`);
    });
    console.log("Database connected successfully.....");
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
