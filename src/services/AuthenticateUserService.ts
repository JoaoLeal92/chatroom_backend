import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import RegisteredUsersRepository from '../repositories/RegisteredUsersRepository';
import HashProvider from '../providers/BCryptHashProvider';
import RegisteredUser from '../models/RegisteredUser';

import authConfig from '../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: RegisteredUser;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const registeredUsersRepository = getCustomRepository(
      RegisteredUsersRepository,
    );

    const hashProvider = new HashProvider();
    const user = await registeredUsersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await hashProvider.compareHash(
      password,
      user.hashedPassword,
    );

    if (!passwordMatch) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.email,
      expiresIn,
    });

    return { user, token };
  }
}
