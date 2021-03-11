import RegisteredUser from '../../models/RegisteredUser';

interface IRegisteredUser {
  email: string;
  name: string;
  dateOfBirth: Date;
  hashedPassword: string;
}

export default interface IRegisteredUsersRepository {
  findByEmail(email: string): Promise<IRegisteredUser | undefined>;
  create(userData: IRegisteredUser): Promise<RegisteredUser>;
  save(userData: IRegisteredUser): Promise<RegisteredUser>;
}
