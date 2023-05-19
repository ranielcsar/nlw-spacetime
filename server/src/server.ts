import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import 'dotenv/config'

import { authRoutes, memoriesRoutes } from './routes'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.get('/', () => {
  return { taOnline: 'tô sim' }
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('Server listening on http://localhost:3333'))
