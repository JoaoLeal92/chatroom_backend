import { getCustomRepository } from 'typeorm';

import RegisteredUsersRepository from '../repositories/RegisteredUsersRepository';

interface ResponseUser {
  name: string;
  email: string;
  dateOfBirth: Date;
}

export default class ListUsersService {
  public async execute(): Promise<ResponseUser[]> {
    const registeredUsersRepository = getCustomRepository(
      RegisteredUsersRepository,
    );

    const users = await registeredUsersRepository.find();

    const responseUsers = users.map(user => ({
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    }));

    return responseUsers;
  }
}
