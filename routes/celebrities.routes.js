const router = require("express").Router();
const Celebrity = require("../models/celebrity.model");

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

module.exports = router;
