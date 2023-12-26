const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    async (username, password, callback) => {
      console.log("${username} ${password}");
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log("incorrect username");
            const error = { message: "Incorrect username or password" };
            return callback(error, user);
          }
          if (!user.validatePassword(password)) {
            console.log("Incorrect Password");
            const error = { message: "Incorrect Password." };
            user = false;
            return callback(error, user);
          }
          console.log("finished");
          const error = null;
          return callback(error, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    async (jwtPayload, callback) => {
      return await Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
