import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrgUseCase } from '@/use-cases/orgs/factories'
import { OrgAlreadyExistsError } from '@/use-cases/orgs/errors'

const bodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string(),
  password: z.string(),
  whatsapp: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const body = bodySchema.parse(request.body)
  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createOrgUseCase.execute(body)

    return reply.status(201).send(org)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
