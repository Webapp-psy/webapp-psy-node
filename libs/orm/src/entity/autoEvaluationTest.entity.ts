import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampableEntity } from './timestampable.entity';
import { PatientEntity } from "./patient.entity";

@Entity('auto_evaluation_test')
export class AutoEvaluationTestEntity extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event: string;

  @Column()
  automaticThoughts: string;

  @ManyToOne(
    () => PatientEntity,
    (patient: PatientEntity) => patient.autoEvaluationTest,
    {
      orphanedRowAction: 'disable',
    }
  )
  patient: PatientEntity;

  @Column('boolean', { default: true })
  isEnabled: boolean;

  @DeleteDateColumn({ default: null, nullable: true })
  deletedAt: Date | null;
}
