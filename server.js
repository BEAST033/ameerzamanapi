require("dotenv").config({ path: `${__dirname}/config.env` });
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception");
  console.log("Error Name: " + err.name);
  console.log("Error Message: " + err.message);
  process.exit(1);
});

const app = require("./app");

const db = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
).replace("<dbname>", process.env.DATABASE_NAME);

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("DB connection unsuccessful");
    console.log("Error Name: " + err.name);
    console.log("Error Message: " + err.message);
    server.close(() => {
      process.exit(1);
    });
  });

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection");
  console.log("Error Name: " + err.name);
  console.log("Error Message: " + err.message);
  server.close(() => {
    process.exit(1);
  });
});
