const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");

// iteration 6 new movie

router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});
router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      console.log("Error while creating movie occurred", error);
      res.redirect("/movies/create");
    });
});

module.exports = router;
