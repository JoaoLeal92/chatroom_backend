import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authenticateUserService = new AuthenticateUserService();

    const { email, password } = request.body;

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    const userResponse = {
      email: user.email,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
    };

    return response.json({
      userResponse,
      token,
    });
  }
}
