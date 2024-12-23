import { PrismaOrgsRepository } from '@/repositories/prisma'

import { FetchNearbyOrgsUseCase } from '../fetch-nearby'

export function makeFetchNearbyUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository())
}
