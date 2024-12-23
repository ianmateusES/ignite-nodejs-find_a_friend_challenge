import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories'

import { InvalidCredentialsError } from './errors'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)
    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, org.password)
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
