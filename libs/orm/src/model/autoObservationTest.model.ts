import { AutoObservationTestEntity } from "@libs/orm";

export class AutoObservationTestModel {
  id: number;
  /**
   * event
   */
  event: string;
  /**
   * authomatic thoughts
   */
  authomaticThoughts: string;

  constructor(autoObservationTestEntity: AutoObservationTestEntity) {
    this.id = autoObservationTestEntity.id;
    this.event = autoObservationTestEntity.event;
    this.authomaticThoughts = autoObservationTestEntity.authomaticThoughts;
  }
}
