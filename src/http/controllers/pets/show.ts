import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeShowPetUseCase } from '@/use-cases/pets/factories'
import { PetNotFoundError } from '@/use-cases/pets/errors'

const routeSchema = z.object({
  id: z.string(),
})

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const { id } = routeSchema.parse(request.params)

  const getPetUseCase = makeShowPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
