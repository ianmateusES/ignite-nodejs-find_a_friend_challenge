import { FastifyInstance } from 'fastify'

import { create, authenticate, fetchNearby } from '@/http/controllers/orgs'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/', create)
  app.post('/authenticate', authenticate)
  app.get('/nearby', fetchNearby)
}
