import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBuildingId1728876263196 implements MigrationInterface {
    name = 'UpdateBuildingId1728876263196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_876d7bdba03c72251ec4c2dc827"`);
        await queryRunner.query(`ALTER TABLE "location" ADD "buildingId" integer`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_9d3c879ab8834dc2d6c46bb3665" FOREIGN KEY ("buildingId") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_9d3c879ab8834dc2d6c46bb3665"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "buildingId"`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_876d7bdba03c72251ec4c2dc827" FOREIGN KEY ("id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
