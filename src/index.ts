import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { validator } from 'hono/validator'



const app = new Hono()

type Movie = {
  id: string
  title: string
  director: string
  releaseYear: number
  genre: string
  ratings: number[]
}

const movies: Record<string, Movie> = {}

// Add a movie

app.post('/movies', validator('json', (value) => {
  if (!value.id || !value.title || !value.director || typeof value.releaseYear !== 'number' || !value.genre) {
    throw new Error('Invalid movie data')
  }
  return value
}), (c) => {
  const movie = c.req.valid('json')
  if (movies[movie.id]) {
    return c.json({ error: 'Movie already exists' }, 400)
  }
  movies[movie.id] = { ...movie, ratings: [] }
  return c.json({ message: 'Movie added successfully' }, 201)
})

// Update a movie

app.patch('/movies/:id', async (c) => {
  const id = c.req.param('id')
  if (!movies[id]) return c.json({ error: 'Movie not found' }, 404)

  const body = await c.req.json()
  if ('rating' in body && (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5)) {
    return c.json({ error: 'Rating must be between 1 and 5' }, 400)
  }

  movies[id] = { ...movies[id], ...body }

  return c.json({ message: 'Movie updated successfully' })
})

// Get a movie using  ID
app.get('/movies/:id', (c) => {
  const id = c.req.param('id')
  return movies[id] ? c.json(movies[id]) : c.json({ error: 'Movie not found' }, 404)
})

// Get all movies

app.get('/movies', (c) => {
  return c.json(Object.values(movies))
});

// Delete a movie

app.delete('/movies/:id', (c) => {
  const id = c.req.param('id')
  if (!movies[id]) return c.json({ error: 'Movie not found' }, 404)
  delete movies[id]
  return c.json({ message: 'Movie deleted successfully' })
})

// Add a rating to a movie

app.post('/movies/:id/rating', async (c) => {
  const id = c.req.param('id')
  if (!movies[id]) return c.json({ error: 'Movie not found' }, 404)

  const { rating } = await c.req.json()
  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return c.json({ error: 'Rating must be between 1 and 5' }, 400)
  }

  movies[id].ratings.push(rating)
  return c.json({ message: 'Rating added successfully' })
})

// Get the average rating of a movie

app.get('/movies/:id/rating', (c) => {
  const id = c.req.param('id')
  if (!movies[id]) return c.json({ error: 'Movie not found' }, 404)

  const ratings = movies[id].ratings
  if (ratings.length === 0) return c.body(null, 204) // Fix here

  const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length
  return c.json({ averageRating: avgRating })
})

serve(app);
console.log(`Server is running on http://localhost:${3000}`)
