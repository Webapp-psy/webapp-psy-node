import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1676495753776 implements MigrationInterface {
    name = 'Version1676495753776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "psychologist" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "isEnabled" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, CONSTRAINT "PK_8306b92077e64754cda381819cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auto_evaluation_test" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "event" character varying NOT NULL, "authomaticThoughts" character varying NOT NULL, "deletedAt" TIMESTAMP, "patientId" integer, CONSTRAINT "PK_c1ed78aa511b867ee1dcac6c2f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying(255) NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "isEnabled" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "psychologistId" integer, CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auto_evaluation_test" ADD CONSTRAINT "FK_811f1eec280d3f49ce05b311cb0" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "FK_99237aeba3526cf8da1618b0807" FOREIGN KEY ("psychologistId") REFERENCES "psychologist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "FK_99237aeba3526cf8da1618b0807"`);
        await queryRunner.query(`ALTER TABLE "auto_evaluation_test" DROP CONSTRAINT "FK_811f1eec280d3f49ce05b311cb0"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "auto_evaluation_test"`);
        await queryRunner.query(`DROP TABLE "psychologist"`);
    }

}
