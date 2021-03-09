import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRegisteredUsers1615284834844
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'registeredUsers',
        columns: [
          {
            name: 'email',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'dateOfBirth',
            type: 'time',
          },
          {
            name: 'hashedPassword',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('registeredUsers');
  }
}
