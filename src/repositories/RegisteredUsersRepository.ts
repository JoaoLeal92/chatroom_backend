import { EntityRepository, Repository } from 'typeorm';

import RegisteredUser from '../models/RegisteredUser';

@EntityRepository(RegisteredUser)
class RegisteredUsersRepository extends Repository<RegisteredUser> {
  public async findByEmail(email: string): Promise<RegisteredUser | undefined> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }
}

export default RegisteredUsersRepository;
