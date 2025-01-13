import {MigrationInterface, QueryRunner} from "typeorm";

export class StopsCascade1636655613106 implements MigrationInterface {
    name = 'StopsCascade1636655613106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" DROP CONSTRAINT "FK_879f45e078fdb7435ba0852e99f"`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" ADD CONSTRAINT "FK_879f45e078fdb7435ba0852e99f" FOREIGN KEY ("stopId") REFERENCES "stop"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" DROP CONSTRAINT "FK_879f45e078fdb7435ba0852e99f"`);
        await queryRunner.query(`ALTER TABLE "public"."stop_platform" ADD CONSTRAINT "FK_879f45e078fdb7435ba0852e99f" FOREIGN KEY ("stopId") REFERENCES "stop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
