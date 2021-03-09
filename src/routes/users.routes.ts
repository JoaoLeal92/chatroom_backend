import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import RegisteredUsersRepository from '../repositories/RegisteredUsersRepository';

const usersRouter = Router();
const usersController = new UsersController();
const registerUsersRepository = new RegisteredUsersRepository();

usersRouter.post('/', usersController.create);

export default usersRouter;
