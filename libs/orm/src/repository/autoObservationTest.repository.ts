import { ormDataSource } from '../source';
import { AutoObservationTestEntity } from "@libs/orm";

export const autoObservationTestRepository = ormDataSource.getRepository(
  AutoObservationTestEntity
);
