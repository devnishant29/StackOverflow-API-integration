const mongoose = require("mongoose");

const connectDB = (uri) => {
  return mongoose
    .connect(uri)
    .then(() => {
      console.log("Successfully connected to databse");
    })
    .catch((err) => {
      console.log("Can not connect to data base");
    });
};

module.exports = connectDB;
