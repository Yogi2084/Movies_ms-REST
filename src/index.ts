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
app.get('/movies/:id', (c) => {
  const id = c.req.param('id')
  return movies[id] ? c.json(movies[id]) : c.json({ error: 'Movie not found' }, 404)
})


app.get('/movies', (c) => {
  return c.json(Object.values(movies))
});


serve(app);
console.log(`Server is running on http://localhost:${3000}`)
