const router = require("express").Router();
const Celebrity = require("../models/celebrity.model");

// iteration 3 new celeberity

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
router.post("/celebrities/create", (req, res, next) => {

  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((error) => {
        console.log("Error while creating celebrity occurred", error)
        res.redirect('/celebrities/create')
        });
});

// iteration 4 all celebrities

router.get("/celebrities", (req, res, next) => {

  Celebrity.find()
    .then((returnedCelebrities) => {
      res.render("celebrities/celebrities", { returnedCelebrities });
      console.log(returnedCelebrities);
    })
    .catch((error) => console.log("Error while finding drones occurred"));
});

module.exports = router;
