//.........Third party lib and module...
const express = require("express");
require("dotenv/config");

//.........custome lib and module...
const Configs = require("./configs");
const { ConnectDatabase } = require("./api/v1/helpers");
const { UserRoutes } = require("./api/v1/routes");

//......... global instances...
const app = express();
const PORT = Configs.DEV_PORT || 3308;

// Accept jason
app.use(express.json());

//Base route
app.get("/", (req, res) => {
  res.status(200).json({ success: { message: `Welcome to the server` } });
});

//User route
app.use("/api/users", UserRoutes);

//Error route
app.use((req, res) => {
  res.status(404).json({ success: { message: `Not found` } });
});

//.........Initialize the connection...

app.listen(PORT, () => {
  console.log(`server is runing at ${PORT}`);
  ConnectDatabase()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
});
