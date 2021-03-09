import { getCustomRepository } from 'typeorm';

import RegisteredUsersRepository from '../repositories/RegisteredUsersRepository';
import HashProvider from '../providers/BCryptHashProvider';
import RegisteredUser from '../models/RegisteredUser';

interface ICreateUserDTO {
  email: string;
  name: string;
  dateOfBirth: Date;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    dateOfBirth,
  }: ICreateUserDTO): Promise<RegisteredUser> {
    const registeredUsersRepository = getCustomRepository(
      RegisteredUsersRepository,
    );

    const hashProvider = new HashProvider();
    const findUser = await registeredUsersRepository.findByEmail(email);

    console.log('Achou usuário: ', findUser);

    if (findUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await hashProvider.generateHash(password);

    const newUser = registeredUsersRepository.create({
      name,
      email,
      hashedPassword,
      dateOfBirth,
    });

    await registeredUsersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
