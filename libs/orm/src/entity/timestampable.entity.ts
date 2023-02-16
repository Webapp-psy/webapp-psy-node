import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class TimestampableEntity {
  // Setters to keep in order to use js Date object in WHERE clauses from ORM.
  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
    this.setUpdatedAt();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
