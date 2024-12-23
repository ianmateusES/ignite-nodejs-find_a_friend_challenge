import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory'

import { makeOrg } from 'test/factories'
import { AuthenticateOrgUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors'

describe('Authenticate Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let authenticateOrgUseCase: AuthenticateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    )

    const { org: authenticatedOrg } = await authenticateOrgUseCase.execute({
      email: org.email,
      password,
    })

    expect(authenticatedOrg).toEqual(org)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateOrgUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    )

    await expect(() =>
      authenticateOrgUseCase.execute({
        email: org.email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
