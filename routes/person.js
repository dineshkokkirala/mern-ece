const express = require("express");
// const mongoose = require("mongoose");
const Person = require("../models/Person");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// router.get("/all", (req, res) => {
//   res.send("Persons GET route works");
// });

router.post(
  "/",
  [
    check("firstname", "FirstName is Required").not().isEmpty(),
    check("lastname", "LastName is Required").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    // 200-ok
    // 404-notfound
    // return res.send("No Errors Found all Good!!");
    const { firstname, lastname } = req.body;
    // const firstname=req.body.firstname;
    // const lastname=req.body.lastname;
    let person = new Person({
      firstname: firstname,
      lastname: lastname,
    });
    //   person.save().then().catch()
    person
      .save()
      .then((per) => res.json(per))
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      });

    // res.send(firstname);
  }
);

router.get("/all", (req, res) => {
  //res.send("Persons get route");
  Person.find()
    .then((persons) => res.json(persons))
    .catch((err) => {
      console.log(err.message);
      res.status(500).send("Server Error");
    });
});

router.delete("/:personId", (req, res) => {
  Person.findById(req.params.personId)
    .then(() => {
      Person.findByIdAndRemove(req.params.personId)
        .then(() => res.json({ msg: "Successfully removed" }))
        .catch((err) => {
          console.log("Remove failed");
          res.status(400).json({ error: "Deletion Failed" });
        });
    })
    .catch((err) => res.status(404).json({ error: "Person not found" }));
});

router.put("/:id", async (req, res) => {
  const { firstname, lastname } = req.body;
  let person = {};
  if (firstname) person.firstname = firstname;
  if (lastname) person.lastname = lastname;

  try {
    let personId = await Person.findById(req.params.id);
    if (!personId) {
      return res.status(404).json({ error: "Person Not Found" });
    }

    let updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { $set: person },
      { new: true }
    );
    res.json(updatedPerson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
