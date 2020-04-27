const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { KpaCreation, kpaStage, kpaTarget } = require("../schema/kpaCreation");

router.post("/", (req, res, next) => {
  const kpaCreation = new KpaCreation({
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
  });

  console.log(kpaCreation, "----------------------------------------->");
  kpaCreation
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  let query = {};
  parseInt(req.query.id) ? (query.manager = parseInt(req.query.id)) : "";

  KpaCreation.find(query)
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No entries found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
