const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(express.static("public"));
app.use(morgan("common"));
app.use(bodyParser.json());

let topMovies = [
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: {
      Name: "Action/Thriller",
    },
    release_date: "July 18, 2008",
  },
  {
    title: "The Polar Express",
    director: "Robert Zemeckis",
    genre: {
      Name: "Animation",
    },
    release_date: "November 10, 2004",
  },
  {
    title: "The Wizard of Oz",
    director: "Victor Fleming",
    genre: {
      Name: "Musical/Fantasy",
    },
    release_date: "August 25, 1939",
  },
  {
    title: "The Irishman",
    director: "Martin Scorsese",
    genre: {
      Name: "Mafia/History",
    },
    release_date: "November 1,2019",
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    genre: {
      Name: "Horror/Drama",
    },
    release_date: "October 14, 1994",
  },
  {
    title: "Mean Girls",
    director: "Mark Waters",
    genre: {
      Name: "Teen Comedy",
    },
    release_date: "April 30, 2004",
  },
  {
    title: "Jaws",
    director: "Steven Spielberg",
    genre: {
      Name: "Thriller",
    },
    release_date: "June 20, 1975",
  },
  {
    title: "The Notebook",
    director: "Nick Cassavetes",
    genre: {
      Name: "Romance",
    },
    release_date: "June 25, 2004",
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski",
    genre: {
      Name: "Science Fiction",
    },
    release_date: "March 31, 1991",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    director: "Chris Columbus",
    genre: {
      Name: "Fantasy Fiction",
    },
    release_date: "November 14, 2001",
  },
];

//READ
app.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});


//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Listening for Request
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
