import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1679064687636 implements MigrationInterface {
    name = 'Version1679064687636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "psychologist" ADD "password" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "psychologist" DROP COLUMN "password"`);
    }

}
