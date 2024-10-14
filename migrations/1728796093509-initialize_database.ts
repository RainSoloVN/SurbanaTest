import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeDatabase1728796093509 implements MigrationInterface {
    name = 'InitializeDatabase1728796093509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "building" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP WITH TIME ZONE, "updateDate" TIMESTAMP WITH TIME ZONE, "name" character varying(200) NOT NULL, CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP WITH TIME ZONE, "updateDate" TIMESTAMP WITH TIME ZONE, "code" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "level" integer NOT NULL, "parentId" integer, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, "level" integer NOT NULL, CONSTRAINT "PK_00ac59b131aad339016d90861ad" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1037326a0bb15cc0f85398749" ON "location_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_5838ab81959369ff6f06c70bea" ON "location_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_876d7bdba03c72251ec4c2dc827" FOREIGN KEY ("id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_9123571b1f7aadc5ee8a6f3f152" FOREIGN KEY ("parentId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location_closure" ADD CONSTRAINT "FK_e1037326a0bb15cc0f853987490" FOREIGN KEY ("id_ancestor") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location_closure" ADD CONSTRAINT "FK_5838ab81959369ff6f06c70bea7" FOREIGN KEY ("id_descendant") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location_closure" DROP CONSTRAINT "FK_5838ab81959369ff6f06c70bea7"`);
        await queryRunner.query(`ALTER TABLE "location_closure" DROP CONSTRAINT "FK_e1037326a0bb15cc0f853987490"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_9123571b1f7aadc5ee8a6f3f152"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_876d7bdba03c72251ec4c2dc827"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5838ab81959369ff6f06c70bea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1037326a0bb15cc0f85398749"`);
        await queryRunner.query(`DROP TABLE "location_closure"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "building"`);
    }

}
