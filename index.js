const express = require("express");
const morgan = require("morgan");

const app = express();

let topMovies = [
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action/Thriller",
    release_date: "July 18, 2008",
  },
  {
    title: "The Polar Express",
    director: "Robert Zemeckis",
    genre: "Animation",
    release_date: "November 10, 2004",
  },
  {
    title: "The Wizard of Oz",
    director: "Victor Fleming",
    genre: "Musical/Fantasy",
    release_date: "August 25, 1939",
  },
  {
    title: "The Irishman",
    director: "Martin Scorsese",
    genre: "Mafia/History",
    release_date: "November 1,2019",
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    genre: "Horror/Drama",
    release_date: "October 14, 1994",
  },
  {
    title: "Mean Girls",
    director: "Mark Waters",
    genre: "Teen Comedy",
    release_date: "April 30, 2004",
  },
  {
    title: "Jaws",
    director: "Steven Spielberg",
    genre: "Thriller",
    release_date: "June 20, 1975",
  },
  {
    title: "The Notebook",
    director: "Nick Cassavetes",
    genre: "Romance",
    release_date: "June 25, 2004",
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski",
    genre: "Science Fiction",
    release_date: "March 31, 1991",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    director: "Chris Columbus",
    genre: "Young Adult Fantasy Fiction",
    release_date: "November 14, 2001",
  },
];

app.use(express.static("public"));
app.use(morgan("common"));

//GET REQUESTS
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (req, res) => {
  let responseText = "Welcome to my movie application!";
  res.send(responseText);
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
