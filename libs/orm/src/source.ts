import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PatientEntity } from "./entity/patient.entity";
import { PsychologistEntity } from "./entity/psychologist.entity";
import { AutoEvaluationTestEntity } from "./entity/autoEvaluationTest.entity";
import { Version1677065890207 } from "./migration/1677065890207-Version";
import { EmotionEntity } from "./entity/emotion.entity";
import { Version1677078673012 } from "./migration/1677078673012-Version";
import { Version1677143386521 } from "./migration/1677143386521-Version";
import { Version1679060224432 } from "./migration/1679060224432-Version";
import { Version1679064687636 } from "./migration/1679064687636-Version";

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
    AutoEvaluationTestEntity,
    EmotionEntity
  ],
  migrations:
    [
      Version1677065890207,
      Version1677078673012,
      Version1677143386521,
      Version1679060224432,
      Version1679064687636
    ],
});
