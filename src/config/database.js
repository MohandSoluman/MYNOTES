module.exports = {
  development: {
    username: "postgres",
    password: "root",
    database: "notesdb",
    host: "postgres",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "root",
    database: "notesdb_test",
    host: "postgres",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
