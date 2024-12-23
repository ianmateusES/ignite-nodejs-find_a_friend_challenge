import { compare } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory'

import { makeOrg } from 'test/factories'
import { CreateOrgUseCase } from './create'
import { OrgAlreadyExistsError } from './errors'

describe('Create Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let createOrgUseCase: CreateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org with an already used email', async () => {
    const org = makeOrg()

    await orgsRepository.create(org)

    await expect(createOrgUseCase.execute(org)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })

  it('should hash password upon creation', async () => {
    const password = '123456'

    const { org } = await createOrgUseCase.execute(makeOrg({ password }))

    expect(await compare(password, org.password)).toBe(true)
    expect(await compare(password, orgsRepository.items[0].password)).toBe(true)
  })
})
