class RegisteredUser {
  name: string;

  email: string;

  dateOfBirth: Date;

  hashedPassword: string;

  constructor(
    name: string,
    email: string,
    dateOfBirth: Date,
    password: string,
  ) {
    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.hashedPassword = password;
  }
}

export default RegisteredUser;
