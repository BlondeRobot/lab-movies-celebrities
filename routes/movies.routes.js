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

// iteration 7 all movies

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((returnedMovies) => {
      res.render("movies/movies", { returnedMovies });
      console.log(returnedMovies);
    })
    .catch((error) => console.log("Error while finding movies occurred"));
});

// iteration 8 movie detail route

router.get("/movies/:id", (req, res, next) => {

  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((foundMovie) => {
      res.render("movies/movie-details", { foundMovie });
    })
    .catch((error) => next(error));
});

// iteration 9 delete movie
router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch((error) => console.log("Error while deleting movie occurred"));
});

// iteration 10 edit movie

router.get("/movies/:id/edit", (req, res, next) => {

  const { id } = req.params;

  Movie.findById(id)
    .then((movieToEdit) => {
      res.render("movies/edit-movie", { movieToEdit });
    })
    .catch((error) => next(error));
});

router.post("/movies/:id/edit", (req, res, next) => {

  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => console.log("Error while updating drone occurred"));
});


module.exports = router;
