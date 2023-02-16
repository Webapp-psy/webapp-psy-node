import { ormDataSource } from '../source';
import { PsychologistEntity } from "../entity/psychologist.entity";

export const psychologistRepository = ormDataSource.getRepository(
  PsychologistEntity
);
