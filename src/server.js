const app = require("./app");
const pool = require("./config/db");

require("dotenv").config();

const PORT = process.env.PORT;
const environment = process.env.NODE_ENV;
console.log("TRNISA");

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} at environment : ${environment}----------`
  );
});
