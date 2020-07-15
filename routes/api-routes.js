// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/", function (req, res) {

    db.Countries.findAll({}).then(function (countriesData) {
      db.Notes.findAll({}).then(function (notesData) {

        hbsObject = {
          countries: countriesData,
          notes: notesData
        };

        res.render("index", hbsObject);
      })

    });
  });

  // Route for getting countries and displaying to the page
  app.get("/api/countries/az", function (req, res) {

    db.Countries.findAll({}).then(function (dbCountries) {
      res.json(dbCountries);
    })
  });

  app.put("/api/desired", function (req, res) {

    db.Countries.update({ desired: req.body.desired }, {
      where: {
        country_name: req.body.country_name
      }
    }).then(function (dbCountryDesired) {

      res.json(dbCountryDesired);
    })
  });

  app.put("/api/visited", function (req, res) {

    db.Countries.update({ visited: req.body.visited, desired: req.body.desired }, {
      where: {
        country_name: req.body.country_name
      }
    }).then(function (dbCountryVisited) {

      res.json(dbCountryVisited);
    })
  });

  app.put("/api/remove", function (req, res) {

    db.Countries.update({ visited: req.body.visited }, {
      where: {
        country_name: req.body.country_name
      }
    }).then(function (dbCountryRemoved) {

      res.json(dbCountryRemoved);
    })
  });

  app.get("/api/notes", (req, res) => {

    db.Notes.findAll({}).then(function (dbNotes) {
      res.json(dbNotes);
    })
  });

  app.post("/api/notes", (req, res) => {
    console.log(req.body.note_title + req.body.note_text);
    db.Notes.create({
      note_title: req.body.note_title,
      note_text: req.body.note_text
    })
      .then((dbNote) => {
        res.json(dbNote);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  // THIS ROUTE WORKS BUT GETTING THE CORRECT ID IS NOT!
  app.delete("/api/notes/:id", (req, res) => {
    console.log("HEY! req.params.id EQUALS: " + req.params.id)
    db.Notes.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbNote) => {
      res.json(dbNote);
    });
  });

};

