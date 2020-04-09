const express = require("express");
const Userdetail  = require("../Models/user");


const router = express.Router();


router.post("/createUser", (req, res, next) => {
  const user = new Userdetail ({
    phone: req.body.phone,
    locality: req.body.locality,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    electricityDay: req.body.electricityDay,
    electricityNight: req.body.electricityNight,
    rationShop: req.body.rationShop,
    poor: req.body.poor,
    medical: req.body.medical,
    ration: req.body.ration,
    suspect: req.body.suspect,
    rules: req.body.rules,
    description: req.body.description,
    addqust: req.body.addqust
  });
  console.log(user);
  user.save().then( result => {

          res.status(201).json({
            message: "User Created",
            result: result
          });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get("/state", (req, res, next) => {

  var query = Userdetail.find({}).select('state');

  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
});

});
router.get("/city:State", (req, res, next) => {

  var query = Userdetail.find({state: req.params.State}).select('city');

  query.exec(function (err, someValue) {
    if (err) return next(err);
    console.log(someValue);
    res.send(someValue);
});

});
router.get("/locality:city", (req, res, next) => {

  var query = Userdetail.find({city: req.params.city}).select('locality');

  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
});

});
router.get("/info/:locality/:city/:state", (req, res, next) => {

  var query = Userdetail.find({state: req.params.state, city: req.params.city, locality: req.params.locality} );

  query.exec(function (err, someValue) {
    if (err) return next(err);
    console.log(someValue);
    res.send(someValue);
});

});
module.exports = router;
