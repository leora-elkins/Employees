const mongoose = require("mongoose");
require("dotenv").config();
const connectionParams = {

};
mongoose.set(`strictQuery`, true)
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster1.oxulys6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

const connexion = mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

module.exports = connexion;