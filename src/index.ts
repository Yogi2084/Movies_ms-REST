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


serve(app);
console.log(`Server is running on http://localhost:${3000}`)
