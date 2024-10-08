const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  path = require("path"),
  cors = require("cors"),
  { check, validationResult } = require("express-validator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import CORS
let allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://testsite.com",
  "https://careerfoundry-movieflix-59ee318aca62.herokuapp.com",
  "https://myflix-nehakhan77.netlify.app",
  "https://nehakhan77.github.io/myflix-angular-client/welcome",
  "https://nehakhan77.github.io/myflix-angular-client/profile",
  "https://nehakhan77.github.io/myflix-angular-client/movies",
  "https://nehakhan77.github.io"

];
//allow specific set of origins to access your API
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn't found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn't allow access from origin" +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

app.use(cors());

//Import auth.js
let auth = require("./auth")(app);

app.use(bodyParser.json()); //any time using req.body, the data will be expected to be in JSON format
app.use(bodyParser.urlencoded({ extended: true }));

//log all incoming requests
app.use(morgan("common"));

// Import passport and passport.js
const passport = require("passport");
require("./passport");

//Load documentation page
app.use(express.static("public"));

//Require Mongoose models from model.ks
const Movies = Models.Movie;
const Users = Models.User;

// connects Mongoose to the DB in Mongo Atlas
//mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//READ
app.get("/", (req, res) => {
  res.send("Welcome to my movie page!");
});

/**
 * READ user list
 * @name GET /users
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @returns {Object} - Returns JSON object holding data about all users
 * @throws {Error} - Throws error if there is a problem retreiving users from the database
 */
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * READ user by username
 * @name GET /users/:Username
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Username - Username of user to retrieve
 * @returns {Object} - Returns JSON object holding data about a single user containing a username property
 * @throws {Error} - Throws error if there is a problem retreiving user from the database
 */
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }), async (req, res) => { await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * READ movie list
 * @name GET /movies
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @returns {Object} - Returns JSON object holding data about all movies
 * @throws {Error} - Throws error if there is a problem retreiving movies from the database
 */
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * READ movie by title
 * @name GET /movies/:Title
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Title - Title of the movie to retrieve
 * @returns {Object} - Returns JSON object holding data about a single movie with title property
 * @throws {Error} - Throws error if there is a problem retreiving user from the database
 */
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * READ genre by name
 * @name GET genres/:Genre
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Genre - Name of the genre to retrieve
 * @returns {Object} - Returns JSON object holding data about a single genre with the genre name as a property
 * @throws {Error} - Throws error if there is a problem retreiving genre from the database
 */
app.get(
  "/movies/genres/:Genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Genre })
      .then((movie) => {
        res.status(200).json(movie.Genre.Description);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * READ director by name
 * @name GET /movies/directors/:Director
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Director - Name of the director to retrieve
 * @returns {Object} - Returns JSON object holding data about a single director with the director name as a property
 * @throws {Error} - Throws error if there is a problem retreiving director from the database
 */
app.get(
  "/movies/directors/:Director",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Director })
      .then((movie) => {
        res.status(200).json(movie.Director);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * CREATE new user
 * @name POST /users
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Username - Username of the user to create
 * @returns {Object} - Returns JSON object holding data about a single user that was added including their username, password, email, and birthday.
 * @throws {Error} - Throws error if there is a problem creating the user
 */
app.post(
  "/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required.").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    //check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username })
      //Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + err);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * UPDATE user information
 * @name PUT /users/:Username
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Username - Username of the user to update
 * @returns {Object} - Returns JSON object of updated user information
 * @throws {Error} - Throws error if there is a problem validating the input or updating user data in the database
 */
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    // CONDITION ENDS
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/**
 * UPDATE user's favorite movies list
 * @name POST /users/:Username/movies/:MovieID
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} req.user - User object obtained from JWT authentication.
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Username - Username of the user to update
 * @param {string} req.params.MovieID - ID of the movie to add to the user's list of favorite movies.
 * @returns {Object} - Returns JSON object of updated list of user's favorite movies
 * @throws {Error} - Throws error if there is a problem adding a movie to the user's favorites list
 */
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * DELETE user account
 * @name DELETE /users/:Username
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} req.user - User object obtained from JWT authentication.
 * @param {string} req.params.Username - Username of the user to update
 * @param {Object} res - Response object from the server
 * @returns {Object} - Returns alert letting user know if account was deleted or not found
 * @throws {Error} - Throws error if there is a problem removing a movie from the user's favorites list
 */
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }
    await Users.findOneAndDelete({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * DELETE favorite movie for user
 * @name DELETE /users/:Username/movies/:MovieID
 * @function
 * @param {Object} req - Request object to the server
 * @param {Object} req.user - User object obtained from JWT authentication.
 * @param {Object} res - Response object from the server
 * @param {string} req.params.Username - Username of the user to update
 * @param {string} req.params.MovieID - ID of the movie to remove from the user's list of favorite movies.
 * @returns {Object} - Returns JSON object of updated list of user's favorite movies
 * @throws {Error} - Throws error if there is a problem removing a movie from the user's favorites list
 */
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    ) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0.", () => {
  console.log("Listening on Port " + port);
});

// MongoDB connection error handling
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
