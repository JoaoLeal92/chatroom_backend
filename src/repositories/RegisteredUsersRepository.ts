import { EntityRepository, Repository } from 'typeorm';

import RegisteredUser from '../models/RegisteredUser';

@EntityRepository(RegisteredUser)
class RegisteredUsersRepository extends Repository<RegisteredUser> {
  public async findByEmail(email: string): Promise<RegisteredUser | undefined> {
    const user = await this.findOne({
      where: { email },
    });

    console.log('user: ', user);
    console.log(await this.find());

    return user;
  }
}

export default RegisteredUsersRepository;
