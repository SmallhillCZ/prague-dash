import { MigrationInterface, QueryRunner } from "typeorm";

export class StopsGpsType1636657797360 implements MigrationInterface {
    name = 'StopsGpsType1636657797360';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE "public"."stop_platform" CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" ADD "lat" numeric(8,5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" DROP COLUMN "lon"`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" ADD "lon" numeric(8,5) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE "public"."stop_platform" CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" DROP COLUMN "lon"`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" ADD "lon" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" ADD "lat" integer NOT NULL`);
    }

}
