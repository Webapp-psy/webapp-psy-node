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
export class AutoObservationTestEntity extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event: string;

  @Column()
  authomaticThoughts: string;

  @ManyToOne(
    () => PatientEntity,
    (patient: PatientEntity) => patient.autoObservationTest,
    {
      orphanedRowAction: 'disable',
    }
  )
  patient: PatientEntity;

  @DeleteDateColumn({ default: null, nullable: true })
  deletedAt: Date | null;
}
