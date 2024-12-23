import {
  InMemoryOrgsRepository,
  InMemoryPetsRepository,
} from '@/repositories/in-memory'

import { makeOrg, makePet } from 'test/factories'
import { OrgNotFoundError } from '../orgs/errors'
import { CreatePetUseCase } from './create'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let createPetUseCase: CreatePetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    createPetUseCase = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const org = await orgsRepository.create(makeOrg())
    const { pet } = await createPetUseCase.execute(makePet({ org_id: org.id }))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with a non-existing org', async () => {
    const pet = makePet()

    await petsRepository.create(pet)

    await expect(createPetUseCase.execute(pet)).rejects.toBeInstanceOf(
      OrgNotFoundError,
    )
  })
})
