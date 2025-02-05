import { MigrationInterface, QueryRunner } from "typeorm";

export class SnakeCaseFix1738155235492 implements MigrationInterface {
  name = "SnakeCaseFix1738155235492";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stop_platform" DROP CONSTRAINT "FK_879f45e078fdb7435ba0852e99f"`);
    await queryRunner.query(`ALTER TABLE "stop_platform" RENAME COLUMN "stopId" TO "stop_id"`);
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ADD CONSTRAINT "FK_5f27361e767653964351b79c474" FOREIGN KEY ("stop_id") REFERENCES "stop"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stop_platform" DROP CONSTRAINT "FK_5f27361e767653964351b79c474"`);
    await queryRunner.query(`ALTER TABLE "stop_platform" RENAME COLUMN "stop_id" TO "stopId"`);
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ADD CONSTRAINT "FK_879f45e078fdb7435ba0852e99f" FOREIGN KEY ("stopId") REFERENCES "stop"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
