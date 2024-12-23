import { PrismaOrgsRepository } from '@/repositories/prisma'

import { CreateOrgUseCase } from '../create'

export function makeCreateOrgUseCase() {
  return new CreateOrgUseCase(new PrismaOrgsRepository())
}
