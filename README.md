# Movies REST API

Welcome to the Movies REST API! This API allows users to manage a collection of movies, including adding, retrieving, updating, deleting, and rating movies.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. Clone the repository:

   bash
   git clone https://github.com/Yogi2084/Movies_ms-REST.git
   cd Movies_ms-REST

2. Install dependencies:

   bash
   npm install

## Usage

1. Start the server:

   bash
   npm start

   By default, the server runs on http://localhost:3000.

2. Access the API:

   You can interact with the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## API Endpoints

### 1. Create a Movie

- Endpoint: POST /movies
- Description: Adds a new movie to the collection.
- Request Body:
  json
  {
  "id": "string",
  "title": "string",
  "director": "string",
  "releaseYear": "number",
  "genre": "string"
  }
- Response:
  - 201 Created: Movie added successfully.
  - 400 Bad Request: Missing required fields or duplicate ID.

### 2. Update a Movie

- Endpoint: PATCH /movies/:id
- Description: Updates an existing movie.
- Response:
  - 200 OK: Movie updated.
  - 400 Bad Request: Invalid fields.
  - 404 Not Found: Movie not found.

### 3. Get a Movie by ID

- Endpoint: GET /movies/:id
- Description: Retrieves a movie by its ID.
- Response:
  - 200 OK: Returns the movie object.
  - 404 Not Found: Movie not found.

### 4. Delete a Movie

- Endpoint: DELETE /movies/:id
- Description: Deletes a movie by its ID.
- Response:
  - 200 OK: Movie deleted.
  - 404 Not Found: Movie not found.

### 5. Rate a Movie

- Endpoint: POST /movies/:id/rating
- Description: Adds a rating (1-5) to a movie.
- Response:
  - 200 OK: Rating added.
  - 400 Bad Request: Invalid rating.
  - 404 Not Found: Movie not found.

### 6. Get Movie Rating

- Endpoint: GET /movies/:id/rating
- Description: Retrieves the average rating for a movie.
- Response:
  - 200 OK: Returns movie rating.
  - 204 No Content: No ratings available.
  - 404 Not Found: Movie not found.

### 7. Get Top-Rated Movies

- Endpoint: GET /movies/top-rated
- Description: Retrieves the top 5 highest-rated movies.
- Response:
  - 200 OK: Returns top-rated movies.
  - 404 Not Found: No movies found.

### 8. Get Movies by Genre

- Endpoint: GET /movies/genre/:genre
- Description: Retrieves all movies of a specific genre.
- Response:
  - 200 OK: Returns movies of the genre.
  - 404 Not Found: No movies found.

### 9. Get Movies by Director

- Endpoint: GET /movies/director/:director
- Description: Retrieves all movies by a specific director.
- Response:
  - 200 OK: Returns movies by the director.
  - 404 Not Found: No movies found.

### 10. Search Movies by Keyword

- Endpoint: GET /movies/search/:keyword
- Description: Searches for movies with a title containing the keyword.
- Response:
  - 200 OK: Returns matching movies.
  - 404 Not Found: No movies found.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   bash
   git checkout -b feature/your-feature-name
3. Make your changes and commit them:
   bash
   git commit -m 'Add new feature'
4. Push to the branch:
   bash
   git push origin feature/your-feature-name
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.

---

Thank you for using the Movies REST API! If you have any questions or feedback, please open an issue on the repository.
