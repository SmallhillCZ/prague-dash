import { MigrationInterface, QueryRunner } from "typeorm";

export class ContainerIds1738154946685 implements MigrationInterface {
  name = "ContainerIds1738154946685";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_7cfa9d12d548785e37af863fd2d"`);
    await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "PK_5eb2e029192ba3e4feacce1761b"`);
    await queryRunner.query(`ALTER TABLE "container_log" RENAME COLUMN "id" TO "container_id"`);
    await queryRunner.query(`ALTER TABLE "container_log" RENAME COLUMN "type_id" TO "container_type_id"`);
    await queryRunner.query(
      `ALTER TABLE "container_log" ADD CONSTRAINT "PK_2996a81fa9c9074970b6908358b" PRIMARY KEY ("timestamp", "container_type_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "container_log" ADD CONSTRAINT "FK_9633ef6e04c1c76715356af893d" FOREIGN KEY ("container_type_id") REFERENCES "container_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "container_log" ADD CONSTRAINT "FK_f52d3664be363e8327f759d1883" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_f52d3664be363e8327f759d1883"`);
    await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_9633ef6e04c1c76715356af893d"`);
    await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "PK_2996a81fa9c9074970b6908358b"`);
    await queryRunner.query(`ALTER TABLE "container_log" RENAME COLUMN "container_type_id" TO "type_id"`);
    await queryRunner.query(`ALTER TABLE "container_log" RENAME COLUMN "container_id" TO "id"`);
    await queryRunner.query(
      `ALTER TABLE "container_log" ADD CONSTRAINT "PK_5eb2e029192ba3e4feacce1761b" PRIMARY KEY ("timestamp", "id", "type_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "container_log" ADD CONSTRAINT "FK_7cfa9d12d548785e37af863fd2d" FOREIGN KEY ("container_type_id") REFERENCES "container_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
