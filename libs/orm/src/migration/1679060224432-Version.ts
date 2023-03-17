import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1679060224432 implements MigrationInterface {
    name = 'Version1679060224432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" ADD "password" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "password"`);
    }

}
