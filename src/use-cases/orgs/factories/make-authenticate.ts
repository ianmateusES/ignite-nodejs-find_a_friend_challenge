import { PrismaOrgsRepository } from '@/repositories/prisma'

import { AuthenticateOrgUseCase } from '../authenticate'

export function makeAuthenticateOrgUseCase() {
  return new AuthenticateOrgUseCase(new PrismaOrgsRepository())
}
