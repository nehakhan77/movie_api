## Movie API Documentation 

## Description 

This REST API is the server-side component of the MyFlix web application. The API interacts with a database and stores information about movies, genres, and directors. It allows new users to register and log in, update user profile information, add and removie movies to their list of favorites, and delete their account. 

## Dependencies

-Node.js: A cross-platform, open-source JavaScript runtime environment.

-Express.js: Server-side web framework for Node.js.

-Express Validator: Middleware for input validation in Express.

-MongoDB with Mongoose: NoSQL document-based database and Object Data Modeling library for Node.js.

-Postman: Tool created to help with API development and test URL endpoints.

-Passport: An authentication middleware for Node.js and Express.

-Passport-jwt: Passport strategy for JWT authentication.

-Passport-local: Passport strategy for authentication.

-Jsonwebtoken: The jsonwebtoken library for basic HTTP authentication (username/password) and continuous authorization.

-uuid: Library for generating unique identifiers.

-Body-parser: Express middleware for parsing request bodies.

## Endpoints 

## GET all movies

URL: /movies

## GET movie by title

URL: /movies/[Title]

## GET all users

URL: /users

## GET user by username

URL: /users/[Username]

## GET genre information

URL: /movies/genres/[Genre]

## GET director information

URL: /movies/directors/[Director]

## POST new user (register)

URL: /users

## PUT user information (update user information)

URL: /users/[Username]

## POST movie to user's favorite movies list

URL: /users/[Username]/movies/[MovieID]

## DELETE movie from user's favorite movies list

URL: /users/[Username]/movies/[MovieID]

## DELETE user account

URL: /users/:Username





