import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('registeredUsers')
class RegisteredUser {
  @PrimaryColumn()
  email: string;

  @Column()
  name: string;

  @Column('time')
  dateOfBirth: Date;

  @Column()
  hashedPassword: string;
}

export default RegisteredUser;
