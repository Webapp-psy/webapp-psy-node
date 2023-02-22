import { AutoEvaluationTestEntity } from "@libs/orm";

export class AutoEvaluationTestModel {
  id: number;
  /**
   * event
   */
  event: string;
  /**
   * automaticThoughts thoughts
   */
  automaticThoughts: string;

  constructor(autoEvaluationTestEntity: AutoEvaluationTestEntity) {
    this.id = autoEvaluationTestEntity.id;
    this.event = autoEvaluationTestEntity.event;
    this.automaticThoughts = autoEvaluationTestEntity.automaticThoughts;
  }
}
