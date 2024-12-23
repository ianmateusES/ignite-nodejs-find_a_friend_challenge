import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateOrgUseCase } from '@/use-cases/orgs/factories'
import { InvalidCredentialsError } from '@/use-cases/orgs/errors'

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(request.body)
  const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

  try {
    const { org } = await authenticateOrgUseCase.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
