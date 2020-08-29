// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
      db.UserPost.findAll({})
            .then(function(allPosts){
                console.log("The get all results = ", allPosts);
                const hbsObject = {
                    posts: allPosts
                  };
                  console.log("The hbsObject = ",  hbsObject);
                  res.render("../views/index", hbsObject);
      });
  });

  // app.get("/", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../views/signup.handlebars"));  
  //   res.render("signup");     ////////////////TRYING THIS LINE INSTEAD FOR HANDLEBARS
  // });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../views/login"));
    res.render("login");
    // res.render("../views/login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    // res.sendFile(path.join(__dirname, "../views/members"));
    res.render("members");
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  app.get('/person', (req, res) => {
    res.render('person');
  });

  app.get('/restaurant', (req, res) => {
    res.render('restaurant');
  });

  app.get('/reviews', (req, res) => {
    res.render('reviews');
  });
};
