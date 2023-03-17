import {
  Column,
  DeleteDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampableEntity } from './timestampable.entity';
import { PatientEntity } from "./patient.entity";

@Entity('psychologist')
export class PsychologistEntity extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column('boolean', { default: true })
  isEnabled: boolean;

  @OneToMany(
    () => PatientEntity,
    (patient: PatientEntity) => patient.psychologist,
    {
      cascade: true,
    }
  )
  patient: PatientEntity[];

  @DeleteDateColumn({ default: null, nullable: true })
  deletedAt: Date | null;
}
