import { MigrationInterface, QueryRunner } from "typeorm";

export class PostgisGeometry1745846000000 implements MigrationInterface {
  name = "PostgisGeometry1745846000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable PostGIS extension (no-op if already installed)
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);

    // --- container ---
    await queryRunner.query(
      `ALTER TABLE "container" ADD COLUMN "geom" geometry(Point,4326)`,
    );
    await queryRunner.query(
      `UPDATE "container" SET "geom" = ST_SetSRID(ST_MakePoint("lon"::double precision, "lat"::double precision), 4326) WHERE "lat" IS NOT NULL AND "lon" IS NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "container" DROP COLUMN "lat"`);
    await queryRunner.query(`ALTER TABLE "container" DROP COLUMN "lon"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_container_geom" ON "container" USING GIST ("geom")`,
    );

    // --- stop_platform ---
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ADD COLUMN "geom" geometry(Point,4326)`,
    );
    await queryRunner.query(
      `UPDATE "stop_platform" SET "geom" = ST_SetSRID(ST_MakePoint("lon"::double precision, "lat"::double precision), 4326)`,
    );
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ALTER COLUMN "geom" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "stop_platform" DROP COLUMN "lat"`);
    await queryRunner.query(`ALTER TABLE "stop_platform" DROP COLUMN "lon"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_stop_platform_geom" ON "stop_platform" USING GIST ("geom")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // --- stop_platform ---
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_stop_platform_geom"`);
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ADD COLUMN "lat" numeric(8,5)`,
    );
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ADD COLUMN "lon" numeric(8,5)`,
    );
    await queryRunner.query(
      `UPDATE "stop_platform" SET "lat" = ST_Y("geom"::geometry), "lon" = ST_X("geom"::geometry)`,
    );
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ALTER COLUMN "lat" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stop_platform" ALTER COLUMN "lon" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "stop_platform" DROP COLUMN "geom"`);

    // --- container ---
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_container_geom"`);
    await queryRunner.query(`ALTER TABLE "container" ADD COLUMN "lat" numeric`);
    await queryRunner.query(`ALTER TABLE "container" ADD COLUMN "lon" numeric`);
    await queryRunner.query(
      `UPDATE "container" SET "lat" = ST_Y("geom"::geometry), "lon" = ST_X("geom"::geometry) WHERE "geom" IS NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "container" DROP COLUMN "geom"`);
  }
}
