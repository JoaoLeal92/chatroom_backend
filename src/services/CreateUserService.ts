import RegisteredUsersRepository from '../repositories/RegisteredUsersRepository';
import HashProvider from '../providers/BCryptHashProvider';
import RegisteredUser from '../models/RegisteredUser';

interface ICreateUserDTO {
  email: string;
  name: string;
  dateOfBirth: Date;
  password: string;
  registeredUsersRepository: RegisteredUsersRepository;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    dateOfBirth,
    registeredUsersRepository,
  }: ICreateUserDTO): Promise<RegisteredUser> {
    const hashProvider = new HashProvider();
    const findUser = registeredUsersRepository.findByEmail(email);

    if (findUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await hashProvider.generateHash(password);

    const newUser = registeredUsersRepository.create({
      name,
      email,
      hashedPassword,
      dateOfBirth,
    });

    return newUser;
  }
}

export default CreateUserService;

// class CreateUserService {
//   private name: string;

//   private email: string;

//   private password: string;

//   private dateOfBirth: Date;

//   private registeredUsersRepository: RegisteredUsersRepository;

//   constructor({
//     name,
//     email,
//     password,
//     dateOfBirth,
//     registeredUsersRepository,
//   }: ICreateUserDTO) {
//     this.name = name;
//     this.email = email;
//     this.password = password;
//     this.dateOfBirth = dateOfBirth;
//     this.registeredUsersRepository = registeredUsersRepository;
//   }

//   public execute(): void {
//     const findUser = this.registeredUsersRepository.findByEmail(this.email);

//     if (findUser) {
//       throw new Error('Email already in use');
//     }
//   }
// }
