const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const MongoClient = require("mongodb").MongoClient;
const userRoutes = require("./router/usersRoutes");
const kpaRoutes = require("./router/kpaRoutes");
const kpaCreationRoutes = require("./router/kpaCreationRoutes");
mongoose
  .connect(
    "mongodb+srv://admin:admin@node-rest-shop-h7ugq.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  //   console.log(req);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/kpa", kpaRoutes);
app.use("/kpaCreation", kpaCreationRoutes);
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
