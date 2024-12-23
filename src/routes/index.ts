import { FastifyInstance } from 'fastify'

import { orgsRoutes } from './orgs'
import { petsRoutes } from './pets'

export async function appRoutes(app: FastifyInstance) {
  app.register(orgsRoutes, {
    prefix: 'orgs',
  })

  app.register(petsRoutes, {
    prefix: 'pets',
  })
}
