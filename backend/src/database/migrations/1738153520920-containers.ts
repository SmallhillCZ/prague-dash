import { MigrationInterface, QueryRunner } from "typeorm";

export class Containers1738153520920 implements MigrationInterface {
  name = "Containers1738153520920";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "container_type" ("id" character varying NOT NULL, "container_id" character varying NOT NULL, "type" smallint NOT NULL, "container_type" character varying, "cleaning_frequency_id" character varying, "cleaning_frequency_duration" character varying, "cleaning_frequency_frequency" character varying, CONSTRAINT "PK_2a5759779c91b017b959074867b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "container" ("id" character varying NOT NULL, "district" character varying, "lon" numeric, "lat" numeric, "location" text NOT NULL, "accessibility" smallint, CONSTRAINT "PK_74656f796df3346fa6ec89fa727" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`INSERT INTO "container" (id,location) VALUES (0, 'Placeholder')`);
    await queryRunner.query(
      `INSERT INTO "container_type" (
                  id,
                  container_id,
                  type
              )
              SELECT DISTINCT
                  type_id AS id,
                  0 AS "container_id",
                  type
              FROM container_log`,
    );
    await queryRunner.query(
      `ALTER TABLE "container_type" ADD CONSTRAINT "FK_96f3b020e5cd630510065aeacc4" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "container_log" ADD CONSTRAINT "FK_7cfa9d12d548785e37af863fd2d" FOREIGN KEY ("type_id") REFERENCES "container_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_7cfa9d12d548785e37af863fd2d"`);
    await queryRunner.query(`ALTER TABLE "container_type" DROP CONSTRAINT "FK_96f3b020e5cd630510065aeacc4"`);
    await queryRunner.query(`DROP TABLE "container"`);
    await queryRunner.query(`DROP TABLE "container_type"`);
  }
}
