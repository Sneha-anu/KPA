const express = require("express");
const router = express.Router();

const Kpa = require("../schema/kpa");
const User = require("../schema/user");

router.post("/:id", (req, res, next) => {
  const profile = new Kpa(req.body);
  console.log(req.body, "----------------------------------------->");
  const id = req.params.id;
  User.findOneAndUpdate(
    { empId: id },
    {
      $push: { kpa: profile },
    },
    { new: true }
  )
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  const kpaId = req.query.kpaId;
  const id = req.params.id;
  console.log(req.body, "----------------------------------------->", {
    _id: id,
    "kpa._id": kpaId,
  });

  User.findOneAndUpdate(
    { empId: id, "kpa._id": kpaId },
    {
      $set: { "kpa.$": req.body },
    },
    { new: true }
  )
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

router.delete("/:id", (req, res, next) => {
  const kpaId = req.query.kpaId;
  const id = req.params.id;
  console.log(req.body, "----------------------------------------->", {
    _id: id,
    "kpa._id": kpaId,
  });

  User.findOneAndUpdate(
    { empId: id, "kpa._id": kpaId },
    {
      $pull: { kpa: { _id: kpaId } },
    },
    { new: true }
  )
    .then((result) => {
      console.log(result);
      res.status(202).json({
        message: "Deleted successfully kpa",
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

module.exports = router;
