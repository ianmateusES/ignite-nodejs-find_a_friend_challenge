import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/pets/factories'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { city, age, size, energy_level, environment } = querySchema.parse(
    request.query,
  )
  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    energy_level,
    environment,
  })

  return reply.status(200).send({ pets })
}
