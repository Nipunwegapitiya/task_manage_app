//.........Third party lib and module...
const mongoose = require("mongoose");

//.........custome lib and module..
const Configs = require("../../../configs");

//.........Funtion for init the mango db connection..

const ConnectDatabase = async () => {
  return await mongoose.connect(Configs.MONGO_DB_URL);
};

module.exports = ConnectDatabase;
