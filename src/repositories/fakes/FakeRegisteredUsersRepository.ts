import RegisteredUser from '../../models/RegisteredUser';
import IRegisteredUsersRepository from './IRegisteredUsersRepository';

interface IRegisteredUser {
  email: string;
  name: string;
  dateOfBirth: Date;
  hashedPassword: string;
}

class FakeRegisteredUsersRepository implements IRegisteredUsersRepository {
  private registeredUsers: IRegisteredUser[];

  constructor() {
    this.registeredUsers = [];
  }

  public async findByEmail(
    email: string,
  ): Promise<IRegisteredUser | undefined> {
    const user = this.registeredUsers.find(
      userData => userData.email === email,
    );

    return user;
  }

  public async create(userData: IRegisteredUser): Promise<RegisteredUser> {
    const user = new RegisteredUser();

    Object.assign(user, userData);

    this.registeredUsers.push(user);

    return user;
  }

  public async save(user: IRegisteredUser): Promise<RegisteredUser> {
    const findIndex = this.registeredUsers.findIndex(
      findUser => findUser.email === user.email,
    );

    this.registeredUsers[findIndex] = user;

    return user;
  }
}

export default FakeRegisteredUsersRepository;
