const express = require("express");
const connection = require("./connection");
const postModel = require("./models/postModel.js");
const hbs = require('express-hbs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
  }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

  //Shows everything in the database
  app.get("/", async (req, res) => {
    try {
      const empls = await postModel.find();           
      res.render("index.hbs", {
        data: JSON.parse(JSON.stringify(empls))
      });
    } catch (e) {
      console.log(e);
    }
  });

app.listen(3000, () => {
  console.log("Listening at port 3000");
});