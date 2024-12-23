import { PrismaPetsRepository } from '@/repositories/prisma'

import { SearchPetsUseCase } from '../search'

export function makeSearchPetsUseCase() {
  return new SearchPetsUseCase(new PrismaPetsRepository())
}
