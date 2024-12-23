import {
  PrismaOrgsRepository,
  PrismaPetsRepository,
} from '@/repositories/prisma'

import { CreatePetUseCase } from '../create'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(
    new PrismaOrgsRepository(),
    new PrismaPetsRepository(),
  )
}
