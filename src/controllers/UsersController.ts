import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const usersList = await listUsers.execute();

    return response.json(usersList);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();

    // const registeredUsersRepository = response.locals.push;

    const { name, email, dateOfBirth, password } = request.body;

    const user = await createUser.execute({
      name,
      email,
      dateOfBirth,
      password,
    });

    return response.json(user);
  }
}
