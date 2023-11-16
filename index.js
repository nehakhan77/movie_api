const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(express.static("public"));
app.use(morgan("common"));
app.use(bodyParser.json());

let users = [
  {
    name: "Neha Khan",
    age: "26",
  },
];

let topMovies = [
  {
    title: "The Dark Knight",
    Director: {
      Name: "Christopher Nolan",
    },
    Genre: {
      Name: "Acton",
      Description:
        "Action movies are marked by a battle between a heroine and a villain or villainous forces. Action movies feature a lot of fighting, weapons and explosions.",
    },
    release_date: "July 18, 2008",
  },
  {
    title: "The Polar Express",
    Director: {
      Name: "Robert Zemeckis",
    },
    Genre: {
      Name: "Animation",
      Description:
        "An animated movie or cartoon, is made up of a series of slightly different drawings of people, animals, and objects that make them appear to move.",
    },
    release_date: "November 10, 2004",
  },
  {
    title: "The Wizard of Oz",
    Director: {
      Name: "Victor Fleming",
    },
    Genre: {
      Name: "Fantasy",
      Description:
        "A fantasty movie is defined as a film where characters inhabit unnatural or imagined worlds.",
    },
    release_date: "August 25, 1939",
  },
  {
    title: "The Irishman",
    Director: {
      Name: "Martin Scorsese",
    },
    Genre: {
      Name: "Mafia/History",
      Description:
        "Mafia films—a version of gangster films—are a subgenre of crime films dealing with organized crime, often specifically with Mafia organizations.",
    },
    release_date: "November 1,2019",
  },
  {
    title: "The Shawshank Redemption",
    Director: {
      Name: "Frank Darabont",
    },
    Genre: {
      Name: "Horror/Drama",
      Description:
        "Horror movies are defined as those with intentions to ignite fear within their audiences. Key elements of a successful horror movie do just that and feature “ghosts, gore, monsters and jump scares,” according to entertainment publication Backstage.",
    },
    release_date: "October 14, 1994",
  },
  {
    title: "Mean Girls",
    Director: {
      Name: "Mark Waters",
    },
    Genre: {
      Name: "Comedy",
      Description:
        "Comedy movies are defined as those with intentions to humor the audience. Comedies are often marked by situational irony, amusement and happy endings.",
    },
    release_date: "April 30, 2004",
  },
  {
    title: "Jaws",
    Director: {
      Name: "Steven Spielberg",
    },
    Genre: {
      Name: "Thriller",
      Description:
        "Thriller movies are defined as films that are well-paced, properly placing mystery and tension to build the adrenaline and interest of the audience.",
    },
    release_date: "June 20, 1975",
  },
  {
    title: "The Notebook",
    Director: {
      Name: "Nick Cassavetes",
    },
    Genre: {
      Name: "Romance",
      Description:
        "A romance movie is defined as a film whose focus is on romantic relationships between two characters. Key elements of romance movies are intimacy, passion and complex emotions, according to filmmaking site No Film School.",
    },
    release_date: "June 25, 2004",
  },
  {
    title: "The Matrix",
    Director: {
      Name: "Lana Wachowski",
    },
    Genre: {
      Name: "Science Fiction",
      Description:
        "Short for science fiction, AFI reports that sci-fi films merge details about science and technology with “imaginative speculation.” Key elements of sci-fi movies are alternate realities, new worlds or universes, time travel, technology and even futuristic settings, according to Masterclass. ",
    },
    release_date: "March 31, 1991",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    Director: {
      Name: "Chris Columbus",
    },
    Genre: {
      Name: "Fantasy Fiction",
      Description:
        "A fantasty movie is defined as a film where characters inhabit unnatural or imagined worlds.",
    },
    release_date: "November 14, 2001",
  },
];

//READ
app.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});

app.get("/movies/:title", (req, res) => {
  const title = req.params.title;
  const movie = topMovies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie exists.");
  }
});

app.get("/movies/genre/:genreName", (req, res) => {
  const genreName = req.params.genreName;
  const genre = topMovies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("No such genre exists.");
  }
});

app.get("/movies/directors/:directorName", (req, res) => {
  const directorName = req.params.directorName;
  const director = topMovies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such director has been found.");
  }
});

//CREATE
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  } else {
    res.status(400).send("User name is required to register.");
  }
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
