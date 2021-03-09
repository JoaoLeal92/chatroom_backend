export default interface ICreateUserDTO {
  email: string;
  name: string;
  dateOfBirth: Date;
  hashedPassword: string;
}
