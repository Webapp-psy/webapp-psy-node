import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampableEntity } from './timestampable.entity';
import { AutoEvaluationTestEntity } from './autoEvaluationTest.entity';

@Entity('emotion')
export class EmotionEntity extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  percentage: number;

  @ManyToOne(
    () => AutoEvaluationTestEntity,
    (autoEvaluationTest: AutoEvaluationTestEntity) => autoEvaluationTest.emotions,
    {
      orphanedRowAction: 'disable',
    }
  )
  autoEvaluationTest: AutoEvaluationTestEntity;
}
