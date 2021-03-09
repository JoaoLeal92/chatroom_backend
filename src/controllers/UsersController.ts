import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const registeredUsersRepository = response.locals.push;

    const { name, email, dateOfBirth, password } = request.body;

    const user = await createUser.execute({
      name,
      email,
      dateOfBirth,
      password,
      registeredUsersRepository,
    });

    return response.json(user);
  }
}
