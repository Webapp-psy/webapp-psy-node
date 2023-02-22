import { AutoEvaluationTestEntity, createModel, EmotionModel } from "@libs/orm";

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
  /**
   * auto evaluations emotions
   */
  emotions: EmotionModel[];

  constructor(autoEvaluationTestEntity: AutoEvaluationTestEntity) {
    this.id = autoEvaluationTestEntity.id;
    this.event = autoEvaluationTestEntity.event;
    this.automaticThoughts = autoEvaluationTestEntity.automaticThoughts;

    if (autoEvaluationTestEntity.emotions) {
      this.emotions = [];
      for (const emotion of autoEvaluationTestEntity.emotions) {
        this.emotions.push(emotion);
        createModel(EmotionModel, emotion);
      }
    }
  }
}
