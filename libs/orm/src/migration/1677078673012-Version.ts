import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1677078673012 implements MigrationInterface {
    name = 'Version1677078673012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emotion" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, "percentage" integer NOT NULL, "autoEvaluationTestId" integer, CONSTRAINT "PK_438ccbb44b03e5b3a7667278155" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "emotion" ADD CONSTRAINT "FK_f25dc0dfe53a2590b70848d5236" FOREIGN KEY ("autoEvaluationTestId") REFERENCES "auto_evaluation_test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emotion" DROP CONSTRAINT "FK_f25dc0dfe53a2590b70848d5236"`);
        await queryRunner.query(`DROP TABLE "emotion"`);
    }

}
