import CreateUserService from './CreateUserService';

import FakeRegisteredUsersRepository from '../repositories/fakes/FakeRegisteredUsersRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

let fakeUsersRepository: FakeRegisteredUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeRegisteredUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService();
  });

  it('should be able to create a user', async () => {
    const dateOfBirth = new Date('01/01/1991');

    const userData = {
      dateOfBirth,
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123123',
    };

    jest
      .spyOn(createUser, 'getUsersRepository')
      .mockReturnValue(fakeUsersRepository);

    jest.spyOn(createUser, 'getHashProvider').mockReturnValue(fakeHashProvider);

    const user = await createUser.execute(userData);

    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('hashedPassword');
    expect(user).toHaveProperty('dateOfBirth');
  });

  // it('should not be able to create a user with email already in use', async () => {
  //   await createUser.execute({
  //     name: 'Teste',
  //     email: 'teste@teste.com',
  //     password: '123123',
  //   });

  //   await expect(
  //     createUser.execute({
  //       name: 'Teste2',
  //       email: 'teste@teste.com',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
