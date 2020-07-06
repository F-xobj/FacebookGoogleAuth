const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/APIAuthentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

//Middleware

app.use(morgan("dev"));
app.use(bodyParser.json());

//Routes
app.use("/users", require("./routes/users"));
//start server

const port = process.env.PORT || 3001;
app.listen(port, (req, err) => {
  console.log(`Server run at port ${port}`);
});
