import {
  Column,
  DeleteDateColumn,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampableEntity } from "./timestampable.entity";
import { PsychologistEntity } from "./psychologist.entity";
import { AutoObservationTestEntity } from "./autoObservationTest.entity";

@Entity('patient')
export class PatientEntity extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column()
  dateOfBirth: Date;

  @Column('boolean', { default: true })
  isEnabled: boolean;

  @ManyToOne(
    () => PsychologistEntity,
    (psychologist: PsychologistEntity) => psychologist.patient,
    {
      orphanedRowAction: 'disable',
    }
  )
  psychologist: PsychologistEntity;

  @OneToMany(
    () => AutoObservationTestEntity,
    (autoObservationTest: AutoObservationTestEntity) => autoObservationTest.patient,
    {
      cascade: true,
    }
  )
  autoObservationTest: AutoObservationTestEntity[];

  @DeleteDateColumn({ default: null, nullable: true })
  deletedAt: Date | null;
}
