import { PrismaPetsRepository } from '@/repositories/prisma'

import { ShowPetUseCase } from '../show'

export function makeShowPetUseCase() {
  return new ShowPetUseCase(new PrismaPetsRepository())
}
