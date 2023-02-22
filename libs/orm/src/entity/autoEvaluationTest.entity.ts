import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampableEntity } from './timestampable.entity';
import { PatientEntity } from "./patient.entity";
import { EmotionEntity } from "./emotion.entity";

@Entity('auto_evaluation_test')
export class AutoEvaluationTestEntity extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event: string;

  @Column()
  automaticThoughts: string;

  @Column('boolean', {default: true})
  isEnabled: boolean;

  @ManyToOne(
    () => PatientEntity,
    (patient: PatientEntity) => patient.autoEvaluationTest,
    {
      orphanedRowAction: 'disable',
    }
  )
  patient: PatientEntity;

  @OneToMany(
    () => EmotionEntity,
    (emotion: EmotionEntity) => emotion.autoEvaluationTest,
    {
      cascade: true,
    }
  )
  emotions: EmotionEntity[];

  @DeleteDateColumn({default: null, nullable: true})
  deletedAt: Date | null;
}
