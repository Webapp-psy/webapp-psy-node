import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1677143386521 implements MigrationInterface {
    name = 'Version1677143386521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "psychologist" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "psychologist" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "psychologist" ADD CONSTRAINT "UQ_f390a96902b37c25a12138a73ad" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "psychologist" DROP CONSTRAINT "UQ_f390a96902b37c25a12138a73ad"`);
        await queryRunner.query(`ALTER TABLE "psychologist" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "psychologist" ADD "email" character varying NOT NULL`);
    }

}
