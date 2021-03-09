import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import RegisteredUsersRepository from '../repositories/RegisteredUsersRepository';

const usersRouter = Router();
const usersController = new UsersController();
const registerUsersRepository = new RegisteredUsersRepository();

usersRouter.post(
  '/',
  function passRepo(req, res, next) {
    res.locals.push = registerUsersRepository;
    next();
  },
  usersController.create,
);

export default usersRouter;
