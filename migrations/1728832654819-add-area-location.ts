import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAreaLocation1728832654819 implements MigrationInterface {
    name = 'AddAreaLocation1728832654819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ADD "area" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "area"`);
    }

}
