import {
  InMemoryOrgsRepository,
  InMemoryPetsRepository,
} from '@/repositories/in-memory'

import { makePet } from 'test/factories'
import { PetNotFoundError } from './errors'
import { ShowPetUseCase } from './show'

describe('Show Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let showPetUseCase: ShowPetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    showPetUseCase = new ShowPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(makePet())
    const result = await showPetUseCase.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(
      showPetUseCase.execute({ id: 'invalid' }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
