import ICreateUserDTO from '../dtos/ICreateUserDTO';
import RegisteredUser from '../models/RegisteredUser';

class RegisteredUsersRepository {
  private registeredUsers: RegisteredUser[];

  constructor() {
    this.registeredUsers = [];
  }

  public create(userData: ICreateUserDTO): RegisteredUser {
    this.registeredUsers.push(userData);

    return userData;
  }

  public findByEmail(email: string): RegisteredUser | undefined {
    const user = this.registeredUsers.find(
      userRegister => userRegister.email === email,
    );

    return user;
  }
}

export default RegisteredUsersRepository;
