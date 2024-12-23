import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares'
import { create, search, show } from '@/http/controllers/pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, create)
  app.get('/', search)
  app.get('/:id', show)
}
