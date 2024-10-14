import { MigrationInterface, QueryRunner } from "typeorm";

export class DropLevelColumn1728809093613 implements MigrationInterface {
    name = 'DropLevelColumn1728809093613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "location_closure" DROP COLUMN "level"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location_closure" ADD "level" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD "level" integer NOT NULL`);
    }

}
