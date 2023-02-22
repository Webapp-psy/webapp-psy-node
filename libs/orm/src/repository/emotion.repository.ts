import { ormDataSource } from '../source';
import { EmotionEntity } from "@libs/orm";

export const emotionRepository = ormDataSource.getRepository(
  EmotionEntity
);
