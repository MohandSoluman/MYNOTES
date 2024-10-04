// import app from "./app";
// import DatabaseConnection from "./config/db";

// const PORT = process.env.PORT || 3000;

// const startServer = async () => {
//   try {
//     await DatabaseConnection.getConnection().authenticate();
//     console.log("Database connected successfully.....");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT} on ${environment} env...`);
//     });
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// startServer();

import app from "./app";
import { initializeDatabase } from "./utils/database";
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
