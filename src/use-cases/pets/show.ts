import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories'

import { PetNotFoundError } from './errors'

interface ShowPetUseCaseRequest {
  id: string
}

interface ShowPetUseCaseResponse {
  pet: Pet
}

export class ShowPetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    id,
  }: ShowPetUseCaseRequest): Promise<ShowPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)
    if (!pet) throw new PetNotFoundError()

    return { pet }
  }
}
