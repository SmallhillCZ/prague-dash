import { MigrationInterface, QueryRunner } from "typeorm";

export class ContainersCascade1738155450096 implements MigrationInterface {
    name = 'ContainersCascade1738155450096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "container_type" DROP CONSTRAINT "FK_96f3b020e5cd630510065aeacc4"`);
        await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_9633ef6e04c1c76715356af893d"`);
        await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_f52d3664be363e8327f759d1883"`);
        await queryRunner.query(`ALTER TABLE "container_type" ADD CONSTRAINT "FK_96f3b020e5cd630510065aeacc4" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "container_log" ADD CONSTRAINT "FK_9633ef6e04c1c76715356af893d" FOREIGN KEY ("container_type_id") REFERENCES "container_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "container_log" ADD CONSTRAINT "FK_f52d3664be363e8327f759d1883" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_f52d3664be363e8327f759d1883"`);
        await queryRunner.query(`ALTER TABLE "container_log" DROP CONSTRAINT "FK_9633ef6e04c1c76715356af893d"`);
        await queryRunner.query(`ALTER TABLE "container_type" DROP CONSTRAINT "FK_96f3b020e5cd630510065aeacc4"`);
        await queryRunner.query(`ALTER TABLE "container_log" ADD CONSTRAINT "FK_f52d3664be363e8327f759d1883" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "container_log" ADD CONSTRAINT "FK_9633ef6e04c1c76715356af893d" FOREIGN KEY ("container_type_id") REFERENCES "container_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "container_type" ADD CONSTRAINT "FK_96f3b020e5cd630510065aeacc4" FOREIGN KEY ("container_id") REFERENCES "container"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
