import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexing1751202516354 implements MigrationInterface {
  name = 'AddIndexing1751202516354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ===== CRITICAL INDEXES FOR getEmployeeTaskSummary PERFORMANCE =====

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_users_roleId" ON "users" ("roleId")`,
    );

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_tasks_assigneeId_statusId" ON "tasks" ("assigneeId", "statusId")`,
    );

    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_users_email" ON "users" ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_users_email"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_tasks_assigneeId_statusId"`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_users_roleId"`);
  }
}
