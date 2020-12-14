// connection.js
const mongoose = require("mongoose");

const connection = "mongodb://localhost:27017/patientDb";

const connectDb = () => {
  return mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
