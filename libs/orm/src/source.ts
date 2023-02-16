import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PatientEntity } from "./entity/patient.entity";
import { PsychologistEntity } from "./entity/psychologist.entity";
import { AutoObservationTestEntity } from "./entity/autoObservationTest.entity";
import { Version1676495753776 } from "./migration/1676495753776-Version";

export const ormDataSource = new DataSource({
  type: 'postgres',
  host: String(process.env.POSTGRES_ACCOUNT_HOST),
  port: Number(process.env.POSTGRES_ACCOUNT_PORT),
  username: String(process.env.POSTGRES_ACCOUNT_USERNAME),
  password: String(process.env.POSTGRES_ACCOUNT_PASSWORD),
  database: String(process.env.POSTGRES_ACCOUNT_DATABASE),
  synchronize:
    process.env.NODE_ENV !== 'production' && !!process.env.DATABASE_SYNC,
  logging: false,
  entities: [
    PatientEntity,
    PsychologistEntity,
    AutoObservationTestEntity,
  ],
  migrations: [Version1676495753776],
});
