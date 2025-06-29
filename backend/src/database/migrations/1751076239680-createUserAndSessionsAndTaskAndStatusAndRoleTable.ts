import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserAndSessionsAndTaskAndStatusAndRoleTable1751076239680
  implements MigrationInterface
{
  name = 'CreateUserAndSessionsAndTaskAndStatusAndRoleTable1751076239680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Roles table
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    );

    // Seed roles
    await queryRunner.query(
      `INSERT INTO roles (name) VALUES ('EMPLOYER'), ('EMPLOYEE')`,
    );

    // Status table
    await queryRunner.createTable(
      new Table({
        name: 'status',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    );
    await queryRunner.query(
      `INSERT INTO status (name) VALUES ('Todo'), ('Pending'), ('In Progress'), ('Completed'), ('Cancelled')`,
    );

    // User table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          { name: 'roleId', type: 'int', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    // Task table
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar', length: '255', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'statusId', type: 'int', isNullable: false },
          { name: 'assigneeId', type: 'int', isNullable: false },
          { name: 'createdById', type: 'int', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'dueDate', type: 'timestamp', isNullable: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['statusId'],
        referencedTableName: 'status',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['assigneeId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['createdById'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Session table
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'int', isNullable: false },
          { name: 'hash', type: 'varchar', length: '512', isNullable: false },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'sessions',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions');
    await queryRunner.dropTable('tasks');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('status');
    await queryRunner.dropTable('roles');
  }
}
