import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialStructure1636653530749 implements MigrationInterface {
    name = 'InitialStructure1636653530749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "container_log" ("timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "id" character varying NOT NULL, "type_id" character varying NOT NULL, "type" integer NOT NULL, "occupancy" numeric(3,2), CONSTRAINT "PK_5eb2e029192ba3e4feacce1761b" PRIMARY KEY ("timestamp", "id", "type_id"))`);
        await queryRunner.query(`CREATE TABLE "stop" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_df01674281c44fc10ddd0465d28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stop_platform" ("id" character varying NOT NULL, "name" character varying, "lat" integer NOT NULL, "lon" integer NOT NULL, "stopId" integer, CONSTRAINT "PK_c914a9e4068cccc1a3e021ae3fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stop_platform" ADD CONSTRAINT "FK_879f45e078fdb7435ba0852e99f" FOREIGN KEY ("stopId") REFERENCES "stop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stop_platform" DROP CONSTRAINT "FK_879f45e078fdb7435ba0852e99f"`);
        await queryRunner.query(`DROP TABLE "stop_platform"`);
        await queryRunner.query(`DROP TABLE "stop"`);
        await queryRunner.query(`DROP TABLE "container_log"`);
    }

}
