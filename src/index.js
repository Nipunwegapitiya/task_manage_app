//.........Third party lib and module...
const express = require("express");
require("dotenv/config");

//.........custome lib and module...
const Configs = require("./configs");
const { ConnectDatabase } = require("./api/v1/helpers");

//......... global instances...
const app = express();
const PORT = Configs.DEV_PORT || 3300;

//Base route
app.get("/", (req, res) => {
  res.status(200).json({ success: { message: `Welcome to the server` } });
});

//Error route
app.use((req, res) => {
  res.status(404).json({ success: { message: `Not found` } });
});

//.........Initialize the connection...

app.listen(process.env.PORT, () => {
  console.log(`server is runing at ${PORT}`);
  ConnectDatabase()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
});
